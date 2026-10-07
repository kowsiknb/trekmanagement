import React, { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap
} from '@vis.gl/react-google-maps';
import { Trek, Waypoint } from '../types/trek';
import { TREKS_DATA } from '../data/treks';
import {
  Compass,
  Layers,
  Mountain,
  ArrowRight,
  Droplets,
  Tent,
  AlertTriangle,
  Eye,
  CheckCircle2
} from 'lucide-react';

// Embedded Map API Key
const MAP_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ||
  'AIzaSyD69Wtsia-eJBpbLjQek6Gz9ciA1xy_i50';

interface GoogleMapsExplorerProps {
  onSelectTrek: (trek: Trek) => void;
  initialTrek?: Trek;
}

// Subcomponent to draw the Polyline route on the Map
const TrekRoutePolyline: React.FC<{ coordinates: [number, number][]; map: google.maps.Map | null }> = ({
  coordinates,
  map
}) => {
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !coordinates || coordinates.length === 0) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const path = coordinates.map(([lat, lng]) => ({ lat, lng }));

    const polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#15803d',
      strokeOpacity: 0.9,
      strokeWeight: 5
    });

    polyline.setMap(map);
    polylineRef.current = polyline;

    // Fit map bounds to polyline
    const bounds = new google.maps.LatLngBounds();
    path.forEach((pt) => bounds.extend(pt));
    map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });

    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
    };
  }, [map, coordinates]);

  return null;
};

const MapController: React.FC<{ trek: Trek }> = ({ trek }) => {
  const map = useMap();
  return <TrekRoutePolyline coordinates={trek.routeCoordinates} map={map} />;
};

