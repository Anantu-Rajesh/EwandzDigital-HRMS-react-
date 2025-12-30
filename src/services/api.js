import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// API methods - All commented for now, replace with actual implementation

export const authAPI = {
  // TODO: Implement actual API calls to backend/auth.py endpoints
  login: async (username, password) => {
    // return await api.post('/auth/login', { username, password })
    throw new Error('API not implemented')
  },
  
  verifyUser: async (username, password) => {
    // Corresponds to verify_user() in backend/auth.py
    // return await api.post('/auth/verify', { username, password })
    throw new Error('API not implemented')
  }
}

export const employeeAPI = {
  // TODO: Implement employee CRUD operations
  getAll: async (filters = {}) => {
    // return await api.get('/employees', { params: filters })
    throw new Error('API not implemented')
  },
  
  getById: async (employeeCode) => {
    // return await api.get(`/employees/${employeeCode}`)
    throw new Error('API not implemented')
  },
  
  create: async (employeeData) => {
    // Corresponds to add_employee_record() in frontend/views/add_employee.py
    // return await api.post('/employees', employeeData)
    throw new Error('API not implemented')
  },
  
  update: async (employeeCode, updates) => {
    // Corresponds to update_employee_details() in frontend/views/edit_employee.py
    // return await api.put(`/employees/${employeeCode}`, updates)
    throw new Error('API not implemented')
  },
  
  delete: async (employeeCode) => {
    // return await api.delete(`/employees/${employeeCode}`)
    throw new Error('API not implemented')
  },
  
  bulkUpload: async (file) => {
    // Corresponds to bulk upload functionality in add_employee.py
    // const formData = new FormData()
    // formData.append('file', file)
    // return await api.post('/employees/bulk', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // })
    throw new Error('API not implemented')
  }
}

export const dashboardAPI = {
  // TODO: Implement dashboard data fetching
  getStats: async () => {
    // Corresponds to load_data() in frontend/views/dashboard.py
    // Should return: { employees, skills, assets, stats }
    // return await api.get('/dashboard/stats')
    throw new Error('API not implemented')
  }
}

export const userAPI = {
  // TODO: Implement user management (Admin only)
  getAll: async () => {
    // Corresponds to get_all_users() in backend/auth.py
    // return await api.get('/users')
    throw new Error('API not implemented')
  },
  
  create: async (username, password, role) => {
    // Corresponds to create_user() in backend/auth.py
    // return await api.post('/users', { username, password, role })
    throw new Error('API not implemented')
  },
  
  delete: async (username) => {
    // Corresponds to delete_user() in backend/auth.py
    // return await api.delete(`/users/${username}`)
    throw new Error('API not implemented')
  },
  
  updatePassword: async (username, newPassword) => {
    // Corresponds to update_password() in backend/auth.py
    // return await api.put(`/users/${username}/password`, { newPassword })
    throw new Error('API not implemented')
  }
}

export default api
