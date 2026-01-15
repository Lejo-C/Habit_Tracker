import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-3 rounded-xl transition-all duration-300 font-medium ${isActive
          ? 'bg-[#00FF66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]'
          : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#050505] border-r border-[#1a1a1a] flex flex-col p-6 z-50">
      {/* Logo */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold tracking-tighter">
          <span className="text-white">Habit</span>
          <span className="text-[#00FF66] ml-1">Tracker</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 flex-grow">
        <NavItem to="/dashboard">Dashboard</NavItem>
        <NavItem to="/habits">Habits</NavItem>
        <NavItem to="/analysis">Analysis</NavItem>
        <NavItem to="/friends">Friends</NavItem>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto flex flex-col gap-2 border-t border-[#1a1a1a] pt-6">
        <NavItem to="/profile">Profile</NavItem>
        <button
          onClick={logout}
          className="px-4 py-3 rounded-xl transition-all duration-300 font-medium text-red-400 hover:text-red-300 hover:bg-[#1a1a1a] text-left"
        >
          Logout
        </button>
      </div>

      {/* Mini User Profile Strip */}
      {user && (
        <div className="mt-6 flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF66] to-[#1DB954] shadow-[0_0_10px_rgba(0,255,102,0.3)] flex items-center justify-center text-xs font-bold text-black border border-white">
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="text-sm">
            <p className="text-white font-medium truncate w-32">{user.username}</p>
            <p className="text-xs text-gray-500">Lvl. {user.level || 1} Challenger</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
