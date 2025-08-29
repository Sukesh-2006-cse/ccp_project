import { useState } from 'react'
import { 
  Zap, 
  Droplets, 
  CloudRain, 
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
  MapPin,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const Predictions = () => {
  const [selectedUtility, setSelectedUtility] = useState('all')
  const [selectedZone, setSelectedZone] = useState('all')

  const utilities = [
    { id: 'electricity', name: 'Electricity', icon: Zap, color: 'text-yellow-500' },
    { id: 'water', name: 'Water Supply', icon: Droplets, color: 'text-blue-500' },
    { id: 'weather', name: 'Weather', icon: CloudRain, color: 'text-gray-500' },
    { id: 'disaster', name: 'Disaster Risk', icon: Shield, color: 'text-red-500' }
  ]

  const zones = [
    { id: 'zone1', name: 'Zone 1 - Downtown', risk: 'low' },
    { id: 'zone2', name: 'Zone 2 - Industrial', risk: 'medium' },
    { id: 'zone3', name: 'Zone 3 - Residential', risk: 'high' },
    { id: 'zone4', name: 'Zone 4 - Coastal', risk: 'high' },
    { id: 'zone5', name: 'Zone 5 - Suburban', risk: 'low' }
  ]

  const predictionData = [
  { time: '00:00', electricity: 15, water: 8, weather: 25, disaster: 12 },
  { time: '06:00', electricity: 28, water: 15, weather: 35, disaster: 18 },
  { time: '12:00', electricity: 42, water: 22, weather: 45, disaster: 25 },
  { time: '18:00', electricity: 35, water: 18, weather: 40, disaster: 20 },
  { time: '24:00', electricity: 20, water: 10, weather: 30, disaster: 15 }
  ]

  const aiInsights = [
    {
      utility: 'Electricity',
      insight: 'Grid load patterns indicate 23% higher risk during peak hours (18:00-22:00)',
      confidence: 89,
      recommendation: 'Consider load balancing and demand response programs'
    },
    {
      utility: 'Water Supply',
      insight: 'Pipeline pressure anomalies detected in Zone 3, 67% chance of disruption',
      confidence: 76,
      recommendation: 'Schedule maintenance and increase monitoring frequency'
    },
    {
      utility: 'Weather',
      insight: 'Storm system approaching coastal areas with 82% probability of severe weather',
      confidence: 82,
      recommendation: 'Activate emergency protocols and issue public warnings'
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'status-normal'
      case 'medium': return 'status-warning'
      case 'high': return 'status-danger'
      default: return 'status-normal'
    }
  }

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low': return 'Low Risk'
      case 'medium': return 'Medium Risk'
      case 'high': return 'High Risk'
      default: return 'Unknown'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Predictions</h1>
          <p className="text-gray-600">AI-powered outage predictions and risk assessments</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedUtility}
            onChange={(e) => setSelectedUtility(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All Utilities</option>
            {utilities.map((utility) => (
              <option key={utility.id} value={utility.id}>{utility.name}</option>
            ))}
          </select>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All Zones</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id}>{zone.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Prediction Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {utilities.map((utility) => (
          <div key={utility.id} className="card text-center">
            <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 ${utility.color}`}>
              <utility.icon size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{utility.name}</h3>
            <div className="text-2xl font-bold text-primary-600 mb-1">24%</div>
            <div className="text-sm text-gray-500">Risk Level</div>
          </div>
        ))}
      </div>

      {/* Zone Risk Assessment */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin size={20} className="mr-2 text-primary-600" />
          Zone Risk Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div key={zone.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{zone.name}</h4>
                <span className={`status-indicator ${getRiskColor(zone.risk)}`}>
                  {getRiskText(zone.risk)}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Electricity Risk:</span>
                  <span className="font-medium">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Water Risk:</span>
                  <span className="font-medium">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weather Risk:</span>
                  <span className="font-medium">High</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Trends Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp size={20} className="mr-2 text-primary-600" />
          Prediction Trends (24h Forecast)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="electricity" stroke="#fbbf24" strokeWidth={2} name="Electricity" />
            <Line type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={2} name="Water" />
            <Line type="monotone" dataKey="weather" stroke="#6b7280" strokeWidth={2} name="Weather" />
            <Line type="monotone" dataKey="disaster" stroke="#ef4444" strokeWidth={2} name="Disaster" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Model Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 size={20} className="mr-2 text-primary-600" />
          AI Model Insights & Recommendations
        </h3>
        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-900">{insight.utility}</h4>
                  <span className="status-indicator status-normal">{insight.confidence}% Confidence</span>
                </div>
                <AlertTriangle size={20} className="text-warning-500" />
              </div>
              <p className="text-gray-700 mb-3">{insight.insight}</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-1">Recommendation:</p>
                <p className="text-sm text-blue-700">{insight.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { model: 'Electricity', accuracy: 94, precision: 91, recall: 89 },
              { model: 'Water', accuracy: 87, precision: 85, recall: 82 },
              { model: 'Weather', accuracy: 89, precision: 87, recall: 85 },
              { model: 'Disaster', accuracy: 82, precision: 79, recall: 81 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy" />
              <Bar dataKey="precision" fill="#10b981" name="Precision" />
              <Bar dataKey="recall" fill="#f59e0b" name="Recall" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Clock size={16} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Next 1 hour</p>
                <p className="text-xs text-green-600">Low risk period, normal operations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Clock size={16} className="text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Next 6 hours</p>
                <p className="text-xs text-yellow-600">Medium risk, monitor closely</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <Clock size={16} className="text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-800">Next 24 hours</p>
                <p className="text-xs text-red-600">High risk, prepare contingency plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictions
