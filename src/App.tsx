/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Trek, UserProfile, ChecklistItem, UserPreferences } from './types/trek';
import { TREKS_DATA, POPULAR_LOCATIONS } from './data/treks';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrekCard } from './components/TrekCard';
import { TrekDetailView } from './components/TrekDetailView';
import { MapExplorer } from './components/MapExplorer';
import { GoogleMapsExplorer } from './components/GoogleMapsExplorer';
import { SafetyLab } from './components/SafetyLab';
import { TrekComparison } from './components/TrekComparison';
import { UserDashboard } from './components/UserDashboard';
import { AuthModal } from './components/AuthModal';
import {
  Compass,
  Filter,
  Mountain,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

const INITIAL_USER: UserProfile = {
  id: 'guest-1',
  name: 'Aditi Sharma',
  email: 'aditi.sharma@example.com',
  preferences: {
    fitnessLevel: 'Intermediate',
    preferredDuration: 'Weekend (2 Days)',
    preferredTerrain: ['Forest', 'Grassland'],
    hasMedicalCondition: false,
    medicalNotes: '',
    altitudeExperience: true
  },
  savedTrekIds: ['kudremukh', 'harishchandragad'],
  plannedTreks: [
    {
      trekId: 'kudremukh',
      date: '2026-10-20',
      checklistItems: [],
      savedAt: '2026-10-07T00:00:00.000Z'
    }
  ],
  pastAssessments: [
    {
      id: 'ast-1',
      trekId: 'kudremukh',
      trekName: 'Kudremukh Trek',
      date: '2026-10-20',
      safetyScore: 82,
      riskLevel: 'LOW',
      timestamp: '2026-10-07T00:00:00.000Z'
    }
  ]
};

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedTrek, setSelectedTrek] = useState<Trek | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationAlert, setLocationAlert] = useState<string | null>(null);
  const [isGmpQuotaExceeded, setIsGmpQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setIsGmpQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // User state with LocalStorage caching (null by default if not logged in)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const cached = localStorage.getItem('treksafe_user');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('treksafe_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('treksafe_user');
      }
    } catch (e) {
      console.warn('Unable to cache user in localStorage', e);
    }
  }, [user]);

  // Handle Bookmarks
  const handleToggleBookmark = (trekId: string) => {
    if (!user) {
      setAuthModalMode('login');
      setIsAuthOpen(true);
      return;
    }

    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.savedTrekIds.includes(trekId);
      const updated = exists
        ? prev.savedTrekIds.filter((id) => id !== trekId)
        : [...prev.savedTrekIds, trekId];
      return { ...prev, savedTrekIds: updated };
    });
  };

  // Handle Saving Expedition Plan
  const handleSavePlan = (trekId: string, date: string, items: ChecklistItem[]) => {
    if (!user) {
      setAuthModalMode('login');
      setIsAuthOpen(true);
      return;
    }

    setUser((prev) => {
      if (!prev) return null;
      const existingPlanIdx = prev.plannedTreks.findIndex((p) => p.trekId === trekId);
      const newPlan = {
        trekId,
        date,
        checklistItems: items,
        savedAt: new Date().toISOString()
      };

      let updatedPlans = [...prev.plannedTreks];
      if (existingPlanIdx >= 0) {
        updatedPlans[existingPlanIdx] = newPlan;
      } else {
        updatedPlans = [newPlan, ...updatedPlans];
      }

      return { ...prev, plannedTreks: updatedPlans };
    });
  };

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveView('explore');
  };

  const handleSelectLocationPreset = (location: string) => {
    setSearchQuery(location);
    setActiveView('explore');
  };

  // Geolocation Handler
  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setLocationAlert(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const { latitude, longitude } = pos.coords;
          // Calculate distance to find nearest trek
          let nearestTrek = TREKS_DATA[0];
          let minDistance = Number.MAX_VALUE;

          TREKS_DATA.forEach((trek) => {
            const dx = trek.startPoint.lat - latitude;
            const dy = trek.startPoint.lng - longitude;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDistance) {
              minDistance = dist;
              nearestTrek = trek;
            }
          });

          setSearchQuery(nearestTrek.state);
          setActiveView('explore');
          setLocationAlert(`Located near ${nearestTrek.state}. Showing closest trails.`);
          setTimeout(() => setLocationAlert(null), 4000);
        },
        () => {
          setIsLocating(false);
          setSearchQuery('Karnataka');
          setActiveView('explore');
          setLocationAlert('Location permission unavailable. Showing popular South India trails.');
          setTimeout(() => setLocationAlert(null), 4000);
        },
        { timeout: 8000 }
      );
    } else {
      setIsLocating(false);
      setSearchQuery('Karnataka');
      setActiveView('explore');
    }
  };

  // Filtered Treks logic
  const filteredTreks = TREKS_DATA.filter((trek) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        trek.name.toLowerCase().includes(q) ||
        trek.city.toLowerCase().includes(q) ||
        trek.state.toLowerCase().includes(q) ||
        trek.region.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (difficultyFilter !== 'All' && trek.difficulty !== difficultyFilter) {
      return false;
    }

    if (stateFilter !== 'All' && trek.state !== stateFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-emerald-900 selection:text-white">
      {/* Google Maps Quota Defense Sticky Banner */}
      {isGmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-[900] shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Bar Contract (Navbar) */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          setSelectedTrek(null);
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={user}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode || 'login');
          setIsAuthOpen(true);
        }}
        onLogout={() => {
          setUser(null);
          localStorage.removeItem('treksafe_user');
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {locationAlert && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{locationAlert}</span>
          </div>
        )}

        {/* VIEW: Single Trek Details Page */}
        {selectedTrek ? (
          <TrekDetailView
            trek={selectedTrek}
            onBack={() => setSelectedTrek(null)}
            isBookmarked={user ? user.savedTrekIds.includes(selectedTrek.id) : false}
            onToggleBookmark={handleToggleBookmark}
            onSavePlan={handleSavePlan}
          />
        ) : (
          <>
            {/* VIEW 1: Home View */}
            {activeView === 'home' && (
              <div className="space-y-10">
                <HeroSection
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSearchSubmit={handleSearchSubmit}
                  onSelectLocationPreset={handleSelectLocationPreset}
                  onUseCurrentLocation={handleUseCurrentLocation}
                  isLoadingLocation={isLocating}
                />

                {/* Trending Treks Preview Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                        Popular & Trending Treks in India
                      </h2>
                      <p className="text-xs text-stone-500 mt-0.5">
                        High-rated trails evaluated with live climate models
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveView('explore')}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 w-fit"
                    >
                      View All {TREKS_DATA.length} Treks <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TREKS_DATA.slice(0, 6).map((trek) => (
                      <TrekCard
                        key={trek.id}
                        trek={trek}
                        onSelect={(t) => {
                          setSelectedTrek(t);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        isBookmarked={user ? user.savedTrekIds.includes(trek.id) : false}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))}
                  </div>
                </div>

                {/* Academic AIML Feature Banner */}
                <div className="p-6 rounded-2xl bg-stone-900 text-stone-200 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Machine Learning & Academic Viva Feature
                    </span>
                    <h3 className="font-display text-lg font-bold text-white">
                      Explore the Random Forest Hazard Classifier
                    </h3>
                    <p className="text-xs text-stone-400 max-w-xl">
                      Inspect feature importances (Rainfall 35%, Temperature 20%, Wind 15%), decision tree voting ensembles, and test custom environmental conditions.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveView('safety')}
                    className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                  >
                    Launch ML Sandbox <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 2: Explore Treks with Filters */}
            {activeView === 'explore' && (
              <div className="space-y-6">
                {/* Search & Filter Header */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl font-bold text-stone-900">
                        {searchQuery ? `Trekking Routes in "${searchQuery}"` : 'All Trekking Destinations'}
                      </h2>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Found {filteredTreks.length} routes matching your criteria
                      </p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Filter by city or state..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  {/* Filter Controls (State & Difficulty) */}
                  <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-stone-400 text-[11px]">Difficulty:</span>
                      {['All', 'Easy', 'Moderate', 'Difficult', 'Challenging'].map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setDifficultyFilter(diff)}
                          className={`px-3 py-1 rounded-lg border font-medium transition-colors ${
                            difficultyFilter === diff
                              ? 'bg-emerald-800 text-white border-emerald-800'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-stone-400 text-[11px]">State:</span>
                      <select
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                        className="px-2.5 py-1 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      >
                        <option value="All">All States</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Goa">Goa</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Trek Cards Grid */}
                {filteredTreks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTreks.map((trek) => (
                      <TrekCard
                        key={trek.id}
                        trek={trek}
                        onSelect={(t) => {
                          setSelectedTrek(t);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        isBookmarked={user ? user.savedTrekIds.includes(trek.id) : false}
                        onToggleBookmark={handleToggleBookmark}
                        searchedLocation={searchQuery}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-xs text-stone-500 space-y-3">
                    <Mountain className="w-10 h-10 text-stone-300 mx-auto" />
                    <p className="font-semibold text-stone-700">No treks found for "{searchQuery}".</p>
                    <p>Try searching for Karnataka, Maharashtra, Himachal Pradesh, or clear your filters.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setDifficultyFilter('All');
                        setStateFilter('All');
                      }}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-medium transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 3: National Trail Map Explorer */}
            {activeView === 'map' && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                    Interactive Trail Map & Route Network
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Explore multi-state topo paths, waypoints, water points, and elevation profiles
                  </p>
                </div>
                <MapExplorer
                  onSelectTrek={(t) => {
                    setSelectedTrek(t);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {/* VIEW 3B: Google Maps Platform Satellite & Terrain Explorer */}
            {activeView === 'google-maps' && (
              <div className="space-y-4">
                <GoogleMapsExplorer
                  onSelectTrek={(t) => {
                    setSelectedTrek(t);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {/* VIEW 4: Safety AI & ML Sandbox */}
            {activeView === 'safety' && (
              <SafetyLab />
            )}

            {/* VIEW 5: Trek Comparison Tool */}
            {activeView === 'compare' && (
              <div className="space-y-4">
                <TrekComparison
                  onSelectTrek={(t) => {
                    setSelectedTrek(t);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {/* VIEW 6: User Dashboard & Personalization */}
            {activeView === 'dashboard' && (
              <div className="space-y-4">
                <UserDashboard
                  user={user}
                  onOpenAuth={(mode) => {
                    setAuthModalMode(mode || 'login');
                    setIsAuthOpen(true);
                  }}
                  onUpdatePreferences={(newPrefs) => {
                    setUser((prev) => (prev ? { ...prev, preferences: newPrefs } : null));
                  }}
                  onSelectTrek={(t) => {
                    setSelectedTrek(t);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onRemoveBookmark={handleToggleBookmark}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Modern Mountain Minimalist Footer */}
      <footer className="border-t border-stone-200 bg-white text-stone-600 text-xs py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
              <Mountain className="w-3.5 h-3.5" />
            </div>
            <span className="font-display font-bold text-stone-900 text-sm">TrekSafe</span>
            <span className="text-stone-400 font-mono text-[11px]">· Mountain Risk Intelligence</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-stone-500">
            <span>Universal Emergency Hotline: <strong className="text-stone-900 font-mono">112</strong></span>
            <span>·</span>
            <span>National Disaster Response (NDRF): <strong className="text-stone-900 font-mono">1078</strong></span>
            <span>·</span>
            <span>AIML Project Edition</span>
          </div>

          <div className="text-[11px] text-stone-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} TrekSafe. Informational decision-support aid.
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(loggedUser) => setUser(loggedUser)}
      />
    </div>
  );
}
