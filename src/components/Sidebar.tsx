import { NavLink } from 'react-router-dom'
import { 
  Home, 
  TrendingUp, 
  AlertTriangle, 
  Settings, 
  Zap, 
  Droplets, 
  CloudRain,
  Shield
} from 'lucide-react'

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Predictions', href: '/predictions', icon: TrendingUp },
    { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
    { name: 'Settings', href: '/settings', icon: Settings }
  ]

  const utilityCategories = [
  { name: 'Electricity', icon: Zap, color: 'text-yellow-500', href: '/electricity' },
  { name: 'Water Supply', icon: Droplets, color: 'text-blue-500', href: '/water' },
  { name: 'Weather', icon: CloudRain, color: 'text-gray-500', href: '/weather' },
  { name: 'Disaster Risk', icon: Shield, color: 'text-red-500', href: '/disaster' }
  ]

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Utility Categories
          </h3>
          <div className="space-y-2">
            {utilityCategories.map((category) =>
              category.href ? (
                <NavLink

                  key={category.name}
                  to={category.href as string}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <category.icon size={20} className={category.color} />
                  <span>{category.name}</span>
                </NavLink>
              ) : (
                <div
                  key={category.name}
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors cursor-pointer"
                >
                  <category.icon size={20} className={category.color} />
                  <span>{category.name}</span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-primary-50 rounded-lg">
          <h4 className="text-sm font-medium text-primary-800 mb-2">
            System Status
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-primary-700">AI Models</span>
              <span className="status-indicator status-normal">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-700">Data Sources</span>
              <span className="status-indicator status-normal">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-700">Predictions</span>
              <span className="status-indicator status-normal">Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
