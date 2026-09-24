import React, { useState } from 'react';
import { Download, CheckCircle2, Smartphone, ArrowDownToLine, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { DownloadAppModal } from './DownloadAppModal';

interface PWAInstallButtonProps {
  variant?: 'header' | 'hero' | 'floating' | 'footer';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'header',
  className = '' 
}) => {
  const { isInstallable, isInstalled, isStandalone, isIOS, install } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        // If dismissed or fell back, open instructions modal
        setModalOpen(true);
      }
    } else {
      setModalOpen(true);
    }
  };

  // If already running in standalone PWA window, render a subtle indicator or modal trigger
  if (isStandalone) {
    if (variant === 'header') {
      return (
        <>
          <button
            onClick={() => setModalOpen(true)}
            title="App installed and offline-ready"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 hover:text-emerald-300 text-xs font-semibold transition ${className}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Installed (Offline)</span>
          </button>
          <DownloadAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
      );
    }
    return null;
  }

  // Hero variant
  if (variant === 'hero') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-sky-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0 ${className}`}
        >
          <ArrowDownToLine className="w-4 h-4" />
          <span>Download App / Offline Mode</span>
          <span className="text-[10px] bg-slate-950/20 px-2 py-0.5 rounded-full font-mono font-bold">
            PWA
          </span>
        </button>
        <DownloadAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // Header variant
  return (
    <>
      <button
        onClick={handleClick}
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold tracking-tight shadow-md shadow-sky-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] ${className}`}
      >
        <Download className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
        <span>Install App</span>
        <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white">
          Offline
        </span>
      </button>

      <DownloadAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
