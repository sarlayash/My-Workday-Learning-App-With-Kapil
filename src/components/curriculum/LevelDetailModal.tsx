import React, { useState } from 'react';
import { Level } from '../../types/workday';
import { 
  Clock, 
  BookOpen, 
  HelpCircle, 
  Laptop, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  AlertTriangle, 
  MessageSquare,
  Award,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LevelDetailModalProps {
  level: Level;
  isCompleted: boolean;
  onClose: () => void;
  onCompleteLevel: (levelId: number) => void;
  onLaunchLab: (level: Level) => void;
}

export const LevelDetailModal: React.FC<LevelDetailModalProps> = ({
  level,
  isCompleted,
  onClose,
  onCompleteLevel,
  onLaunchLab,
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'system' | 'lab' | 'interview' | 'quiz'>('theory');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    level.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinishQuiz = () => {
    setShowQuizResults(true);
    const score = calculateQuizScore();
    if (score === level.quiz.length) {
      onCompleteLevel(level.id);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 border-b border-slate-700/80 flex items-start justify-between relative">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 rounded text-amber-300 font-mono text-xs font-bold">
                HOUR {level.hour} OF 30 · LEVEL {level.id}
              </span>
              <span className="text-xs text-sky-400 font-medium">
                {level.moduleName}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {level.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {level.shortDesc}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold shrink-0 ml-4"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-800/90 border-b border-slate-700 px-6 py-2.5 flex items-center gap-2 overflow-x-auto select-none">
          {[
            { id: 'theory' as const, label: 'Theory & Architecture', icon: BookOpen },
            { id: 'system' as const, label: 'System Configuration', icon: Laptop },
            { id: 'lab' as const, label: 'Simulator Lab Challenge', icon: Play },
            { id: 'interview' as const, label: "Kapil's Interview Vault", icon: MessageSquare },
            { id: 'quiz' as const, label: 'Knowledge Quiz', icon: HelpCircle },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-700/60 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-200 text-sm">
          {/* TAB 1: THEORY & ARCHITECTURE */}
          {activeTab === 'theory' && (
            <div className="space-y-6">
              {/* Kapil Architect Secret Box */}
              <div className="p-4 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                  KN
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Kapil Narula’s Architectural Secret:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif italic">
                    &quot;{level.kapilArchitectSecret}&quot;
                  </p>
                </div>
              </div>

              {/* Key Concepts */}
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                  Key Enterprise Concepts (60-Minute Mastery)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {level.keyConcepts.map((concept, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-800/60 rounded-lg border border-slate-700 text-xs">
                      <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overview & Architecture Highlights */}
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-white">Architectural Foundations</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {level.theoryMarkdown.overview}
                </p>
                <div className="space-y-1.5 pt-2">
                  {level.theoryMarkdown.architectureHighlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-sky-400 font-bold mt-0.5">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Practices vs Pitfalls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Workday Best Practices
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {level.theoryMarkdown.workdayBestPractices.map((bp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Enterprise Pitfalls to Avoid
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {level.theoryMarkdown.commonPitfalls.map((pf, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">⚠</span>
                        <span>{pf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYSTEM CONFIGURATION GUIDE */}
          {activeTab === 'system' && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl">
                <h4 className="text-sm font-bold text-white mb-2">Workday System Navigation & Tasks</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In production Workday tenants, this configuration is performed using specific global tasks and report definitions.
                </p>

                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs">
                    <span className="text-sky-400 font-bold">Global Search Tasks:</span>
                    <ul className="mt-1.5 space-y-1 text-slate-300 text-[11px]">
                      <li>• &quot;Create Supervisory Organization&quot; (Task)</li>
                      <li>• &quot;Maintain Business Process Definition&quot; (Task)</li>
                      <li>• &quot;View Security Policy Hierarchy&quot; (Report)</li>
                      <li>• &quot;Create Calculated Field&quot; (Task)</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs">
                    <span className="text-amber-400 font-bold">Object Graph Pointers:</span>
                    <p className="mt-1 text-[11px] text-slate-300">
                      Primary Business Object: <strong className="text-white">Worker</strong> → Related Business Object: <strong className="text-white">Supervisory Organization</strong> → Manager Instance Pointer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SIMULATOR LAB CHALLENGE */}
          {activeTab === 'lab' && (
            <div className="space-y-5">
              <div className="bg-sky-950/40 border border-sky-500/40 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    Hands-On Lab Challenge
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-sky-900 text-sky-300">
                    Target: {level.lab.targetScreen.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {level.lab.title}
                </h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {level.lab.businessScenario}
                </p>

                {/* Steps Checklist */}
                <div className="space-y-2 mb-6">
                  {level.lab.steps.map((st, i) => (
                    <div key={st.id} className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{st.text}</div>
                        {st.hint && <div className="text-[11px] text-slate-400 mt-0.5">Hint: {st.hint}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      onLaunchLab(level);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Launch Interactive Lab in Simulator
                  </button>
                  <button
                    onClick={() => {
                      onCompleteLevel(level.id);
                      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg border border-slate-700"
                  >
                    Mark Lab Completed
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KAPIL'S FORTUNE 500 INTERVIEW VAULT */}
          {activeTab === 'interview' && (
            <div className="space-y-5">
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  Real Fortune 500 Interview Question
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg font-semibold text-sm text-white">
                  &quot;{level.interviewQuestion.question}&quot;
                </div>

                <div>
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                    Kapil Narula’s Model Answer:
                  </div>
                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {level.interviewQuestion.kapilAnswer}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KNOWLEDGE QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  Scenario-Based Enterprise Assessment ({level.quiz.length} Questions)
                </h4>
                {showQuizResults && (
                  <span className="text-xs font-bold text-amber-400">
                    Score: {calculateQuizScore()} / {level.quiz.length}
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {level.quiz.map((q, qIdx) => (
                  <div key={q.id} className="p-5 bg-slate-800/80 border border-slate-700 rounded-xl space-y-3">
                    <div className="text-xs font-bold text-sky-400 font-mono">QUESTION {qIdx + 1}</div>
                    <div className="text-sm font-medium text-white">{q.question}</div>

                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[q.id] === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        return (
                          <button
                            key={optIdx}
                            disabled={showQuizResults}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                              showQuizResults
                                ? isCorrect
                                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold'
                                  : isSelected
                                  ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                                  : 'bg-slate-900/50 border-slate-800 text-slate-400'
                                : isSelected
                                ? 'bg-sky-950 border-sky-500 text-white font-semibold'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span>{opt}</span>
                            {showQuizResults && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {showQuizResults && (
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
                        <strong className="text-amber-400">Explanation: </strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                {!showQuizResults ? (
                  <button
                    onClick={handleFinishQuiz}
                    disabled={Object.keys(selectedAnswers).length < level.quiz.length}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-lg shadow-md"
                  >
                    Submit Quiz & Validate
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onCompleteLevel(level.id);
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg shadow-md"
                  >
                    Complete Level & Return to Journey
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900 p-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-slate-600'}`} />
            <span className="text-slate-400">
              {isCompleted ? 'Level Completed & Verified' : 'In Progress (Hour Active)'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onCompleteLevel(level.id);
                confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all"
            >
              {isCompleted ? 'Mark as Re-tested' : 'Mark Hour Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
