import React, { useState } from 'react';
import { WORKDAY_LEVELS } from '../../data/curriculumData';
import { Search, Award, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export const InterviewVault: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const filteredLevels = WORKDAY_LEVELS.filter(
    (lvl) =>
      lvl.interviewQuestion.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lvl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lvl.interviewQuestion.kapilAnswer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-6 backdrop-blur">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Award className="w-4 h-4" />
              Fortune 500 Hiring Vault
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Kapil&apos;s Workday Interview Vault
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              30 curated interview scenarios asked by Deloitte, Accenture, Google, Amazon, and Fortune 500 clients for Workday Architects.
            </p>
          </div>

          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search interview questions..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredLevels.map((lvl) => {
          const isExpanded = expandedId === lvl.id;
          return (
            <div
              key={lvl.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : lvl.id)}
                className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-750 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950 border border-sky-500/40 text-sky-400 shrink-0 mt-0.5">
                    H{lvl.hour}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      &quot;{lvl.interviewQuestion.question}&quot;
                    </h4>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Topic: {lvl.title} · {lvl.moduleName}
                    </span>
                  </div>
                </div>

                <div className="p-1 rounded text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-700/60 mt-3 space-y-3">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Kapil Narula’s Enterprise Answer Strategy:</span>
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {lvl.interviewQuestion.kapilAnswer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
