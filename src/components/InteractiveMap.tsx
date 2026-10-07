import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Trek, Waypoint } from '../types/trek';
import { MapPin, Navigation, Droplets, Mountain, AlertTriangle, ShieldAlert } from 'lucide-react';

interface InteractiveMapProps {
  trek: Trek;
  heightClass?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ trek, heightClass = 'h-96' }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up previous instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Map
    const map = L.map(mapContainerRef.current, {
      center: [trek.startPoint.lat, trek.startPoint.lng],
      zoom: 12,
      scrollWheelZoom: false
    });
    mapInstanceRef.current = map;

    // OpenStreetMap Tile Layer (Clean topo/outdoor feel)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    // Custom Icon generator using SVG inline strings
    const createCustomIcon = (bgColor: string, text: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="background-color: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">
            ${text}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16]
      });
    };

    // Add Start Point Marker
    const startMarker = L.marker([trek.startPoint.lat, trek.startPoint.lng], {
      icon: createCustomIcon('#15803d', 'S')
    }).addTo(map);
    startMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
        <strong style="color: #15803d;">Trailhead Start</strong><br/>
        <b>${trek.startPoint.name}</b><br/>
        <span>Elevation: ${trek.startPoint.elevationM} m</span>
      </div>
    `);

    // Add Summit Marker
    const summitMarker = L.marker([trek.summitPoint.lat, trek.summitPoint.lng], {
      icon: createCustomIcon('#dc2626', '▲')
    }).addTo(map);
    summitMarker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 13px; line-height: 1.4;">
        <strong style="color: #dc2626;">Summit / Destination</strong><br/>
        <b>${trek.summitPoint.name}</b><br/>
        <span>Max Altitude: ${trek.summitPoint.elevationM} m</span>
      </div>
    `);

    // Add Waypoints
    trek.waypoints.forEach((wp: Waypoint) => {
      let color = '#2563eb';
      let symbol = '•';
      if (wp.type === 'water') { color = '#0284c7'; symbol = '💧'; }
      else if (wp.type === 'camp') { color = '#d97706'; symbol = '⛺'; }
      else if (wp.type === 'hazard') { color = '#ea580c'; symbol = '⚠️'; }
      else if (wp.type === 'viewpoint') { color = '#7c3aed'; symbol = '👁️'; }

      if (wp.type !== 'start' && wp.type !== 'summit') {
        const marker = L.marker([wp.lat, wp.lng], {
          icon: createCustomIcon(color, symbol)
        }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
            <strong>${wp.name}</strong> (${wp.type.toUpperCase()})<br/>
            <span>Elevation: ${wp.elevationM} m</span><br/>
            <p style="margin: 4px 0 0 0; color: #4b5563;">${wp.description}</p>
          </div>
        `);
      }
    });

    // Draw Trek Path Polyline
    if (trek.routeCoordinates && trek.routeCoordinates.length > 0) {
      const polyline = L.polyline(trek.routeCoordinates, {
        color: '#166534',
        weight: 4,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(map);

      // Fit map bounds to encompass entire route
      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [trek]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm">
      <div ref={mapContainerRef} className={`w-full ${heightClass} z-0`} />

      {/* Floating Map Route Overlay Pill */}
      <div className="absolute top-3 left-3 z-[500] bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-stone-200/80 shadow-md flex items-center gap-4 text-xs">
        <div>
          <span className="text-stone-500 font-mono uppercase tracking-wider block text-[10px]">Distance</span>
          <span className="font-semibold text-stone-900 font-mono text-sm">{trek.distanceKm} km</span>
        </div>
        <div className="w-[1px] h-6 bg-stone-200" />
        <div>
          <span className="text-stone-500 font-mono uppercase tracking-wider block text-[10px]">Est. Time</span>
          <span className="font-semibold text-stone-900 font-mono text-sm">{trek.estimatedDurationHours} hrs</span>
        </div>
        <div className="w-[1px] h-6 bg-stone-200" />
        <div>
          <span className="text-stone-500 font-mono uppercase tracking-wider block text-[10px]">Max Altitude</span>
          <span className="font-semibold text-emerald-800 font-mono text-sm">{trek.maxAltitudeM} m</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-[500] bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-200/80 shadow-sm flex flex-wrap items-center gap-3 text-[11px] text-stone-700">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-700" /> Start</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Summit</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-600" /> Water</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Camp</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-600" /> Ridge Caution</span>
      </div>
    </div>
  );
};
