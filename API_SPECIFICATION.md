# API Endpoints Specification

This document maps the Streamlit backend functions to required REST API endpoints for the React frontend.

## Base URL
```
http://localhost:8000/api
```

---

## Authentication Endpoints

### 1. Login
**Streamlit Function:** `backend/auth.py::verify_user()`

```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "username": "string",
  "password": "string"
}

Response (200 OK):
{
  "success": true,
  "user": {
    "username": "string",
    "role": "Admin|HR|Management"
  },
  "token": "jwt_token_string"
}

Response (401 Unauthorized):
{
  "success": false,
  "message": "Invalid credentials"
}
```

**React Usage:**
```javascript
// src/context/AuthContext.jsx::login()
const response = await axios.post('/api/auth/login', { username, password })
```

---

## Employee Endpoints

### 2. Get All Employees
**Streamlit Function:** `frontend/views/employee_list.py::get_employees()`

```http
GET /api/employees?department={dept}&status={status}&search={term}

Response (200 OK):
{
  "employees": [
    {
      "employee_code": "string",
      "name": "string",
      "team": "string",
      "designation": "string",
      "reporting_manager": "string",
      "location": "string",
      "employment_status": "Active|Exited",
      "email_id": "string"
    }
  ]
}
```

**React Usage:**
```javascript
// src/pages/EmployeeList.jsx::loadEmployees()
const response = await employeeAPI.getAll({ department, status, search })
```

---

### 3. Get Employee Details
**Streamlit Function:** `frontend/views/profile_view.py::get_full_employee_details()`

```http
GET /api/employees/{employee_code}

Response (200 OK):
{
  "employees": {
    "employee_code": "string",
    "name": "string",
    "dob": "YYYY-MM-DD",
    "contact_number": "string",
    "emergency_contact": "string",
    "email_id": "string",
    "doj": "YYYY-MM-DD",
    "team": "string",
    "designation": "string",
    "employment_type": "string",
    "reporting_manager": "string",
    "location": "string",
    "pf_included": "Yes|No",
    "mediclaim_included": "Yes|No",
    "cv_path": "string",
    "photo_path": "string",
    "employment_status": "Active|Exited"
  },
  "skill_matrix": {
    "primary_skillset": "string",
    "secondary_skillset": "string",
    "experience_years": "number",
    "last_contact_date": "YYYY-MM-DD",
    "cv_upload": "string"
  },
  "assets": {
    "asset_id": "string",
    "issued_to": "string",
    "issue_date": "YYYY-MM-DD",
    "return_date": "YYYY-MM-DD|null",
    "advance_salary_adjustment": "string",
    "leave_adjustment": "Yes|No",
    "laptop_returned": "boolean",
    "laptop_bag_returned": "boolean",
    "remove_from_medical": "boolean",
    "remove_from_pf": "boolean",
    "email_access_removed": "boolean",
    "removed_from_groups": "boolean",
    "relieving_letter_shared": "boolean"
  },
  "hr_activity": {
    "training_assigned": "string",
    "status": "string",
    "last_follow_up": "YYYY-MM-DD"
  },
  "performance": {
    "monthly_check_in_notes": "string",
    "manager_feedback": "string",
    "improvement_areas": "string",
    "recognition_rewards": "string"
  }
}
```

**React Usage:**
```javascript
// src/components/ProfileModal.jsx::loadEmployeeDetails()
const response = await employeeAPI.getById(employeeCode)
```

---

### 4. Create Employee
**Streamlit Function:** `frontend/views/add_employee.py::add_employee_record()`

