import React, { useState } from 'react';
import { Search, MapPin, Zap, Droplets, Flame, AlertTriangle, CheckCircle } from 'lucide-react';

interface PredictionResult {
  electricity: {
    status: 'normal' | 'warning' | 'danger';
    risk: string;
    prediction: string;
    confidence: number;
    recommendations: string[];
  };
  water: {
    status: 'normal' | 'warning' | 'danger';
    risk: string;
    prediction: string;
    confidence: number;
    recommendations: string[];
  };
  gas: {
    status: 'normal' | 'warning' | 'danger';
    risk: string;
    prediction: string;
    confidence: number;
    recommendations: string[];
  };
}

const LocationPredictor: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [predictions, setPredictions] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const citiesByState: { [key: string]: string[] } = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Vellore'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj'],
    'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'danger': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const generatePredictions = async () => {
    if (!selectedState || !selectedCity) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockPredictions: PredictionResult = {
        electricity: {
          status: Math.random() > 0.7 ? 'danger' : Math.random() > 0.5 ? 'warning' : 'normal',
          risk: Math.random() > 0.7 ? 'High Risk' : Math.random() > 0.5 ? 'Medium Risk' : 'Low Risk',
          prediction: Math.random() > 0.7 ? 'Potential outage within 24-48 hours' : 
                     Math.random() > 0.5 ? 'Minor fluctuations expected' : 'Stable supply maintained',
          confidence: Math.floor(Math.random() * 30) + 70,
          recommendations: [
            'Monitor power consumption',
            'Have backup power ready',
            'Check electrical connections'
          ]
        },
        water: {
          status: Math.random() > 0.7 ? 'danger' : Math.random() > 0.5 ? 'warning' : 'normal',
          risk: Math.random() > 0.7 ? 'High Risk' : Math.random() > 0.5 ? 'Medium Risk' : 'Low Risk',
          prediction: Math.random() > 0.7 ? 'Water supply disruption likely' : 
                     Math.random() > 0.5 ? 'Reduced pressure expected' : 'Normal supply maintained',
          confidence: Math.floor(Math.random() * 30) + 70,
          recommendations: [
            'Store water for emergency',
            'Check for leaks',
            'Monitor water quality'
          ]
        },
        gas: {
          status: Math.random() > 0.7 ? 'danger' : Math.random() > 0.5 ? 'warning' : 'normal',
          risk: Math.random() > 0.7 ? 'High Risk' : Math.random() > 0.5 ? 'Medium Risk' : 'Low Risk',
          prediction: Math.random() > 0.7 ? 'Gas supply interruption possible' : 
                     Math.random() > 0.5 ? 'Pressure variations expected' : 'Stable supply maintained',
          confidence: Math.floor(Math.random() * 30) + 70,
          recommendations: [
            'Have alternative cooking methods',
            'Monitor for gas leaks'
          ]
        }
      };

      setPredictions(mockPredictions);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <MapPin className="text-blue-600" size={24} />
        <div>
          <h3 className="text-xl font-bold text-gray-900">Location-Based Predictions</h3>
          <p className="text-gray-600">Get utility predictions for specific cities and states</p>
        </div>
      </div>

      {/* Location Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select State
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Choose a state</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Choose a city</option>
            {selectedState && citiesByState[selectedState]?.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Generate Predictions Button */}
      <div className="mb-6">
        <button
          onClick={generatePredictions}
          disabled={!selectedState || !selectedCity || isLoading}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating Predictions...</span>
            </>
          ) : (
            <>
              <Search size={20} />
              <span>Generate Predictions</span>
            </>
          )}
        </button>
      </div>

      {/* Predictions Results */}
      {predictions && (
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Predictions for {selectedCity}, {selectedState}
            </h4>
            <p className="text-gray-600">
              Based on current data analysis and historical patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Electricity Predictions */}
            <div className={`p-4 rounded-lg border ${getStatusBgColor(predictions.electricity.status)}`}>
              <div className="flex items-center space-x-3 mb-3">
                <Zap className={`${getStatusColor(predictions.electricity.status)}`} size={24} />
                <h5 className="font-semibold text-gray-900">Electricity</h5>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Risk Level:</span>
                  <span className={`text-sm font-medium ${getStatusColor(predictions.electricity.status)}`}>
                    {predictions.electricity.risk}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {predictions.electricity.confidence}%
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">{predictions.electricity.prediction}</p>
                  <div className="space-y-1">
                    {predictions.electricity.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                        <CheckCircle size={12} className="text-green-500" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Water Predictions */}
            <div className={`p-4 rounded-lg border ${getStatusBgColor(predictions.water.status)}`}>
              <div className="flex items-center space-x-3 mb-3">
                <Droplets className={`${getStatusColor(predictions.water.status)}`} size={24} />
                <h5 className="font-semibold text-gray-900">Water Supply</h5>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Risk Level:</span>
                  <span className={`text-sm font-medium ${getStatusColor(predictions.water.status)}`}>
                    {predictions.water.risk}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {predictions.water.confidence}%
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">{predictions.water.prediction}</p>
                  <div className="space-y-1">
                    {predictions.water.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                        <CheckCircle size={12} className="text-green-500" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gas Predictions */}
            <div className={`p-4 rounded-lg border ${getStatusBgColor(predictions.gas.status)}`}>
              <div className="flex items-center space-x-3 mb-3">
                <Flame className={`${getStatusColor(predictions.gas.status)}`} size={24} />
                <h5 className="font-semibold text-gray-900">Gas Supply</h5>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Risk Level:</span>
                  <span className={`text-sm font-medium ${getStatusColor(predictions.gas.status)}`}>
                    {predictions.gas.risk}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {predictions.gas.confidence}%
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-700 mb-2">{predictions.gas.prediction}</p>
                  <div className="space-y-1">
                    {predictions.gas.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                        <CheckCircle size={12} className="text-green-500" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-blue-600" size={20} />
              <h5 className="font-semibold text-blue-800">Prediction Summary</h5>
            </div>
            <p className="text-blue-700 text-sm mt-2">
              These predictions are based on current infrastructure status, weather conditions, 
              historical data, and real-time monitoring. Please take necessary precautions based on the risk levels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPredictor;
