import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Eye } from 'lucide-react'

const EmployeeList = () => {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEmployees()
  }, [])

  useEffect(() => {
    filterEmployees()
  }, [searchTerm, departmentFilter, statusFilter, employees])

  const loadEmployees = async () => {
    try {
      // TODO: API call to /api/employees
      // Corresponds to get_employees() in frontend/views/employee_list.py
      // const response = await employeeAPI.getAll()
      // setEmployees(response.data)
      
      // Mock data
      const mockEmployees = [
        {
          employee_code: 'EMP001',
          name: 'John Doe',
          team: 'Engineering',
          designation: 'Senior Developer',
          reporting_manager: 'Jane Smith',
          location: 'Bangalore',
          employment_status: 'Active',
          email_id: 'john.doe@company.com'
        },
        {
          employee_code: 'EMP002',
          name: 'Jane Smith',
          team: 'Engineering',
          designation: 'Tech Lead',
          reporting_manager: 'Mike Johnson',
          location: 'Bangalore',
          employment_status: 'Active',
          email_id: 'jane.smith@company.com'
        },
        {
          employee_code: 'EMP003',
          name: 'Bob Wilson',
          team: 'Sales',
          designation: 'Sales Manager',
          reporting_manager: 'Sarah Brown',
          location: 'Hyderabad',
          employment_status: 'Active',
          email_id: 'bob.wilson@company.com'
        },
        {
          employee_code: 'EMP004',
          name: 'Alice Cooper',
          team: 'Marketing',
          designation: 'Marketing Executive',
          reporting_manager: 'Tom Harris',
          location: 'Remote',
          employment_status: 'Exited',
          email_id: 'alice.cooper@company.com'
        }
      ]
      setEmployees(mockEmployees)
    } catch (error) {
      console.error('Error loading employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterEmployees = () => {
    let filtered = [...employees]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employee_code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Department filter
    if (departmentFilter !== 'All') {
      filtered = filtered.filter(emp => emp.team === departmentFilter)
    }

    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(emp => emp.employment_status === statusFilter)
    }

    setFilteredEmployees(filtered)
  }

  const departments = ['All', ...new Set(employees.map(emp => emp.team))]

  const handleViewEmployee = (employeeCode) => {
    navigate(`/employee/${employeeCode}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-primary-400 animate-spin mx-auto" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading employees...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeInUp">
      <div className="scroll-animate">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent tracking-tight">Employee Directory</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 font-medium">Search and manage employee records</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 scroll-animate">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              <Search className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
              Search by Name or ID
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="John Doe..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm font-medium text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm font-medium text-sm"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm font-medium text-sm"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Exited">Exited</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden scroll-animate">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                  Code
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                  Name
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                  Team
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap hide-on-mobile">
                  Designation
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap hide-on-mobile">
                  Manager
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap hide-on-tablet">
                  Location
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap hide-on-tablet">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800/80 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500 mb-3" />
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-semibold">No employees found</p>
                      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.employee_code}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent dark:hover:from-blue-900/10 dark:hover:to-transparent transition-all duration-150"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-bold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {employee.employee_code}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {employee.name}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                        {employee.team}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hide-on-mobile">
                      <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                        {employee.designation}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hide-on-mobile">
                      <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                        {employee.reporting_manager}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hide-on-tablet">
                      <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                        {employee.location}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 sm:px-3 py-1 sm:py-1.5 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${
                        employee.employment_status === 'Active'
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300'
                          : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300'
                      }`}>
                        {employee.employment_status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hide-on-tablet">
                      <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                        {employee.email_id}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <button
                        onClick={() => handleViewEmployee(employee.employee_code)}
                        className="inline-flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
            Showing <span className="text-primary-600 dark:text-primary-400 font-bold">{filteredEmployees.length}</span> employees. Click "View" to see details.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
