// App.jsx
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Pages/Nav"
import Dashboard from "./Pages/Dashboard"
import Habits from "./Pages/Habits"
import Analysis from "./Pages/Analysis"
import Friends from "./Pages/Friends"
import Profile from "./Pages/Profile"
// import Home from "./Pages/home" // Keeping if needed, but likely replacing with Dashboard as default

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#0D0D0D] text-white font-['Outfit']">
        <Nav />
        <div className="ml-64 w-full p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

