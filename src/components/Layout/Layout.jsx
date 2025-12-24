import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-transparent relative">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 animate-fadeInUp relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
