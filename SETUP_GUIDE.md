# EwandzDigital HRMS - React Frontend Setup Guide

## Overview

This is a complete React conversion of the Streamlit-based Employee HRMS application. All functionality from the original Streamlit app has been converted to modern React components with added dark/light theme support.

## Features Converted

### ✅ Authentication & Authorization
- Login page with role-based access
- Session management
- Protected routes
- Logout functionality

### ✅ Dashboard
- Employee statistics (Total, Active, Exited, Departments)
- Interactive charts using Recharts:
  - Headcount by Department (Bar Chart)
  - Employment Status (Pie Chart)
  - Top Technical Skills (Horizontal Bar Chart)
  - Hiring Trend (Line Chart)
  - Location Distribution (Bar Chart)
- Recent hires table
- Multiple tab views (Overview, Talent, Operations, Hiring)

### ✅ Employee Directory
- Search by name or employee code
- Filter by department and status
- Sortable table with all employee details
- Click to view detailed profile

### ✅ Employee Profile Modal
- View complete employee details across 5 tabs:
  - Personal (contact info, CV download/view)
  - Work (employment details, HR info)
  - Skills (technical skills, experience)
  - Assets (laptop, clearance checklist)
  - Performance (feedback, notes, rewards)
- Edit mode for Admin/HR roles
- File upload/download support

### ✅ Add Employee
- **Single Entry Form** with sections:
  - Personal Details (with photo upload)
  - Employment Details
  - Skill Matrix (with CV upload)
  - Assets
  - Performance/HR Activity
- **Bulk Upload** via Excel/CSV:
  - Template download
  - File upload with progress tracking
  - Error logging

### ✅ Manage Users (Admin Only)
- View all system users
- Create new users with roles (Admin, HR, Management)
- Delete users
- Change passwords
- Role permission info

### ✅ UI/UX Enhancements
- Dark/Light theme toggle (saved to localStorage)
- Responsive design
- Modern glassmorphism effects
- Smooth transitions
- Custom scrollbars
- Loading states
- Error handling

## Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
cd react_conversion
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Step 3: Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Step 4: Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Step 5: Preview Production Build

```bash
npm run preview
```

## Project Structure

```
react_conversion/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   └── Header.jsx          # Top header with theme toggle
│   │   ├── ProfileModal.jsx        # Employee profile modal
│   │   ├── ProtectedRoute.jsx      # Route authorization
│   │   └── ThemeToggle.jsx         # Dark/light theme switcher
│   │
│   ├── pages/
│   │   ├── Login.jsx               # Login page
│   │   ├── Dashboard.jsx           # Dashboard with charts
│   │   ├── EmployeeList.jsx        # Employee directory
│   │   ├── AddEmployee.jsx         # Add employee forms
│   │   └── ManageUsers.jsx         # User management (Admin)
│   │
│   ├── context/
│   │   ├── AuthContext.jsx         # Authentication state
│   │   └── ThemeContext.jsx        # Theme state
│   │
│   ├── services/
│   │   └── api.js                  # API service layer
│   │
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
│
├── public/                         # Static assets
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS config
└── postcss.config.js               # PostCSS config
```

## API Integration

All API calls are currently commented out with `// TODO:` markers. The application uses mock data for demonstration purposes.

### API Endpoints Required

The backend needs to expose the following REST API endpoints:

#### Authentication
```
POST /api/auth/login
Body: { username, password }
Response: { user: { username, role }, token }
```

#### Employees
```
GET    /api/employees              # Get all employees (with filters)
GET    /api/employees/:code        # Get employee by code (all tables)
POST   /api/employees              # Create new employee
PUT    /api/employees/:code        # Update employee
DELETE /api/employees/:code        # Delete employee
POST   /api/employees/bulk         # Bulk upload (Excel/CSV)
```

#### Dashboard
```
GET /api/dashboard/stats
Response: {
  employees: [...],
  skills: [...],
  assets: [...],
  stats: { total, active, exited, departments }
}
```

#### Users (Admin only)
```
GET    /api/users                  # Get all users
POST   /api/users                  # Create new user
DELETE /api/users/:username        # Delete user
PUT    /api/users/:username/password  # Update password
```

### API Integration Steps

1. **Update `src/services/api.js`**:
   - Uncomment the API methods
   - Remove `throw new Error('API not implemented')`
   - Add proper error handling

