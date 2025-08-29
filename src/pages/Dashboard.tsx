import { useContext, useEffect, useState } from 'react'
import { CityContext } from '../CityContext'
import { Flame, CloudRain, Zap, Droplets, Shield, X } from 'lucide-react'
import IndiaMap from '../components/IndiaMap'
import { fetchIndiaRisks as fetchIndiaRisksFactory } from '../utils/fetchIndiaRisks'

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [showDisasterMap, setShowDisasterMap] = useState(false)
  const { city } = useContext(CityContext)
  const [overviewStats, setOverviewStats] = useState([
    { name: 'Temperature', value: '--', change: '', icon: Flame, color: 'text-orange-500' },
    { name: 'Rainfall', value: '--', change: '', icon: CloudRain, color: 'text-blue-500' },
    { name: 'Wind Speed', value: '--', change: '', icon: Zap, color: 'text-yellow-500' },
    { name: 'Humidity', value: '--', change: '', icon: Droplets, color: 'text-teal-500' }
  ])
  type IndiaRisk = {
    title: string;
    description: string;
    link: string;
    pubDate: string;
  };
  const [indiaRisks, setIndiaRisks] = useState<IndiaRisk[]>([])
  // ...existing code...

  useEffect(() => {
    // Fetch weather from Tomorrow.io and rainfall from Meteosource
    const fetchWeather = async () => {
      const cityCoords: Record<string, { lat: number, lon: number }> = {
  Delhi: { lat: 28.613939, lon: 77.209021 },
  Mumbai: { lat: 19.076090, lon: 72.877426 },
  Bengaluru: { lat: 12.971599, lon: 77.594566 },
  Chennai: { lat: 13.082680, lon: 80.270718 },
  Kolkata: { lat: 22.572646, lon: 88.363895 },
  Hyderabad: { lat: 17.385044, lon: 78.486671 },
  Pune: { lat: 18.520430, lon: 73.856744 },
  Ahmedabad: { lat: 23.022505, lon: 72.571362 },
  Surat: { lat: 21.170240, lon: 72.831062 },
  Jaipur: { lat: 26.912434, lon: 75.787270 },
  Lucknow: { lat: 26.846694, lon: 80.946166 },
  Kanpur: { lat: 26.449923, lon: 80.331874 },
  Nagpur: { lat: 21.145800, lon: 79.088155 },
  Indore: { lat: 22.719568, lon: 75.857727 },
  Bhopal: { lat: 23.259933, lon: 77.412615 },
  Patna: { lat: 25.594095, lon: 85.137566 },
  Ranchi: { lat: 23.344101, lon: 85.309562 },
  Bhubaneswar: { lat: 20.296059, lon: 85.824539 },
  Guwahati: { lat: 26.144518, lon: 91.736237 },
  Chandigarh: { lat: 30.733315, lon: 76.779419 },
  Amritsar: { lat: 31.634000, lon: 74.872261 },
  Ludhiana: { lat: 30.900965, lon: 75.857277 },
  Coimbatore: { lat: 11.016844, lon: 76.955832 },
  Madurai: { lat: 9.925201, lon: 78.119774 },
  Visakhapatnam: { lat: 17.686816, lon: 83.218482 },
  Vijayawada: { lat: 16.506174, lon: 80.648015 },
  Thiruvananthapuram: { lat: 8.524139, lon: 76.936638 },
  Kochi: { lat: 9.931233, lon: 76.267304 },
  Mysuru: { lat: 12.295810, lon: 76.639381 },
  Mangaluru: { lat: 12.914141, lon: 74.855957 },
  Varanasi: { lat: 25.317645, lon: 82.973914 },
  Meerut: { lat: 28.984463, lon: 77.706413 },
  Agra: { lat: 27.176670, lon: 78.008075 },
  Gwalior: { lat: 26.218287, lon: 78.182831 },
  Jodhpur: { lat: 26.238947, lon: 73.024309 },
  Udaipur: { lat: 24.585445, lon: 73.712479 },
  Rajkot: { lat: 22.303894, lon: 70.802162 },
  Vadodara: { lat: 22.307159, lon: 73.181219 },
  Dehradun: { lat: 30.316495, lon: 78.032192 },
  Jammu: { lat: 32.726602, lon: 74.857026 },
  Srinagar: { lat: 34.083656, lon: 74.797371 }
      }
      const coords = cityCoords[city]
      if (!coords) return
      try {
        // Tomorrow.io for temp, wind, humidity
        const res = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${coords.lat},${coords.lon}&apikey=KwkYiyncBsyJrB5Q1iCQyilihYH2FD6A`)
        const data = await res.json()
        const values = data?.data?.values || {}

        // Meteosource for rainfall
        const msRes = await fetch(`https://www.meteosource.com/api/v1/free/point?lat=${coords.lat}&lon=${coords.lon}&sections=current&language=en&units=metric&key=3lnc0isilqp7qe6stgi6px40897tcx8mbk3f4lza`)
        const msData = await msRes.json()
        let rainfall = '0 mm'
        if (
          msData?.current?.precipitation &&
          typeof msData.current.precipitation.total === 'number'
        ) {
          rainfall = `${msData.current.precipitation.total} mm`
        }

        setOverviewStats([
          { name: 'Temperature', value: values.temperature ? `${values.temperature}°C` : '--', change: '', icon: Flame, color: 'text-orange-500' },
          { name: 'Rainfall', value: rainfall, change: '', icon: CloudRain, color: 'text-blue-500' },
          { name: 'Wind Speed', value: values.windSpeed ? `${values.windSpeed} km/h` : '--', change: '', icon: Zap, color: 'text-yellow-500' },
          { name: 'Humidity', value: values.humidity ? `${values.humidity}%` : '--', change: '', icon: Droplets, color: 'text-teal-500' }
        ])
      } catch (e) {
        setOverviewStats([
          { name: 'Temperature', value: '--', change: '', icon: Flame, color: 'text-orange-500' },
          { name: 'Rainfall', value: '--', change: '', icon: CloudRain, color: 'text-blue-500' },
          { name: 'Wind Speed', value: '--', change: '', icon: Zap, color: 'text-yellow-500' },
          { name: 'Humidity', value: '--', change: '', icon: Droplets, color: 'text-teal-500' }
        ])
      }
    }
    fetchWeather()
    // Fetch city/state-specific risks/outbreaks/maintenance news
    const getRisks = async () => {
      const getAllRisks = await fetchIndiaRisksFactory()
      const risks = await getAllRisks()
      setIndiaRisks(risks as IndiaRisk[])
    }
    getRisks()
  }, [city])

  // Disaster Risk Map Overlay
  if (showDisasterMap) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-[95vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Shield className="text-red-600" size={24} />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Disaster Risk Map - India</h2>
                <p className="text-gray-600">Real-time risk assessment across Indian states</p>
              </div>
            </div>
            <button
              onClick={() => setShowDisasterMap(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
          
          <div className="p-6">
            <IndiaMap />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Electricity image above stats */}
      <div className="flex justify-center mb-4">
    <img src="/electricity.jpeg" alt="Electricity" className="w-full h-40 object-cover rounded-xl shadow" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Real-time overview of utility predictions and system status</p>
        </div>
        <div className="flex space-x-2">
          {['24h', '7d', '30d'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats: Temperature, Rainfall, Wind Speed, Humidity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* India Risks/Outbreaks/Maintenance News */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">India Utility & Risk Updates</h2>
        {indiaRisks.length === 0 ? (
          <p className="text-gray-500">No recent electricity, water, weather, disaster, or outbreak risks found.</p>
        ) : (
          <ul className="space-y-4">
            {indiaRisks.map((risk, idx) => (
              <li key={idx} className="p-4 bg-gray-50 rounded-lg shadow">
                <a href={risk.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-700 hover:underline">
                  {risk.title}
                </a>
                <p className="text-gray-700 mt-1">{risk.description}</p>
                <p className="text-xs text-gray-400 mt-2">{risk.pubDate}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
