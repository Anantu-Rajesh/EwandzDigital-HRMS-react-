import { LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../ThemeToggle'
import logo from '../../assets/logo(transparent).png'

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 md:h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center sticky top-0 z-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Logo section - hidden on mobile, same width as sidebar on desktop */}
      <div className="hidden md:flex w-64 items-center justify-center border-r border-gray-200 dark:border-gray-700 h-full">
        <img src={logo} alt="EwandzDigital" className="h-12" />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-between px-4 md:px-6">
        <div className="hidden sm:block">
          <h2 className="text-sm md:text-lg font-semibold text-gray-800 dark:text-white">
            Welcome, {user?.username}!
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Mobile logo */}
        <div className="md:hidden flex-1 flex justify-center">
          <img src={logo} alt="EwandzDigital" className="h-8" />
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm md:text-base"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
