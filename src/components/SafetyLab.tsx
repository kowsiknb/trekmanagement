import React, { useState } from 'react';
import { calculateTrekRisk } from '../services/riskAnalysis';
import { TREKS_DATA } from '../data/treks';
import { WeatherData, Trek } from '../types/trek';
import {
  ShieldAlert,
  Cpu,
  Sliders,
  Sparkles,
  AlertTriangle,
  Info,
  Thermometer,
  CloudRain,
  Wind,
  Eye,
  Mountain,
  CheckCircle2
} from 'lucide-react';

export const SafetyLab: React.FC = () => {
  const [selectedTrek, setSelectedTrek] = useState<Trek>(TREKS_DATA[0]); // Kudremukh
  const [rainProb, setRainProb] = useState(65);
  const [tempC, setTempC] = useState(18);
  const [windKmh, setWindKmh] = useState(28);
  const [visibilityKm, setVisibilityKm] = useState(4);
  const [isThunderstorm, setIsThunderstorm] = useState(false);

  // Construct synthetic weather object based on slider states
  const syntheticWeather: WeatherData = {
    date: 'Interactive Simulator',
    tempC,
    feelsLikeC: Math.round(tempC - (windKmh > 20 ? 2 : 0)),
    tempMinC: tempC - 4,
    tempMaxC: tempC + 4,
    rainProbability: rainProb,
    precipitationMm: Number((rainProb * 0.25).toFixed(1)),
    humidity: rainProb > 60 ? 88 : 55,
    windSpeedKmh: windKmh,
    windGustKmh: Math.round(windKmh * 1.4),
    visibilityKm,
    uvIndex: 5,
    weatherCode: rainProb > 70 ? 65 : 1,
    conditionText: rainProb > 60 ? 'Heavy Rain & Mist' : 'Simulated Weather',
    isThunderstorm,
    sunrise: '06:15 AM',
    sunset: '06:30 PM',
    extremeWarning: isThunderstorm ? 'Active Thunderstorm Alert' : undefined
  };

  const analysis = calculateTrekRisk(selectedTrek, syntheticWeather);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold block">
            AIML Laboratory & Viva Sandbox
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 mt-1">
            Climate Risk & Random Forest Inference Sandbox
          </h2>
          <p className="text-xs text-stone-600 mt-2 leading-relaxed">
            Adjust meteorological variables below to simulate hazardous trail scenarios. Observe real-time changes in tree ensemble consensus, Gini impurity feature contributions, and calculated risk levels.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (Sliders & Parameters) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-display text-sm font-bold text-stone-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-800" />
              Environmental Simulation Controls
            </h3>
            <span className="text-[11px] font-mono text-stone-400">Live Feedback</span>
          </div>

          {/* Select Trek */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Target Mountain Route:
            </label>
            <select
              value={selectedTrek.id}
              onChange={(e) => {
                const found = TREKS_DATA.find((t) => t.id === e.target.value);
                if (found) setSelectedTrek(found);
              }}
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              {TREKS_DATA.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.difficulty} · {t.maxAltitudeM}m)
                </option>
              ))}
            </select>
          </div>

          {/* Rainfall Probability */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-stone-700 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-sky-600" />
                Rain Probability
              </span>
              <span className="font-mono font-bold text-stone-900">{rainProb}% (~{syntheticWeather.precipitationMm}mm)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={rainProb}
              onChange={(e) => setRainProb(Number(e.target.value))}
              className="w-full accent-emerald-800 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Temperature */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-stone-700 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                Ambient Temperature
              </span>
              <span className="font-mono font-bold text-stone-900">{tempC}°C</span>
            </div>
            <input
              type="range"
              min="-10"
              max="42"
              value={tempC}
              onChange={(e) => setTempC(Number(e.target.value))}
              className="w-full accent-emerald-800 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Wind Speed */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-stone-700 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-teal-600" />
                Sustained Ridge Wind
              </span>
              <span className="font-mono font-bold text-stone-900">{windKmh} km/h</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              value={windKmh}
              onChange={(e) => setWindKmh(Number(e.target.value))}
              className="w-full accent-emerald-800 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Visibility */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-stone-700 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                Atmospheric Visibility
              </span>
              <span className="font-mono font-bold text-stone-900">{visibilityKm} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={visibilityKm}
              onChange={(e) => setVisibilityKm(Number(e.target.value))}
              className="w-full accent-emerald-800 h-2 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Thunderstorm Toggle */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
            <span className="text-xs font-medium text-stone-800 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              Active Thunderstorm / Lightning
            </span>
            <input
              type="checkbox"
              checked={isThunderstorm}
              onChange={(e) => setIsThunderstorm(e.target.checked)}
              className="w-4 h-4 text-emerald-800 rounded border-stone-300 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* Live Simulation Output Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Output Metric Banner */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">Safety Score</span>
                <span className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                  {analysis.safetyScore}/100
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">Calculated Risk</span>
                <span className="text-2xl font-bold font-mono text-stone-900 tabular-nums">
                  {analysis.riskScore}/100
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">Risk Level</span>
                <span className={`text-xs font-bold font-mono px-2 py-1 rounded inline-block mt-1 ${
                  analysis.riskLevel === 'LOW' ? 'bg-emerald-100 text-emerald-800' :
                  analysis.riskLevel === 'MODERATE' ? 'bg-amber-100 text-amber-800' :
                  analysis.riskLevel === 'HIGH' ? 'bg-orange-100 text-orange-900' :
                  'bg-red-100 text-red-900'
                }`}>
                  {analysis.riskLevel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">ML Confidence</span>
                <span className="text-2xl font-bold font-mono text-emerald-800 tabular-nums">
                  {(analysis.mlPrediction.confidenceScore * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Generated Rationale */}
            <div className="mt-5 pt-4 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-800 block mb-1">
                Dynamic Rationale Explanation:
              </span>
              <p className="text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-200 leading-relaxed">
                {analysis.explanation}
              </p>
            </div>
          </div>

          {/* Random Forest Voting Ensemble Visualizer */}
          <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 shadow-md border border-stone-800">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h4 className="font-display text-sm font-bold text-white">
                Random Forest 50-Tree Voting Ensemble Visualizer
              </h4>
            </div>

            <p className="text-xs text-stone-400 mt-2">
              Each mini-bar represents the vote fraction across the 50 decision trees trained on multi-regional micro-climate datasets.
            </p>

            <div className="space-y-3 mt-4 text-xs">
              <div>
                <div className="flex justify-between text-stone-300 font-mono mb-1">
                  <span>Class: LOW RISK</span>
                  <span>{analysis.mlPrediction.ensembleVotes.low}%</span>
                </div>
                <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${analysis.mlPrediction.ensembleVotes.low}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-300 font-mono mb-1">
                  <span>Class: MODERATE RISK</span>
                  <span>{analysis.mlPrediction.ensembleVotes.moderate}%</span>
                </div>
                <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${analysis.mlPrediction.ensembleVotes.moderate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-300 font-mono mb-1">
                  <span>Class: HIGH RISK</span>
                  <span>{analysis.mlPrediction.ensembleVotes.high}%</span>
                </div>
                <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${analysis.mlPrediction.ensembleVotes.high}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-300 font-mono mb-1">
                  <span>Class: VERY HIGH RISK</span>
                  <span>{analysis.mlPrediction.ensembleVotes.veryHigh}%</span>
                </div>
                <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${analysis.mlPrediction.ensembleVotes.veryHigh}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
