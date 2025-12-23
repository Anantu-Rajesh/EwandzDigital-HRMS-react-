import { useState, useEffect } from 'react'
import { UserPlus, Trash2, Key, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ManageUsers = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [loading, setLoading] = useState(true)
  
  // Form state
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'HR'
  })
  
  // Password change state
  const [passwordChange, setPasswordChange] = useState({
    username: '',
    newPassword: ''
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      // TODO: API call to /api/users (GET)
      // Corresponds to get_all_users() in backend/auth.py
      // const response = await userAPI.getAll()
      // setUsers(response.data)
      
      // Mock data
      const mockUsers = [
        { username: 'admin', role: 'Admin' },
        { username: 'hr_manager', role: 'HR' },
        { username: 'john_mgr', role: 'Management' }
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    
    if (!newUser.username || !newUser.password) {
      alert('Please fill in all fields')
      return
    }

    try {
      // TODO: API call to /api/users (POST)
      // Corresponds to create_user() in backend/auth.py
      // await userAPI.create(newUser.username, newUser.password, newUser.role)
      
      console.log('Creating user:', newUser)
      
      // Mock success
      alert(`User '${newUser.username}' created successfully!`)
      setNewUser({ username: '', password: '', role: 'HR' })
      setShowCreateForm(false)
      loadUsers()
    } catch (error) {
      console.error('Error creating user:', error)
      alert('Failed to create user. Username might already exist.')
    }
  }

  const handleDeleteUser = async (username) => {
    if (!confirm(`Are you sure you want to delete user '${username}'?`)) {
      return
    }

    try {
      // TODO: API call to /api/users/:username (DELETE)
      // Corresponds to delete_user() in backend/auth.py
      // await userAPI.delete(username)
      
      console.log('Deleting user:', username)
      
      // Mock success
      alert(`User '${username}' deleted successfully!`)
      loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    }
  }

  const handleUpdatePassword = async (username) => {
    const newPassword = prompt(`Enter new password for ${username}:`)
    
    if (!newPassword) {
      return
    }

    try {
      // TODO: API call to /api/users/:username/password (PUT)
      // Corresponds to update_password() in backend/auth.py
      // await userAPI.updatePassword(username, newPassword)
      
      console.log('Updating password for:', username)
      
      // Mock success
      alert('Password updated successfully!')
    } catch (error) {
      console.error('Error updating password:', error)
      alert('Failed to update password')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage system access accounts
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          <span>Create New User</span>
        </button>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Create New User Account
          </h3>
          <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="johndoe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="HR">HR</option>
                <option value="Management">Management</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="md:col-span-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Existing Accounts
          </h3>

          {users.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No users found.
            </p>
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="font-semibold text-gray-700 dark:text-gray-300">Username</div>
                <div className="font-semibold text-gray-700 dark:text-gray-300">Role</div>
                <div className="font-semibold text-gray-700 dark:text-gray-300">Actions</div>
                <div className="font-semibold text-gray-700 dark:text-gray-300">Password</div>
              </div>

              {/* User Rows */}
              {users.map((userItem) => (
                <div
                  key={userItem.username}
                  className="grid grid-cols-4 gap-4 py-4 border-b border-gray-200 dark:border-gray-700 items-center"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white font-bold">
                      {userItem.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {userItem.username}
                    </span>
                  </div>

                  <div>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                      {userItem.role}
                    </span>
                  </div>

                  <div>
                    {userItem.username !== user?.username ? (
                      <button
                        onClick={() => handleDeleteUser(userItem.username)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                        (Current User)
                      </span>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => handleUpdatePassword(userItem.username)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Key className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              User Role Permissions
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Admin:</strong> Full access to all features including user management</li>
                <li><strong>HR:</strong> Can view, add, and edit employee records</li>
                <li><strong>Management:</strong> Can view dashboards and employee lists (read-only)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
