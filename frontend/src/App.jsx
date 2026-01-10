// App.jsx
import './App.css'
import Home from "./Pages/home"

// ✅ Import Router components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>

      <nav className='text-white flex'>
        <h1 className='font-bold'>
          Habit Tracker
        </h1>

        <div>
          <a href="">Home</a>
          <a href="">About</a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