export const GoogleMapsExplorer: React.FC<GoogleMapsExplorerProps> = ({
  onSelectTrek,
  initialTrek
}) => {
  const [selectedTrek, setSelectedTrek] = useState<Trek>(initialTrek || TREKS_DATA[0]);
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);
  const [mapType, setMapType] = useState<string>('terrain');
  const [filterRegion, setFilterRegion] = useState<string>('All');

  const filteredTreks =
    filterRegion === 'All'
      ? TREKS_DATA
      : TREKS_DATA.filter(
          (t) => t.state === filterRegion || t.region.includes(filterRegion)
        );

  return (
    <div className="space-y-4">
      {/* Map Top Bar Controls */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-800" />
            <h2 className="font-display text-lg font-bold text-stone-900">
              Interactive Mountain Map & Trails
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Photorealistic satellite terrain, 3D contours, elevation checkpoints, and trail waypoints
          </p>
        </div>

        {/* Map Layer Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs font-medium">
          <button
            onClick={() => setMapType('terrain')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mapType === 'terrain'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Terrain Contours
          </button>
          <button
            onClick={() => setMapType('hybrid')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mapType === 'hybrid'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Satellite Hybrid
          </button>
          <button
            onClick={() => setMapType('roadmap')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              mapType === 'roadmap'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Roadmap
          </button>
        </div>
      </div>

      {/* Main Map + Sidebar Container */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col lg:flex-row h-[700px]">
        {/* Left Trail Directory & Details */}
        <div className="w-full lg:w-96 border-b lg:border-b-0 lg:border-r border-stone-200 flex flex-col h-full bg-stone-50/50">
          <div className="p-4 border-b border-stone-200 bg-white">
            <h3 className="font-display font-bold text-sm text-stone-900">
              Select Route to Inspect
            </h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Click any trail to fly-to and load mountain waypoints
            </p>

            {/* Region Filter */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
              {['All', 'Karnataka', 'Maharashtra', 'Himachal Pradesh', 'Uttarakhand', 'Kerala'].map(
                (reg) => (
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
                )
              )}
            </div>
          </div>

          {/* Trail List */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 p-2 space-y-1">
            {filteredTreks.map((trek) => {
              const isSelected = trek.id === selectedTrek.id;
              return (
                <div
                  key={trek.id}
                  onClick={() => {
                    setSelectedTrek(trek);
                    setSelectedWaypoint(null);
                  }}
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

          {/* Active Trail Information Footer */}
          <div className="p-4 border-t border-stone-200 bg-white space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 font-semibold uppercase block">
                  Active Mountain Trail
                </span>
                <h4 className="font-display font-bold text-sm text-stone-900 mt-0.5">
                  {selectedTrek.name}
                </h4>
              </div>
              <button
                onClick={() => onSelectTrek(selectedTrek)}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
              >
                Trek Details <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[11px]">
              <div className="p-1.5 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-stone-400 block text-[9px]">DISTANCE</span>
                <span className="font-bold text-stone-900">{selectedTrek.distanceKm} km</span>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-stone-400 block text-[9px]">PEAK</span>
                <span className="font-bold text-emerald-800">{selectedTrek.maxAltitudeM}m</span>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-50 border border-stone-200/60">
                <span className="text-stone-400 block text-[9px]">ASCENT</span>
                <span className="font-bold text-stone-900">+{selectedTrek.elevationGainM}m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Map Viewport */}
        <div className="flex-1 relative h-full">
          <APIProvider apiKey={MAP_API_KEY}>
            <Map
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              defaultCenter={{
                lat: selectedTrek.startPoint.lat,
                lng: selectedTrek.startPoint.lng
              }}
              defaultZoom={12}
              mapTypeId={mapType}
              style={{ width: '100%', height: '100%' }}
              gestureHandling="greedy"
              disableDefaultUI={false}
            >
              <MapController trek={selectedTrek} />

              {/* Start Point Marker */}
              <AdvancedMarker
                position={{
                  lat: selectedTrek.startPoint.lat,
                  lng: selectedTrek.startPoint.lng
                }}
                onClick={() =>
                  setSelectedWaypoint({
                    id: 'start-point',
                    name: `Trailhead: ${selectedTrek.startPoint.name}`,
                    type: 'start',
                    lat: selectedTrek.startPoint.lat,
                    lng: selectedTrek.startPoint.lng,
                    elevationM: selectedTrek.startPoint.elevationM,
                    description: 'Official trail start and permit verification point'
                  })
                }
              >
                <Pin background="#15803d" glyphColor="#ffffff" borderColor="#ffffff">
                  <span className="text-[10px] font-bold text-white">S</span>
                </Pin>
              </AdvancedMarker>

              {/* Summit Marker */}
              <AdvancedMarker
                position={{
                  lat: selectedTrek.summitPoint.lat,
                  lng: selectedTrek.summitPoint.lng
                }}
                onClick={() =>
                  setSelectedWaypoint({
                    id: 'summit-point',
                    name: `Summit: ${selectedTrek.summitPoint.name}`,
                    type: 'summit',
                    lat: selectedTrek.summitPoint.lat,
                    lng: selectedTrek.summitPoint.lng,
                    elevationM: selectedTrek.summitPoint.elevationM,
                    description: `Highest peak elevation: ${selectedTrek.maxAltitudeM}m MSL`
                  })
                }
              >
                <Pin background="#dc2626" glyphColor="#ffffff" borderColor="#ffffff">
                  <span className="text-[10px] font-bold text-white">▲</span>
                </Pin>
              </AdvancedMarker>

              {/* Intermediate Waypoint Markers */}
              {selectedTrek.waypoints.map((wp) => {
                if (wp.type === 'start' || wp.type === 'summit') return null;

                let pinColor = '#2563eb';
                let glyph = '•';
                if (wp.type === 'water') {
                  pinColor = '#0284c7';
                  glyph = 'W';
                } else if (wp.type === 'camp') {
                  pinColor = '#d97706';
                  glyph = 'C';
                } else if (wp.type === 'hazard') {
                  pinColor = '#ea580c';
                  glyph = '!';
                } else if (wp.type === 'viewpoint') {
                  pinColor = '#7c3aed';
                  glyph = 'V';
                }

                return (
                  <AdvancedMarker
                    key={wp.id}
                    position={{ lat: wp.lat, lng: wp.lng }}
                    onClick={() => setSelectedWaypoint(wp)}
                  >
                    <Pin background={pinColor} glyphColor="#ffffff" borderColor="#ffffff">
                      <span className="text-[9px] font-bold text-white">{glyph}</span>
                    </Pin>
                  </AdvancedMarker>
                );
              })}

              {/* Waypoint InfoWindow */}
              {selectedWaypoint && (
                <InfoWindow
                  position={{
                    lat: selectedWaypoint.lat,
                    lng: selectedWaypoint.lng
                  }}
                  onCloseClick={() => setSelectedWaypoint(null)}
                >
                  <div className="p-1 max-w-[220px] font-sans text-xs">
                    <strong className="text-stone-900 block font-semibold">
                      {selectedWaypoint.name}
                    </strong>
                    <span className="text-emerald-700 font-mono text-[11px] block mt-0.5">
                      Elevation: {selectedWaypoint.elevationM} m
                    </span>
                    <p className="text-stone-600 text-[11px] mt-1 leading-normal">
                      {selectedWaypoint.description}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>

          {/* Floating Map Legend */}
          <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200/80 shadow-md flex items-center gap-3 text-[11px] text-stone-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" /> Start (S)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Summit (▲)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" /> Water (W)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Camp (C)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600" /> Hazard (!)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
