# EwandzDigital HRMS - React Frontend

React conversion of the Streamlit-based Employee HRMS application.

## Features

- ✅ User Authentication (Login/Logout)
- ✅ Role-based Access Control (Admin, HR, Management)
- ✅ Dashboard with Analytics & Charts
- ✅ Employee Directory with Search & Filters
- ✅ Add Employee (Single Entry & Bulk Upload)
- ✅ Employee Profile View & Edit
- ✅ User Management (Admin only)
- ✅ Dark/Light Theme Toggle
- ✅ Responsive Design

## Tech Stack

- **React 18** - UI Framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Recharts** - Data Visualization
- **Lucide React** - Icons
- **Axios** - HTTP Client
- **React Hook Form** - Form Management
- **Vite** - Build Tool

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Sidebar, Header)
│   ├── ThemeToggle.jsx # Dark/Light theme switcher
│   └── ProtectedRoute.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── EmployeeList.jsx
│   ├── AddEmployee.jsx
│   ├── ProfileView.jsx
│   └── ManageUsers.jsx
├── context/            # React Context
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── services/           # API services
│   └── api.js
├── App.jsx             # Main App component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## API Integration

The application expects API endpoints at `/api/*`. Currently, API calls are commented with placeholders indicating where integration should happen.

### Expected API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Add new employee
- `PUT /api/employees/:id` - Update employee
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/users` - Get all users (Admin)
- `POST /api/users` - Create user (Admin)
- `DELETE /api/users/:username` - Delete user (Admin)

## Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:8000
```

## Theme Support

Toggle between dark and light themes using the button in the header. Theme preference is saved to localStorage.

## License

Proprietary - EwandzDigital
