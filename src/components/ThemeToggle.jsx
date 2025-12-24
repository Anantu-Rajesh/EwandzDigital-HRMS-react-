import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg group"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-200 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  )
}

export default ThemeToggle
