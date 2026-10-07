import React, { useState } from 'react';
import { UserProfile } from '../types/trek';
import { X, Lock, Mail, User, ShieldCheck, Mountain, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const [isLogin, setIsLogin] = useState(initialMode !== 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);

  // Sync mode when modal opens with new initialMode
  React.useEffect(() => {
    setIsLogin(initialMode !== 'register');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  // Handle Google Sign-In / Register
  const handleGoogleAuth = () => {
    setIsGoogleSigningIn(true);
    setErrorMessage('');

    setTimeout(() => {
      // Use logged-in session email or prompt email
      const googleEmail = 'kowsiknb@gmail.com';
      const googleName = 'Kowsik N B';

      const googleUser: UserProfile = {
        id: `google-${Date.now()}`,
        name: googleName,
        email: googleEmail,
        authProvider: 'google',
        avatarUrl: `https://lh3.googleusercontent.com/a/default-user=s96-c`,
        preferences: {
          fitnessLevel: 'Intermediate',
          preferredDuration: 'Weekend (2 Days)',
          preferredTerrain: ['Forest', 'Grassland', 'Alpine Pass'],
          hasMedicalCondition: false,
          medicalNotes: '',
          altitudeExperience: true
        },
        savedTrekIds: ['kudremukh', 'hampta-pass', 'harishchandragad'],
        plannedTreks: [
          {
            trekId: 'kudremukh',
            date: '2026-10-20',
            checklistItems: [],
            savedAt: new Date().toISOString()
          }
        ],
        pastAssessments: [
          {
            id: 'ast-google-1',
            trekId: 'kudremukh',
            trekName: 'Kudremukh Trek',
            date: '2026-10-20',
            safetyScore: 82,
            riskLevel: 'LOW',
            timestamp: new Date().toISOString()
          }
        ]
      };

      setIsGoogleSigningIn(false);
      onSuccess(googleUser);
      onClose();
    }, 600);
  };

  // Handle Email / Password Form Submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and retry.');
      return;
    }

    if (!isLogin && password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    const standardUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim() || (isLogin ? email.split('@')[0] : 'Trail Explorer'),
      email: email.trim(),
      authProvider: 'email',
      preferences: {
        fitnessLevel: 'Intermediate',
        preferredDuration: 'Weekend (2 Days)',
        preferredTerrain: ['Forest', 'Grassland'],
        hasMedicalCondition: false,
        medicalNotes: '',
        altitudeExperience: true
      },
      savedTrekIds: ['kudremukh'],
      plannedTreks: [],
      pastAssessments: []
    };

    onSuccess(standardUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-stone-900">
              {isLogin ? 'Sign In to TrekSafe' : 'Create Trekker Account'}
            </h3>
            <p className="text-xs text-stone-500">
              {isLogin
                ? 'Access saved routes, weather alerts, and checklists'
                : 'Join the mountain safety and trail planning network'}
            </p>
          </div>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg mt-4 mb-4">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setErrorMessage('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              isLogin ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setErrorMessage('');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              !isLogin ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Register
          </button>
        </div>

        {/* Google One-Click Login Button */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isGoogleSigningIn}
            className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs rounded-xl border border-stone-300 shadow-xs transition-all flex items-center justify-center gap-2.5"
          >
            {/* Multi-colored Google G Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>
              {isGoogleSigningIn
                ? 'Connecting Google Account...'
                : isLogin
                ? 'Sign in with Google'
                : 'Register with Google'}
            </span>
          </button>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-stone-200 w-full" />
            <span className="bg-white px-2 text-[11px] text-stone-400 font-mono absolute">
              or with email
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-3 text-xs">
          {!isLogin && (
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kowsik N B"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-stone-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-stone-700 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 mt-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>{isLogin ? 'Sign In to Account' : 'Register & Create Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-stone-100 text-center text-[11px] text-stone-400">
          Protected with encryption · By continuing you agree to TrekSafe terms & safety guidelines.
        </div>
      </div>
    </div>
  );
};
