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

  const StatCard = ({ icon: Icon, label, value, delta, deltaColor = 'text-green-600', iconBgGradient = 'from-blue-500 to-blue-600' }) => (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 card-hover overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1 sm:mb-2 font-semibold uppercase tracking-wide truncate">{label}</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent tracking-tight">{value}</p>
          {delta && (
            <p className={`text-xs sm:text-sm mt-1 sm:mt-2 font-bold ${deltaColor} dark:brightness-110 flex items-center`}>
              {delta.includes('-') ? '↓' : '↑'} {delta}
            </p>
          )}
        </div>
        <div className={`p-3 sm:p-4 bg-gradient-to-br ${iconBgGradient} rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-primary-400 animate-spin mx-auto" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeInUp">
      <div className="scroll-animate">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent tracking-tight">HR Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 font-medium">Overview of your workforce analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="stagger-item">
          <StatCard
            icon={Users}
            label="Total Employees"
            value={stats.totalEmployees}
            iconBgGradient="from-blue-500 to-blue-600"
          />
        </div>
        <div className="stagger-item">
          <StatCard
            icon={UserCheck}
            label="Active"
            value={stats.active}
            delta="+HEADCOUNT"
            deltaColor="text-green-600 dark:text-green-400"
            iconBgGradient="from-green-500 to-green-600"
          />
        </div>
        <div className="stagger-item">
          <StatCard
            icon={UserX}
            label="Exited"
            value={stats.exited}
            delta="-ATTRITION"
            deltaColor="text-red-600 dark:text-red-400"
            iconBgGradient="from-red-500 to-red-600"
          />
        </div>
        <div className="stagger-item">
          <StatCard
            icon={Building2}
            label="Departments"
            value={stats.departments}
            iconBgGradient="from-purple-500 to-purple-600"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden scroll-animate">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 overflow-x-auto">
          <nav className="flex space-x-4 sm:space-x-8 px-3 sm:px-6 min-w-max" aria-label="Tabs">
            {['Overview', 'Talent', 'Operations', 'Hiring'].map((tab, index) => (
              <button
                key={tab}
                className="relative py-3 sm:py-4 px-2 border-b-3 border-primary-600 dark:border-primary-500 font-semibold text-xs sm:text-sm text-primary-700 dark:text-primary-300 transition-all duration-200 hover:text-primary-800 dark:hover:text-primary-200 group whitespace-nowrap"
              >
                {tab}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 dark:from-primary-400 dark:via-primary-500 dark:to-primary-400 rounded-t-full shadow-lg group-hover:h-1.5 transition-all duration-200"></span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">{/* Overview Tab */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-950/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-animate">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2 sm:mr-3 shadow-md flex-shrink-0"></div>
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">Headcount by Department</span>
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#475569" style={{ fontSize: '10px', fontWeight: '600', fill: '#475569' }} tick={{ fill: '#64748b' }} angle={-45} textAnchor="end" height={60} />
                  <YAxis stroke="#475569" style={{ fontSize: '10px', fontWeight: '600' }} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '12px'
                    }}
                    cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
                  />
                  <Bar dataKey="count" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1} />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-green-950/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 scroll-animate">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-2 mb-2 sm:mr-3 shadow-md flex-shrink-0"></div>
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">Employment Status</span>
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart margin={{ top: 7 }}>
                  <Pie
                    data={employmentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {employmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                      color: '#fff',
                      fontWeight: '600'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '20px',
                      fontWeight: '600',
                      color: '#64748b'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Talent Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-950/20 rounded-2xl p-6 border border-purple-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3 shadow-md"></div>
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">Top Technical Skills</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                  <XAxis type="number" stroke="#475569" style={{ fontSize: '12px', fontWeight: '600' }} tick={{ fill: '#64748b' }} />
                  <YAxis dataKey="skill" type="category" stroke="#475569" style={{ fontSize: '12px', fontWeight: '600' }} tick={{ fill: '#64748b' }} width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                      color: '#fff',
                      fontWeight: '600'
                    }}
                    cursor={{ fill: 'rgba(171, 99, 250, 0.1)' }}
                  />
                  <Bar dataKey="count" fill="url(#colorPurple)" radius={[0, 8, 8, 0]} />
                  <defs>
                    <linearGradient id="colorPurple" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#9333ea" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-br from-white to-cyan-50/30 dark:from-gray-800 dark:to-cyan-950/20 rounded-2xl p-6 border border-cyan-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full mr-3 shadow-md"></div>
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">Hiring Trend (Yearly)</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hiringTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                  <XAxis dataKey="year" stroke="#475569" style={{ fontSize: '12px', fontWeight: '600' }} tick={{ fill: '#64748b' }} />
                  <YAxis stroke="#475569" style={{ fontSize: '12px', fontWeight: '600' }} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                      color: '#fff',
                      fontWeight: '600'
                    }}
                  />
                  <Legend wrapperStyle={{ fontWeight: '600', color: '#64748b' }} />
                  <Line type="monotone" dataKey="hires" stroke="url(#colorLine)" strokeWidth={3} dot={{ fill: '#0ea5e9', r: 5, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
                  <defs>
                    <linearGradient id="colorLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Location Distribution */}
          <div className="mb-8 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-800 dark:to-orange-950/20 rounded-2xl p-6 border border-orange-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <div className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3 shadow-md"></div>
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">Location Distribution</span>
            </h3>
            <ResponsiveContainer width="80%" height={250}>
              <BarChart data={locationData} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis type="number" stroke="#475569" style={{ fontSize: '12px', fontWeight: '600' }} tick={{ fill: '#64748b' }} />
                <YAxis dataKey="location" type="category" width={100} stroke="#475569" style={{ fontSize: '12px', fontWeight: '600' }} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    color: '#fff',
                    fontWeight: '600'
                  }}
                  cursor={{ fill: 'rgba(255, 161, 90, 0.1)' }}
                />
                <Bar dataKey="count" fill="url(#colorOrange)" radius={[0, 8, 8, 0]} />
                <defs>
                  <linearGradient id="colorOrange" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Hires */}
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">Recent Hires</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      DOJ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentHires.map((employee, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent dark:hover:from-blue-900/10 dark:hover:to-transparent transition-all duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-200">
                        {employee.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {employee.designation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {employee.doj}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
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
