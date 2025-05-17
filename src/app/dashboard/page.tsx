"use client";

import { logout } from "../login/actions";

function HealthWidget(){
    return (
        <div className="flex flex-col gap-2">
        <h1>Health Widget</h1>
        <p>No Data Yet...</p>
        </div>
    );
}
export default function Dashboard() {


  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">This is the dashboard page.</p>
        </div>
      <h1 className="text-4xl font-bold mb-4">Health Widget</h1>
        <HealthWidget/>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}