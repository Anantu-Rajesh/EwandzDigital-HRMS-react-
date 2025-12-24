/**
 * EMPLOYEE LIST PAGE
 * ==================
 * Displays employee directory with two viewing modes:
 * 1. Table View (Tabular) - Traditional table layout
 * 2. Card View (Grid) - Modern card-based grid layout
 * 
 * Features:
 * - Search by name or employee code
 * - Filter by department and employment status
 * - Responsive design for all screen sizes
 * - Smooth animations and transitions
 * - Toggle between view modes
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Eye, Grid, List, Mail, MapPin, User, Briefcase } from 'lucide-react'

const EmployeeList = () => {
  const navigate = useNavigate()
  
  // State Management
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'

  useEffect(() => {
    loadEmployees()
  }, [])

  useEffect(() => {
    filterEmployees()
  }, [searchTerm, departmentFilter, statusFilter, employees])

  /**
   * Load employees from API
   * TODO: Connect to actual API endpoint
   * Corresponds to: frontend/views/employee_list.py -> get_employees()
   */
  const loadEmployees = async () => {
    try {
      // API call placeholder
      // const response = await employeeAPI.getAll()
      // setEmployees(response.data)
      
      // Mock data for demonstration
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

  /**
   * Filter employees based on search term, department, and status
   * Runs whenever filters change
   */
  const filterEmployees = () => {
    let filtered = [...employees]

    // Search filter - matches name or employee code
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

    // Employment status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(emp => emp.employment_status === statusFilter)
    }

    setFilteredEmployees(filtered)
  }

  // Extract unique departments for filter dropdown
  const departments = ['All', ...new Set(employees.map(emp => emp.team))]

  /**
   * Navigate to employee profile page
   */
  const handleViewEmployee = (employeeCode) => {
    navigate(`/employee/${employeeCode}`)
  }

  /**
   * LOADING STATE
   * Displays animated spinner while fetching data
   */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          {/* Dual rotating spinner */}
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-secondary-400 animate-spin mx-auto" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading employees...</p>
        </div>
      </div>
    )
  }

  /**
   * MAIN RENDER
   */
  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeInUp">
      {/* Page Header */}
      <div className="scroll-animate">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-400 dark:via-primary-500 dark:to-secondary-500 bg-clip-text text-transparent tracking-tight">
          Employee Directory
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 font-medium">
          Search and manage employee records • {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
        </p>
      </div>

      {/* Search, Filters, and View Toggle Section */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700 scroll-animate backdrop-blur-sm">
        {/* View Mode Toggle - positioned at top right */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Filter & Search
          </h2>
          
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'table'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Table</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'card'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              title="Card View"
            >
              <Grid className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Cards</span>
            </button>
          </div>
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="md:col-span-1">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              <Search className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
              Search by Name or ID
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="John Doe or EMP001..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm font-medium text-sm transition-all duration-300"
            />
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm font-medium text-sm transition-all duration-300"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Employment Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm font-medium text-sm transition-all duration-300"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Exited">Exited</option>
            </select>
          </div>
        </div>
      </div>

      {/* Conditional Rendering: Table View or Card View */}
      {viewMode === 'table' ? (
        /* ========================================
         * TABLE VIEW (Tabular Layout)
         * Traditional table with sortable columns
         * ======================================== */
        <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden scroll-animate backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-700 dark:via-gray-750 dark:to-gray-700 sticky top-0 z-10">
                <tr>
                  {/* Employee Code Column */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                    Code
                  </th>
                  {/* Name Column */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                    Name
                  </th>
                  {/* Team/Department Column */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                    Team
                  </th>
                  {/* Designation Column - Hidden on mobile */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap hide-on-mobile">
                    Designation
                  </th>
                  {/* Reporting Manager Column - Hidden on mobile */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap hide-on-mobile">
                    Manager
                  </th>
                  {/* Location Column - Hidden on tablet and mobile */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap hide-on-tablet">
                    Location
                  </th>
                  {/* Employment Status Column */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  {/* Email Column - Hidden on tablet and mobile */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap hide-on-tablet">
                    Email
                  </th>
                  {/* Actions Column */}
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="bg-white dark:bg-gray-800/80 divide-y divide-gray-200 dark:divide-gray-700">
                {/* Empty State - No employees found */}
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                      <div className="flex flex-col items-center animate-fadeInScale">
                        <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500 mb-3 animate-pulse" />
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-semibold">No employees found</p>
                        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  /* Employee Rows */
                  filteredEmployees.map((employee, index) => (
                    <tr
                      key={employee.employee_code}
                      className="hover:bg-gradient-to-r hover:from-primary-50 hover:via-blue-50 hover:to-transparent dark:hover:from-primary-900/10 dark:hover:via-blue-900/10 dark:hover:to-transparent transition-all duration-300 cursor-pointer group"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* Employee Code */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-bold bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
                          {employee.employee_code}
                        </div>
                      </td>
                      {/* Name */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {employee.name}
                        </div>
                      </td>
                      {/* Team */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                          {employee.team}
                        </div>
                      </td>
                      {/* Designation */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hide-on-mobile">
                        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                          {employee.designation}
                        </div>
                      </td>
                      {/* Reporting Manager */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hide-on-mobile">
                        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                          {employee.reporting_manager}
                        </div>
                      </td>
                      {/* Location */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hide-on-tablet">
                        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                          {employee.location}
                        </div>
                      </td>
                      {/* Employment Status Badge */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`px-2 sm:px-3 py-1 sm:py-1.5 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm transition-all duration-300 group-hover:scale-105 ${
                          employee.employment_status === 'Active'
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300'
                            : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300'
                        }`}>
                          {employee.employment_status}
                        </span>
                      </td>
                      {/* Email */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hide-on-tablet">
                        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
                          {employee.email_id}
                        </div>
                      </td>
                      {/* Action Button */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        <button
                          onClick={() => handleViewEmployee(employee.employee_code)}
                          className="inline-flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white rounded-lg font-semibold shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
          
          {/* Table Footer with Count */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-700 dark:via-gray-750 dark:to-gray-700 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
              Showing <span className="text-primary-600 dark:text-primary-400 font-bold">{filteredEmployees.length}</span> of <span className="font-bold">{employees.length}</span> employees
            </p>
          </div>
        </div>
      ) : (
        /* ========================================
         * CARD VIEW (Grid Layout)
         * Modern card-based responsive grid
         * ======================================== */
        <div className="scroll-animate">
          {filteredEmployees.length === 0 ? (
            /* Empty State for Card View */
            <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center animate-fadeInScale">
              <Search className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4 mx-auto animate-pulse" />
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 font-semibold">No employees found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search filters</p>
            </div>
          ) : (
            <>
              {/* Employee Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredEmployees.map((employee, index) => (
                  /* Individual Employee Card */
                  <div
                    key={employee.employee_code}
                    className="stagger-item bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-400 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group backdrop-blur-sm"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleViewEmployee(employee.employee_code)}
                  >
                    {/* Card Header with Gradient */}
                    <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-500 dark:via-primary-600 dark:to-secondary-500 p-4 sm:p-5 relative overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>
                      
                      <div className="relative z-10">
                        {/* Employee Code Badge */}
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                          <span className="text-xs font-bold text-white">{employee.employee_code}</span>
                        </div>
                        
                        {/* Employee Name */}
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                          {employee.name}
                        </h3>
                        
                        {/* Designation */}
                        <p className="text-sm text-white/90 font-medium flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {employee.designation}
                        </p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 space-y-3">
                      {/* Team/Department */}
                      <div className="flex items-center text-gray-700 dark:text-gray-200">
                        <User className="w-4 h-4 mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Team</p>
                          <p className="text-sm font-semibold">{employee.team}</p>
                        </div>
                      </div>

                      {/* Reporting Manager */}
                      <div className="flex items-center text-gray-700 dark:text-gray-200">
                        <User className="w-4 h-4 mr-3 text-secondary-600 dark:text-secondary-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Reports To</p>
                          <p className="text-sm font-semibold">{employee.reporting_manager}</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center text-gray-700 dark:text-gray-200">
                        <MapPin className="w-4 h-4 mr-3 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Location</p>
                          <p className="text-sm font-semibold">{employee.location}</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center text-gray-700 dark:text-gray-200">
                        <Mail className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Email</p>
                          <p className="text-sm font-semibold truncate">{employee.email_id}</p>
                        </div>
                      </div>

                      {/* Status Badge and View Button */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        {/* Employment Status */}
                        <span className={`px-3 py-1.5 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm transition-all duration-300 group-hover:scale-105 ${
                          employee.employment_status === 'Active'
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-300'
                            : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300'
                        }`}>
                          {employee.employment_status}
                        </span>

                        {/* View Details Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewEmployee(employee.employee_code)
                          }}
                          className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white rounded-lg font-semibold shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card View Footer with Count */}
              <div className="mt-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-700 dark:via-gray-750 dark:to-gray-700 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold text-center">
                  Showing <span className="text-primary-600 dark:text-primary-400 font-bold">{filteredEmployees.length}</span> of <span className="font-bold">{employees.length}</span> employees
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default EmployeeList
