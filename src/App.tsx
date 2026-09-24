import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Award, 
  BookOpen, 
  Laptop, 
  HelpCircle, 
  Sparkles, 
  Download, 
  Compass, 
  CheckCircle2, 
  ShieldCheck,
  Search,
  Users
} from 'lucide-react';
import { WORKDAY_LEVELS } from './data/curriculumData';
import { INITIAL_BADGES } from './data/badgesData';
import { Level, LabChallenge, Badge } from './types/workday';
import { CurriculumExplorer } from './components/curriculum/CurriculumExplorer';
import { WorkdaySimulator } from './components/simulator/WorkdaySimulator';
import { BadgesShowcase } from './components/badges/BadgesShowcase';
import { CertificateGenerator } from './components/certificate/CertificateGenerator';
import { InterviewVault } from './components/resources/InterviewVault';
import { KapilMentorGuide } from './components/mentor/KapilMentorGuide';
import { LevelDetailModal } from './components/curriculum/LevelDetailModal';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'curriculum' | 'simulator' | 'badges' | 'certificate' | 'interviews' | 'mentor'>('curriculum');

  // Learner Progress State with LocalStorage Persistence
  const [learnerName, setLearnerName] = useState<string>(() => {
    return localStorage.getItem('wd_learner_name') || 'Kapil Narula';
  });

  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('wd_completed_levels');
      return saved ? JSON.parse(saved) : [1, 2]; // Start with first 2 hours unlocked for instant engagement
    } catch {
      return [1, 2];
    }
  });

  // Modal State for Level Drilldown
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  // Active Lab Challenge in Simulator
  const [activeLab, setActiveLab] = useState<LabChallenge | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('wd_learner_name', learnerName);
  }, [learnerName]);

  useEffect(() => {
    localStorage.setItem('wd_completed_levels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  const handleCompleteLevel = (levelId: number) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels(prev => [...prev, levelId]);
    }
  };

  const handleLaunchLab = (level: Level) => {
    setActiveLab(level.lab);
    setActiveTab('simulator');
  };

  const handleFastTrackAll = () => {
    const all30 = Array.from({ length: 30 }, (_, i) => i + 1);
    setCompletedLevels(all30);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset progress back to Hour 1?')) {
      setCompletedLevels([1]);
    }
  };

  const completedHours = completedLevels.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* ============================================================== */}
      {/* TOP BAR CONTRACT: Single text Brand, clean nav links, action   */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => setActiveTab('curriculum')}
          className="text-lg font-bold tracking-tight text-white hover:text-sky-400 transition-colors flex items-center gap-2 select-none"
        >
          <span className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white text-xs font-black shadow-sm">
            WD
          </span>
          <span>Zero to Infinity Workday</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeTab === 'curriculum' ? 'text-sky-400 border-b-2 border-sky-400' : ''
            }`}
          >
            30-Hour Curriculum
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`hover:text-white transition-colors relative py-1 flex items-center gap-1.5 ${
              activeTab === 'simulator' ? 'text-sky-400 border-b-2 border-sky-400' : ''
            }`}
          >
            <span>Live Workday Simulator</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeTab === 'badges' ? 'text-sky-400 border-b-2 border-sky-400' : ''
            }`}
          >
            Badges & Milestones
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`hover:text-white transition-colors relative py-1 text-amber-300 font-bold ${
              activeTab === 'certificate' ? 'border-b-2 border-amber-400' : ''
            }`}
          >
            Certificate (PDF/PNG)
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeTab === 'interviews' ? 'text-sky-400 border-b-2 border-sky-400' : ''
            }`}
          >
            Interview Vault
          </button>
          <button
            onClick={() => setActiveTab('mentor')}
            className={`hover:text-white transition-colors relative py-1 ${
              activeTab === 'mentor' ? 'text-sky-400 border-b-2 border-sky-400' : ''
            }`}
          >
            Mentor Kapil
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-800/80 rounded-lg border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">Progress:</span>
            <span className="text-sky-400 font-bold">{completedHours}/30 hrs</span>
          </div>

          <button
            onClick={() => setActiveTab('certificate')}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            Claim Certificate
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* MOBILE NAVIGATION BAR                                          */}
      {/* ============================================================== */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        {[
          { id: 'curriculum' as const, label: 'Curriculum' },
          { id: 'simulator' as const, label: 'Simulator' },
          { id: 'badges' as const, label: 'Badges' },
          { id: 'certificate' as const, label: 'Certificates' },
          { id: 'interviews' as const, label: 'Interviews' },
          { id: 'mentor' as const, label: 'Kapil Narula' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              activeTab === item.id ? 'bg-sky-600 text-white font-bold' : 'text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* MAIN VIEWPORT CONTAINER                                        */}
      {/* ============================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {activeTab === 'curriculum' && (
          <CurriculumExplorer
            completedLevels={completedLevels}
            onSelectLevel={(lvl) => setSelectedLevel(lvl)}
            onLaunchLab={handleLaunchLab}
          />
        )}

        {activeTab === 'simulator' && (
          <WorkdaySimulator
            activeLab={activeLab}
            onLabStepComplete={() => {}}
            onLabFinished={() => {
              if (activeLab) {
                // Find corresponding level
                const matched = WORKDAY_LEVELS.find(l => l.lab.id === activeLab.id);
                if (matched) {
                  handleCompleteLevel(matched.id);
                }
              }
            }}
          />
        )}

        {activeTab === 'badges' && (
          <BadgesShowcase
            badges={INITIAL_BADGES}
            completedHours={completedHours}
            completedLevels={completedLevels}
            onSelectLevel={(lvlId) => {
              const lvl = WORKDAY_LEVELS.find(l => l.id === lvlId);
              if (lvl) setSelectedLevel(lvl);
            }}
          />
        )}

        {activeTab === 'certificate' && (
          <CertificateGenerator
            learnerName={learnerName}
            onUpdateLearnerName={setLearnerName}
            completedHours={completedHours}
            completedLevelsCount={completedLevels.length}
          />
        )}

        {activeTab === 'interviews' && (
          <InterviewVault />
        )}

        {activeTab === 'mentor' && (
          <KapilMentorGuide
            completedLevels={completedLevels}
            onSelectLevel={(lvlId) => {
              const lvl = WORKDAY_LEVELS.find(l => l.id === lvlId);
              if (lvl) {
                setSelectedLevel(lvl);
                setActiveTab('curriculum');
              }
            }}
            onFastTrackAll={handleFastTrackAll}
          />
        )}
      </main>

      {/* ============================================================== */}
      {/* LEVEL DETAIL DRILLDOWN MODAL                                   */}
      {/* ============================================================== */}
      {selectedLevel && (
        <LevelDetailModal
          level={selectedLevel}
          isCompleted={completedLevels.includes(selectedLevel.id)}
          onClose={() => setSelectedLevel(null)}
          onCompleteLevel={handleCompleteLevel}
          onLaunchLab={handleLaunchLab}
        />
      )}

      {/* ============================================================== */}
      {/* QUIET FOOTER (CONSTITUTION COMPLIANT: NO FAKE TELEMETRY)      */}
      {/* ============================================================== */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 px-6 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span>My Zero to Infinity Workday Journey with Kapil Narula</span>
            <span className="mx-2">·</span>
            <span>Fortune 500 Enterprise Workday Architecture Curriculum</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleFastTrackAll}
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              Unlock All 30 Hours (Demo Mode)
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={handleResetProgress}
              className="hover:text-slate-400"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
