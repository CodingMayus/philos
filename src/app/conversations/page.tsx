'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Mic } from 'lucide-react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// This component handles the Three.js scene
export default function ThreeJSScene() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);
  const controlsRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const mixerRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle sending message to API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({ message }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await res.json();
      setMessage('');
      
      // You could trigger animations based on the response here
      playAnimation('talking');
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Setup Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize scene
    const initScene = () => {
      // Create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf1f1f1);
      scene.fog = new THREE.Fog(0xf1f1f1, 60, 100);
      sceneRef.current = scene;
      
      // Create renderer
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        antialias: true,
        alpha: true 
      });
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;
      
      // Create camera
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 30;
      camera.position.x = 0;
      camera.position.y = -3;
      cameraRef.current = camera;
      
      // Add orbit controls for better user interaction
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();
      controls.enablePan = false;
      controls.enableDamping = true;
      controlsRef.current = controls;
      
      // Add lights
      addLights(scene);
      
      // Add floor
      addFloor(scene);
      
      // Load 3D model
      loadModel(scene);
    };
    
    // Add lights to the scene
    const addLights = (scene) => {
      // Hemisphere light
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
      hemiLight.position.set(0, 50, 0);
      scene.add(hemiLight);
      
      // Directional light with shadows
      const d = 8.25;
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
      dirLight.position.set(-8, 12, 8);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
      dirLight.shadow.camera.near = 0.1;
      dirLight.shadow.camera.far = 1500;
      dirLight.shadow.camera.left = d * -1;
      dirLight.shadow.camera.right = d;
      dirLight.shadow.camera.top = d;
      dirLight.shadow.camera.bottom = d * -1;
      scene.add(dirLight);
      
      // Add an ambient light for overall illumination
      const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
      scene.add(ambientLight);
    };
    
    // Add floor to the scene
    const addFloor = (scene) => {
      const floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
      const floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
        shininess: 0,
      });
      
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -0.5 * Math.PI; // 90 degrees
      floor.receiveShadow = true;
      floor.position.y = -11;
      scene.add(floor);
    };
    
    // Load 3D model with GLTF loader
    const loadModel = (scene) => {
      const loader = new GLTFLoader();
      
      // Replace with your model URL
      loader.load(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb',
        (gltf) => {
          const model = gltf.scene;
          
          // Set model properties
          model.traverse((object) => {
            if (object.isMesh) {
              object.castShadow = true;
              object.receiveShadow = true;
            }
          });
          
          // Position the model
          model.position.set(0, -10, 0);
          model.scale.set(10, 10, 10);
          scene.add(model);
          
          // Setup animations if available
          if (gltf.animations && gltf.animations.length) {
            const mixer = new THREE.AnimationMixer(model);
            mixerRef.current = mixer;
            
            const animations = {};
            gltf.animations.forEach((clip) => {
              animations[clip.name] = mixer.clipAction(clip);
            });
            
            // Store animations for later use
            sceneRef.current.userData.animations = animations;
            
            // Play idle animation by default
            if (animations['idle']) {
              animations['idle'].play();
            }
          }
          
          setIsLoading(false);
        },
        (xhr) => {
          // Loading progress
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
          console.error('An error happened loading the model:', error);
          setIsLoading(false);
        }
      );
    };
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;
      
      // Request the next frame
      animationRef.current = requestAnimationFrame(animate);
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Update animations
      if (mixerRef.current) {
        const delta = clockRef.current.getDelta();
        mixerRef.current.update(delta);
      }
      
      // Adjust renderer if window size changed
      if (resizeRendererToDisplaySize(rendererRef.current)) {
        const canvas = rendererRef.current.domElement;
        cameraRef.current.aspect = canvas.clientWidth / canvas.clientHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    
    // Resize renderer if needed
    const resizeRendererToDisplaySize = (renderer) => {
      const canvas = renderer.domElement;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const canvasPixelWidth = canvas.width / window.devicePixelRatio;
      const canvasPixelHeight = canvas.height / window.devicePixelRatio;
      
      const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Initialize scene and start animation loop
    initScene();
    animate();
    
    // Add window resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Dispose resources to prevent memory leaks
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);
  
  // Function to play a specific animation
  const playAnimation = (animationName) => {
    if (!sceneRef.current || !sceneRef.current.userData.animations) return;
    
    const animations = sceneRef.current.userData.animations;
    
    // Fade out current animations
    Object.values(animations).forEach((action) => {
      if (action.isRunning()) {
        action.fadeOut(0.5);
      }
    });
    
    // Play requested animation
    if (animations[animationName]) {
      animations[animationName].reset().fadeIn(0.5).play();
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Three.js canvas takes full screen */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full block" 
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-xl font-bold">Loading 3D model...</div>
        </div>
      )}
      
      {/* UI overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow-lg">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
            <button 
              type="button" 
              className="p-2 bg-blue-500 rounded-full text-white"
              onClick={() => playAnimation('talking')}
            >
              <Mic size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}