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
    <aside className="w-64 bg-gray-800 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <nav className="p-4 space-y-2 flex-1">
        {navItems.map((item) => {
          if (item.roles.length > 0 && !hasRole(item.roles)) {
            return null
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-900 dark:bg-primary-900 text-gray-300 dark:text-gray-300'
                    : 'text-gray-300 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white font-bold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.username}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
