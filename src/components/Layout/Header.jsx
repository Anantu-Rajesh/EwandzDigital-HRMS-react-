/**
 * HEADER COMPONENT
 * ================
 * Top navigation bar with logo, user greeting, theme toggle, and logout
 * 
 * Features:
 * - Sticky positioning for always-visible navigation
 * - Gradient background with backdrop blur
 * - Real-time date display
 * - Theme toggle (light/dark mode)
 * - Animated elements with hover effects
 * - Responsive design
 */

import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../ThemeToggle'
import logo from '../../assets/logo(transparent).png'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    /* Main Header Container - Sticky with shadow and backdrop blur */
    <header className="h-16 sm:h-20 bg-gradient-to-r from-gray-800 via-gray-850 to-gray-900 dark:from-gray-900 dark:via-black dark:to-gray-900 border-b border-gray-700 dark:border-gray-800 flex items-center shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      {/* Logo Section - Fixed width matching sidebar */}
      <div className="w-48 sm:w-64 flex items-center justify-center border-r border-gray-700 dark:border-gray-800 h-full px-2 bg-gradient-to-br from-gray-800 via-gray-850 to-gray-800 dark:from-gray-900 dark:via-black dark:to-gray-900 relative overflow-hidden group">
        {/* Animated glow effect behind logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-secondary-600/10 to-primary-600/10 animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Logo Image with hover animation */}
        <img 
          src={logo} 
          alt="EwandzDigital HRMS" 
          className="h-8 sm:h-10 md:h-12 transition-all duration-500 hover:scale-110 hover:rotate-3 drop-shadow-2xl relative z-10 filter brightness-110" 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-between px-3 sm:px-6 relative">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 via-transparent to-secondary-600/5 animate-gradient"></div>
        
        {/* Welcome Message Section */}
        <div className="animate-fadeInUp relative z-10">
          {/* Greeting with gradient text */}
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide flex items-center">
            <span className="mr-2">👋</span>
            Welcome back, 
            <span className="ml-1.5 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              {user?.username}
            </span>
            <span className="ml-1">!</span>
          </h2>
          
          {/* Current Date - Hidden on small screens */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 hidden sm:block font-medium">
            📅 {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
          {/* Theme Toggle Button */}
          <div className="transform hover:scale-110 transition-transform duration-300">
            <ThemeToggle />
          </div>
          
          {/* Logout Button with gradient and animation */}
          <button
            onClick={logout}
            className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105 hover:-rotate-1 relative overflow-hidden group"
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Logout icon with rotation on hover */}
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
            
            {/* Logout text */}
            <span className="hidden sm:inline relative z-10">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
