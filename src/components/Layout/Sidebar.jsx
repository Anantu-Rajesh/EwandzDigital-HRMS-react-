/**
 * SIDEBAR NAVIGATION COMPONENT
 * ===========================
 * Left-side navigation menu with role-based access control
 * 
 * Features:
 * - Dynamic navigation items based on user role
 * - Active state highlighting with gradient
 * - Smooth hover animations and transitions
 * - Responsive design (collapsible on mobile)
 * - User profile display at bottom
 * 
 * Roles:
 * - All users: Dashboard, Employee List
 * - HR/Admin: Add Employee
 * - Admin only: Manage Users
 */

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

  /**
   * Navigation menu items with role-based visibility
   * Each item specifies: path, label, icon, and required roles
   */
  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: [], // Available to all users
      description: 'Overview and statistics'
    },
    {
      path: '/employees',
      label: 'Employee List',
      icon: Users,
      roles: [], // Available to all users
      description: 'View all employees'
    },
    {
      path: '/add-employee',
      label: 'Add Employee',
      icon: UserPlus,
      roles: ['Admin', 'HR'], // HR and Admin only
      description: 'Register new employee'
    },
    {
      path: '/manage-users',
      label: 'Manage Users',
      icon: Settings,
      roles: ['Admin'], // Admin only
      description: 'User administration'
    }
  ]

  return (
    /* Main Sidebar Container */
    <aside className="w-48 sm:w-64 bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900 dark:from-gray-900 dark:via-gray-900 dark:to-black border-r border-gray-700 dark:border-gray-800 flex flex-col overflow-y-auto shadow-2xl">
      {/* Navigation Menu */}
      <nav className="p-2 sm:p-4 space-y-2 flex-1">
        {navItems.map((item, index) => {
          // Hide items if user doesn't have required role
          if (item.roles.length > 0 && !hasRole(item.roles)) {
            return null
          }

          return (
            /* Navigation Link with staggered animation */
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 group relative overflow-hidden stagger-item ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white shadow-lg shadow-primary-500/30 transform scale-105 ring-2 ring-primary-400/50'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-750 dark:hover:from-gray-800 dark:hover:to-gray-850 hover:text-white hover:translate-x-1 hover:shadow-md'
                }`
              }
              style={{ animationDelay: `${index * 0.1}s` }}
              title={item.description}
            >
              {/* Animated background shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Icon with rotation on hover */}
              <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 flex-shrink-0 relative z-10`} />
              
              {/* Label */}
              <span className="font-semibold text-xs sm:text-sm truncate relative z-10">{item.label}</span>
              
              {/* Active indicator dot */}
              <span className={`absolute right-2 w-2 h-2 rounded-full bg-white transition-opacity duration-300 ${
                window.location.pathname === item.path ? 'opacity-100' : 'opacity-0'
              }`}></span>
            </NavLink>
          )
        })}
      </nav>

      {/* User Profile Section (Footer) */}
      <div className="mt-auto p-3 sm:p-4 border-t border-gray-700 dark:border-gray-800 bg-gradient-to-r from-gray-800 via-gray-850 to-gray-800 dark:from-gray-900 dark:via-black dark:to-gray-900">
        <div className="flex items-center space-x-3 px-2 sm:px-3 py-2 sm:py-3 rounded-xl hover:bg-gray-700/50 dark:hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group">
          {/* User Avatar with animated gradient ring */}
          <div className="relative flex-shrink-0">
            {/* Animated gradient ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 animate-gradient opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Avatar circle with user initial */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 dark:from-primary-500 dark:to-secondary-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-primary-400/30 group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex-1 min-w-0">
            {/* Username */}
            <p className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-primary-300 transition-colors duration-300">
              {user?.username}
            </p>
            
            {/* User Role Badge */}
            <p className="text-xs font-medium px-2 py-0.5 bg-primary-500/20 text-primary-300 rounded-full inline-block mt-0.5 group-hover:bg-primary-500/30 transition-colors duration-300">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
