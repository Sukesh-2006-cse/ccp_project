import { useState } from 'react'
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Bell,
  Search,
  Send,
  Settings
} from 'lucide-react'

const Alerts = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const alerts = [
    {
      id: 1,
      title: 'High Storm Risk in Coastal Areas',
      description: 'Severe weather system approaching with 82% probability of storms and flooding',
      priority: 'high',
      status: 'active',
      utility: 'Weather',
      zone: 'Zone 4 - Coastal',
      timestamp: '2 minutes ago',
      affectedUsers: 1250,
      actions: ['Issue public warning', 'Activate emergency protocols', 'Deploy response teams']
    },
    {
      id: 2,
      title: 'Water Pressure Drop in Zone 2',
      description: 'Pipeline pressure anomalies detected, potential disruption within 2-4 hours',
      priority: 'medium',
      status: 'investigating',
      utility: 'Water Supply',
      zone: 'Zone 2 - Industrial',
      timestamp: '15 minutes ago',
      affectedUsers: 450,
      actions: ['Schedule maintenance', 'Increase monitoring', 'Notify industrial users']
    },
    {
      id: 3,
      title: 'Grid Load Approaching Capacity',
      description: 'Electricity demand reaching 87% of grid capacity during peak hours',
      priority: 'medium',
      status: 'resolved',
      utility: 'Electricity',
      zone: 'Zone 1 - Downtown',
      timestamp: '1 hour ago',
      affectedUsers: 2100,
      actions: ['Load balancing activated', 'Demand response initiated', 'Capacity increased']
    },
    {
      id: 4,
      description: 'Supply-demand mismatch detected, 67% chance of service disruption',
      priority: 'high',
      status: 'active',
      zone: 'Zone 3 - Residential',
      timestamp: '45 minutes ago',
      affectedUsers: 890,
      actions: ['Activate backup supply', 'Issue consumer alerts', 'Coordinate with suppliers']
    },
    {
      id: 5,
      title: 'Flood Warning for Low-Lying Areas',
      description: 'Heavy rainfall expected, flood risk assessment shows 75% probability',
      priority: 'high',
      status: 'active',
      utility: 'Disaster Risk',
      zone: 'Zone 5 - Suburban',
      timestamp: '30 minutes ago',
      affectedUsers: 650,
      actions: ['Evacuation planning', 'Emergency shelters', 'Road closures']
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100'
      case 'investigating': return 'text-yellow-600 bg-yellow-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || alert.priority === selectedPriority
    const matchesSearch = (alert.title ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesPriority && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts & Notifications</h1>
          <p className="text-gray-600">Manage and monitor system alerts and notifications</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center space-x-2">
            <Bell size={16} />
            <span>Send Alert</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Settings size={16} />
            <span>Alert Settings</span>
          </button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">3</div>
          <div className="text-sm text-gray-600">Active Alerts</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">1</div>
          <div className="text-sm text-gray-600">Investigating</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">1</div>
          <div className="text-sm text-gray-600">Resolved</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">5,340</div>
          <div className="text-sm text-gray-600">Total Affected Users</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field w-40"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="input-field w-40"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          return (
            <div key={alert.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title ?? ''}</h3>
                    <span className={`status-indicator ${getPriorityColor(alert.priority)}`}>
                      {alert.priority.toUpperCase()}
                    </span>
                    <span className={`status-indicator ${getStatusColor(alert.status)}`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{alert.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{alert.zone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{alert.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{alert.affectedUsers} users affected</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Recommended Actions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {alert.actions.map((action, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <button className="btn-primary text-sm px-3 py-1">
                    <Send size={14} className="mr-1" />
                    Send
                  </button>
                  <button className="btn-secondary text-sm px-3 py-1">
                    <Settings size={14} className="mr-1" />
                    Configure
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Alert History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert History (Last 30 Days)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.slice(0, 10).map((alert) => (
                <tr key={alert.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                      <div className="text-sm text-gray-500">{alert.utility}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-indicator ${getPriorityColor(alert.priority)}`}>
                      {alert.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`status-indicator ${getStatusColor(alert.status)}`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Alerts
