import React, { useState } from 'react';
import { ElevationPoint } from '../types/trek';
import { ArrowUpRight, ArrowDownRight, Mountain, TrendingUp } from 'lucide-react';

interface ElevationProfileProps {
  profile: ElevationPoint[];
  maxAltitudeM: number;
  minAltitudeM: number;
  elevationGainM: number;
}

export const ElevationProfile: React.FC<ElevationProfileProps> = ({
  profile,
  maxAltitudeM,
  minAltitudeM,
  elevationGainM
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<ElevationPoint | null>(null);

  if (!profile || profile.length < 2) return null;

  const totalDistance = profile[profile.length - 1].distanceKm;
  const paddingY = 40;
  const paddingX = 40;
  const svgWidth = 650;
  const svgHeight = 220;

  const minElev = Math.max(0, Math.min(...profile.map((p) => p.elevationM)) - 50);
  const maxElev = Math.max(...profile.map((p) => p.elevationM)) + 50;
  const elevRange = maxElev - minElev || 1;

  // Coordinate mapping functions
  const getX = (dist: number) => paddingX + ((dist / totalDistance) * (svgWidth - paddingX * 2));
  const getY = (elev: number) => svgHeight - paddingY - (((elev - minElev) / elevRange) * (svgHeight - paddingY * 2));

  // Build SVG path
  const pointsString = profile.map((p) => `${getX(p.distanceKm)},${getY(p.elevationM)}`).join(' ');
  const areaPath = `M ${getX(profile[0].distanceKm)},${svgHeight - paddingY} L ${pointsString} L ${getX(profile[profile.length - 1].distanceKm)},${svgHeight - paddingY} Z`;
  const linePath = `M ${pointsString}`;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <h4 className="font-display text-base font-bold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            Trail Elevation Profile
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">Topographical cross-section across trail distance</p>
        </div>

        {/* Elevation Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-stone-600">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ascent: <strong className="text-stone-900 tabular-nums">+{elevationGainM}m</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-600">
            <Mountain className="w-3.5 h-3.5 text-amber-600" />
            <span>Peak: <strong className="text-stone-900 tabular-nums">{maxAltitudeM}m</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-600">
            <ArrowDownRight className="w-3.5 h-3.5 text-stone-500" />
            <span>Base: <strong className="text-stone-900 tabular-nums">{minAltitudeM}m</strong></span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative mt-3 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-48 select-none overflow-visible"
        >
          <defs>
            <linearGradient id="elevationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={getY(minElev + elevRange * 0.25)}
            x2={svgWidth - paddingX}
            y2={getY(minElev + elevRange * 0.25)}
            stroke="#f5f5f4"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={getY(minElev + elevRange * 0.75)}
            x2={svgWidth - paddingX}
            y2={getY(minElev + elevRange * 0.75)}
            stroke="#f5f5f4"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={svgHeight - paddingY}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY}
            stroke="#e7e5e4"
          />

          {/* Gradient Filled Area */}
          <path d={areaPath} fill="url(#elevationGrad)" />

          {/* Elevation Stroke Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#047857"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Waypoint points */}
          {profile.map((p, idx) => {
            const cx = getX(p.distanceKm);
            const cy = getY(p.elevationM);
            const isHovered = hoveredPoint?.distanceKm === p.distanceKm;

            return (
              <g
                key={idx}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 3.5}
                  fill={isHovered ? '#047857' : '#ffffff'}
                  stroke="#047857"
                  strokeWidth="2"
                />
                {p.label && (
                  <text
                    x={cx}
                    y={cy - 12}
                    textAnchor="middle"
                    className="text-[10px] font-sans fill-stone-600 font-medium pointer-events-none"
                  >
                    {p.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Axis Labels */}
          <text x={paddingX} y={svgHeight - 12} className="text-[10px] font-mono fill-stone-600">
            0 km ({minAltitudeM}m)
          </text>
          <text x={svgWidth - paddingX} y={svgHeight - 12} textAnchor="end" className="text-[10px] font-mono fill-stone-600">
            {totalDistance} km
          </text>
        </svg>

        {/* Hovered Tooltip Pill */}
        {hoveredPoint && (
          <div className="absolute top-2 right-4 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg font-mono flex items-center gap-3 animate-in fade-in">
            <span>{hoveredPoint.label || 'Waypoint'}</span>
            <span className="text-emerald-400 font-bold">{hoveredPoint.elevationM} m</span>
            <span className="text-stone-400">@ {hoveredPoint.distanceKm} km</span>
          </div>
        )}
      </div>
    </div>
  );
};
