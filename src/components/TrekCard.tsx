import React, { useState } from 'react';
import { Trek } from '../types/trek';
import { Bookmark, Star, ArrowRight, Mountain, Compass } from 'lucide-react';

interface TrekCardProps {
  trek: Trek;
  onSelect: (trek: Trek) => void;
  isBookmarked: boolean;
  onToggleBookmark: (trekId: string) => void;
  searchedLocation?: string;
}

export const TrekCard: React.FC<TrekCardProps> = ({
  trek,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  searchedLocation
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-800/40 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Card Image Banner */}
        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
          {!imageError ? (
            <img
              src={trek.imageUrl}
              alt={trek.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-500">
              <Mountain className="w-8 h-8 text-stone-400 mb-1" />
              <span className="text-xs font-mono">{trek.name}</span>
            </div>
          )}

          {/* Bookmark Action Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(trek.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
              isBookmarked
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white/80 text-stone-700 hover:bg-white'
            }`}
            aria-label={isBookmarked ? 'Remove from saved treks' : 'Save trek'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Rating Tag */}
          <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-bold">{trek.rating}</span>
            <span className="text-stone-400">({trek.reviewsCount})</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Unboxed Metadata Line with typographic separators (anti-slop rule) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mb-1.5 flex-wrap">
            <span className="text-emerald-800 font-semibold">{trek.difficulty}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{trek.distanceKm} km trail</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{trek.durationDays > 1 ? `${trek.durationDays} Days` : 'Day Hike'}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="tabular-nums">{trek.maxAltitudeM}m peak</span>
          </div>

          <h3 className="font-display text-lg font-bold text-stone-900 group-hover:text-emerald-850 transition-colors">
            {trek.name}
          </h3>

          <p className="text-xs text-stone-500 mt-0.5">
            {trek.city}, {trek.state}
            {searchedLocation && ` · Region: ${trek.region}`}
          </p>

          <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
            {trek.shortDescription}
          </p>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span>Best Season:</span>
            <span className="font-medium text-stone-800">{trek.bestSeason}</span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-5 pb-5 pt-0">
        <button
          type="button"
          onClick={() => onSelect(trek)}
          className="w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-emerald-800 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-emerald-800 group-hover:text-white shadow-sm"
        >
          <span>View Details & Risk Analysis</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
