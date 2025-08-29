import { useAuth } from '../contexts/AuthContext'
import { Bell, User, LogOut } from 'lucide-react'
import { useState, useContext } from 'react'
import { CityContext } from '../CityContext'

const Header = () => {
  const { user, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [notifications] = useState([
    { id: 1, message: 'High risk of power outage in Sector A', type: 'warning', time: '2 min ago' },
    { id: 2, message: 'Water supply restored in Zone 3', type: 'success', time: '15 min ago' },
    { id: 3, message: 'Storm warning for coastal areas', type: 'danger', time: '1 hour ago' }
  ])
  const { city, setCity } = useContext(CityContext)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-primary-600">PredicSure</h1>
          <div className="text-sm text-gray-500">AI-Powered Outage Prediction System</div>
          {/* City Dropdown */}
          <div>
            <select
              className="ml-4 px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={city}
              onChange={e => setCity(e.target.value)}
            >
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Kanpur">Kanpur</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Indore">Indore</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Patna">Patna</option>
              <option value="Ranchi">Ranchi</option>
              <option value="Bhubaneswar">Bhubaneswar</option>
              <option value="Guwahati">Guwahati</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Amritsar">Amritsar</option>
              <option value="Ludhiana">Ludhiana</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Kochi">Kochi</option>
              <option value="Mysuru">Mysuru</option>
              <option value="Mangaluru">Mangaluru</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Meerut">Meerut</option>
              <option value="Agra">Agra</option>
              <option value="Gwalior">Gwalior</option>
              <option value="Jodhpur">Jodhpur</option>
              <option value="Udaipur">Udaipur</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Dehradun">Dehradun</option>
              <option value="Jammu">Jammu</option>
              <option value="Srinagar">Srinagar</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-danger-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-primary-600" />
              </div>
              <span className="text-sm font-medium">{user?.name}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                  {user?.organization && (
                    <div className="text-xs text-gray-500">{user.organization}</div>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
