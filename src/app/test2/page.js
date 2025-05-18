'use client';

import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

export default function FaceDetector({onExpressionDetected}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModelsAndStart = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(err => console.error('Camera error:', err));
      }
    };

    loadModelsAndStart();

    const handleVideoPlay = () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.appendChild(canvas);

      const displaySize = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        resizedDetections.forEach(det => {
          const expressions = det.expressions;
          const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
          const [expression, confidence] = sorted[0];
          // Call the callback function with the detected expression
          // alert(`Expression: ${expression} (${(confidence * 100).toFixed(1)}%)`);
          const res = fetch('/api/getLatestExpression', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ expression }),
          }
           )
        });
      }, 300); // This interval runs every 1000 milliseconds, which is 1 second.
    };

    videoRef.current?.addEventListener('play', handleVideoPlay);

    return () => {
      videoRef.current?.removeEventListener('play', handleVideoPlay);
    };
  }, []);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        muted
        width={640}
        height={480}
        className="border border-black"
        style={{ position: 'relative', zIndex: 0 }}
      />
      <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
}
