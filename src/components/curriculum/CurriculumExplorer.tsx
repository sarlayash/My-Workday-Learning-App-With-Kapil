import React, { useState } from 'react';
import { WORKDAY_LEVELS } from '../../data/curriculumData';
import { WORKDAY_PHASES } from '../../data/phasesData';
import { Level } from '../../types/workday';
import { Clock, CheckCircle2, Play, ChevronRight, Lock, Award, Sparkles, Filter, Download } from 'lucide-react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

interface CurriculumExplorerProps {
  completedLevels: number[];
  onSelectLevel: (level: Level) => void;
  onLaunchLab: (level: Level) => void;
}

export const CurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  completedLevels,
  onSelectLevel,
  onLaunchLab,
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<number | 'all'>('all');

  const filteredPhases = selectedPhaseFilter === 'all'
    ? WORKDAY_PHASES
    : WORKDAY_PHASES.filter(p => p.id === selectedPhaseFilter);

  return (
    <div className="space-y-8">
      {/* Header Banner & Phase Filter Tabs */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-6 backdrop-blur space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              1 Hour = 1 Level · 30 Hours to Infinity
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Workday 30-Hour Architecture Curriculum
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Structured into 6 progressive phases from core tenant foundations to Fortune 500 enterprise cutover.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PWAInstallButton variant="header" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Total Completion:</span>
              <div className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono font-bold text-amber-400">
                {completedLevels.length} / 30 Hours ({Math.round((completedLevels.length / 30) * 100)}%)
              </div>
            </div>
          </div>
        </div>

        {/* Phase Filter Controls (Buttons following design constitution) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-700/60 pb-1">
          <button
            onClick={() => setSelectedPhaseFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedPhaseFilter === 'all'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            All 30 Hours
          </button>
          {WORKDAY_PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhaseFilter(phase.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedPhaseFilter === phase.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Phase {phase.id}: {phase.badgeTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Render Phases & Levels */}
      <div className="space-y-8">
        {filteredPhases.map((phase) => {
          const phaseLevels = WORKDAY_LEVELS.filter(l => l.phaseId === phase.id);
          const phaseCompletedCount = phaseLevels.filter(l => completedLevels.includes(l.id)).length;
          const isPhaseDone = phaseCompletedCount === 5;

          return (
            <div key={phase.id} className="space-y-4">
              {/* Phase Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-slate-700/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      Phase {phase.id} · {phase.badgeTier} Credential
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {phase.hours}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {phase.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-mono">{phaseCompletedCount}/5 Completed</span>
                  {isPhaseDone && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Milestone Badge Unlocked
                    </span>
                  )}
                </div>
              </div>

              {/* Levels Grid (5 Levels per Phase) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phaseLevels.map((lvl) => {
                  const isDone = completedLevels.includes(lvl.id);
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => onSelectLevel(lvl)}
                      className={`group relative rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                        isDone
                          ? 'bg-slate-800/90 border-emerald-500/40 hover:border-emerald-400'
                          : 'bg-slate-800/70 border-slate-700/80 hover:border-sky-500/60'
                      }`}
                    >
                      <div>
                        {/* Top Badging */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-sky-400 border border-slate-700">
                            HOUR {lvl.hour}
                          </span>
                          {isDone ? (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] text-slate-400">
                              <Clock className="w-3 h-3" />
                              60 Minutes
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors leading-snug mb-2">
                          {lvl.title}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {lvl.shortDesc}
                        </p>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                        <span className="text-slate-400 group-hover:text-slate-300">
                          {lvl.keyConcepts.length} Key Concepts
                        </span>

                        <div className="flex items-center gap-1 font-semibold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                          <span>{isDone ? 'Review Hour' : 'Start Hour'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
