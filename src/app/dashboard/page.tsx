"use client";

import Navbar from "../navbar/page";
import { logout } from "../login/actions";
import { useEffect, useState } from "react";
import FaceDetector from "../test2/page";

// ExpressionResults Component
function ExpressionResults({ expression = "Neutral", percentage = 0 }) {
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

// Dashboard Component
export default function Dashboard() {
  const [expression, setExpression] = useState("Neutral");
  const [confidence, setConfidence] = useState(0);

  const handleExpressionDetected = async (detectedExpression, detectedConfidence) => {
    setExpression(detectedExpression);
    setConfidence(detectedConfidence);

    console.log(`Expression detected: ${detectedExpression} with confidence ${detectedConfidence}%`);

    try {
      const cookieRes = await fetch("/api/getCookie");
      const { userId } = await cookieRes.json();
      if (typeof userId !== "string") {
        throw new Error("userId is not a string");
      }
      
      await fetch("/api/saveLatestExpression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id:userId,
          expression: detectedExpression,
          certainty: detectedConfidence,
        }),
      });
    } catch (err) {
      console.error("Error saving expression:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Expression Dashboard</h1>
          <button
            onClick={logout}
            className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Logout
          </button>
        </header>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:items-start lg:justify-center">
          {/* Webcam Feed */}
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Camera Feed</h2>
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <FaceDetector onExpressionDetected={handleExpressionDetected} />
            </div>
          </div>

          {/* Expression Display */}
          <ExpressionResults expression={expression} percentage={confidence} />
        </div>
      </div>
    </div>
  );
}
