import React, { useState } from 'react';
import { Badge } from '../../types/workday';
import { Award, Shield, CheckCircle2, Lock, Download, Sparkles, Building2, GitBranch, ShieldCheck, LineChart, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BadgesShowcaseProps {
  badges: Badge[];
  completedHours: number;
  completedLevels: number[];
  onSelectLevel?: (levelId: number) => void;
}

export const BadgesShowcase: React.FC<BadgesShowcaseProps> = ({
  badges,
  completedHours,
  completedLevels,
  onSelectLevel,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const getIcon = (iconName: string, tier: string) => {
    const props = { className: 'w-7 h-7' };
    switch (iconName) {
      case 'Building2': return <Building2 {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'LineChart': return <LineChart {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      default: return <Award {...props} />;
    }
  };

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return 'from-amber-900/60 via-amber-700/40 to-amber-950/60 border-amber-600/50 text-amber-300';
      case 'Silver':
        return 'from-slate-700/60 via-slate-500/40 to-slate-800/60 border-slate-400/50 text-slate-200';
      case 'Titanium':
        return 'from-sky-900/60 via-sky-600/40 to-slate-900/60 border-sky-400/50 text-sky-300';
      case 'Gold':
        return 'from-yellow-700/60 via-amber-500/40 to-amber-900/60 border-amber-400/60 text-amber-200';
      case 'Platinum':
        return 'from-purple-900/60 via-indigo-600/40 to-slate-950/60 border-purple-400/50 text-purple-200';
      case 'Diamond':
        return 'from-cyan-900/60 via-teal-500/40 to-blue-950/60 border-cyan-400/70 text-cyan-200';
      default:
        return 'from-slate-800 via-slate-700 to-slate-900 border-slate-600 text-slate-300';
    }
  };

  const downloadBadgePNG = (badge: Badge) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0B1120';
    ctx.fillRect(0, 0, 800, 800);

    // Outer Circle Ring
    ctx.strokeStyle = badge.tier === 'Diamond' ? '#22D3EE' : badge.tier === 'Gold' ? '#F59E0B' : '#0284C7';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(400, 400, 360, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Medallion Gradient
    const radGrad = ctx.createRadialGradient(400, 360, 20, 400, 400, 340);
    radGrad.addColorStop(0, '#1E293B');
    radGrad.addColorStop(0.7, '#0F172A');
    radGrad.addColorStop(1, '#020617');
    ctx.fillStyle = radGrad;
    ctx.fill();

    // Heraldic Ribbon Banner
    ctx.fillStyle = '#D97706';
    ctx.fillRect(150, 520, 500, 60);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('FORTUNE 500 ACCREDITED', 400, 558);

    // Text on Badge
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(badge.name, 400, 340);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '22px sans-serif';
    ctx.fillText(`${badge.tier.toUpperCase()} TIER · WORKDAY ZERO TO INFINITY`, 400, 385);
    ctx.fillText('MENTORED BY KAPIL NARULA', 400, 420);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Workday_Badge_${badge.name.replace(/\s+/g, '_')}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="space-y-8">
      {/* Overview Stat Banner */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              Enterprise Credential Progression
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Fortune 500 Milestone Badges
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Earn accredited digital badges as you conquer each 5-hour phase and complete hands-on Workday simulator labs.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2.5 rounded-lg border border-slate-700">
            <div>
              <div className="text-xs text-slate-400">Total Hours</div>
              <div className="text-xl font-bold text-sky-400">{completedHours} / 30 hrs</div>
            </div>
            <div className="w-px h-8 bg-slate-700" />
            <div>
              <div className="text-xs text-slate-400">Levels Conquered</div>
              <div className="text-xl font-bold text-amber-400">{completedLevels.length} / 30</div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Major Phase Badges */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
          Core Phase Milestone Badges
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {badges.filter(b => b.category === 'Milestone').map((badge) => {
            const isEarned = Boolean(badge.phaseId && completedHours >= badge.phaseId * 5);
            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge({ ...badge, isUnlocked: isEarned })}
                className={`relative rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  isEarned
                    ? `bg-gradient-to-br ${getTierGradient(badge.tier)}`
                    : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-md ${
                    isEarned
                      ? 'bg-slate-900/80 border-white/20'
                      : 'bg-slate-800 border-slate-700 text-slate-600'
                  }`}>
                    {getIcon(badge.icon, badge.tier)}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    {isEarned ? (
                      <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                        <Lock className="w-3 h-3" />
                        Locked ({badge.phaseId ? `${badge.phaseId * 5}h required` : ''})
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs uppercase font-bold tracking-wider opacity-80 mb-1">
                  {badge.tier} Tier Milestone
                </div>
                <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                  {badge.name}
                </h4>
                <p className="text-xs text-slate-300/80 line-clamp-3 leading-relaxed">
                  {badge.description}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Phase {badge.phaseId}</span>
                  <span className="font-medium text-amber-300">Click to Inspect & Export</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Recognition Badges */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
          Special Architectural Honors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.filter(b => b.category === 'Special').map((badge) => {
            const isEarned = (badge.id === 'badge-quick-starter' && completedLevels.includes(1)) ||
                             (badge.id === 'badge-lab-expert' && completedLevels.length >= 10) ||
                             (badge.id === 'badge-security-officer' && completedLevels.includes(15)) ||
                             (badge.id === 'badge-calc-wizard' && completedLevels.includes(18));
            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge({ ...badge, isUnlocked: isEarned })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isEarned
                    ? 'bg-slate-800/90 border-amber-500/40 hover:border-amber-400'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${isEarned ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-600'}`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white leading-tight">{badge.name}</h5>
                    <span className="text-[10px] text-slate-400">{badge.tier} Honor</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-normal">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 30-Hour Curriculum Progression Grid */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            30-Hour Level Badge Track (1 Hour = 1 Level)
          </h3>
          <span className="text-xs text-slate-400">
            {completedLevels.length} of 30 Micro-Badges Earned
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((lvl) => {
            const isCompleted = completedLevels.includes(lvl);
            return (
              <button
                key={lvl}
                onClick={() => onSelectLevel && onSelectLevel(lvl)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all ${
                  isCompleted
                    ? 'bg-sky-950/60 border-sky-500/50 text-sky-300 hover:bg-sky-900/60 shadow-sm'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
                title={`Level ${lvl} (${lvl}h)`}
              >
                <span className="text-xs font-mono font-bold">H{lvl}</span>
                <span className="text-[10px] opacity-75 mt-0.5">
                  {isCompleted ? '✓' : `L${lvl}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Badge Inspection Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl relative">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>

            <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center border-2 mb-4 ${
              selectedBadge.isUnlocked
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-600'
            }`}>
              <Award className="w-10 h-10" />
            </div>

            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
              {selectedBadge.tier} Tier Credential
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {selectedBadge.name}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedBadge.description}
            </p>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg text-xs text-slate-400 mb-6">
              Status: <span className="font-semibold text-white">{selectedBadge.isUnlocked ? 'Unlocked & Verified' : 'Locked (Complete Requirements to Unlock)'}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedBadge(null)}
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium"
              >
                Close
              </button>
              {selectedBadge.isUnlocked && (
                <button
                  onClick={() => downloadBadgePNG(selectedBadge)}
                  className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
