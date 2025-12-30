import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, X } from 'lucide-react'

const EditEmployeeForm = ({ employee, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      // Personal
      name: employee.employees?.name || '',
      email: employee.employees?.email_id || '',
      phone: employee.employees?.contact_number || '',
      dob: employee.employees?.dob || '',
      emergency: employee.employees?.emergency_contact || '',
      location: employee.employees?.location || 'Bangalore',
      pf: employee.employees?.pf_included || 'Yes',
      mediclaim: employee.employees?.mediclaim_included || 'Yes',
      
      // Work
      doj: employee.employees?.doj || '',
      team: employee.employees?.team || 'Engineering',
      designation: employee.employees?.designation || '',
      manager: employee.employees?.reporting_manager || '',
      employment_type: employee.employees?.employment_type || 'Full-time',
      status: employee.employees?.employment_status || 'Active',
      
      // Skills
      primary_skills: employee.skill_matrix?.primary_skillset || '',
      secondary_skills: employee.skill_matrix?.secondary_skillset || '',
      experience: employee.skill_matrix?.experience_years || '',
      last_contact: employee.skill_matrix?.last_contact_date || '',
      
      // Assets
      asset_id: employee.assets?.asset_id || '',
      issue_date: employee.assets?.issue_date || '',
      return_date: employee.assets?.return_date || '',
      advance_salary: employee.assets?.advance_salary_adjustment || '',
      leave_adjustment: employee.assets?.leave_adjustment || 'No',
      laptop_returned: employee.assets?.laptop_returned ? 'Yes' : 'No',
      laptop_bag_returned: employee.assets?.laptop_bag_returned ? 'Yes' : 'No',
      remove_medical: employee.assets?.remove_from_medical || false,
      remove_pf: employee.assets?.remove_from_pf || false,
      email_removed: employee.assets?.email_access_removed || false,
      groups_removed: employee.assets?.removed_from_groups || false,
      letter_shared: employee.assets?.relieving_letter_shared || false,
      
      // HR Activity
      training: employee.hr_activity?.training_assigned || '',
      hr_status: employee.hr_activity?.status || 'Active',
      hr_followup: employee.hr_activity?.last_follow_up || '',
      
      // Performance
      monthly_notes: employee.performance?.monthly_check_in_notes || '',
      manager_feedback: employee.performance?.manager_feedback || '',
      improvement_areas: employee.performance?.improvement_areas || '',
      rewards: employee.performance?.recognition_rewards || ''
    }
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // TODO: API ENDPOINT - PUT /api/employees/:code
      // Corresponds to update_employee_details() in frontend/views/edit_employee.py
      // Should update all 5 tables: employees, skill_matrix, assets, hr_activity, performance
      // Include file uploads for CV and photo if provided
      
      await onSave(data)
    } catch (error) {
      console.error('Error updating employee:', error)
      alert('Failed to update employee')
    } finally {
      setLoading(false)
    }
  }

  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'work', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'assets', label: 'Assets' },
    { id: 'performance', label: 'Performance' }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
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

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Name" {...register('name', { required: true })} error={errors.name} />
            <FormField label="Email" type="email" {...register('email', { required: true })} error={errors.email} />
            <FormField label="Phone" {...register('phone')} />
            <FormField label="Date of Birth" type="date" {...register('dob')} />
            <FormField label="Emergency Contact" {...register('emergency')} />
            <FormSelect label="Location" options={['Bangalore', 'Hyderabad', 'Remote', 'Delhi', 'Mumbai']} {...register('location')} />
            <FormSelect label="PF Included" options={['Yes', 'No']} {...register('pf')} />
            <FormSelect label="Mediclaim" options={['Yes', 'No']} {...register('mediclaim')} />
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Update Photo (Leave empty to keep current)
              </label>
              <input
                type="file"
                accept="image/*"
                {...register('photo')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Update CV (Leave empty to keep current)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                {...register('cv')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>
        )}

        {activeTab === 'work' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Date of Joining" type="date" {...register('doj')} />
            <FormSelect label="Team" options={['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations']} {...register('team')} />
            <FormField label="Designation" {...register('designation')} />
            <FormField label="Reporting Manager" {...register('manager')} />
            <FormSelect label="Employment Type" options={['Full-time', 'Contract', 'Intern']} {...register('employment_type')} />
            <FormSelect label="Status" options={['Active', 'Exited']} {...register('status')} />
            <FormField label="Training Assigned" {...register('training')} />
            <FormField label="HR Status" {...register('hr_status')} />
            <FormField label="Last Follow-up" type="date" {...register('hr_followup')} />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Primary Skills" {...register('primary_skills')} />
            <FormField label="Secondary Skills" {...register('secondary_skills')} />
            <FormField label="Years of Experience" type="number" {...register('experience')} />
            <FormField label="Last Contact Date" type="date" {...register('last_contact')} />
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Asset ID" {...register('asset_id')} />
              <FormField label="Issue Date" type="date" {...register('issue_date')} />
              <FormField label="Return Date" type="date" {...register('return_date')} />
              <FormField label="Advance Salary Adjustment" {...register('advance_salary')} />
              <FormSelect label="Leave Adjustment" options={['Yes', 'No']} {...register('leave_adjustment')} />
              <FormSelect label="Laptop Returned" options={['Yes', 'No']} {...register('laptop_returned')} />
              <FormSelect label="Laptop Bag Returned" options={['Yes', 'No']} {...register('laptop_bag_returned')} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Clearance Checklist</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <CheckboxField label="Medical Removed" {...register('remove_medical')} />
                <CheckboxField label="PF Removed" {...register('remove_pf')} />
                <CheckboxField label="Email Removed" {...register('email_removed')} />
                <CheckboxField label="Groups Removed" {...register('groups_removed')} />
                <CheckboxField label="Letter Shared" {...register('letter_shared')} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <TextAreaField label="Monthly Check-in Notes" {...register('monthly_notes')} />
            <TextAreaField label="Manager Feedback" {...register('manager_feedback')} />
            <TextAreaField label="Improvement Areas" {...register('improvement_areas')} />
            <TextAreaField label="Recognition & Rewards" {...register('rewards')} />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>
    </form>
  )
}

// Form Components
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

const TextAreaField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <textarea
      rows="4"
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      {...props}
    />
  </div>
)

const CheckboxField = ({ label, ...props }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
      {...props}
    />
    <label className="text-sm text-gray-700 dark:text-gray-300">{label}</label>
  </div>
)

export default EditEmployeeForm
