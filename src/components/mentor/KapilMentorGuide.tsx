import React from 'react';
import { Award, CheckCircle2, Sparkles, BookOpen, Compass, Shield, ArrowRight } from 'lucide-react';

interface KapilMentorGuideProps {
  completedLevels: number[];
  onSelectLevel: (lvl: number) => void;
  onFastTrackAll: () => void;
}

export const KapilMentorGuide: React.FC<KapilMentorGuideProps> = ({
  completedLevels,
  onSelectLevel,
  onFastTrackAll,
}) => {
  return (
    <div className="space-y-8">
      {/* Mentor Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {/* Avatar Container with Gold Ring */}
          <div className="w-28 h-28 rounded-2xl p-1 bg-gradient-to-tr from-amber-500 via-sky-400 to-amber-300 shadow-xl shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-xl bg-slate-900 flex flex-col items-center justify-center text-center p-2">
              <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-amber-200 font-serif">
                KN
              </span>
              <span className="text-[10px] text-sky-400 font-mono font-bold mt-1">PRINCIPAL</span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                GLOBAL LEAD MENTOR
              </span>
              <span className="text-xs text-sky-300 font-medium">
                Kapil Narula · Workday Principal Enterprise Architect
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Zero to Infinity Workday Journey
            </h2>

            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              &quot;Welcome! Over the past 15 years, I have architected global Workday HCM, Security, and Integration solutions for top Fortune 500 enterprises. I designed this 30-hour curriculum so that any motivated learner can transition from absolute zero to an elite enterprise architect. One hour, one level. Master the concepts, conquer the live simulator labs, and claim your accredited credentials.&quot;
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-slate-300">
              <div><strong className="text-white">30 Clock Hours</strong> · 30 Levels</div>
              <div><strong className="text-sky-400">6 Major Phases</strong> · 6 Credentials</div>
              <div><strong className="text-amber-400">Live Simulator</strong> · Enterprise Tenant</div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={() => onSelectLevel(1)}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Begin Level 1
            </button>
            <button
              onClick={onFastTrackAll}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold text-[11px] rounded-lg border border-amber-500/30"
              title="Fast-Track all 30 levels for credential verification"
            >
              Fast-Track Demo (30/30)
            </button>
          </div>
        </div>
      </div>

      {/* Kapil's 4 Golden Laws of Workday Architecture */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
          Kapil&apos;s 4 Golden Laws of Fortune 500 Workday Systems
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. The Object Graph Principle',
              desc: 'Never approach Workday thinking in SQL tables and foreign keys. Workday is an in-memory object graph. Your calculations, reporting, and routing rely on in-memory pointers between Business Objects.',
              color: 'border-sky-500/30 bg-sky-950/20 text-sky-400',
            },
            {
              title: '2. Restrict Security to Contextual Orgs',
              desc: 'Never make functional roles (like HR Partners or Recruiters) unconstrained in production. An unconstrained role can see executive salaries across the globe. Always constrain roles to their Supervisory Org.',
              color: 'border-amber-500/30 bg-amber-950/20 text-amber-400',
            },
            {
              title: '3. Atomic Security Activation Discipline',
              desc: 'Any configuration on Domain or BP Security Policies remains in a staging buffer until "Activate Pending Security Changes" is run with a mandatory, documented audit comment for SOX compliance.',
              color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400',
            },
            {
              title: '4. The Delta Rule for Integrations',
              desc: 'Do not extract full 50,000-worker rosters daily. Use Core Connector change logs or filtered RaaS web services with PGP encryption and timestamped filenames to prevent catastrophic data overwrites.',
              color: 'border-purple-500/30 bg-purple-950/20 text-purple-400',
            },
          ].map((law, idx) => (
            <div key={idx} className={`p-5 rounded-xl border ${law.color}`}>
              <h4 className="text-base font-bold text-white mb-1.5">{law.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{law.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Hour Roadmap Matrix */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
          30-Hour Master Curriculum Roadmap
        </h3>

        <div className="space-y-4">
          {[
            { phase: 1, title: 'Phase 1: Foundation Specialist (Hours 1 - 5)', topics: 'Architecture, Tenants, Supervisory Orgs, Staffing Models, Job Catalog, Compensation' },
            { phase: 2, title: 'Phase 2: Business Process Engineer (Hours 6 - 10)', topics: 'BP Framework, Conditions, Approval Chains, Hire Lifecycle, Job Changes, Contingent Workers' },
            { phase: 3, title: 'Phase 3: Enterprise Security Architect (Hours 11 - 15)', topics: 'Domain Policies, RBSG Contextual Roles, Segmented Access, BPSP, Activate Security' },
            { phase: 4, title: 'Phase 4: Analytics & Calc Fields Master (Hours 16 - 20)', topics: 'Advanced Reports, PBO/RBO Traversal, ESI/LRV Formulas, Evaluate Expressions, Prism Dashboards' },
            { phase: 5, title: 'Phase 5: Cloud Integration Specialist (Hours 21 - 25)', topics: 'Outbound EIB, Inbound Web Services, Workday Studio Assemblies, Core Connectors, ISU Security' },
            { phase: 6, title: 'Phase 6: Fortune 500 Principal Architect (Hours 26 - 30)', topics: 'Benefits, Payroll Architecture, Absence & Time, 9-Box Calibration, Go-Live Cutover' },
          ].map((item) => (
            <div key={item.phase} className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h5 className="text-sm font-bold text-white">{item.title}</h5>
                <p className="text-xs text-slate-400 mt-0.5">{item.topics}</p>
              </div>
              <button
                onClick={() => onSelectLevel((item.phase - 1) * 5 + 1)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-sky-600 text-slate-200 hover:text-white rounded text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1"
              >
                Jump to Phase <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
