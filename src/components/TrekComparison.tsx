import React, { useState } from 'react';
import { Trek, RiskLevel } from '../types/trek';
import { TREKS_DATA } from '../data/treks';
import { GitCompare, Mountain, Check, X, Shield, Award, Sparkles, TrendingUp } from 'lucide-react';

interface TrekComparisonProps {
  initialTrekIds?: string[];
  onSelectTrek?: (trek: Trek) => void;
}

export const TrekComparison: React.FC<TrekComparisonProps> = ({
  initialTrekIds = ['kudremukh', 'tadiandamol', 'harishchandragad'],
  onSelectTrek
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialTrekIds);

  const comparedTreks = TREKS_DATA.filter((t) => selectedIds.includes(t.id));

  const toggleTrek = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((tId) => tId !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  // Determine badges dynamically
  const getBadgeForTrek = (trek: Trek) => {
    if (trek.difficulty === 'Easy') return { label: 'Best for Beginners', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (trek.difficulty === 'Challenging' || trek.maxAltitudeM > 4000) return { label: 'Most Challenging', color: 'bg-red-100 text-red-800 border-red-300' };
    if (trek.rating >= 4.8 && trek.elevationGainM > 1000) return { label: 'Most Scenic Crest', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
    return { label: 'Popular Choice', color: 'bg-stone-100 text-stone-800 border-stone-300' };
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-emerald-700" />
            <h3 className="font-display text-lg font-bold text-stone-900">
              Comparative Trek Analysis Matrix
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Evaluate routes side-by-side on endurance, altitude, season, and terrain
          </p>
        </div>

        {/* Quick Trek Selector pills */}
        <div className="flex flex-wrap gap-1.5">
          {TREKS_DATA.map((t) => {
            const isSelected = selectedIds.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggleTrek(t.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="py-3 px-4 font-mono uppercase tracking-wider text-stone-500 w-36 bg-stone-50/50">
                Metric / Trail
              </th>
              {comparedTreks.map((trek) => {
                const badge = getBadgeForTrek(trek);
                return (
                  <th key={trek.id} className="py-3 px-4 min-w-[200px] align-top">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border mb-1.5 ${badge.color}`}>
                      {badge.label}
                    </span>
                    <div className="font-display text-sm font-bold text-stone-900">
                      {trek.name}
                    </div>
                    <div className="text-[11px] text-stone-500 font-normal">
                      {trek.city}, {trek.state}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 font-sans">
            {/* Distance */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Total Trail Distance
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4 font-mono font-bold text-stone-900">
                  {t.distanceKm} km
                </td>
              ))}
            </tr>

            {/* Difficulty */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Difficulty Rating
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4">
                  <span
                    className={`font-semibold ${
                      t.difficulty === 'Easy'
                        ? 'text-emerald-700'
                        : t.difficulty === 'Moderate'
                        ? 'text-amber-700'
                        : 'text-red-700'
                    }`}
                  >
                    {t.difficulty}
                  </span>
                  <span className="text-[11px] text-stone-400 block mt-0.5">Req: {t.fitnessLevelRequired}</span>
                </td>
              ))}
            </tr>

            {/* Duration */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Estimated Duration
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4 font-mono text-stone-700">
                  {t.durationDays} Day ({t.estimatedDurationHours} hrs hike)
                </td>
              ))}
            </tr>

            {/* Max Elevation & Gain */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Peak & Elevation Gain
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4 font-mono">
                  <div className="font-bold text-stone-900">{t.maxAltitudeM} m peak</div>
                  <div className="text-[11px] text-emerald-700">+{t.elevationGainM}m ascent</div>
                </td>
              ))}
            </tr>

            {/* Best Season */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Optimal Season
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4 text-stone-700">
                  {t.bestSeason}
                </td>
              ))}
            </tr>

            {/* Terrain Character */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Terrain Character
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4 text-stone-600 text-[11px] leading-relaxed">
                  {t.terrainType}
                </td>
              ))}
            </tr>

            {/* Camping Allowed */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Summit Camping
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4">
                  {t.campingAllowed ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Permitted
                    </span>
                  ) : (
                    <span className="text-stone-500 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Restricted (Day Hikes)
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Est Budget */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Estimated Cost
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4 font-mono font-semibold text-stone-900">
                  ₹{t.estimatedCostINR.toLocaleString()}
                </td>
              ))}
            </tr>

            {/* Action */}
            <tr>
              <td className="py-3 px-4 font-mono font-medium text-stone-500 bg-stone-50/30">
                Full Details
              </td>
              {comparedTreks.map((t) => (
                <td key={t.id} className="py-3 px-4">
                  {onSelectTrek && (
                    <button
                      onClick={() => onSelectTrek(t)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