```http
POST /api/employees
Content-Type: multipart/form-data

Request Body (FormData):
{
  // Personal Details
  "employee_code": "string",
  "name": "string",
  "dob": "YYYY-MM-DD",
  "contact_number": "string",
  "emergency_contact": "string",
  "email_id": "string",
  "location": "string",
  "photo": "File|null",
  
  // Employment Details
  "doj": "YYYY-MM-DD",
  "team": "string",
  "designation": "string",
  "employment_type": "string",
  "reporting_manager": "string",
  "pf_included": "Yes|No",
  "mediclaim_included": "Yes|No",
  
  // Skill Matrix
  "primary_skillset": "string",
  "secondary_skillset": "string",
  "experience_years": "number",
  "last_contact_date": "YYYY-MM-DD",
  "cv": "File|null",
  
  // Assets
  "asset_id": "string",
  "issue_date": "YYYY-MM-DD",
  "return_date": "YYYY-MM-DD",
  "advance_salary_adjustment": "string",
  "leave_adjustment": "Yes|No",
  "laptop_returned": "boolean",
  "laptop_bag_returned": "boolean",
  "remove_from_medical": "Yes|No",
  "remove_from_pf": "Yes|No",
  "email_access_removed": "Yes|No",
  "removed_from_groups": "Yes|No",
  "relieving_letter_shared": "Yes|No",
  
  // Performance/HR
  "training_assigned": "string",
  "status": "Active|Exited",
  "last_follow_up": "YYYY-MM-DD",
  "monthly_check_in_notes": "string",
  "manager_feedback": "string",
  "improvement_areas": "string",
  "recognition_rewards": "string"
}

Response (201 Created):
{
  "success": true,
  "message": "Employee added successfully!",
  "employee_code": "string"
}

Response (400 Bad Request):
{
  "success": false,
  "message": "Error: Employee Code or Email already exists."
}
```

**React Usage:**
```javascript
// src/pages/AddEmployee.jsx::onSubmitSingle()
const formData = new FormData()
// Append all fields including files
const response = await employeeAPI.create(formData)
```

---

### 5. Update Employee
**Streamlit Function:** `frontend/views/edit_employee.py::update_employee_details()`

```http
PUT /api/employees/{employee_code}
Content-Type: multipart/form-data

Request Body: Same as Create Employee

Response (200 OK):
{
  "success": true,
  "message": "Employee profile updated successfully!"
}
```

**React Usage:**
```javascript
// src/components/ProfileModal.jsx (edit mode save)
const response = await employeeAPI.update(employeeCode, formData)
```

---

### 6. Bulk Upload Employees
**Streamlit Function:** `frontend/views/add_employee.py::show_bulk_upload_form()`

```http
POST /api/employees/bulk
Content-Type: multipart/form-data

Request Body:
{
  "file": "File (Excel/CSV)"
}

Response (200 OK):
{
  "success": true,
  "processed": 50,
  "added": 45,
  "failed": 5,
  "errors": [
    {
      "row": 10,
      "message": "Missing required field: email"
    }
  ]
}
```

**React Usage:**
```javascript
// src/pages/AddEmployee.jsx::handleBulkUpload()
const formData = new FormData()
formData.append('file', bulkFile)
const response = await employeeAPI.bulkUpload(formData)
```

---

## Dashboard Endpoints

### 7. Get Dashboard Statistics
**Streamlit Function:** `frontend/views/dashboard.py::load_data()`

```http
GET /api/dashboard/stats

Response (200 OK):
{
  "stats": {
    "totalEmployees": 142,
    "active": 128,
    "exited": 14,
    "departments": 6
  },
  "departmentCounts": [
    { "name": "Engineering", "count": 45 },
    { "name": "Sales", "count": 32 }
  ],
  "employmentStatus": [
    { "name": "Active", "value": 128 },
    { "name": "Exited", "value": 14 }
  ],
  "topSkills": [
    { "skill": "React", "count": 25 },
    { "skill": "Python", "count": 30 }
  ],
  "hiringTrend": [
    { "year": 2020, "hires": 25 },
    { "year": 2021, "hires": 35 }
  ],
  "locationDistribution": [
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
  ],
  "averageTenure": 3.5,
  "assetStatus": {
    "assigned": 120,
    "returned": 22
  }
}
```

**React Usage:**
```javascript
// src/pages/Dashboard.jsx::loadDashboardData()
const response = await dashboardAPI.getStats()
```

---

## User Management Endpoints (Admin Only)

### 8. Get All Users
**Streamlit Function:** `backend/auth.py::get_all_users()`

```http
GET /api/users
Authorization: Bearer {token}

Response (200 OK):
{
  "users": [
    {
      "username": "string",
      "role": "Admin|HR|Management"
    }
  ]
}
```

