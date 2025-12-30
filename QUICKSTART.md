# Quick Start - React HRMS

## Installation & Run

```bash
# Navigate to the project
cd react_conversion

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: http://localhost:3000

## Demo Login

- Username: `admin` Password: `admin` (Full access)
- Username: `hr` Password: `hr` (HR access)  
- Username: `management` Password: `management` (Read-only)

## What's Converted

✅ **Login Page** - Full authentication UI  
✅ **Dashboard** - All charts and statistics  
✅ **Employee List** - Search, filter, view profiles  
✅ **Add Employee** - Single entry + Bulk upload  
✅ **Profile View** - Complete employee details  
✅ **Manage Users** - User CRUD (Admin only)  
✅ **Dark/Light Theme** - Toggle with persistence  

## API Integration Needed

All API calls are marked with `// TODO:` comments in:
- `src/services/api.js` - API methods
- Each component - Replace mock data

See `SETUP_GUIDE.md` for complete API specification.

## Key Files

- `src/App.jsx` - Main router
- `src/pages/*` - Page components  
- `src/components/*` - Reusable components
- `src/services/api.js` - API layer (needs implementation)
- `src/context/*` - Auth & Theme state

## Build for Production

```bash
npm run build
npm run preview
```

## Need Help?

See `SETUP_GUIDE.md` for detailed documentation.
