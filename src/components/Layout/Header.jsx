import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../ThemeToggle'
import logo from '../../assets/logo(transparent).png'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="h-20 bg-gray-800 dark:bg-gray-800 border-b border-gray-700 dark:border-gray-700 flex items-center">
      {/* Logo section - same width as sidebar */}
      <div className="w-64 flex items-center justify-center border-r border-gray-700 dark:border-gray-700 h-full">
        <img src={logo} alt="EwandzDigital" className="h-12" />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-between px-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Welcome back, {user?.username}!
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

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
