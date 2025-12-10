// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Landing from "./pages/Landing";
// import Login from "./components/Auth/Login";
// import { Register } from "./components/Auth/Register";
// import { SidebarProvider } from "./components/ui/sidebar";
// import {Dashboard} from "./pages/Dashboard";
// import DashboardLayout from "./components/Layout/DashboardLayout";
// import { Toaster } from "sonner";

// // Entries pages
// import { EntriesList } from "./pages/EntriesList";
// import { DeletedEntries } from "./pages/DeletedEntries";
// import { CreateEntry } from "./pages/CreateEntry";
// import { UpdateEntry } from "./pages/UpdateEntry";

// // Private route wrapper
// const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const isLoggedIn = true; // Replace with real auth check (cookie/token or context)
//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <Toaster position="top-right" richColors closeButton />
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Dashboard with sidebar (protected) */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <SidebarProvider>
//                 <DashboardLayout>
//                   <Dashboard />
//                 </DashboardLayout>
//               </SidebarProvider>
//             </PrivateRoute>
//           }
//         />

//         {/* Entries routes (protected) */}
//         <Route
//           path="/entries"
//           element={
//             <PrivateRoute>
//               <EntriesList />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/entries/deleted"
//           element={
//             <PrivateRoute>
//               <DeletedEntries />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/entries/create"
//           element={
//             <PrivateRoute>
//               <CreateEntry />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/entries/:id/edit"
//           element={
//             <PrivateRoute>
//               <UpdateEntry />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { SidebarProvider } from "./components/ui/sidebar";
import {Dashboard} from "./pages/Dashboard";
import DashboardLayout from "./components/Layout/DashboardLayout";
import { Toaster } from "sonner";

// New entries pages
import { EntriesList } from "./pages/EntriesList";
import { DeletedEntries } from "./pages/DeletedEntries";
import { CreateEntry } from "./pages/CreateEntry";
import { UpdateEntry } from "./pages/UpdateEntry";
import { ViewEntry } from "./pages/ViewEntry";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard with sidebar */}
        <Route
          path="/dashboard"
          element={
            <SidebarProvider>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </SidebarProvider>
          }
        />

        {/* Entries routes */}
        <Route path="/entries" element={<EntriesList />} />
        <Route path="/entries/deleted" element={<DeletedEntries />} />
        <Route path="/entries/create" element={<CreateEntry />} />
        <Route path="/entries/:id/edit" element={<UpdateEntry />} />
        {/* ✅ Moved inside Routes */}
        <Route path="/entries/:id" element={<ViewEntry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;