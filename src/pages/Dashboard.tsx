// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>
//       Dashboard Page
//     </div>
//   )
// }

// export default Dashboard

import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/entries"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-start gap-2"
        >
          <h2 className="text-xl font-semibold">My Entries</h2>
          <p>View all your active entries</p>
        </Link>

        <Link
          to="/entries/create"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-start gap-2"
        >
          <h2 className="text-xl font-semibold">Create Entry</h2>
          <p>Add a new entry to your notes</p>
        </Link>

        <Link
          to="/entries/deleted"
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-start gap-2"
        >
          <h2 className="text-xl font-semibold">Deleted Entries</h2>
          <p>View and restore deleted entries</p>
        </Link>
      </div>
    </div>
  );
}