**React Usage:**
```javascript
// src/pages/ManageUsers.jsx::loadUsers()
const response = await userAPI.getAll()
```

---

### 9. Create User
**Streamlit Function:** `backend/auth.py::create_user()`

```http
POST /api/users
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "username": "string",
  "password": "string",
  "role": "Admin|HR|Management"
}

Response (201 Created):
{
  "success": true,
  "message": "User created successfully"
}

Response (400 Bad Request):
{
  "success": false,
  "message": "Username already exists"
}
```

**React Usage:**
```javascript
// src/pages/ManageUsers.jsx::handleCreateUser()
const response = await userAPI.create(username, password, role)
```

---

### 10. Delete User
**Streamlit Function:** `backend/auth.py::delete_user()`

```http
DELETE /api/users/{username}
Authorization: Bearer {token}

Response (200 OK):
{
  "success": true,
  "message": "User deleted successfully"
}
```

**React Usage:**
```javascript
// src/pages/ManageUsers.jsx::handleDeleteUser()
const response = await userAPI.delete(username)
```

---

### 11. Update Password
**Streamlit Function:** `backend/auth.py::update_password()`

```http
PUT /api/users/{username}/password
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "newPassword": "string"
}

Response (200 OK):
{
  "success": true,
  "message": "Password updated successfully"
}
```

**React Usage:**
```javascript
// src/pages/ManageUsers.jsx::handleUpdatePassword()
const response = await userAPI.updatePassword(username, newPassword)
```

---

## File Download Endpoints

### 12. Download CV
```http
GET /api/files/cv/{employee_code}
Authorization: Bearer {token}

Response (200 OK):
Content-Type: application/pdf
Body: <file_content>
```

### 13. Download Profile Photo
```http
GET /api/files/photo/{employee_code}
Authorization: Bearer {token}

Response (200 OK):
Content-Type: image/jpeg|image/png
Body: <file_content>
```

---

## Database Schema Reference

Based on `backend/database/init_db.py`:

### Tables
1. **employees** - Main employee info
2. **skill_matrix** - Skills and experience
3. **assets** - Laptop and asset tracking
4. **hr_activity** - HR follow-ups and training
5. **performance** - Performance reviews
6. **users** - System users (for authentication)

---

## Authentication Flow

1. User submits login credentials
2. Backend validates against `users` table using `pbkdf2_sha256.verify()`
3. Backend generates JWT token
4. Frontend stores token in localStorage
5. Frontend includes token in Authorization header for all API calls
6. Backend middleware validates token and checks user role
7. Backend returns 401 if token invalid/expired

---

## File Upload Flow

1. Frontend creates FormData object
2. Append file and other fields
3. POST to API with `Content-Type: multipart/form-data`
4. Backend saves files to `data/profile_photos/` or `data/uploaded_cvs/`
5. Backend stores relative path in database
6. Frontend can retrieve via file download endpoints

---

## Error Handling

All endpoints should return consistent error format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error

---

## CORS Configuration

Backend must allow requests from React dev server:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Implementation Checklist

- [ ] Set up FastAPI/Flask backend
- [ ] Create all API endpoints
- [ ] Implement JWT authentication
- [ ] Add file upload handling
- [ ] Connect to SQLite database
- [ ] Test each endpoint with Postman
- [ ] Update React `services/api.js`
- [ ] Remove mock data from components
- [ ] Test end-to-end flows
- [ ] Deploy backend and frontend

---

## Testing API Endpoints

Use tools like:
- **Postman** - GUI for API testing
- **curl** - Command-line testing
- **Thunder Client** - VS Code extension

Example curl command:
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'
```

---

## Security Considerations

1. **Password Hashing**: Use `pbkdf2_sha256` (already in auth.py)
2. **JWT Tokens**: Include expiration time
3. **Input Validation**: Sanitize all inputs
4. **File Upload**: Validate file types and sizes
5. **SQL Injection**: Use parameterized queries (already done)
6. **CORS**: Restrict origins in production
7. **HTTPS**: Use SSL in production
8. **Rate Limiting**: Add rate limiting middleware

---

For implementation help, see:
- Backend: `employee_database_v1/backend/`
- Frontend: `react_conversion/src/services/api.js`
