import React, { useState } from 'react';
import { Trek, UserProfile, UserPreferences, PlannedTrek } from '../types/trek';
import { TREKS_DATA } from '../data/treks';
import {
  User,
  Sliders,
  Bookmark,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  Save,
  ArrowRight,
  HeartPulse
} from 'lucide-react';

interface UserDashboardProps {
  user: UserProfile | null;
  onUpdatePreferences: (prefs: UserPreferences) => void;
  onSelectTrek: (trek: Trek) => void;
  onRemoveBookmark: (trekId: string) => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  onUpdatePreferences,
  onSelectTrek,
  onRemoveBookmark,
  onOpenAuth
}) => {
  if (!user) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-sm text-center max-w-xl mx-auto space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
          <User className="w-7 h-7" />
        </div>

        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
            Explorer Profile & Personalization
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
            Sign in with your Google account or email to unlock personalized trail suggestions, save favorite treks, and manage expedition gear checklists.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <button
            onClick={() => onOpenAuth?.('login')}
            className="w-full py-3 px-4 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs rounded-xl border border-stone-300 shadow-xs transition-all flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Continue with Google Account</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuth?.('login')}
              className="flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl transition-colors"
            >
              Sign In with Email
            </button>
            <button
              onClick={() => onOpenAuth?.('register')}
              className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
            >
              Register New Account
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-6 border-t border-stone-100 text-left text-xs">
          <div className="p-3 rounded-xl bg-stone-50">
            <Bookmark className="w-4 h-4 text-emerald-800 mb-1" />
            <strong className="block text-stone-900 text-[11px]">Bookmark Treks</strong>
            <span className="text-[10px] text-stone-500">Save routes for later review</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-50">
            <Calendar className="w-4 h-4 text-emerald-800 mb-1" />
            <strong className="block text-stone-900 text-[11px]">Expedition Dates</strong>
            <span className="text-[10px] text-stone-500">Plan dates with live risk scores</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-50">
            <Sliders className="w-4 h-4 text-emerald-800 mb-1" />
            <strong className="block text-stone-900 text-[11px]">Personalize</strong>
            <span className="text-[10px] text-stone-500">Custom difficulty tuning</span>
          </div>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'personalization' | 'saved' | 'plans' | 'assessments'>('personalization');
  const [preferences, setPreferences] = useState<UserPreferences>(user.preferences);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePrefChange = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePreferences(preferences);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Personalized Trek Recommendations Engine
  const recommendedTreks = TREKS_DATA.filter((trek) => {
    if (preferences.fitnessLevel === 'Beginner' && (trek.difficulty === 'Challenging' || trek.difficulty === 'Difficult')) {
      return false;
    }
    if (preferences.preferredDuration === 'Day Hike' && trek.durationDays > 1) {
      return false;
    }
    if (preferences.preferredDuration === 'Weekend (2 Days)' && trek.durationDays > 2) {
      return false;
    }
    if (preferences.hasMedicalCondition && trek.maxAltitudeM > 3500) {
      return false;
    }
    return true;
  });

  const savedTreksList = TREKS_DATA.filter((t) => user.savedTrekIds.includes(t.id));

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-lg font-mono overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-stone-900">{user.name}</h3>
              {user.authProvider === 'google' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <svg className="w-3 h-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  Google Account
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 font-mono">{user.email} · Explorer Profile</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setActiveTab('personalization')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'personalization'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Personalization
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Saved ({user.savedTrekIds.length})
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'plans'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            My Plans ({user.plannedTreks.length})
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'assessments'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Risk Log
          </button>
        </div>
      </div>

      {/* Tab 1: Personalization & Fitness Tuning */}
      {activeTab === 'personalization' && (
        <div className="space-y-6">
          <form onSubmit={handleSavePreferences} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fitness Level */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Cardio Fitness & Hiking Experience
                </label>
                <select
                  value={preferences.fitnessLevel}
                  onChange={(e) => handlePrefChange('fitnessLevel', e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Beginner">Beginner (Hikes under 8 km, mild slopes)</option>
                  <option value="Intermediate">Intermediate (10–18 km, 500–1000m elevation gain)</option>
                  <option value="Advanced">Advanced (Multi-day rugged terrains, high passes)</option>
                  <option value="Expert">Expert Mountaineer (Technical climbs, sub-zero snow)</option>
                </select>
              </div>

              {/* Preferred Duration */}
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Preferred Expedition Duration
                </label>
                <select
                  value={preferences.preferredDuration}
                  onChange={(e) => handlePrefChange('preferredDuration', e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Any">Any Duration</option>
                  <option value="Day Hike">Day Hike (Return same day)</option>
                  <option value="Weekend (2 Days)">Weekend (1 Night Camping / 2 Days)</option>
                  <option value="Multi-day Expedition">Multi-day Expedition (3+ Days)</option>
                </select>
              </div>
            </div>

            {/* Medical / Altitude Consideration */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasMedical"
                  checked={preferences.hasMedicalCondition}
                  onChange={(e) => handlePrefChange('hasMedicalCondition', e.target.checked)}
                  className="w-4 h-4 text-emerald-800 rounded border-stone-300 focus:ring-emerald-700"
                />
                <label htmlFor="hasMedical" className="text-xs font-medium text-stone-800 cursor-pointer">
                  I have pre-existing cardiovascular, respiratory (asthma), or joint sensitivities
                </label>
              </div>

              {preferences.hasMedicalCondition && (
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">
                    Specific Medical Notes for Custom Risk Warning:
                  </label>
                  <input
                    type="text"
                    value={preferences.medicalNotes}
                    onChange={(e) => handlePrefChange('medicalNotes', e.target.value)}
                    placeholder="e.g. Mild asthma, history of altitude sickness above 3,000m"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Save Preferences
              </button>

              {saveSuccess && (
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 animate-in fade-in">
                  <CheckCircle className="w-4 h-4" /> Preferences applied to safety recommendations!
                </span>
              )}
            </div>
          </form>

          {/* Personalized Recommendations Stream */}
          <div className="pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <h4 className="font-display text-sm font-bold text-stone-900">
                Tailored Routes Based On Your Profile
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendedTreks.slice(0, 4).map((trek) => (
                <div
                  key={trek.id}
                  onClick={() => onSelectTrek(trek)}
                  className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-700 hover:shadow-sm transition-all cursor-pointer bg-white group flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-semibold text-xs text-stone-900 group-hover:text-emerald-800 transition-colors">
                      {trek.name}
                    </h5>
                    <span className="text-[11px] text-stone-500 font-mono block mt-0.5">
                      {trek.city}, {trek.state} · {trek.distanceKm} km · {trek.difficulty}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saved / Bookmarked Treks */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedTreksList.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs">
              No saved treks yet. Browse treks and click the bookmark button to save for later!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedTreksList.map((trek) => (
                <div
                  key={trek.id}
                  className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-display font-bold text-sm text-stone-900">{trek.name}</h4>
                      <button
                        onClick={() => onRemoveBookmark(trek.id)}
                        className="text-stone-400 hover:text-red-600 text-xs transition-colors"
                        title="Remove from saved"
                      >
                        Remove
                      </button>
                    </div>
                    <span className="text-xs text-stone-500 block mt-0.5">
                      {trek.city}, {trek.state} · {trek.difficulty}
                    </span>
                    <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                      {trek.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-stone-500">
                      Peak: {trek.maxAltitudeM}m
                    </span>
                    <button
                      onClick={() => onSelectTrek(trek)}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 font-sans flex items-center gap-1"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Planned Upcoming Treks */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          {user.plannedTreks.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs">
              No scheduled trek dates. Select a date on any trek details page to add to your expedition schedule!
            </div>
          ) : (
            <div className="space-y-3">
              {user.plannedTreks.map((plan, idx) => {
                const trek = TREKS_DATA.find((t) => t.id === plan.trekId);
                if (!trek) return null;

                const packed = plan.checklistItems.filter((i) => i.packed).length;
                const total = plan.checklistItems.length;
                const pct = total > 0 ? Math.round((packed / total) * 100) : 0;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider block">
                        Scheduled Expedition
                      </span>
                      <h4 className="font-display font-bold text-base text-stone-900 mt-0.5">
                        {trek.name}
                      </h4>
                      <span className="text-xs text-stone-600 font-mono block mt-0.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                        Target Date: {plan.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-xs text-stone-500 block">Checklist Readiness</span>
                        <span className="text-sm font-mono font-bold text-stone-900">{pct}% Ready</span>
                      </div>
                      <button
                        onClick={() => onSelectTrek(trek)}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
                      >
                        Open Planner
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Past Risk Log */}
      {activeTab === 'assessments' && (
        <div className="space-y-3">
          {user.pastAssessments.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs">
              No historical risk checks recorded yet. Run a date-based climate risk analysis on any trek to populate this audit trail.
            </div>
          ) : (
            <div className="divide-y divide-stone-100 text-xs">
              {user.pastAssessments.map((a) => (
                <div key={a.id} className="py-3 flex items-center justify-between">
                  <div>
                    <strong className="text-stone-900 block font-medium">{a.trekName}</strong>
                    <span className="text-stone-500 text-[11px] font-mono">
                      Evaluated for {a.date} · {new Date(a.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-stone-900">{a.safetyScore}/100</span>
                    <span className="text-[10px] text-stone-500 block uppercase">{a.riskLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
