import React from 'react'
import { FaSun, FaMoon } from "react-icons/fa";
const Navbar = ({darkMode, toggleDarkMode}) => {
  return (
<nav className='flex justify-between items-center bg-slate-700 text-white py-2'>
    <div className="logo">
        <span className='font-bold text-xl mx-8'>ToDo List</span>
       
    </div>
    <ul className='flex gap-8 mx-9 items-center'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        <li>
            <div
    onClick={toggleDarkMode}
    className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-300'
    }`}
  >
    <span className="absolute left-1 top-1">
      <FaSun className="text-yellow-500 text-xl" />
    </span>

    <span className="absolute right-1 top-1">
      <FaMoon className="text-blue-500 text-xl" />
    </span>
     <div
      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
        darkMode ? 'translate-x-8' : 'translate-x-0'
      }`}
    ></div>
  </div>
        </li>

    </ul>
    

</nav>

  )
}

export default Navbar