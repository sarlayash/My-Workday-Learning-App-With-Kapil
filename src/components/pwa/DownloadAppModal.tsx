import React from 'react';
import { 
  Download, 
  X, 
  Smartphone, 
  Laptop, 
  WifiOff, 
  CheckCircle2, 
  Share, 
  PlusSquare, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isStandalone, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-sky-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <img src="/pwa-192x192.png" alt="Workday App Icon" className="w-9 h-9 object-contain" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">Download & Install App</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Offline Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">Workday Simulator: Zero to Infinity Journey with Kapil</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Status banner */}
          {isStandalone || isInstalled ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-300">App Already Installed & Running</p>
                <p className="text-xs text-emerald-400/80 mt-1">
                  You are currently using the standalone version or have already saved this app. All 30 levels and interactive labs are cached for offline study!
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/50 to-blue-950/30 border border-sky-800/40 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Install directly from your browser
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Zero app-store friction. Runs as a high-performance desktop or mobile app.
                </p>
              </div>

              {isInstallable && (
                <button
                  onClick={handleInstallClick}
                  className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 transition shrink-0 ml-3"
                >
                  Install Now
                </button>
              )}
            </div>
          )}

          {/* Key Advantages Checklist */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-2.5">
              <WifiOff className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">100% Offline Capable</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Study all 30 hours on flights, commutes, or remote areas without internet.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">Local Progress Storage</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Your completed levels, labs, and unlocked badges stay saved safely.</p>
              </div>
            </div>
          </div>

          {/* Platform Specific Step-by-Step Guides */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Installation Instructions by Device
            </h4>

            {/* Desktop Guide */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Laptop className="w-4 h-4 text-sky-400" />
                <span>Chrome, Brave & Edge (macOS / Windows / Linux)</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside pl-1">
                <li>Look for the <span className="font-semibold text-sky-300">Install icon (⊕ or 💻)</span> on the right side of your browser address bar.</li>
                <li>Click <span className="font-semibold text-white">"Install Workday Simulator"</span> or click the top right <strong className="text-sky-300">Download App</strong> button.</li>
                <li>The app opens immediately in its own borderless window and adds an icon to your desktop/dock.</li>
              </ol>
            </div>

            {/* iOS Guide */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>Apple iOS (iPhone / iPad with Safari)</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside pl-1">
                <li>In Safari, tap the <span className="inline-flex items-center gap-1 font-semibold text-indigo-300"><Share className="w-3.5 h-3.5 inline" /> Share</span> icon at the bottom of the screen.</li>
                <li>Scroll down the menu and tap <span className="inline-flex items-center gap-1 font-semibold text-white"><PlusSquare className="w-3.5 h-3.5 inline" /> "Add to Home Screen"</span>.</li>
                <li>Confirm by tapping <strong className="text-white">Add</strong> in the top right. Launch anytime directly from your Home Screen!</li>
              </ol>
            </div>

            {/* Android Guide */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Android (Chrome)</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside pl-1">
                <li>Tap the <strong className="text-slate-200">three dots menu (⋮)</strong> in Chrome top right corner.</li>
                <li>Select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.</li>
                <li>Tap <strong className="text-emerald-400">Install</strong>. The app will be placed on your home launcher with its native icon.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated by Kapil Narula • Fortune 500 Ready</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
