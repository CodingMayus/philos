// "use client";

// // Import necessary modules and components
// import { useEffect, useState, useRef } from "react";

// // Declare a global interface to add the webkitSpeechRecognition property to the Window object
// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//   }
// }

// // Export the MicrophoneComponent function component
// export default function MicrophoneComponent() {
//   // State variables to manage recording status, completion, and transcript
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingComplete, setRecordingComplete] = useState(false);
//   const [transcript, setTranscript] = useState("");

//   const [totalTranscript, setTotalTranscript] = useState("");
//   // Reference to store the SpeechRecognition instance
//   const recognitionRef = useRef<any>(null);

//   // Function to start recording
//   const startRecording = () => {
//     setIsRecording(true);
//     // Create a new SpeechRecognition instance and configure it
//     recognitionRef.current = new window.webkitSpeechRecognition();
//     recognitionRef.current.continuous = true;
//     recognitionRef.current.interimResults = true;
//     // Event handler for speech recognition results
//     recognitionRef.current.onresult = (event: any) => {
//       const { transcript } = event.results[event.results.length - 1][0];
//       //alert(transcript);
      
//        setTotalTranscript((prev) => prev + " " + transcript);
//       // Log the recognition results and update the transcript state
//       console.log(event.results);
//       setTranscript(transcript);
//         // setTotalTranscript(totalTranscript+transcript);

//     };

//     // Start the speech recognition
//     recognitionRef.current.start();
//   };

//   // Cleanup effect when the component unmounts
//   useEffect(() => {
//     return () => {
//       // Stop the speech recognition if it's active
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Function to stop recording
//   const stopRecording = async () => {
//     if (recognitionRef.current) {
//       // Stop the speech recognition and mark recording as complete
//       recognitionRef.current.stop();
//       setRecordingComplete(true);

//       alert(totalTranscript);
      
//     }
//     const respons = await fetch("/api/getCookie", {
// method: "GET",

//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await respons.json();
//     const userId = data.userId;
//       setTotalTranscript("user: "+totalTranscript);
// //     const response = await fetch("/api/saveMessage", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ _id: userId, addedString: totalTranscript }),
// //   });
// // if (response.status === 200) {
// //   alert("Message saved successfully");
// //   // function sendToBot() {
// //   // await fetch
// //   // }
// // }
//   }
//   // Toggle recording state and manage recording actions
//   const handleToggleRecording = () => {
//     setIsRecording(!isRecording);
//     if (!isRecording) {
//       startRecording();
//     } else {
//         // sendToBot();
//       stopRecording();
//     }
//   };

//   // Render the microphone component with appropriate UI based on recording state
//   return (
//     <div className="flex items-center justify-center h-screen w-full">
//       <div className="w-full">
//         {(isRecording || transcript) && (
//           <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
//             <div className="flex-1 flex w-full justify-between">
//               <div className="space-y-1">
//                 <p className="text-sm font-medium leading-none">
//                   {recordingComplete ? "Recorded" : "Recording"}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {recordingComplete
//                     ? "Thanks for talking."
//                     : "Start speaking..."}
//                 </p>
//               </div>
//               {isRecording && (
//                 <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
//               )}
//             </div>

//             {transcript && (
//               <div className="border rounded-md p-2 h-fullm mt-4">
//                 <p className="mb-0">{transcript}</p>
//               </div>
//             )}
//           </div>
//         )}

//         <div className="flex items-center w-full">
//           {isRecording ? (
//             // Button for stopping recording
//             <button
//               onClick={handleToggleRecording}
//               className="mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none"
//             >
//               <svg
//                 className="h-12 w-12 "
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//               </svg>
//             </button>
//           ) : (
//             // Button for starting recording
//             <button
//               onClick={handleToggleRecording}
//               className="mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full w-20 h-20 focus:outline-none"
//             >
//               <svg
//                 viewBox="0 0 256 256"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-12 h-12 text-white"
//               >
//                 <path
//                   fill="currentColor" // Change fill color to the desired color
//                   d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

// Import necessary modules and components
import { useEffect, useState, useRef } from "react";
let userId;
// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}
// Sends text to Microsoft Azure Text-to-Speech API and returns the audio blob
 const sendToMicrosoft = async (botres: string) => {
  alert("made it here")
  const subscriptionKey = process.env.TEXT_TO_SPEECH_API_KEY; // Use NEXT_PUBLIC_ for client-side env vars
  alert(subscriptionKey)
  const region = "eastus";
  const endpoint = `https://eastus.tts.speech.microsoft.com/cognitiveservices/v1`;

  // if (!subscriptionKey) {
  //   console.error("Missing Azure Text-to-Speech subscription key.");
  //   return null;
  // }

  // Construct SSML payload
  const ssml = `
    <speak version="1.0" xml:lang="en-CA">
      <voice xml:lang="en-CA" xml:gender="Female" name="en-CA-ClaraNeural">
        ${botres}
      </voice>
    </speak>
  `;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": "",
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0",
      },
      body: ssml,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Text-to-Speech API error:", errorText);
      return null;
    }else{
      alert("Audio generated successfully");
    }

    // Get audio as a Blob
    const audioBlob = await res.blob();
    // Play the audio immediately
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();

    return audioBlob;
  } catch (error) {
    console.error("Error calling Microsoft TTS API:", error);
    return null;
  }
};

