import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // TODO: API call to /api/auth/login via authAPI.login()
    // Corresponds to verify_user() in backend/auth.py
    const result = await login(username, password)
    
    if (!result.success) {
      setError(result.error || 'Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-500 to-primary-700 dark:from-gray-900 dark:to-gray-800">
      <header className="h-16 bg-white/10 dark:bg-black/20 backdrop-blur-sm border-b border-white/20 dark:border-gray-700 flex items-center px-6 animate-slideInLeft">
        <img src="/logo-transparent.png" alt="EwandzDigital" className="h-10" />
      </header>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full animate-scaleIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Sign in to continue to HRMS
              </p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>Demo credentials: admin/admin, hr/hr, management/management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
