// import { useState, useEffect, useRef } from 'react';
// import { MessageCircle, Volume2, Mic, Shield, Brain, Settings, User, Clock, PieChart, HeartPulse } from 'lucide-react';

// // This would be in a separate file in a real Next.js app
// const CompanionContext = {
//   name: "Alex",
//   mood: "thoughtful",
//   lastInteraction: "3 hours ago",
//   relationshipLevel: 7,
//   avatarSrc: "/api/placeholder/100/100"
// };

// export default function AICompanionApp() {
//   const [activeTab, setActiveTab] = useState('chat');
//   const [messages, setMessages] = useState([
//     { sender: 'companion', text: "Hey there! I was just thinking about that book you mentioned yesterday. Did you get a chance to start it?", timestamp: "10:30 AM" },
//     { sender: 'user', text: "Not yet! Been too busy with work. How was your day?", timestamp: "10:32 AM" },
//   ]);
//   const [isPrivacyModeActive, setIsPrivacyModeActive] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [inputText, setInputText] = useState('');
  
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (inputText.trim() === '') return;
    
//     const newMessage = {
//       sender: 'user',
//       text: inputText,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
    
//     setMessages([...messages, newMessage]);
//     setInputText('');
    
//     // Simulate companion response
//     setTimeout(() => {
//       const companionMessage = {
//         sender: 'companion',
//         text: "That's interesting! I've been thinking about that too. Would you like to talk more about it?",
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       };
//       setMessages(prevMessages => [...prevMessages, companionMessage]);
//     }, 2000);
//   };

//   const togglePrivacyMode = () => {
//     setIsPrivacyModeActive(!isPrivacyModeActive);
//   };

//   const toggleListening = () => {
//     setIsListening(!isListening);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div className="w-20 bg-gray-800 flex flex-col items-center py-6 border-r border-gray-700">
//         <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center mb-8">
//           <User className="text-white" size={24} />
//         </div>
        
//         <nav className="flex flex-col items-center space-y-6 mt-4">
//           <button 
//             className={`p-3 rounded-xl ${activeTab === 'chat' ? 'bg-indigo-700' : 'hover:bg-gray-700'}`}
//             onClick={() => setActiveTab('chat')}
//           >
//             <MessageCircle className="text-white" size={24} />
//           </button>
//           <button 
//             className={`p-3 rounded-xl ${activeTab === 'analytics' ? 'bg-indigo-700' : 'hover:bg-gray-700'}`}
//             onClick={() => setActiveTab('analytics')}
//           >
//             <PieChart className="text-white" size={24} />
//           </button>
//           <button 
//             className={`p-3 rounded-xl ${activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-gray-700'}`}
//             onClick={() => setActiveTab('settings')}
//           >
//             <Settings className="text-white" size={24} />
//           </button>
//         </nav>
        
//         <div className="mt-auto">
//           <button 
//             className={`p-3 rounded-xl ${isPrivacyModeActive ? 'bg-green-600' : 'bg-gray-700'}`}
//             onClick={togglePrivacyMode}
//           >
//             <Shield className="text-white" size={24} />
//           </button>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Companion Info Bar */}
//         <div className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6">
//           <div className="relative">
//             <img 
//               src={CompanionContext.avatarSrc} 
//               alt="Companion Avatar" 
//               className="w-12 h-12 rounded-full"
//             />
//             <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
//           </div>
          
//           <div className="ml-4">
//             <h2 className="text-lg font-semibold dark:text-white">{CompanionContext.name}</h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400">Feeling {CompanionContext.mood}</p>
//           </div>
          
//           <div className="ml-auto flex items-center space-x-2 text-gray-500 dark:text-gray-400">
//             <Clock size={18} />
//             <span className="text-sm">{CompanionContext.lastInteraction}</span>
//           </div>
          
//           <div className="ml-6 flex items-center">
//             <HeartPulse size={20} className="text-red-500 mr-2" />
//             <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
//               <div 
//                 className="h-full bg-red-500 rounded-full" 
//                 style={{ width: `${CompanionContext.relationshipLevel * 10}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
        