// Frontend code (fixed)
 const sendToBot = async (history: string): Promise<string | null> => {
  try {
    const res = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        history: history  // Ensure history is always at least an empty array
      })
    });
        
    if (!res.ok) {
      const errorData = await res.json();
      console.error('API Error:', errorData.error);
      return null;
    }
        
    const data = await res.json();
    console.log('Bot Response:', data.response);
    
const reeeee = await sendToMicrosoft(data.response);


    //send to text to audio
    //then save it to the history !

    const combined = "Bot:"+data.response;
     await fetch("/api/saveMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: userId, addedString: combined }),
    });

    alert(data.response)

    return data.text;
  } catch (error) {
    console.error("Error processing transcript:", error);
    return null;
  }
};

// Export the MicrophoneComponent function component
export default function MicrophoneComponent() {
  // State variables to manage recording status, completion, and transcript
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState(""); // Current interim result
  const [totalTranscript, setTotalTranscript] = useState(""); // Complete transcription
  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);
  // Reference to store transcript segments
  const finalTranscriptsRef = useRef<string[]>([]);

  // Function to start recording
   const startRecording = () => {
    setIsRecording(true);
    setRecordingComplete(false);
    setTranscript("");
    finalTranscriptsRef.current = []; // Reset final transcripts array
    
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      // Process all results
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        
        // If this is a final result (not interim)
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
          // Only add to final transcripts if it's new
          if (!finalTranscriptsRef.current.includes(result[0].transcript.trim())) {
            finalTranscriptsRef.current.push(result[0].transcript.trim());
          }
        } else {
          // This is an interim result
          interimTranscript += result[0].transcript;
        }
      }
      
      // Update the current transcript for display
      setTranscript(interimTranscript);
      
      // If we have a new final transcript, update the total
      if (finalTranscript) {
        setTotalTranscript(finalTranscriptsRef.current.join(" "));
      }
      
      console.log("Final transcripts:", finalTranscriptsRef.current);
    };

    // Error handling
    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
    };

    // Start the speech recognition
    recognitionRef.current.start();
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to stop recording
   const stopRecording = async () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setIsRecording(false);
      setRecordingComplete(true);
      
      // Get the complete transcript
      const completeTranscript = finalTranscriptsRef.current.join(" ");
      setTotalTranscript(completeTranscript);
      
      // alert("Final transcript: " + completeTranscript);
      
      // Get user ID from cookie
      try {
        const response = await fetch("/api/getCookie", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const data = await response.json();
         userId = data.userId;
        
        // Prepare message with user prefix
        const userMessage = "user: " + completeTranscript;
        
        // Uncomment this block when ready to implement saving
        
        const saveResponse = await fetch("/api/saveMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: userId, addedString: userMessage }),
        });
        
        if (saveResponse.status === 200) {
          // alert("Message sent successfully Please Wait for a response");
        }
  const updatedHistory=  await saveResponse.json();

        //two values will be given, the history, and what the user just said.
        alert(updatedHistory);
      const res = await sendToBot(updatedHistory);
     
   
      } catch (error) {
        console.error("Error processing transcript:", error);
      }
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // Render the microphone component with appropriate UI based on recording state
  return (
    <div className="flex flex-col-reverse h-screen w-full">
      <div className="w-full">
        {(isRecording || recordingComplete) && (
          <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {recordingComplete ? "Recorded" : "Recording"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recordingComplete
                    ? "Thanks for talking."
                    : "Start speaking..."}
                </p>
              </div>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
              )}
            </div>

          <div className="bg-white rounded-md p-4 mt-4 border border-gray-200 shadow space-y-2">
            {isRecording && transcript && (
              <p className="italic text-sm text-gray-600">{transcript}</p>
            )}
            {totalTranscript && (
              <p className="text-base text-black-900">{totalTranscript}</p>
            )}
            {recordingComplete && (
              <button
                className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm text-gray-700"
                onClick={() => {
                  setRecordingComplete(false);
                  setTranscript("");
                  setTotalTranscript("");
                }}
              >
                Close
              </button>
            )}
          </div>

          </div>
        )}

        <div className="flex items-center w-full">
          {isRecording ? (
            // Button for stopping recording
            <button
              onClick={handleToggleRecording}
              className="mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none"
            >
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          ) : (
            // Button for starting recording
            <button
              onClick={handleToggleRecording}
              className="mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full w-20 h-20 focus:outline-none"
            >
              <svg
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
              >
                <path
                  fill="currentColor"
                  d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      
    </div>
  );
}


