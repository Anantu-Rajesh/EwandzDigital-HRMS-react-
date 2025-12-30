import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit2, Download, Eye } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import EditEmployeeForm from '../components/EditEmployeeForm'

const EmployeeProfile = () => {
  const { employeeCode } = useParams()
  const navigate = useNavigate()
  const { hasRole } = useAuth()
  const [employee, setEmployee] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [loading, setLoading] = useState(true)
  const [showCVModal, setShowCVModal] = useState(false)

  useEffect(() => {
    loadEmployeeDetails()
  }, [employeeCode])

  const loadEmployeeDetails = async () => {
    try {
      // TODO: API ENDPOINT - GET /api/employees/:code/full
      // Corresponds to get_full_employee_details() in frontend/views/profile_view.py
      // Should return data from ALL 5 tables:
      // - employees: personal & work info
      // - skill_matrix: skills & experience
      // - assets: asset management & clearance
      // - hr_activity: training & follow-ups
      // - performance: feedback & notes
      // const response = await employeeAPI.getById(employeeCode)
      // setEmployee(response.data)
      
      // Mock data
      const mockEmployee = {
        employees: {
          employee_code: employeeCode,
          name: 'John Doe',
          email_id: 'john.doe@company.com',
          contact_number: '+91-9876543210',
          emergency_contact: '+91-9876543211',
          dob: '1990-01-15',
          location: 'Bangalore',
          mediclaim_included: 'Yes',
          pf_included: 'Yes',
          cv_path: 'uploaded_cvs/EMP001_John_Doe.pdf',
          photo_path: 'profile_photos/EMP001_John_Doe.jpg',
          doj: '2020-06-15',
          team: 'Engineering',
          designation: 'Senior Developer',
          reporting_manager: 'Jane Smith',
          employment_type: 'Full-time',
          employment_status: 'Active'
        },
        skill_matrix: {
          primary_skillset: 'React, Node.js, Python',
          secondary_skillset: 'AWS, Docker, Kubernetes',
          experience_years: 8,
          last_contact_date: '2024-12-01'
        },
        assets: {
          asset_id: 'LAPTOP-001',
          issued_to: 'John Doe',
          issue_date: '2020-06-15',
          return_date: null,
          laptop_returned: false,
          laptop_bag_returned: false,
          advance_salary_adjustment: 'N/A',
          leave_adjustment: 'No',
          remove_from_medical: false,
          remove_from_pf: false,
          email_access_removed: false,
          removed_from_groups: false,
          relieving_letter_shared: false
        },
        hr_activity: {
          training_assigned: 'AWS Certification',
          status: 'Active',
          last_follow_up: '2024-11-15'
        },
        performance: {
          monthly_check_in_notes: 'Great performance this month. Delivered project ahead of schedule.',
          manager_feedback: 'Excellent technical skills and team collaboration.',
          improvement_areas: 'Could improve documentation practices.',
          recognition_rewards: 'Employee of the Month - November 2024'
        }
      }
      setEmployee(mockEmployee)
    } catch (error) {
      console.error('Error loading employee details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 animate-fadeIn">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">Loading employee details...</p>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="text-center py-12 animate-fadeIn">
        <p className="text-gray-600 dark:text-gray-400">Employee not found</p>
      </div>
    )
  }

  const { employees: emp, skill_matrix: skills, assets, hr_activity: hr, performance: perf } = employee

  const handleSaveChanges = async (data) => {
    // TODO: API ENDPOINT - PUT /api/employees/:code
    // Update all tables with new data
    console.log('Saving changes:', data)
    alert('Changes saved successfully!')
    setEditMode(false)
    loadEmployeeDetails() // Reload data
  }

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'assets', label: 'Assets' },
    { id: 'performance', label: 'Performance' }
  ]

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/employees')}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Employee List</span>
      </button>

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Profile Photo */}
            <div className="w-20 h-20 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {emp.photo_path ? (
                <img 
                  src={`/api/files/${emp.photo_path}`} 
                  alt={emp.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.textContent = emp.name?.charAt(0)
                  }}
                />
              ) : (
                emp.name?.charAt(0)
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {emp.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {emp.designation} | {emp.team}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Code: {emp.employee_code} | Status: <span className={emp.employment_status === 'Active' ? 'text-green-600' : 'text-red-600'}>{emp.employment_status}</span>
              </p>
            </div>
          </div>
          {hasRole(['Admin', 'HR']) && !editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Edit Mode */}
      {editMode ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Edit Employee Profile
          </h2>
          <EditEmployeeForm
            employee={employee}
            onSave={handleSaveChanges}
            onCancel={() => setEditMode(false)}
          />
        </div>
      ) : (
        /* View Mode - Tabs */
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoField label="Email" value={emp.email_id} />
                <InfoField label="Phone" value={emp.contact_number} />
                <InfoField label="Emergency Contact" value={emp.emergency_contact} />
                <InfoField label="Date of Birth" value={emp.dob} />
              </div>
              <div className="space-y-4">
                <InfoField label="Location" value={emp.location} />
                <InfoField label="Mediclaim" value={emp.mediclaim_included} />
                <InfoField label="PF Included" value={emp.pf_included} />
                {emp.cv_path && (
                  <div className="flex space-x-2">
                    <a
                      href={`/api/files/${emp.cv_path}`}
                      download
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download CV</span>
                    </a>
                    <button
                      onClick={() => setShowCVModal(true)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View CV</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CV Viewer Modal */}
          {showCVModal && emp.cv_path && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full h-5/6 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">CV Preview</h3>
                  <button
                    onClick={() => setShowCVModal(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  {emp.cv_path.toLowerCase().endsWith('.pdf') ? (
                    <iframe
                      src={`/api/files/${emp.cv_path}`}
                      className="w-full h-full"
                      title="CV Preview"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-600 dark:text-gray-400">
                        Preview only available for PDF files. Please download to view.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'work' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoField label="Date of Joining" value={emp.doj} />
                <InfoField label="Reporting Manager" value={emp.reporting_manager} />
                <InfoField label="Employment Type" value={emp.employment_type} />
              </div>
              <div className="space-y-4">
                <InfoField label="Training Assigned" value={hr.training_assigned} />
                <InfoField label="HR Status" value={hr.status} />
                <InfoField label="Last Follow-up" value={hr.last_follow_up} />
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <InfoField label="Primary Skills" value={skills.primary_skillset} />
              <InfoField label="Secondary Skills" value={skills.secondary_skillset} />
              <InfoField label="Years of Experience" value={`${skills.experience_years} years`} />
              <InfoField label="Last Contact Date" value={skills.last_contact_date} />
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InfoField label="Asset ID" value={assets.asset_id} />
                  <InfoField label="Issued To" value={assets.issued_to} />
                  <InfoField label="Issue Date" value={assets.issue_date} />
                  <InfoField label="Return Date" value={assets.return_date || 'N/A'} />
                </div>
                <div className="space-y-4">
                  <InfoField label="Laptop Returned" value={assets.laptop_returned ? 'Yes' : 'No'} />
                  <InfoField label="Bag Returned" value={assets.laptop_bag_returned ? 'Yes' : 'No'} />
                  <InfoField label="Advance Salary Adjustment" value={assets.advance_salary_adjustment} />
                  <InfoField label="Leave Adjustment" value={assets.leave_adjustment} />
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Clearance Checklist</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <CheckboxField label="Medical Removed" checked={assets.remove_from_medical} />
                  <CheckboxField label="PF Removed" checked={assets.remove_from_pf} />
                  <CheckboxField label="Email Removed" checked={assets.email_access_removed} />
                  <CheckboxField label="Groups Removed" checked={assets.removed_from_groups} />
                  <CheckboxField label="Relieving Letter" checked={assets.relieving_letter_shared} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Monthly Check-in Notes
                </h4>
                <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-200">{perf.monthly_check_in_notes || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Manager Feedback
                </h4>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-200">{perf.manager_feedback || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Improvement Areas
                </h4>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-200">{perf.improvement_areas || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recognition & Rewards
                </h4>
                <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-200">{perf.recognition_rewards || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
}

const InfoField = ({ label, value }) => (
  <div>
    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {label}
    </label>
    <p className="mt-1 text-gray-900 dark:text-white">{value || 'N/A'}</p>
  </div>
)

const CheckboxField = ({ label, checked }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={checked}
      disabled
      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
    />
    <label className="text-sm text-gray-700 dark:text-gray-300">{label}</label>
  </div>
)

export default EmployeeProfile