2. **Update Components**:
   - Replace mock data with API calls
   - Handle loading states
   - Display error messages

3. **Add Authentication Token**:
   - Store JWT token after login
   - Add token to request headers (already configured in axios interceptor)

4. **File Uploads**:
   - Use FormData for photo/CV uploads
   - Handle multipart/form-data content type

## Mapping: Streamlit → React

### File Mappings

| Streamlit File | React File |
|---------------|------------|
| `frontend/app.py` | `App.jsx`, `Layout/Layout.jsx` |
| `frontend/views/dashboard.py` | `pages/Dashboard.jsx` |
| `frontend/views/employee_list.py` | `pages/EmployeeList.jsx` |
| `frontend/views/add_employee.py` | `pages/AddEmployee.jsx` |
| `frontend/views/profile_view.py` | `components/ProfileModal.jsx` |
| `frontend/views/edit_employee.py` | `components/ProfileModal.jsx` (edit mode) |
| `frontend/views/manage_users.py` | `pages/ManageUsers.jsx` |
| `backend/auth.py` | `services/api.js` (authAPI, userAPI) |

### Function Mappings

| Streamlit Function | React Equivalent |
|-------------------|------------------|
| `verify_user()` | `authAPI.verifyUser()` |
| `load_data()` | `dashboardAPI.getStats()` |
| `get_employees()` | `employeeAPI.getAll()` |
| `add_employee_record()` | `employeeAPI.create()` |
| `update_employee_details()` | `employeeAPI.update()` |
| `get_full_employee_details()` | `employeeAPI.getById()` |
| `create_user()` | `userAPI.create()` |
| `delete_user()` | `userAPI.delete()` |
| `update_password()` | `userAPI.updatePassword()` |
| `get_all_users()` | `userAPI.getAll()` |

## Theme System

The app supports dark and light themes:

- **Toggle**: Click the sun/moon icon in the header
- **Persistence**: Theme preference is saved to `localStorage`
- **Default**: Dark theme
- **Implementation**: Tailwind CSS `dark:` classes + React Context

## Role-Based Access Control

| Role | Permissions |
|------|------------|
| **Admin** | Full access to all features |
| **HR** | Can view, add, and edit employees |
| **Management** | Read-only access to dashboard and employee list |

Protected routes automatically redirect unauthorized users.

## Demo Credentials

For testing (when using mock auth):
- `admin` / `admin` → Admin role
- `hr` / `hr` → HR role
- `management` / `management` → Management role

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance Optimizations

- Code splitting via React lazy loading
- Recharts for efficient chart rendering
- Virtualized lists for large datasets (can be added)
- Image optimization recommended for profile photos

## Known Limitations

1. **File Uploads**: Currently mocked, needs backend implementation
2. **CV Viewer**: PDF viewer needs backend to serve files
3. **Search**: Client-side only, should be server-side for large datasets
4. **Bulk Upload**: Excel parsing done client-side, validation needs backend

## Next Steps

1. **Backend API Development**:
   - Create FastAPI/Flask endpoints matching the API spec
   - Implement file upload handling
   - Add authentication middleware
   - Connect to SQLite database

2. **Complete API Integration**:
   - Uncomment API calls in `services/api.js`
   - Remove mock data from components
   - Add error boundaries

3. **Additional Features**:
   - Export to Excel functionality
   - Advanced search and filters
   - Real-time notifications
   - Audit logs

4. **Testing**:
   - Unit tests with Vitest
   - Integration tests
   - E2E tests with Playwright

5. **Deployment**:
   - Build and deploy frontend
   - Set up backend server
   - Configure CORS
   - Set up database

## Troubleshooting

### Port 3000 already in use
```bash
# Change port in vite.config.js or:
npm run dev -- --port 3001
```

### Module not found errors
```bash
npm install
```

### Tailwind styles not loading
```bash
npm run dev
# Ensure index.css is imported in main.jsx
```

### Dark mode not working
- Check if `dark` class is added to `<html>` element
- Verify localStorage has `theme` key

## Support

For issues or questions:
1. Check the console for error messages
2. Verify API endpoints are running
3. Check network tab for failed requests
4. Ensure all environment variables are set

## License

Proprietary - EwandzDigital
