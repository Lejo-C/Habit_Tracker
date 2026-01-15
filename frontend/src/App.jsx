// App.jsx
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Nav from "./Pages/Nav"
import Dashboard from "./Pages/Dashboard"
import Habits from "./Pages/Habits"
import Analysis from "./Pages/Analysis"
import Friends from "./Pages/Friends"
import Profile from "./Pages/Profile"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import VerifyOtp from "./Pages/VerifyOtp"

const ProtectedLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center text-[#00FF66]">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-[#0D0D0D] text-white font-['Outfit']">
      <Nav />
      <div className="ml-64 w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App


