import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Upload, Download, FileSpreadsheet } from 'lucide-react'
import * as XLSX from 'xlsx'

const AddEmployee = () => {
  const [activeTab, setActiveTab] = useState('single')
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [bulkFile, setBulkFile] = useState(null)

  const onSubmitSingle = async (data) => {
    setLoading(true)
    try {
      // TODO: API call to /api/employees (POST)
      // Corresponds to add_employee_record() in frontend/views/add_employee.py
      // Include photo and CV file uploads via FormData
      
      console.log('Adding employee:', data)
      
      // Mock success
      alert('Employee added successfully!')
      reset()
    } catch (error) {
      console.error('Error adding employee:', error)
      alert('Failed to add employee')
    } finally {
      setLoading(false)
    }
  }

  const handleBulkUpload = async (e) => {
    e.preventDefault()
    if (!bulkFile) {
      alert('Please select a file')
      return
    }

    setLoading(true)
    try {
      // TODO: API call to /api/employees/bulk (POST)
      // Corresponds to bulk upload functionality in add_employee.py
      // Parse Excel/CSV and send to backend
      
      console.log('Uploading bulk file:', bulkFile.name)
      
      // Mock success
      alert('Bulk upload completed!')
      setBulkFile(null)
    } catch (error) {
      console.error('Error with bulk upload:', error)
      alert('Bulk upload failed')
    } finally {
      setLoading(false)
    }
  }

  const downloadTemplate = () => {
    // Create template data
    const templateData = [
      {
        'Employee Code': 'EMP001',
        'Full Name': 'John Doe',
        'Date of Birth (YYYY-MM-DD)': '1990-01-15',
        'Contact Number': '+91-9876543210',
        'Official Email': 'john.doe@company.com',
        'Designation': 'Senior Developer',
        'Department': 'Engineering',
        'Date of Joining (YYYY-MM-DD)': '2020-06-15',
        'Employment Type': 'Full-time',
        'Location': 'Bangalore',
        'Reporting Manager': 'Jane Smith',
        'Emergency Contact': '+91-9876543211',
        'PF Included (Yes/No)': 'Yes',
        'Mediclaim Included (Yes/No)': 'Yes',
        'Primary Skills': 'React, Node.js',
        'Secondary Skills': 'AWS, Docker',
        'Years of Experience': '8'
      }
    ]

    const ws = XLSX.utils.json_to_sheet(templateData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Employee Template')
    XLSX.writeFile(wb, 'employee_upload_template.xlsx')
  }

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="scroll-animate">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Employee</h1>
        <p className="text-gray-600 dark:text-gray-400">Choose your preferred method to add employees.</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 scroll-animate">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'single', label: 'Single Entry' },
              { id: 'bulk', label: 'Bulk Upload' }
            ].map((tab) => (
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

        <div className="p-6">
          {activeTab === 'single' && (
            <form onSubmit={handleSubmit(onSubmitSingle)} className="space-y-8">
              {/* Personal Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Full Name *"
                    error={errors.name}
                    {...register('name', { required: 'Name is required' })}
                  />
                  <FormField
                    label="Date of Birth"
                    type="date"
                    {...register('dob')}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      {...register('photo')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                  <FormField
                    label="Contact Number *"
                    error={errors.phone}
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  <FormField
                    label="Official Email *"
                    type="email"
                    error={errors.email}
                    {...register('email', { required: 'Email is required' })}
                  />
                  <FormField
                    label="Emergency Contact"
                    {...register('emergency')}
                  />
                  <FormSelect
                    label="Location"
                    options={['Bangalore', 'Hyderabad', 'Remote', 'Delhi', 'Mumbai']}
                    {...register('location')}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6"></div>

              {/* Employment Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Employment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Employee Code *"
                    placeholder="EMP101"
                    error={errors.code}
                    {...register('code', { required: 'Employee code is required' })}
                  />
                  <FormField
                    label="Date of Joining"
                    type="date"
                    {...register('doj')}
                  />
                  <FormSelect
                    label="Employment Type"
                    options={['Full-time', 'Contract', 'Intern']}
                    {...register('employment_type')}
                  />
                  <FormSelect
                    label="Department"
                    options={['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations']}
                    {...register('team')}
                  />
                  <FormField
                    label="Designation *"
                    error={errors.designation}
                    {...register('designation', { required: 'Designation is required' })}
                  />
                  <FormField
                    label="Reporting Manager"
                    {...register('manager')}
                  />
                  <FormSelect
                    label="PF Included?"
                    options={['Yes', 'No']}
                    {...register('pf')}
                  />
                  <FormSelect
                    label="Mediclaim Included?"
                    options={['Yes', 'No']}
                    {...register('mediclaim')}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6"></div>

              {/* Skill Matrix */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Skill Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Primary Skills"
                    {...register('primary_skills')}
                  />
                  <FormField
                    label="Secondary Skills"
                    {...register('secondary_skills')}
                  />
                  <FormField
                    label="Years of Experience"
                    type="number"
                    {...register('experience')}
                  />
                  <FormField
                    label="Last Contact Date"
                    type="date"
                    {...register('last_contact')}
                  />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload CV
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      {...register('cv')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6"></div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Employee'}</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'bulk' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Step 1: Download Template
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please use the standard template below. Do not change the column headers.
                </p>
                <button
                  onClick={downloadTemplate}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Excel Template</span>
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6"></div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Step 2: Upload Data
                </h3>
                <form onSubmit={handleBulkUpload}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Excel/CSV File
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:border-primary-500 transition-colors">
                      <div className="space-y-1 text-center">
                        <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 hover:text-primary-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              accept=".xlsx,.xls,.csv"
                              onChange={(e) => setBulkFile(e.target.files[0])}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          XLSX, XLS, or CSV up to 10MB
                        </p>
                        {bulkFile && (
                          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                            Selected: {bulkFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !bulkFile}
                    className="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>{loading ? 'Processing...' : 'Process Upload'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Reusable Form Components
const FormField = ({ label, error, type = 'text', ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      className={`w-full px-4 py-2 rounded-lg border ${
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error.message}</p>}
  </div>
)

const FormSelect = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <select
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      {...props}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
)

export default AddEmployee
