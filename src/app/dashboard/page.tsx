// "use client"
// import { logout } from "../login/actions";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";
// import * as facemesh from "@tensorflow-models/facemesh";
// import { useEffect, useRef, useState } from "react";
// import FaceDetector from '../test2/page';

// function ExpressionResults({ dominantExpression, expressionPercentage }) {
//   // Default values when no expression is detected yet
//   const expression = dominantExpression || "Neutral";
//   const percentage = expressionPercentage || 0;
  
//   return (
//     <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-800">Expression Detected</h2>
//         <p className="text-gray-500 mt-1">Real-time facial analysis results</p>
//       </div>
      
//       <div className="flex flex-col items-center py-4">
//         <div className="text-4xl font-bold text-indigo-600">{expression}</div>
//         <div className="mt-2 text-lg text-gray-700">
//           {percentage > 0 ? `${percentage}% more than other expressions` : "Waiting for detection..."}
//         </div>
//       </div>
      
//       <div className="w-full bg-gray-200 rounded-full h-2.5">
//         <div 
//           className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }

// export default function Dashboard() {
//   const [dominantExpression, setDominantExpression] = useState(null);
//   const [expressionPercentage, setExpressionPercentage] = useState(null);
  
//   // This function would be called by your FaceDetector component
//   const handleExpressionDetected = (expression, percentage) => {
//     setDominantExpression(expression);
//     setExpressionPercentage(percentage);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
//       <div className="container mx-auto px-4 py-8">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Expression Dashboard</h1>
//           <button
//             onClick={() => logout()}
//             className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
//           >
//             Logout
//           </button>
//         </header>
        
//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="flex flex-col items-center">
//             <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Camera Feed</h2>
//               <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
//                 {/* Your FaceDetector component will render here with the webcam feed */}
//                 <FaceDetector onExpressionDetected={handleExpressionDetected} />
//               </div>
//             </div>
//           </div>
          
//           <div className="flex flex-col items-center">
//             <ExpressionResults 
//               dominantExpression={dominantExpression} 
//               expressionPercentage={expressionPercentage} 
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import Navbar from '../navbar/page';
import { logout } from "../login/actions";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import { useEffect, useRef, useState } from "react";
import FaceDetector from '../test2/page';

// async function ExpressionResults(){
// const [expression, setExpression] = useState("Neutral");  
// const [percentage, setPercentage] = useState(0);

//   // This function would be called by your FaceDetector component
//   // Example of how to use the handleExpressionDetected function
//   // This would typically be called from your FaceDetector component
//   // handleExpressionDetected("Happy", 75);

//   // For debugging purposes
//   // const res = { expression, percentage };

// // console.log(res);


  

//   return (
//     <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-4">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-800">Expression Detected</h2>
//         <p className="text-gray-500 mt-1">Real-time facial analysis results</p>
//       </div>

//       <div className="flex flex-col items-center py-4">
//         <div className="text-4xl font-bold text-indigo-600">{expression}</div>
//         <div className="mt-2 text-lg text-gray-700">
//           {percentage > 0 ? `${percentage}% more than other expressions` : "Waiting for detection..."}
//         </div>
//       </div>

//       <div className="w-full bg-gray-200 rounded-full h-2.5">
//         <div
//           className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
//           style={{ width: `${percentage}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }
function ExpressionResults() {
  const [expression, setExpression] = useState("Neutral");  
  const [percentage, setPercentage] = useState(0);

  // This function will be called from the parent component that receives data from FaceDetector
  useEffect(() => {
    // Create a function that will be called from the parent component
    window.updateExpressionResults = (newExpression, newPercentage) => {
      setExpression(newExpression);
      setPercentage(parseFloat(newPercentage));
    };

    // Clean up function
    return () => {
      delete window.updateExpressionResults;
    };
  }, []);

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Expression Detected</h2>
        <p className="text-gray-500 mt-1">Real-time facial analysis results</p>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="text-4xl font-bold text-indigo-600">{expression}</div>
        <div className="mt-2 text-lg text-gray-700">
          {percentage > 0 ? `${percentage}% confidence` : "Waiting for detection..."}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  // This function handles the expression data from FaceDetector
  // and passes it to the ExpressionResults component via window method
  const handleExpressionDetected = (expression, confidence) => {
    // Using the global function we created in ExpressionResults
    if (window.updateExpressionResults) {
      window.updateExpressionResults(expression, confidence);
    }
    
    // For debugging
    console.log(`Expression detected: ${expression} with confidence ${confidence}%`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Expression Dashboard</h1>
        </header>

        {/* Main Layout */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center">
          {/* Camera Section */}
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Live Camera Feed</h2>
            <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
              <FaceDetector onExpressionDetected={handleExpressionDetected} />
            </div>
          </div>

          {/* Expression Results */}
          <ExpressionResults />
        </div>
      </div>
    </div>
  );
}