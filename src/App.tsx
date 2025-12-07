import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { SidebarProvider } from "./components/ui/sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AppSidebar } from "./components/Sidebar/AppSidebar";
import DashboardLayout from "./components/Layout/DashboardLayout";
// import Landing from "./pages/Landing";
// import Login from "../pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Notes from "./pages/Notes";
// import NewEntry from "./pages/NewEntry";
// import Trash from "./pages/Trash";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
