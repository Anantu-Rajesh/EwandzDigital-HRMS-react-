import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo(transparent).png'

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="h-16 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-gray-700 flex items-center px-6 shadow-lg">
        <img src={logo} alt="EwandzDigital" className="h-10 transition-transform duration-300 hover:scale-110" />
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full animate-fadeInUp">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-center">
                Sign in to continue to HRMS
              </p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium animate-fadeInUp">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Demo credentials</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">admin/admin • hr/hr • management/management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
