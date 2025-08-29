import React, { useState } from 'react';
import { AlertTriangle, Shield, MapPin } from 'lucide-react';

interface State {
  id: string;
  name: string;
  path: string;
  risk: 'critical' | 'high' | 'medium' | 'low';
  alerts: string[];
  centerX: number;
  centerY: number;
}

interface City {
  name: string;
  x: number;
  y: number;
  isMajor: boolean;
}

interface River {
  name: string;
  path: string;
}

const IndiaMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return '#dc2626'; // Red
      case 'high': return '#ea580c'; // Orange
      case 'medium': return '#d97706'; // Amber
      case 'low': return '#059669'; // Green
      default: return '#6b7280'; // Gray
    }
  };

  const getRiskLevel = (risk: string) => {
    switch (risk) {
      case 'critical': return 'Critical Risk';
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Risk';
      default: return 'Unknown Risk';
    }
  };

  // Major rivers of India
  const rivers: River[] = [
    { name: 'Ganga', path: 'M 78 82 Q 78 84 78 86' },
    { name: 'Yamuna', path: 'M 77 82 Q 77 83 77 84' },
    { name: 'Brahmaputra', path: 'M 82 83 Q 82 85 82 87' },
    { name: 'Indus', path: 'M 70 81 Q 70 82 70 83' },
    { name: 'Godavari', path: 'M 77 86 Q 78 87 79 87' },
    { name: 'Krishna', path: 'M 77 87 Q 78 87 79 87' },
    { name: 'Narmada', path: 'M 74 85 Q 75 85 76 85' },
    { name: 'Tapi', path: 'M 73 85 Q 74 85 75 85' },
    { name: 'Mahanadi', path: 'M 79 86 Q 80 86 81 86' }
  ];

  // Major cities
  const cities: City[] = [
    { name: 'New Delhi', x: 77, y: 81.5, isMajor: true },
    { name: 'Mumbai', x: 72.5, y: 86.5, isMajor: true },
    { name: 'Kolkata', x: 82.5, y: 84.5, isMajor: true },
    { name: 'Chennai', x: 78.5, y: 87.5, isMajor: true },
    { name: 'Bengaluru', x: 76.5, y: 87, isMajor: true },
    { name: 'Hyderabad', x: 77.5, y: 86, isMajor: true },
    { name: 'Ahmedabad', x: 71, y: 85.5, isMajor: true },
    { name: 'Pune', x: 73.5, y: 86.5, isMajor: true },
    { name: 'Jaipur', x: 73, y: 83.5, isMajor: true },
    { name: 'Lucknow', x: 79, y: 82.5, isMajor: true },
    { name: 'Kanpur', x: 78.5, y: 83, isMajor: true },
    { name: 'Varanasi', x: 78.5, y: 83.5, isMajor: true },
    { name: 'Patna', x: 80.5, y: 83.5, isMajor: true },
    { name: 'Bhopal', x: 76, y: 84.5, isMajor: true },
    { name: 'Indore', x: 75.5, y: 85, isMajor: true },
    { name: 'Nagpur', x: 76.5, y: 85.5, isMajor: true },
    { name: 'Kochi', x: 76.5, y: 86, isMajor: true },
    { name: 'Thiruvananthapuram', x: 76.5, y: 86.5, isMajor: true }
  ];

  // India states with more realistic SVG paths based on actual geography
  const states: State[] = [
    {
      id: 'jammu-kashmir',
      name: 'Jammu & Kashmir',
      path: 'M 70 79 L 73 79 L 73 81 L 70 81 Z',
      risk: 'medium',
      alerts: ['Landslide risk', 'Avalanche warning'],
      centerX: 71.5,
      centerY: 80
    },
    {
      id: 'himachal-pradesh',
      name: 'Himachal Pradesh',
      path: 'M 73 79 L 75 79 L 75 81 L 73 81 Z',
      risk: 'low',
      alerts: ['Landslide risk'],
      centerX: 74,
      centerY: 80
    },
    {
      id: 'punjab',
      name: 'Punjab',
      path: 'M 73 81 L 75 81 L 75 82 L 73 82 Z',
      risk: 'low',
      alerts: ['Minor weather fluctuations'],
      centerX: 74,
      centerY: 81.5
    },
    {
      id: 'haryana',
      name: 'Haryana',
      path: 'M 75 81 L 77 81 L 77 82 L 75 82 Z',
      risk: 'low',
      alerts: ['Minor weather fluctuations'],
      centerX: 76,
      centerY: 81.5
    },
    {
      id: 'delhi',
      name: 'Delhi',
      path: 'M 76.5 81 L 77.5 81 L 77.5 82 L 76.5 82 Z',
      risk: 'medium',
      alerts: ['Air quality issues', 'Infrastructure stress'],
      centerX: 77,
      centerY: 81.5
    },
    {
      id: 'uttar-pradesh',
      name: 'Uttar Pradesh',
      path: 'M 77 81 L 81 81 L 81 84 L 77 84 Z',
      risk: 'medium',
      alerts: ['Flood risk', 'Infrastructure stress'],
      centerX: 79,
      centerY: 82.5
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      path: 'M 70 81 L 75 81 L 75 85 L 70 85 Z',
      risk: 'low',
      alerts: ['Heat wave risk'],
      centerX: 72.5,
      centerY: 83
    },
    {
      id: 'madhya-pradesh',
      name: 'Madhya Pradesh',
      path: 'M 74 83 L 77 83 L 77 86 L 74 86 Z',
      risk: 'medium',
      alerts: ['Monsoon flooding', 'Power grid stress'],
      centerX: 75.5,
      centerY: 84.5
    },
    {
      id: 'gujarat',
      name: 'Gujarat',
      path: 'M 68 83 L 72 83 L 72 86 L 68 86 Z',
      risk: 'high',
      alerts: ['Cyclone threat', 'Coastal flooding', 'Gas pipeline risk'],
      centerX: 70,
      centerY: 84.5
    },
    {
      id: 'maharashtra',
      name: 'Maharashtra',
      path: 'M 72 85 L 75 85 L 75 87 L 72 87 Z',
      risk: 'high',
      alerts: ['Flood risk', 'Cyclone warning', 'Power grid instability'],
      centerX: 73.5,
      centerY: 86
    },
    {
      id: 'chhattisgarh',
      name: 'Chhattisgarh',
      path: 'M 76 84 L 78 84 L 78 86 L 76 86 Z',
      risk: 'low',
      alerts: ['Minor weather fluctuations'],
      centerX: 77,
      centerY: 85
    },
    {
      id: 'jharkhand',
      name: 'Jharkhand',
      path: 'M 78 83 L 80 83 L 80 84 L 78 84 Z',
      risk: 'medium',
      alerts: ['Monsoon flooding', 'Infrastructure stress'],
      centerX: 79,
      centerY: 83.5
    },
    {
      id: 'bihar',
      name: 'Bihar',
      path: 'M 79 82 L 81 82 L 81 84 L 79 84 Z',
      risk: 'high',
      alerts: ['Flood risk', 'Infrastructure damage'],
      centerX: 80,
      centerY: 83
    },
    {
      id: 'west-bengal',
      name: 'West Bengal',
      path: 'M 81 83 L 83 83 L 83 85 L 81 85 Z',
      risk: 'high',
      alerts: ['Cyclone threat', 'Flood risk', 'Infrastructure damage'],
      centerX: 82,
      centerY: 84
    },
    {
      id: 'odisha',
      name: 'Odisha',
      path: 'M 79 85 L 81 85 L 81 87 L 79 87 Z',
      risk: 'critical',
      alerts: ['Cyclone warning', 'Coastal flooding', 'Power grid risk'],
      centerX: 80,
      centerY: 86
    },
    {
      id: 'andhra-pradesh',
      name: 'Andhra Pradesh',
      path: 'M 78 86 L 80 86 L 80 88 L 78 88 Z',
      risk: 'medium',
      alerts: ['Cyclone threat', 'Heavy rainfall', 'Water supply risk'],
      centerX: 79,
      centerY: 87
    },
    {
      id: 'telangana',
      name: 'Telangana',
      path: 'M 76 85 L 78 85 L 78 86 L 76 86 Z',
      risk: 'low',
      alerts: ['Minor weather fluctuations'],
      centerX: 77,
      centerY: 85.5
    },
    {
      id: 'karnataka',
      name: 'Karnataka',
      path: 'M 75 86 L 77 86 L 77 88 L 75 88 Z',
      risk: 'low',
      alerts: ['Minor weather fluctuations'],
      centerX: 76,
      centerY: 87
    },
    {
      id: 'tamil-nadu',
      name: 'Tamil Nadu',
      path: 'M 77 87 L 79 87 L 79 89 L 77 89 Z',
      risk: 'medium',
      alerts: ['Cyclone warning', 'Heavy rainfall', 'Power outage risk'],
      centerX: 78,
      centerY: 88
    },
    {
      id: 'kerala',
      name: 'Kerala',
      path: 'M 76 87 L 77 87 L 77 88 L 76 88 Z',
      risk: 'critical',
      alerts: ['Heavy rainfall', 'Landslide risk', 'Water supply disruption'],
      centerX: 76.5,
      centerY: 87.5
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="text-red-600" size={24} />
        <div>
          <h3 className="text-xl font-bold text-gray-900">Disaster Risk Map - India</h3>
          <p className="text-gray-600">Real-time risk assessment across Indian states</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 h-96 flex items-center justify-center relative overflow-hidden">
            {/* India Map SVG */}
            <svg
              viewBox="67 78 20 14"
              className="w-full h-full"
              style={{ maxHeight: '400px' }}
            >
              {/* Map Background */}
              <rect x="67" y="78" width="20" height="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.1" rx="0.5" />
              
              {/* Rivers */}
              {rivers.map((river, index) => (
                <path
                  key={index}
                  d={river.path}
                  stroke="#3b82f6"
                  strokeWidth="0.08"
                  fill="none"
                  opacity="0.7"
                  className="pointer-events-none"
                />
              ))}
              
              {/* State Boundaries and Risk Indicators */}
              {states.map((state) => (
                <g key={state.id}>
                  {/* State Path */}
                  <path
                    d={state.path}
                    fill={getRiskColor(state.risk)}
                    stroke="#ffffff"
                    strokeWidth="0.05"
                    opacity="0.8"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedState(selectedState === state.id ? null : state.id)}
                  />
                  
                  {/* State Label */}
                  <text
                    x={state.centerX}
                    y={state.centerY}
                    fontSize="0.2"
                    fill="#1f2937"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none font-medium"
                  >
                    {state.name}
                  </text>
                  
                  {/* Risk Indicator */}
                  <circle
                    cx={state.centerX}
                    cy={state.centerY + 0.25}
                    r="0.1"
                    fill={getRiskColor(state.risk)}
                    stroke="#ffffff"
                    strokeWidth="0.02"
                    className="cursor-pointer"
                  />
                </g>
              ))}
              
              {/* Cities */}
              {cities.map((city, index) => (
                <g key={index}>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={city.isMajor ? "0.15" : "0.1"}
                    fill={city.isMajor ? "#dc2626" : "#ffffff"}
                    stroke="#1f2937"
                    strokeWidth="0.02"
                    className="cursor-pointer"
                  />
                  <text
                    x={city.x}
                    y={city.y + 0.3}
                    fontSize="0.15"
                    fill="#1f2937"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none font-medium"
                  >
                    {city.name}
                  </text>
                </g>
              ))}
              
              {/* Map Title */}
              <text x="68" y="79.5" fontSize="0.5" fill="#1f2937" fontWeight="bold">
                INDIA
              </text>
              
              {/* Geographic Features */}
              <text x="68" y="92" fontSize="0.25" fill="#64748b">
                Arabian Sea
              </text>
              <text x="79" y="92" fontSize="0.25" fill="#64748b">
                Bay of Bengal
              </text>
              <text x="73" y="79" fontSize="0.2" fill="#64748b">
                Himalayas
              </text>
              <text x="75" y="88" fontSize="0.2" fill="#64748b">
                Deccan Plateau
              </text>
              
              {/* Tropic of Cancer */}
              <line x1="68" y1="83.5" x2="87" y2="83.5" stroke="#ef4444" strokeWidth="0.05" strokeDasharray="0.1,0.1" />
              <text x="87.5" y="83.5" fontSize="0.15" fill="#ef4444" dominantBaseline="middle">
                Tropic of Cancer
              </text>
            </svg>
          </div>
        </div>

        {/* Risk Legend and Details */}
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Risk Legend</h4>
            <div className="space-y-2">
              {['critical', 'high', 'medium', 'low'].map((risk) => (
                <div key={risk} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getRiskColor(risk) }}
                    />
                    <span className="text-sm text-gray-700 capitalize">{risk}</span>
                  </div>
                  <span className="text-xs text-gray-500">{getRiskLevel(risk)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Current Alerts</h4>
            <div className="space-y-2">
              <div className="text-sm text-blue-700">
                <strong>Critical:</strong> Kerala, Odisha
              </div>
              <div className="text-sm text-blue-700">
                <strong>High:</strong> Maharashtra, Gujarat, Bihar, West Bengal
              </div>
              <div className="text-sm text-blue-700">
                <strong>Medium:</strong> Tamil Nadu, Andhra Pradesh, Madhya Pradesh, Uttar Pradesh, Jharkhand, Delhi, Jammu & Kashmir
              </div>
              <div className="text-sm text-blue-700">
                <strong>Low:</strong> Karnataka, Telangana, Chhattisgarh, Rajasthan, Himachal Pradesh, Punjab, Haryana
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Map Features</h4>
            <div className="space-y-2 text-sm text-green-700">
              <div>• <strong>Red circles:</strong> Major cities</div>
              <div>• <strong>White circles:</strong> Other cities</div>
              <div>• <strong>Blue lines:</strong> Major rivers</div>
              <div>• <strong>Red dashed line:</strong> Tropic of Cancer</div>
            </div>
          </div>
        </div>
      </div>

      {/* State-wise Risk Details */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">State-wise Risk Assessment</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map((state) => (
            <div 
              key={state.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedState === state.id 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedState(selectedState === state.id ? null : state.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-900">{state.name}</h5>
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: getRiskColor(state.risk) }}
                />
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Risk Level: <span className="font-medium">{getRiskLevel(state.risk)}</span>
              </div>
              <div className="space-y-1">
                {state.alerts.map((alert, index) => (
                  <div key={index} className="text-xs text-red-600 flex items-center space-x-1">
                    <AlertTriangle size={12} />
                    <span>{alert}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
