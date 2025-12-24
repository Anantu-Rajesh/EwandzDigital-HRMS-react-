import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../ThemeToggle'
import logo from '../../assets/logo(transparent).png'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 sm:h-20 bg-gradient-to-r from-gray-800 via-gray-800 to-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      {/* Logo section - same width as sidebar */}
      <div className="w-48 sm:w-64 flex items-center justify-center border-r border-gray-200 dark:border-gray-700 h-full px-2 bg-gray-800 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
        <img src={logo} alt="EwandzDigital" className="h-8 sm:h-10 md:h-12 transition-transform duration-300 hover:scale-110 drop-shadow-lg" />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-between px-3 sm:px-6">
        <div className="animate-fadeInUp">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white tracking-wide">
            Welcome back, <span className="text-primary-600 dark:text-primary-400">{user?.username}</span>!
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 hidden sm:block">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <ThemeToggle />
          
          <button
            onClick={logout}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
