import React, { useState, useEffect } from 'react';
import { Trek, WeatherData, RiskAnalysis, ChecklistItem } from '../types/trek';
import { fetchWeatherForTrek } from '../services/weatherService';
import { calculateTrekRisk } from '../services/riskAnalysis';
import { generateSmartChecklist } from '../services/checklistService';
import { InteractiveMap } from './InteractiveMap';
import {
  APIProvider,
  Map as GoogleMapComponent,
  AdvancedMarker,
  Pin,
  useMap
} from '@vis.gl/react-google-maps';
import { ElevationProfile } from './ElevationProfile';
import { RiskAnalysisCard } from './RiskAnalysisCard';
import { ChecklistSection } from './ChecklistSection';
import { EmergencyModal } from './EmergencyModal';
import {
  ArrowLeft,
  Calendar,
  Compass,
  MapPin,
  Mountain,
  Clock,
  TrendingUp,
  Coins,
  ShieldAlert,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface TrekDetailViewProps {
  trek: Trek;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (trekId: string) => void;
  onSavePlan?: (trekId: string, date: string, items: ChecklistItem[]) => void;
}

export const TrekDetailView: React.FC<TrekDetailViewProps> = ({
  trek,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onSavePlan
}) => {
  // Default date: October 20, 2026 or near future
  const [selectedDate, setSelectedDate] = useState('2026-10-20');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [isLoadingRisk, setIsLoadingRisk] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'risk' | 'map' | 'checklist'>('risk');
  const [mapEngine, setMapEngine] = useState<'google' | 'leaflet'>('google');
  const [copySuccess, setCopySuccess] = useState(false);

  // Evaluate risk when trek or selected date changes
  useEffect(() => {
    let isCancelled = false;

    async function evaluate() {
      setIsLoadingRisk(true);
      try {
        const wData = await fetchWeatherForTrek(trek, selectedDate);
        if (isCancelled) return;
        setWeather(wData);

        const rAnalysis = calculateTrekRisk(trek, wData);
        setAnalysis(rAnalysis);

        const smartList = generateSmartChecklist(trek, wData);
        setChecklist(smartList);
      } catch (err) {
        console.error('Error evaluating trek weather:', err);
      } finally {
        if (!isCancelled) setIsLoadingRisk(false);
      }
    }

    evaluate();

    return () => {
      isCancelled = true;
    };
  }, [trek, selectedDate]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSaveChecklistToPlan = (items: ChecklistItem[]) => {
    if (onSavePlan) {
      onSavePlan(trek.id, selectedDate, items);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Top Breadcrumb & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-3.5 py-2 rounded-xl shadow-sm transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Treks</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            Emergency SOS Directory
          </button>

          <button
            onClick={() => onToggleBookmark(trek.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-emerald-800 text-white border-emerald-800'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
            aria-label="Bookmark trek"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 bg-white text-stone-700 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors"
            title="Share Trek Route"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copySuccess && (
        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-1.5 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4" /> Trail plan link copied to clipboard!
        </div>
      )}

      {/* Trek Hero Card */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200 bg-stone-900 text-white min-h-[320px] flex flex-col justify-end p-6 sm:p-10 shadow-lg">
        {/* Background Image with Scrim */}
        <img
          src={trek.imageUrl}
          alt={trek.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-2">
          {/* Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs font-mono text-stone-300 flex-wrap">
            <span className="text-emerald-400 font-bold uppercase">{trek.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span>{trek.city}, {trek.state}</span>
            <span aria-hidden="true">·</span>
            <span>{trek.distanceKm} km Trail</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-300 font-bold">★ {trek.rating} ({trek.reviewsCount} reviews)</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {trek.name}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed">
            {trek.tagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-300">
            <span>Base: {trek.startPoint.name} ({trek.minAltitudeM}m)</span>
            <span>·</span>
            <span>Summit: {trek.summitPoint.name} ({trek.maxAltitudeM}m)</span>
            <span>·</span>
            <span>Best Window: {trek.bestSeason}</span>
          </div>
        </div>
      </div>

      {/* Fast Navigation Tabs (Risk Analysis, Map & Profile, Smart Gear, Route Overview) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-stone-100 rounded-2xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('risk')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'risk'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          Climate & Risk Analysis
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'map'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-emerald-700" />
          Interactive Trail Map & Elevation
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'checklist'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-emerald-700" />
          Smart Gear Checklist
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-white text-stone-900 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Mountain className="w-3.5 h-3.5 text-emerald-700" />
          Trek Specifications & Terrain
        </button>
      </div>

      {/* TAB 1: Climate Risk & AIML Model Analysis */}
      {activeTab === 'risk' && (
        <div className="space-y-6">
          {weather && analysis ? (
            <RiskAnalysisCard
              trek={trek}
              weather={weather}
              analysis={analysis}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              isLoadingWeather={isLoadingRisk}
            />
          ) : (
            <div className="p-12 text-center text-xs text-stone-400 bg-white rounded-2xl border border-stone-200">
              Retrieving high-resolution meteorological models for {trek.name}...
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Interactive Trail Map & Elevation Profile */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-stone-500 uppercase">Map Rendering Engine</span>
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs font-medium">
              <button
                onClick={() => setMapEngine('google')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  mapEngine === 'google'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Google Maps 3D/Terrain
              </button>
              <button
                onClick={() => setMapEngine('leaflet')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  mapEngine === 'leaflet'
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                OpenStreetMap Topo
              </button>
            </div>
          </div>

          {mapEngine === 'google' ? (
            <div className="rounded-2xl overflow-hidden border border-stone-200 h-[450px]">
              <APIProvider
                apiKey={
                  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ||
                  localStorage.getItem('treksafe_custom_gmp_key') ||
                  'AIzaSyD69Wtsia-eJBpbLjQek6Gz9ciA1xy_i50'
                }
              >
                <GoogleMapComponent
                  mapId="DEMO_MAP_ID"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  defaultCenter={{ lat: trek.startPoint.lat, lng: trek.startPoint.lng }}
                  defaultZoom={12}
                  mapTypeId="terrain"
                  style={{ width: '100%', height: '100%' }}
                >
                  <AdvancedMarker position={{ lat: trek.startPoint.lat, lng: trek.startPoint.lng }}>
                    <Pin background="#15803d" glyphColor="#ffffff" borderColor="#ffffff">
                      <span className="text-[10px] font-bold text-white">S</span>
                    </Pin>
                  </AdvancedMarker>
                  <AdvancedMarker position={{ lat: trek.summitPoint.lat, lng: trek.summitPoint.lng }}>
                    <Pin background="#dc2626" glyphColor="#ffffff" borderColor="#ffffff">
                      <span className="text-[10px] font-bold text-white">▲</span>
                    </Pin>
                  </AdvancedMarker>
                </GoogleMapComponent>
              </APIProvider>
            </div>
          ) : (
            <InteractiveMap trek={trek} heightClass="h-[450px]" />
          )}

          <ElevationProfile
            profile={trek.elevationProfile}
            maxAltitudeM={trek.maxAltitudeM}
            minAltitudeM={trek.minAltitudeM}
            elevationGainM={trek.elevationGainM}
          />
        </div>
      )}

      {/* TAB 3: Dynamic Smart Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <ChecklistSection
            trek={trek}
            weather={weather ?? undefined}
            initialItems={checklist}
            onSaveToPlan={handleSaveChecklistToPlan}
          />
        </div>
      )}

      {/* TAB 4: Comprehensive Trek Specifications & Terrain Details */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Technical Specifications Grid */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
              Trek Specifications & Geography
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-500 uppercase text-[10px] block">Start Trailhead</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{trek.startPoint.name}</span>
                <span className="text-stone-500 text-[11px]">{trek.minAltitudeM}m MSL</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-500 uppercase text-[10px] block">Summit Goal</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{trek.summitPoint.name}</span>
                <span className="text-stone-500 text-[11px]">{trek.maxAltitudeM}m MSL</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-500 uppercase text-[10px] block">Vertical Ascent</span>
                <span className="font-bold text-emerald-800 mt-0.5 block">+{trek.elevationGainM} m</span>
                <span className="text-stone-500 text-[11px]">Cumulative climb</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-500 uppercase text-[10px] block">Endurance Level</span>
                <span className="font-bold text-stone-900 mt-0.5 block">{trek.fitnessLevelRequired}</span>
                <span className="text-stone-500 text-[11px]">Cardio readiness</span>
              </div>
            </div>
          </div>

          {/* Detailed Narrative & Terrain Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
              <div>
                <h4 className="font-display text-base font-bold text-stone-900">Trail Overview</h4>
                <p className="text-xs text-stone-700 leading-relaxed mt-2">
                  {trek.detailedOverview}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <h4 className="font-display text-sm font-bold text-stone-900">Terrain Character & Footing</h4>
                <p className="text-xs text-stone-600 leading-relaxed mt-1">
                  {trek.terrainType}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <h4 className="font-display text-sm font-bold text-stone-900">Wildlife & Environmental Considerations</h4>
                <p className="text-xs text-stone-600 leading-relaxed mt-1">
                  {trek.wildlifeInfo}
                </p>
              </div>
            </div>

            {/* Logistics & Practical Information */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4 text-xs">
              <h4 className="font-display text-base font-bold text-stone-900 pb-2 border-b border-stone-100">
                Logistics & Amenities
              </h4>

              <div>
                <span className="font-semibold text-stone-900 block">Water Sources:</span>
                <span className="text-stone-600 mt-0.5 block">{trek.waterAvailability}</span>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="font-semibold text-stone-900 block">Camping Regulations:</span>
                <span className="text-stone-600 mt-0.5 block">{trek.campingInfo}</span>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="font-semibold text-stone-900 block">Approximate Cost / Budget:</span>
                <span className="font-mono text-stone-900 font-bold mt-0.5 block">
                  ₹{trek.estimatedCostINR.toLocaleString()} INR / person
                </span>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="font-semibold text-stone-900 block mb-1.5">Route Highlights:</span>
                <ul className="space-y-1 text-stone-600">
                  {trek.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Modal */}
      <EmergencyModal
        trek={trek}
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
};
