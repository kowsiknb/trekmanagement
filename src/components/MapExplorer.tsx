import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Trek } from '../types/trek';
import { TREKS_DATA } from '../data/treks';
import { MapPin, Navigation, Mountain, ArrowRight, Compass, Filter } from 'lucide-react';

interface MapExplorerProps {
  onSelectTrek: (trek: Trek) => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ onSelectTrek }) => {
  const [selectedTrek, setSelectedTrek] = useState<Trek>(TREKS_DATA[0]);
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activePolylineRef = useRef<L.Polyline | null>(null);

  const filteredTreks = filterRegion === 'All'
    ? TREKS_DATA
    : TREKS_DATA.filter((t) => t.state === filterRegion || t.region.includes(filterRegion));

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [selectedTrek.startPoint.lat, selectedTrek.startPoint.lng],
      zoom: 7,
      scrollWheelZoom: true
    });
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    // Add markers for all treks
    TREKS_DATA.forEach((trek) => {
      const isCurrent = trek.id === selectedTrek.id;
      const markerHtml = `
        <div style="background-color: ${isCurrent ? '#166534' : '#334155'}; width: ${isCurrent ? '32px' : '24px'}; height: ${isCurrent ? '32px' : '24px'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); transition: all 0.2s;">
          ▲
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-all-marker',
        html: markerHtml,
        iconSize: isCurrent ? [32, 32] : [24, 24],
        iconAnchor: isCurrent ? [16, 16] : [12, 12]
      });

      const m = L.marker([trek.startPoint.lat, trek.startPoint.lng], { icon }).addTo(map);
      m.on('click', () => {
        setSelectedTrek(trek);
      });
      m.bindTooltip(`<b>${trek.name}</b><br/>${trek.state} · ${trek.difficulty}`);
    });

    // Draw active trail route
    if (selectedTrek.routeCoordinates && selectedTrek.routeCoordinates.length > 0) {
      if (activePolylineRef.current) {
        activePolylineRef.current.remove();
      }
      activePolylineRef.current = L.polyline(selectedTrek.routeCoordinates, {
        color: '#15803d',
        weight: 5,
        opacity: 0.9,
        dashArray: '6, 8'
      }).addTo(map);

      map.flyToBounds(activePolylineRef.current.getBounds(), { padding: [50, 50], duration: 1.2 });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedTrek]);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col lg:flex-row h-[700px]">
      {/* Sidebar Trek Directory */}
      <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col h-full bg-stone-50/50">
        <div className="p-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-800" />
            <h3 className="font-display font-bold text-sm text-stone-900">National Trail Registry</h3>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Click any pin to inspect the topography and trail path
          </p>

          {/* Region Filter */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
            {['All', 'Karnataka', 'Maharashtra', 'Himachal Pradesh', 'Uttarakhand', 'Kerala'].map((reg) => (
              <button
                key={reg}
                onClick={() => setFilterRegion(reg)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors whitespace-nowrap ${
                  filterRegion === reg
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Trail List */}
        <div className="flex-1 overflow-y-auto divide-y divide-stone-100 p-2 space-y-1">
          {filteredTreks.map((trek) => {
            const isSelected = trek.id === selectedTrek.id;
            return (
              <div
                key={trek.id}
                onClick={() => setSelectedTrek(trek)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-emerald-50/80 border border-emerald-200 text-stone-900 shadow-xs'
                    : 'bg-white hover:bg-stone-100/80 border border-stone-200/60 text-stone-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-xs text-stone-900">{trek.name}</h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-800">
                    {trek.difficulty}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 font-mono mt-1 flex items-center gap-2">
                  <span>{trek.city}, {trek.state}</span>
                  <span>·</span>
                  <span>{trek.distanceKm} km</span>
                  <span>·</span>
                  <span>{trek.maxAltitudeM}m</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Trail Quick Inspection Panel */}
        <div className="p-4 border-t border-stone-200 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-800 font-semibold uppercase block">
                Active Map Target
              </span>
              <h4 className="font-display font-bold text-sm text-stone-900 mt-0.5">
                {selectedTrek.name}
              </h4>
            </div>
            <button
              onClick={() => onSelectTrek(selectedTrek)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
            >
              Full Details <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Viewport */}
      <div className="flex-1 relative h-full">
        <div ref={mapContainerRef} className="w-full h-full z-0" />
      </div>
    </div>
  );
};
