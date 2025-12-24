import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Settings
} from 'lucide-react'

const Sidebar = () => {
  const { user, hasRole } = useAuth()

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: []
    },
    {
      path: '/employees',
      label: 'Employee List',
      icon: Users,
      roles: []
    },
    {
      path: '/add-employee',
      label: 'Add Employee',
      icon: UserPlus,
      roles: ['Admin', 'HR']
    },
    {
      path: '/manage-users',
      label: 'Manage Users',
      icon: Settings,
      roles: ['Admin']
    }
  ]

  return (
    <aside className="w-48 sm:w-64 bg-gray-800 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto">
      <nav className="p-2 sm:p-4 space-y-1.5 flex-1">
        {navItems.map((item) => {
          if (item.roles.length > 0 && !hasRole(item.roles)) {
            return null
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md transform scale-105'
                    : 'text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white hover:translate-x-1'
                }`
              }
            >
              <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0`} />
              <span className="font-medium text-xs sm:text-sm truncate">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto p-2 sm:p-4 border-t bg-gray-800 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/30 transition-all duration-200">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-primary-400/30 flex-shrink-0 text-xs sm:text-base">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-white truncate">
              {user?.username}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
