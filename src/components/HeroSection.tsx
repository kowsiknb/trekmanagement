import React, { useState } from 'react';
import { Search, MapPin, Navigation, Sparkles, Compass } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/treks';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onSelectLocationPreset: (location: string) => void;
  onUseCurrentLocation: () => void;
  isLoadingLocation?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onSelectLocationPreset,
  onUseCurrentLocation,
  isLoadingLocation = false
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white min-h-[420px] flex flex-col justify-center px-6 sm:px-12 py-12 border border-stone-200/40 shadow-xl">
      {/* Background Hero Image with Measured Scrim */}
      <img
        src="/src/assets/images/hero_mountain_summit_1791358360527.jpg"
        alt="Mountain Peaks and Alpine Trails"
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-900/60" />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl space-y-4">
        {/* Anti-slop clean typography kicker */}
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
          <span>Mountain Intelligence & Weather Risk Engine</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
          Discover Your Next Adventure
        </h1>

        <p className="text-sm sm:text-base text-stone-300 font-normal leading-relaxed max-w-2xl">
          Search any city or state across India. Analyze date-specific climate risk, explore high-precision topographical routes, and generate intelligent gear checklists backed by Random Forest ML hazard prediction.
        </p>

        {/* Search Bar Input */}
        <form onSubmit={onSearchSubmit} className="pt-2">
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 border border-stone-200 text-stone-900">
            <div className="flex-1 flex items-center gap-2.5 px-3 py-1.5">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Enter city or state (e.g. Bengaluru, Karnataka, Himachal, Maharashtra...)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full text-xs sm:text-sm bg-transparent border-none text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onUseCurrentLocation}
                disabled={isLoadingLocation}
                className="px-3.5 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
                title="Detect nearest treks using your location"
              >
                <Navigation className={`w-3.5 h-3.5 text-emerald-800 ${isLoadingLocation ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Near Me</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-all flex items-center justify-center whitespace-nowrap"
              >
                Explore Treks
              </button>
            </div>
          </div>
        </form>

        {/* Popular Locations Quick Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-400 font-mono text-[11px]">Popular:</span>
          {POPULAR_LOCATIONS.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => onSelectLocationPreset(loc)}
              className="px-2.5 py-1 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 text-xs border border-stone-700 transition-colors"
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
