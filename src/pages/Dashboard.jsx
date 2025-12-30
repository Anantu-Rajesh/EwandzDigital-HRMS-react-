import { useState, useEffect, useRef } from 'react'
import { 
  Users, 
  UserCheck, 
  UserX, 
  Building2, 
  TrendingUp,
  Briefcase
} from 'lucide-react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    active: 0,
    exited: 0,
    departments: 0
  })
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  
  // Refs for scroll spy
  const overviewRef = useRef(null)
  const talentRef = useRef(null)
  const operationsRef = useRef(null)
  const hiringRef = useRef(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'overview', ref: overviewRef },
        { id: 'talent', ref: talentRef },
        { id: 'operations', ref: operationsRef },
        { id: 'hiring', ref: hiringRef }
      ]

      // Get current scroll position (middle of viewport)
      const scrollPosition = window.scrollY + 200 // Top of viewport + offset

      // Find which section is currently visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop
          
          if (scrollPosition >= sectionTop) {
            if (activeTab !== section.id) {
              setActiveTab(section.id)
            }
            break
          }
        }
      }
    }

    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeTab])

  const scrollToSection = (sectionId) => {
    console.log('scrollToSection called with:', sectionId)
    const refs = {
      overview: overviewRef,
      talent: talentRef,
      operations: operationsRef,
      hiring: hiringRef
    }
    
    const ref = refs[sectionId]
    console.log('Ref found:', ref, 'Current:', ref?.current)
    
    if (ref?.current) {
      // Update active tab immediately
      setActiveTab(sectionId)
      
      // Then scroll to the section
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      })
      console.log('Scrolling to:', sectionId)
    } else {
      console.log('Ref not found for:', sectionId)
    }
  }

  const loadDashboardData = async () => {
    try {
      // TODO: API ENDPOINT - GET /api/dashboard/stats
      // Corresponds to load_data() in frontend/views/dashboard.py
      // Should return:
      // - df_emp: employees table data
      // - df_skills: skill_matrix table data  
      // - df_assets: assets table data
      // Process data to calculate:
      // - Total employees, active count, exited count, department count
      // - Department distribution, employment status
      // - Skills distribution, experience distribution
      // - Tenure calculations, asset inventory
      // - Hiring trends, location distribution, recent hires
      
      // const response = await dashboardAPI.getStats()
      // setStats(response.data)
      
      // Mock data for now
      setStats({
        totalEmployees: 142,
        active: 128,
        exited: 14,
        departments: 6
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mock data - replace with API data
  const departmentData = [
    { name: 'Engineering', count: 45 },
    { name: 'Sales', count: 32 },
    { name: 'Marketing', count: 18 },
    { name: 'HR', count: 12 },
    { name: 'Finance', count: 15 },
    { name: 'Operations', count: 20 }
  ]

  const employmentStatusData = [
    { name: 'Active', value: 128 },
    { name: 'Exited', value: 14 }
  ]

  const skillsData = [
    { skill: 'React', count: 25 },
    { skill: 'Python', count: 30 },
    { skill: 'Java', count: 22 },
    { skill: 'JavaScript', count: 28 },
    { skill: 'AWS', count: 18 },
    { skill: 'SQL', count: 20 },
    { skill: 'Node.js', count: 15 }
  ]

  const hiringTrendData = [
    { year: 2020, hires: 25 },
    { year: 2021, hires: 35 },
    { year: 2022, hires: 42 },
    { year: 2023, hires: 28 },
    { year: 2024, hires: 12 }
  ]

  const experienceData = [
    { range: '0-2', count: 15 },
    { range: '3-5', count: 32 },
    { range: '6-8', count: 28 },
    { range: '9-11', count: 18 },
    { range: '12+', count: 21 }
  ]

  const tenureData = [
    { range: '0-1y', count: 22 },
    { range: '1-2y', count: 35 },
    { range: '2-3y', count: 28 },
    { range: '3-5y', count: 25 },
    { range: '5+y', count: 18 }
  ]

  const assetInventoryData = [
    { name: 'Assigned', value: 115 },
    { name: 'Returned', value: 27 }
  ]

  const locationData = [
    { location: 'Bangalore', count: 65 },
    { location: 'Hyderabad', count: 38 },
    { location: 'Remote', count: 25 },
    { location: 'Delhi', count: 10 },
    { location: 'Mumbai', count: 4 }
  ]

  const recentHires = [
    { name: 'John Doe', team: 'Engineering', designation: 'Senior Developer', doj: '2024-12-15', location: 'Bangalore' },
    { name: 'Jane Smith', team: 'Marketing', designation: 'Marketing Manager', doj: '2024-12-10', location: 'Remote' },
    { name: 'Mike Johnson', team: 'Sales', designation: 'Sales Executive', doj: '2024-12-05', location: 'Hyderabad' }
  ]

  const COLORS = ['#00CC96', '#EF553B', '#636EFA', '#AB63FA', '#FFA15A']

  const StatCard = ({ icon: Icon, label, value, delta, deltaColor = 'text-green-600' }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:border-primary-400 dark:hover:border-primary-600 hover:-translate-y-2 cursor-pointer group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {delta && (
            <p className={`text-sm mt-1 ${deltaColor}`}>{delta}</p>
          )}
        </div>
        <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 animate-fadeIn">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HR Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-animation">
        <StatCard
          icon={Users}
          label="Total Employees"
          value={stats.totalEmployees}
        />
        <StatCard
          icon={UserCheck}
          label="Active"
          value={stats.active}
          delta="HEADCOUNT"
          deltaColor="text-green-600 dark:text-green-400"
        />
        <StatCard
          icon={UserX}
          label="Exited"
          value={stats.exited}
          delta="-ATTRITION"
          deltaColor="text-red-600 dark:text-red-400"
        />
        <StatCard
          icon={Building2}
          label="Departments"
          value={stats.departments}
        />
      </div>

      {/* Section Navigation - Scrolls with page */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-4 md:space-x-8 px-4 md:px-6 overflow-x-auto scrollbar-hide" aria-label="Sections">
          {['overview', 'talent', 'operations', 'hiring'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                console.log('Clicked:', tab)
                scrollToSection(tab)
              }}
              className={`py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-sm md:text-base transition-all capitalize whitespace-nowrap flex-shrink-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                activeTab === tab
                  ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Section */}
      <div ref={overviewRef} id="overview" className="pt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Headcount by Department
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Employment Status
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={employmentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {employmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Talent Section */}
      <div ref={talentRef} id="talent" className="pt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Talent</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Technical Skills
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="skill" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#AB63FA" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Experience Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={experienceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#AB63FA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Operations Section */}
      <div ref={operationsRef} id="operations" className="pt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Operations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Average Tenure
              </h3>
              <div className="mb-4 p-6 bg-primary-50 dark:bg-primary-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Tenure (Years)</p>
                <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">3.2</p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={tenureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Asset Inventory
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={assetInventoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    <Cell fill="#EF553B" />
                    <Cell fill="#00CC96" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Section */}
      <div ref={hiringRef} id="hiring" className="pt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hiring</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Hiring Trend (Yearly)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hiringTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hires" stroke="#0ea5e9" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Location Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="location" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FFA15A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Hires
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      DOJ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentHires.map((employee, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {employee.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {employee.designation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {employee.doj}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {employee.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
