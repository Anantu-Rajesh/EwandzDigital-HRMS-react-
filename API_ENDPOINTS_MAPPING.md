# API Endpoints Mapping & Integration Guide

This document maps all React components to their corresponding backend API endpoints that need to be implemented.

## Table of Contents
- [Authentication](#authentication)
- [Dashboard](#dashboard)
- [Employees](#employees)
- [Users Management](#users-management)
- [File Management](#file-management)

---

## Authentication

### Login
- **Frontend Location**: `src/pages/Login.jsx`
- **Backend Reference**: `backend/auth.py` - `verify_user()`
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "username": "string",
      "role": "Admin|HR|Management"
    },
    "token": "jwt_token_here"
  }
  ```

### Logout
- **Frontend Location**: `src/pages/Login.jsx`
- **Endpoint**: `POST /api/auth/logout`
- **Note**: Clear session/token on frontend

---

## Dashboard

### Get Dashboard Statistics
- **Frontend Location**: `src/pages/Dashboard.jsx` - `loadDashboardData()`
- **Backend Reference**: `frontend/views/dashboard.py` - `load_data()`
- **Endpoint**: `GET /api/dashboard/stats`
- **Response**:
  ```json
  {
    "stats": {
      "totalEmployees": 142,
      "active": 128,
      "exited": 14,
      "departments": 6
    },
    "departmentData": [
      { "name": "Engineering", "count": 45 },
      { "name": "Sales", "count": 32 }
    ],
    "employmentStatusData": [
      { "name": "Active", "value": 128 },
      { "name": "Exited", "value": 14 }
    ],
    "skillsData": [
      { "skill": "React", "count": 25 },
      { "skill": "Python", "count": 30 }
    ],
    "experienceData": [
      { "range": "0-2", "count": 15 },
      { "range": "3-5", "count": 32 }
    ],
    "tenureData": [
      { "range": "0-1y", "count": 22 },
      { "range": "1-2y", "count": 35 }
    ],
    "assetInventoryData": [
      { "name": "Assigned", "value": 115 },
      { "name": "Returned", "value": 27 }
    ],
    "hiringTrendData": [
      { "year": 2020, "hires": 25 },
      { "year": 2021, "hires": 35 }
    ],
    "locationData": [
      { "location": "Bangalore", "count": 65 },
      { "location": "Hyderabad", "count": 38 }
    ],
    "recentHires": [
      {
        "name": "John Doe",
        "team": "Engineering",
        "designation": "Senior Developer",
        "doj": "2024-12-15",
        "location": "Bangalore"
      }
    ]
  }
  ```
- **Database Tables**: `employees`, `skill_matrix`, `assets`
- **Processing Required**:
  - Calculate total employees, active/exited counts
  - Group by department, location, skills
  - Calculate tenure (days from DOJ to now)
  - Asset inventory status
  - Recent hires (sorted by DOJ DESC)

---

## Employees

### Get All Employees (List View)
- **Frontend Location**: `src/pages/EmployeeList.jsx` - `loadEmployees()`
- **Backend Reference**: `frontend/views/employee_list.py` - `get_employees()`
- **Endpoint**: `GET /api/employees`
- **Query Parameters**:
  - `search` (optional): Search by name or employee_code
  - `department` (optional): Filter by team
  - `status` (optional): Filter by employment_status
- **Response**:
  ```json
  [
    {
      "employee_code": "EMP001",
      "name": "John Doe",
      "team": "Engineering",
      "designation": "Senior Developer",
      "reporting_manager": "Jane Smith",
      "location": "Bangalore",
      "employment_status": "Active",
      "email_id": "john.doe@company.com"
    }
  ]
  ```
- **Database Tables**: `employees`

### Get Employee Full Details
- **Frontend Location**: `src/pages/EmployeeProfile.jsx` - `loadEmployeeDetails()`
- **Backend Reference**: `frontend/views/profile_view.py` - `get_full_employee_details()`
- **Endpoint**: `GET /api/employees/:employee_code/full`
- **Response**:
  ```json
  {
    "employees": {
      "employee_code": "EMP001",
      "name": "John Doe",
      "email_id": "john.doe@company.com",
      "contact_number": "+91-9876543210",
      "emergency_contact": "+91-9876543211",
      "dob": "1990-01-15",
      "location": "Bangalore",
      "mediclaim_included": "Yes",
      "pf_included": "Yes",
      "cv_path": "uploaded_cvs/EMP001_John_Doe.pdf",
      "photo_path": "profile_photos/EMP001_John_Doe.jpg",
      "doj": "2020-06-15",
      "team": "Engineering",
      "designation": "Senior Developer",
      "reporting_manager": "Jane Smith",
      "employment_type": "Full-time",
      "employment_status": "Active"
    },
    "skill_matrix": {
      "employee_code": "EMP001",
      "candidate_name": "John Doe",
      "primary_skillset": "React, Node.js, Python",
      "secondary_skillset": "AWS, Docker, Kubernetes",
      "experience_years": 8,
      "last_contact_date": "2024-12-01",
      "cv_upload": "uploaded_cvs/EMP001_John_Doe.pdf"
    },
    "assets": {
      "employee_code": "EMP001",
      "asset_id": "LAPTOP-001",
      "issued_to": "John Doe",
      "issue_date": "2020-06-15",
      "return_date": null,
      "advance_salary_adjustment": "N/A",
      "leave_adjustment": "No",
      "laptop_returned": false,
      "laptop_bag_returned": false,
      "remove_from_medical": false,
      "remove_from_pf": false,
      "email_access_removed": false,
      "removed_from_groups": false,
      "relieving_letter_shared": false
    },
    "hr_activity": {
      "employee_code": "EMP001",
      "employee_name": "John Doe",
      "training_assigned": "AWS Certification",
      "status": "Active",
      "last_follow_up": "2024-11-15"
    },
    "performance": {
      "employee_code": "EMP001",
      "employee_name": "John Doe",
      "monthly_check_in_notes": "Great performance this month.",
      "manager_feedback": "Excellent technical skills.",
      "improvement_areas": "Could improve documentation.",
      "recognition_rewards": "Employee of the Month - Nov 2024"
    }
  }
  ```
- **Database Tables**: `employees`, `skill_matrix`, `assets`, `hr_activity`, `performance`

### Add New Employee (Single Entry)
- **Frontend Location**: `src/pages/AddEmployee.jsx` - `onSubmitSingle()`
- **Backend Reference**: `frontend/views/add_employee.py` - `add_employee_record()`
- **Endpoint**: `POST /api/employees`
- **Content-Type**: `multipart/form-data`
- **Request Body** (FormData):
  ```javascript
  {
    // Personal Details
    "name": "string",
    "dob": "YYYY-MM-DD",
    "phone": "string",
    "email": "string",
    "emergency": "string",
    "location": "Bangalore|Hyderabad|Remote|Delhi|Mumbai",
    "photo": File, // Optional
    
    // Employment Details
    "code": "string", // employee_code
    "doj": "YYYY-MM-DD",
    "type": "Full-time|Contract|Intern",
    "team": "Engineering|Sales|Marketing|HR|Finance|Operations",
    "designation": "string",
    "manager": "string",
    "pf": "Yes|No",
    "mediclaim": "Yes|No",
    
    // Skill Matrix
    "primary_skills": "string",
    "secondary_skills": "string",
    "experience": "number",
    "last_contact": "YYYY-MM-DD",
    "cv": File, // Optional
    
    // Assets
    "asset_id": "string",
    "issue_date": "YYYY-MM-DD",
    "return_date": "YYYY-MM-DD",
    "advance_salary_adjustment": "string",
    "leave_adjustment": "Yes|No",
    "laptop_returned": "Yes|No",
    "laptop_bag_returned": "Yes|No",
    "remove_from_medical": "Yes|No",
    "remove_from_pf": "Yes|No",
    "email_access_removed": "Yes|No",
    "removed_from_groups": "Yes|No",
    "relieving_letter_shared": "Yes|No",
    
    // HR Activity & Performance
    "training_assigned": "string",
    "status": "Active|Exited",
    "last_follow_up": "YYYY-MM-DD",
    "monthly_check_in_notes": "string",
    "manager_feedback": "string",
    "improvement_areas": "string",
    "recognition_rewards": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Employee added successfully!",
    "employee_code": "EMP001"
  }
  ```
- **Database Operations**:
  1. Insert into `employees` table
  2. Insert into `skill_matrix` table
  3. Insert into `assets` table
  4. Insert into `hr_activity` table
  5. Insert into `performance` table
- **File Handling**:
  - Save photo to `data/profile_photos/`
  - Save CV to `data/uploaded_cvs/`
  - Store relative paths in database

### Bulk Upload Employees
- **Frontend Location**: `src/pages/AddEmployee.jsx` - `handleBulkUpload()`
- **Backend Reference**: `frontend/views/add_employee.py` - `show_bulk_upload_form()`
- **Endpoint**: `POST /api/employees/bulk`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  ```javascript
  {
    "file": File // Excel/CSV file
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "success_count": 45,
    "error_count": 3,
    "errors": [
      "Row 5: Missing employee code",
      "Row 12: Email already exists",
      "Row 23: Invalid date format"
    ]
  }
  ```
- **Excel/CSV Format** (Expected columns):
  - Employee Code
  - Full Name
  - Date of Birth (YYYY-MM-DD)
  - Contact Number
  - Official Email
  - Designation
  - Department
  - Date of Joining (YYYY-MM-DD)
  - Employment Type
  - Location
  - Reporting Manager
  - Emergency Contact
  - PF Included (Yes/No)
  - Mediclaim Included (Yes/No)
  - Primary Skills
  - Secondary Skills
  - Years of Experience

### Update Employee
- **Frontend Location**: `src/components/EditEmployeeForm.jsx` - `onSubmit()`
- **Backend Reference**: `frontend/views/edit_employee.py` - `update_employee_details()`
- **Endpoint**: `PUT /api/employees/:employee_code`
- **Content-Type**: `multipart/form-data`
- **Request Body**: Same as Add Employee (all fields)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Employee profile updated successfully!"
  }
  ```
- **Database Operations**: Update all 5 tables
- **File Handling**: 
  - If new photo/CV provided, upload and update path
  - If not provided, keep existing paths

---

## Users Management

### Get All Users
- **Frontend Location**: `src/pages/ManageUsers.jsx` - `loadUsers()`
- **Backend Reference**: `backend/auth.py` - `get_all_users()`
- **Endpoint**: `GET /api/users`
- **Response**:
  ```json
  [
    {
      "username": "admin",
      "role": "Admin"
    },
    {
      "username": "hr_manager",
      "role": "HR"
    }
  ]
  ```
- **Database Tables**: `users`
- **Access**: Admin only

### Create User
- **Frontend Location**: `src/pages/ManageUsers.jsx` - `handleCreateUser()`
- **Backend Reference**: `backend/auth.py` - `create_user()`
- **Endpoint**: `POST /api/users`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "role": "Admin|HR|Management"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User created successfully!"
  }
  ```
- **Database Operations**: Insert into `users` table with hashed password
- **Access**: Admin only

### Delete User
- **Frontend Location**: `src/pages/ManageUsers.jsx` - `handleDeleteUser()`
- **Backend Reference**: `backend/auth.py` - `delete_user()`
- **Endpoint**: `DELETE /api/users/:username`
- **Response**:
  ```json
  {
    "success": true,
    "message": "User deleted successfully!"
  }
  ```
- **Database Operations**: Delete from `users` table
- **Access**: Admin only
- **Validation**: Cannot delete self

### Update Password
- **Frontend Location**: `src/pages/ManageUsers.jsx` - `handleUpdatePassword()`
- **Backend Reference**: `backend/auth.py` - `update_password()`
- **Endpoint**: `PUT /api/users/:username/password`
- **Request Body**:
  ```json
  {
    "newPassword": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Password updated successfully!"
  }
  ```
- **Database Operations**: Update password hash in `users` table
- **Access**: Admin only

---

## File Management

### Download File
- **Frontend Locations**: 
  - `src/pages/EmployeeProfile.jsx` (CV download/view)
  - Profile photo display
- **Endpoint**: `GET /api/files/:filePath`
- **Example**: `GET /api/files/uploaded_cvs/EMP001_John_Doe.pdf`
- **Response**: File stream
- **Base Directory**: `data/` folder
- **Supported Paths**:
  - `uploaded_cvs/*`
  - `profile_photos/*`

---

## Database Schema Reference

### employees
```sql
- employee_code (PK)
- name
- dob
- contact_number
- emergency_contact
- email_id
- doj
- team
- designation
- employment_type
- reporting_manager
- location
- pf_included
- mediclaim_included
- cv_path
- photo_path
- employment_status
```

### skill_matrix
```sql
- id (PK)
- employee_code (FK)
- candidate_name
- primary_skillset
- secondary_skillset
- experience_years
- last_contact_date
- cv_upload
```

### assets
```sql
- id (PK)
- employee_code (FK)
- asset_id
- issued_to
- issue_date
- return_date
- advance_salary_adjustment
- leave_adjustment
- laptop_returned
- laptop_bag_returned
- remove_from_medical
- remove_from_pf
- email_access_removed
- removed_from_groups
- relieving_letter_shared
```

### hr_activity
```sql
- id (PK)
- employee_code (FK)
- employee_name
- training_assigned
- status
- last_follow_up
```

### performance
```sql
- id (PK)
- employee_code (FK)
- employee_name
- monthly_check_in_notes
- manager_feedback
- improvement_areas
- recognition_rewards
```

### users
```sql
- username (PK)
- password_hash
- role
```

---

## Implementation Notes

### Authentication & Authorization
- Use JWT tokens for session management
- Store token in localStorage/sessionStorage
- Include token in Authorization header: `Bearer <token>`
- Middleware should verify token and check role permissions

### File Upload Handling
- Use multipart/form-data for file uploads
- Validate file types (images: jpg/png/jpeg, CVs: pdf/doc/docx)
- Generate unique filenames using employee_code + name
- Store files in appropriate directories under `data/`

### Error Handling
All endpoints should return consistent error format:
```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE"
}
```

### CORS Configuration
Enable CORS for development:
- Allow origin: `http://localhost:5173` (Vite default)
- Allow methods: GET, POST, PUT, DELETE
- Allow headers: Content-Type, Authorization

### Database Transactions
For operations involving multiple tables (add/update employee):
- Use database transactions
- Rollback on any failure
- Return appropriate error messages

---

## Frontend API Service Structure

Create a centralized API service:

```javascript
// src/services/api.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// API methods
export const authAPI = {
  login: (username, password) => 
    apiClient.post('/api/auth/login', { username, password }),
  logout: () => 
    apiClient.post('/api/auth/logout')
}

export const dashboardAPI = {
  getStats: () => 
    apiClient.get('/api/dashboard/stats')
}

export const employeeAPI = {
  getAll: (params) => 
    apiClient.get('/api/employees', { params }),
  getById: (code) => 
    apiClient.get(`/api/employees/${code}/full`),
  create: (formData) => 
    apiClient.post('/api/employees', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: (code, formData) => 
    apiClient.put(`/api/employees/${code}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  bulkUpload: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/api/employees/bulk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export const userAPI = {
  getAll: () => 
    apiClient.get('/api/users'),
  create: (username, password, role) => 
    apiClient.post('/api/users', { username, password, role }),
  delete: (username) => 
    apiClient.delete(`/api/users/${username}`),
  updatePassword: (username, newPassword) => 
    apiClient.put(`/api/users/${username}/password`, { newPassword })
}
```

---

## Testing Checklist

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Token expiration handling
- [ ] Role-based access control

### Dashboard
- [ ] Load all statistics correctly
- [ ] Charts render properly
- [ ] Tab switching works
- [ ] Data updates on refresh

### Employees
- [ ] List view with filters
- [ ] Search functionality
- [ ] View employee profile (all tabs)
- [ ] Add single employee with all fields
- [ ] Bulk upload with Excel/CSV
- [ ] Edit employee (all fields)
- [ ] File uploads (photo & CV)
- [ ] File downloads
- [ ] CV viewer modal

### Users Management (Admin only)
- [ ] List all users
- [ ] Create new user
- [ ] Delete user
- [ ] Update password
- [ ] Prevent self-deletion

### File Management
- [ ] Photo upload and display
- [ ] CV upload and download
- [ ] PDF viewer in modal
- [ ] Handle missing files gracefully

---

## Environment Variables

Create `.env` file in react_conversion root:
```
VITE_API_URL=http://localhost:8000
```

---

## Next Steps for Integration

1. **Backend Setup**:
   - Create FastAPI/Flask application
   - Implement all endpoints listed above
   - Set up database connection
   - Configure CORS
   - Implement JWT authentication

2. **Frontend Integration**:
   - Create `src/services/api.js` with axios configuration
   - Replace mock data with actual API calls
   - Add loading states and error handling
   - Implement token management
   - Add API error toast notifications

3. **Testing**:
   - Test all endpoints with Postman
   - Integration testing with frontend
   - Handle edge cases and errors
   - Performance optimization

4. **Deployment**:
   - Configure production API URL
   - Set up environment variables
   - Deploy backend and frontend
   - Configure HTTPS
   - Set up file storage (local or cloud)