//         {/* Main Interface */}
//         <div className="flex-1 overflow-hidden">
//           {activeTab === 'chat' && (
//             <div className="h-full flex flex-col">
//               {/* Messages */}
//               <div className="flex-1 overflow-y-auto p-6 space-y-4">
//                 {messages.map((message, index) => (
//                   <div 
//                     key={index} 
//                     className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div 
//                       className={`max-w-md p-4 rounded-2xl ${
//                         message.sender === 'user' 
//                           ? 'bg-indigo-600 text-white rounded-br-none' 
//                           : 'bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-none'
//                       }`}
//                     >
//                       <p>{message.text}</p>
//                       <span className="text-xs opacity-70 block mt-2 text-right">{message.timestamp}</span>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messageEndRef} />
//               </div>
              
//               {/* Input Area */}
//               <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
//                 <div className="flex items-center space-x-2">
//                   <button 
//                     className={`p-3 rounded-full ${isListening ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`}
//                     onClick={toggleListening}
//                   >
//                     <Mic className={isListening ? 'text-white' : 'text-gray-500 dark:text-gray-400'} size={20} />
//                   </button>
                  
//                   <input
//                     type="text"
//                     placeholder={isPrivacyModeActive ? "Whisper mode active..." : "Type a message..."}
//                     className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                   />
                  
//                   <button 
//                     className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700"
//                     onClick={handleSendMessage}
//                   >
//                     <MessageCircle className="text-white" size={20} />
//                   </button>
//                 </div>
                
//                 {isPrivacyModeActive && (
//                   <div className="mt-2 text-center">
//                     <span className="text-xs text-green-600 dark:text-green-400 font-medium">
//                       Privacy mode active - Conversation details won't be stored
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'analytics' && (
//             <div className="p-6">
//               <h2 className="text-xl font-bold mb-6 dark:text-white">Companion Analytics</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//                   <h3 className="text-lg font-semibold mb-4 dark:text-white">Interaction Patterns</h3>
//                   <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
//                     <span className="text-gray-500 dark:text-gray-400">Interaction graph visualization</span>
//                   </div>
//                 </div>
                
//                 <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//                   <h3 className="text-lg font-semibold mb-4 dark:text-white">Emotional Analysis</h3>
//                   <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
//                     <span className="text-gray-500 dark:text-gray-400">Mood tracking visualization</span>
//                   </div>
//                 </div>
                
//                 <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 md:col-span-2">
//                   <h3 className="text-lg font-semibold mb-4 dark:text-white">Relationship Development</h3>
//                   <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
//                     <span className="text-gray-500 dark:text-gray-400">Relationship progression timeline</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {activeTab === 'settings' && (
//             <div className="p-6">
//               <h2 className="text-xl font-bold mb-6 dark:text-white">Settings</h2>
//               <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-semibold mb-2 dark:text-white">Privacy Controls</h3>
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-700 dark:text-gray-300">Whisper Mode</span>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={isPrivacyModeActive}
//                           onChange={togglePrivacyMode}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
//                       </label>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h3 className="text-lg font-semibold mb-2 dark:text-white">Interaction Settings</h3>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-700 dark:text-gray-300">Response Frequency</span>
//                         <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm dark:text-white">
//                           <option>Always Response</option>
//                           <option>Random Intervals</option>
//                           <option>When Addressed</option>
//                         </select>
//                       </div>
                      
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-700 dark:text-gray-300">Voice Settings</span>
//                         <select className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm dark:text-white">
//                           <option>Natural Voice</option>
//                           <option>Synthetic Voice</option>
//                           <option>Text Only</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div>
//                     <h3 className="text-lg font-semibold mb-2 dark:text-white">System Integration</h3>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-700 dark:text-gray-300">Connect Raspberry Pi Device</span>
//                         <button className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-sm dark:text-white">
//                           Configure
//                         </button>
//                       </div>
                      
//                       <div className="flex items-center justify-between">
//                         <span className="text-gray-700 dark:text-gray-300">Arduino Integration</span>
//                         <button className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-sm dark:text-white">
//                           Setup
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }