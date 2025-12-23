import { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async (username, password) => {
    setLoading(true)
    try {
      // TODO: API call to /api/auth/login
      // const response = await axios.post('/api/auth/login', { username, password })
      // const { user, token } = response.data
      
      // Mock response - replace with actual API call
      const mockUser = {
        username,
        role: username === 'admin' ? 'Admin' : username === 'hr' ? 'HR' : 'Management'
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      // localStorage.setItem('token', token)
      navigate('/dashboard')
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }

  const hasRole = (roles) => {
    if (!user) return false
    if (!roles || roles.length === 0) return true
    return roles.includes(user.role)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
