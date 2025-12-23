import { useState, useEffect } from 'react'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // TODO: API call to /api/dashboard/stats
      // Corresponds to load_data() in frontend/views/dashboard.py
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {delta && (
            <p className={`text-sm mt-1 ${deltaColor}`}>{delta}</p>
          )}
        </div>
        <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
          <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HR Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['Overview', 'Talent', 'Operations', 'Hiring'].map((tab) => (
              <button
                key={tab}
                className="py-4 px-1 border-b-2 border-primary-600 font-medium text-sm text-primary-600 dark:text-primary-400"
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

          {/* Talent Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
          </div>

          {/* Location Distribution */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Location Distribution
            </h3>
            <ResponsiveContainer width="80%" height={250}>
              <BarChart data={locationData} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="location" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#FFA15A" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Hires */}
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
