import React from 'react';
import { EmergencyInfo, Trek } from '../types/trek';
import {
  PhoneCall,
  Hospital,
  ShieldAlert,
  TreePine,
  MapPin,
  X,
  AlertCircle,
  Activity,
  HeartPulse
} from 'lucide-react';

interface EmergencyModalProps {
  trek: Trek;
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ trek, isOpen, onClose }) => {
  if (!isOpen) return null;

  const info: EmergencyInfo = trek.emergencyInfo;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close emergency modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              Emergency & Rescue Directory
            </h3>
            <p className="text-xs text-stone-500">
              Verified local authorities & medical support for {trek.name}
            </p>
          </div>
        </div>

        {/* Universal National SOS Line */}
        <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-5 h-5 text-red-600 animate-pulse" />
            <div>
              <span className="text-xs text-red-800 font-semibold block">National Emergency Number</span>
              <span className="text-lg font-mono font-extrabold text-red-950">112</span>
            </div>
          </div>
          <a
            href="tel:112"
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Call 112
          </a>
        </div>

        {/* Local Verified Contacts */}
        <div className="space-y-3 mt-4 text-xs">
          {/* Nearest Hospital */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <Hospital className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">{info.nearestHospital}</span>
                  <span className="text-stone-500 block text-[11px] mt-0.5">
                    Approx {info.hospitalDistanceKm} km from trailhead · {info.nearestTown}
                  </span>
                </div>
              </div>
              <a
                href={`tel:${info.hospitalPhone.replace(/\s+/g, '')}`}
                className="text-emerald-700 hover:text-emerald-900 font-mono font-medium ml-2 shrink-0 flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" /> {info.hospitalPhone}
              </a>
            </div>
          </div>

          {/* Forest Department Office */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <TreePine className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">{info.forestRangeOffice}</span>
                  <span className="text-stone-500 block text-[11px] mt-0.5">
                    Permits, Search & Rescue, Wildlife Division
                  </span>
                </div>
              </div>
              <a
                href={`tel:${info.forestPhone.replace(/\s+/g, '')}`}
                className="text-emerald-700 hover:text-emerald-900 font-mono font-medium ml-2 shrink-0 flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" /> {info.forestPhone}
              </a>
            </div>
          </div>

          {/* Local Police Station */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">{info.policeStation}</span>
                  <span className="text-stone-500 block text-[11px] mt-0.5">
                    Jurisdiction Station · {info.nearestTown}
                  </span>
                </div>
              </div>
              <a
                href={`tel:${info.policePhone.replace(/\s+/g, '')}`}
                className="text-indigo-700 hover:text-indigo-900 font-mono font-medium ml-2 shrink-0 flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" /> {info.policePhone}
              </a>
            </div>
          </div>
        </div>

        {/* Mountain Wilderness First Aid Protocols */}
        <div className="mt-5 pt-4 border-t border-stone-100">
          <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold mb-2">
            Field First Aid Directives
          </h4>
          <div className="space-y-2 text-[11px] text-stone-600 leading-normal">
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
              <strong className="text-stone-900 block">Acute Mountain Sickness (AMS):</strong>
              Cease ascent immediately upon persistent headache or nausea. Descend minimum 500m to lower altitude; administer hydration and Diamox if prescribed.
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
              <strong className="text-stone-900 block">Sprains or Trail Dislocation:</strong>
              RICE protocol (Rest, Ice/Cold stream water, Compress with crepe bandage, Elevate). Use trekking poles as walking splint.
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
              <strong className="text-stone-900 block">Hypothermia or Sudden Downpour:</strong>
              Strip wet cotton layers immediately. Put on dry thermal wool and enclose in space-blanket/bivy bag away from winds.
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
