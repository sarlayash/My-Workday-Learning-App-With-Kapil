import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [showRestored, setShowRestored] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
    } else if (wasOffline) {
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  if (!isOnline) {
    return (
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-xl bg-amber-950/95 border border-amber-600/60 px-4 py-2.5 text-xs font-semibold text-amber-200 shadow-2xl backdrop-blur-md animate-bounce-short">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <WifiOff className="w-4 h-4 text-amber-400" />
        <div>
          <p className="font-bold text-white">Offline Mode Active</p>
          <p className="text-[11px] text-amber-300/80">30 simulation levels, cached labs, and badge proofs work 100% offline.</p>
        </div>
      </div>
    );
  }

  if (showRestored) {
    return (
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-950/95 border border-emerald-600/60 px-4 py-2.5 text-xs font-semibold text-emerald-200 shadow-2xl backdrop-blur-md">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>Connection Restored — Online</span>
      </div>
    );
  }

  return null;
};
