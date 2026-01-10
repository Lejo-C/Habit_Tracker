// App.jsx
import './App.css'
import Home from "./Pages/home"

// ✅ Import Router components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>

     <nav className="text-white flex items-center bg-black p-4">
  <h1 className="font-bold mr-auto">Habit Tracker</h1>

  <div className="flex flex-1 justify-center gap-4">
    <a href="/" className="hover:text-blue-400">Home</a>
    <a href="/about" className="hover:text-blue-400">About</a>
  </div>
</nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
