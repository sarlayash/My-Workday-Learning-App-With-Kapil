import React, { useState } from 'react';
import { 
  Building2, 
  GitBranch, 
  Users, 
  LineChart, 
  ShieldCheck, 
  Cpu, 
  Inbox, 
  Search, 
  Bell, 
  Home, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Plus, 
  FileText, 
  ArrowRight,
  Lock,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { INITIAL_ORGS, INITIAL_WORKERS, INITIAL_BP_STEPS, INITIAL_CALC_FIELDS } from '../../data/simulatorInitialData';
import { SupervisoryOrg, SimulatorWorker, BusinessProcessStep, CalculatedFieldDef, LabChallenge } from '../../types/workday';
import confetti from 'canvas-confetti';

interface WorkdaySimulatorProps {
  activeLab?: LabChallenge | null;
  onLabStepComplete?: (stepId: string) => void;
  onLabFinished?: () => void;
}

export const WorkdaySimulator: React.FC<WorkdaySimulatorProps> = ({
  activeLab,
  onLabStepComplete,
  onLabFinished,
}) => {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<'org_chart' | 'bp_config' | 'hire_wizard' | 'calc_fields' | 'security_matrix' | 'eib_workbench' | 'inbox'>(
    activeLab ? activeLab.targetScreen : 'org_chart'
  );

  // Global Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Data States
  const [orgs, setOrgs] = useState<SupervisoryOrg[]>(INITIAL_ORGS);
  const [selectedOrgId, setSelectedOrgId] = useState<string>('org-tech-div');
  const [workers, setWorkers] = useState<SimulatorWorker[]>(INITIAL_WORKERS);
  const [bpSteps, setBpSteps] = useState<BusinessProcessStep[]>(INITIAL_BP_STEPS);
  const [calcFields, setCalcFields] = useState<CalculatedFieldDef[]>(INITIAL_CALC_FIELDS);

  // Modals & Sub-states
  const [showCreatePositionModal, setShowCreatePositionModal] = useState(false);
  const [newPositionTitle, setNewPositionTitle] = useState('Senior Cloud Architect');
  const [newPositionJobProfile, setNewPositionJobProfile] = useState('Enterprise Cloud Architect (TECH-901)');

  const [showAddSubOrgModal, setShowAddSubOrgModal] = useState(false);
  const [newSubOrgName, setNewSubOrgName] = useState('Cloud & DevOps Engineering');

  // Hire Wizard State
  const [hireStep, setHireStep] = useState<number>(1);
  const [hireCandidateName, setHireCandidateName] = useState('Marcus Vance');
  const [hireOrgId, setHireOrgId] = useState('org-cloud-devops');
  const [hireSalary, setHireSalary] = useState(175000);
  const [hireJobProfile, setHireJobProfile] = useState('Enterprise Cloud Architect (TECH-901)');

  // Inbox Tasks
  const [inboxTasks, setInboxTasks] = useState([
    {
      id: 'task-1',
      title: 'Approval: Hire - Marcus Vance (Cloud Architect)',
      initiatedBy: 'Logan McNeil (HR Partner)',
      date: 'Today at 09:15 AM',
      type: 'Hire',
      details: 'Supervisory Org: Cloud & DevOps Engineering | Base Salary: $175,000 USD | Effective Date: Next Monday',
      status: 'Pending',
    },
  ]);

  // Security Activation
  const [pendingSecurityCount, setPendingSecurityCount] = useState<number>(2);
  const [isSecurityActivated, setIsSecurityActivated] = useState<boolean>(false);
  const [auditComment, setAuditComment] = useState('');
  const [showActivateModal, setShowActivateModal] = useState(false);

  // Calc Field Live Tester
  const [testedFieldResult, setTestedFieldResult] = useState<string | null>(null);

  // EIB Runner State
  const [eibRunning, setEibRunning] = useState(false);
  const [eibLog, setEibLog] = useState<string[]>([]);

  // Search Results Options
  const searchResults = [
    { title: 'View Supervisory Organization: Technology Division', screen: 'org_chart' as const, category: 'Organization' },
    { title: 'Maintain Business Process Definition: Hire', screen: 'bp_config' as const, category: 'Business Process' },
    { title: 'Hire Employee Wizard (Start New Hire)', screen: 'hire_wizard' as const, category: 'Task' },
    { title: 'Create Calculated Field (Workbench)', screen: 'calc_fields' as const, category: 'Reporting' },
    { title: 'View Domain Security Policies (Security Matrix)', screen: 'security_matrix' as const, category: 'Security' },
    { title: 'Launch Enterprise Interface Builder (EIB)', screen: 'eib_workbench' as const, category: 'Integration' },
    { title: 'My Workday Tasks & Approvals (Inbox)', screen: 'inbox' as const, category: 'Workflow' },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '');

  const selectedOrg = orgs.find(o => o.id === selectedOrgId) || orgs[0];
  const orgWorkers = workers.filter(w => w.supervisoryOrgId === selectedOrgId);

  // Lab Step Completion helper
  const triggerLabStep = (stepId: string) => {
    if (onLabStepComplete) {
      onLabStepComplete(stepId);
    }
  };

  const handleCreatePosition = () => {
    setOrgs(prev => prev.map(o => {
      if (o.id === selectedOrgId) {
        return { ...o, openPositions: o.openPositions + 1 };
      }
      return o;
    }));
    setShowCreatePositionModal(false);
    triggerLabStep('s3');
    triggerLabStep('s4');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const handleAddSubOrg = () => {
    const newId = `org-custom-${Date.now()}`;
    const newOrg: SupervisoryOrg = {
      id: newId,
      name: newSubOrgName,
      code: `SVO-DEV-${Math.floor(100 + Math.random() * 900)}`,
      parentId: selectedOrgId,
      managerName: 'Marcus Vance',
      managerId: 'W-003',
      staffingModel: 'Position Management',
      headcount: 0,
      openPositions: 2,
      subOrgs: [],
    };
    setOrgs(prev => [...prev, newOrg]);
    setShowAddSubOrgModal(false);
    triggerLabStep('s2');
    triggerLabStep('s3');
    triggerLabStep('s4');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const handleCompleteHire = () => {
    // Add new worker
    const newWorker: SimulatorWorker = {
      id: `W-${Date.now()}`,
      employeeId: `EMP-${Math.floor(10000 + Math.random() * 90000)}`,
      name: hireCandidateName,
      title: 'Senior Enterprise Cloud Architect',
      supervisoryOrgId: hireOrgId,
      jobProfile: hireJobProfile,
      grade: 'Grade 10: Director / Principal',
      baseSalary: hireSalary,
      currency: 'USD',
      hireDate: '2026-10-01',
      status: 'Active',
      email: `${hireCandidateName.toLowerCase().replace(' ', '.')}@apexglobal.com`,
    };

    setWorkers(prev => [...prev, newWorker]);
    setOrgs(prev => prev.map(o => o.id === hireOrgId ? { ...o, headcount: o.headcount + 1, openPositions: Math.max(0, o.openPositions - 1) } : o));

    // Add inbox task
    setInboxTasks(prev => [
      {
        id: `task-${Date.now()}`,
        title: `Approval: Hire - ${hireCandidateName} (Senior Cloud Architect)`,
        initiatedBy: 'Logan McNeil (Implementer)',
        date: 'Just Now',
        type: 'Hire',
        details: `Supervisory Org: Cloud & DevOps Engineering | Base Salary: $${hireSalary.toLocaleString()} USD`,
        status: 'Pending',
      },
      ...prev,
    ]);

    setHireStep(4);
    triggerLabStep('s4');
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
  };

  const handleApproveInboxTask = (taskId: string) => {
    setInboxTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'Approved' } : t));
    triggerLabStep('s5');
    if (onLabFinished) onLabFinished();
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  };

  const handleActivateSecurity = () => {
    setIsSecurityActivated(true);
    setPendingSecurityCount(0);
    setShowActivateModal(false);
    triggerLabStep('s2');
    triggerLabStep('s3');
    triggerLabStep('s4');
    if (onLabFinished) onLabFinished();
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
  };

  const handleRunEIB = () => {
    setEibRunning(true);
    setEibLog(['Initializing Enterprise Interface Builder outbound pipeline...']);

    setTimeout(() => {
      setEibLog(prev => [...prev, 'Running Custom Report (RaaS): Active Employee Roster (1,240 records found)']);
    }, 600);

    setTimeout(() => {
      setEibLog(prev => [...prev, 'Transforming XML payload with PGP 2048-bit encryption']);
    }, 1200);

    setTimeout(() => {
      setEibLog(prev => [...prev, 'Connecting to SFTP: sftp.fidelity-benefits.com on port 22 via SSH Key Auth']);
    }, 1800);

    setTimeout(() => {
      setEibLog(prev => [
        ...prev,
        'File WORKFORCE_EXTRACT_20260924_0915.csv.pgp transmitted successfully (4.8 MB)',
        'Status: COMPLETED WITH ZERO ERRORS',
      ]);
      setEibRunning(false);
      triggerLabStep('s4');
      if (onLabFinished) onLabFinished();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    }, 2400);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[750px]">
      {/* ============================================================== */}
      {/* 1. AUTHENTIC WORKDAY CANVAS TOP NAVIGATION BAR (#0875e1)      */}
      {/* ============================================================== */}
      <header className="bg-[#0875e1] text-white px-4 py-2.5 flex items-center justify-between shadow-md relative z-30 select-none">
        {/* Brand & Home */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Workday Arc Emblem */}
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-base">
              W
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold text-sm tracking-tight text-white block leading-tight">workday</span>
              <span className="text-[10px] text-blue-100 font-mono tracking-wider opacity-90">ENTERPRISE CLOUD</span>
            </div>
          </div>

          <div className="h-5 w-px bg-white/20 mx-1 hidden sm:block" />

          {/* Tenant Selector Tag */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 text-slate-950 font-bold text-[11px] rounded tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-900 animate-pulse" />
            APEX GLOBAL (SBX-PROD)
          </div>
        </div>

        {/* Global Workday Search Bar */}
        <div className="flex-1 max-w-xl mx-4 relative">
          <div className="relative">
            <Search className="w-4 h-4 text-blue-200 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search for tasks, reports, workers, or organizations..."
              className="w-full bg-white/15 hover:bg-white/20 focus:bg-white text-white focus:text-slate-900 placeholder:text-blue-200 focus:placeholder:text-slate-400 pl-9 pr-4 py-1.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>

          {/* Global Search Dropdown */}
          {isSearchFocused && (
            <div 
              onMouseDown={(e) => e.preventDefault()}
              className="absolute left-0 right-0 top-full mt-1.5 bg-white text-slate-900 rounded-lg shadow-2xl border border-slate-200 overflow-hidden z-50 text-xs"
            >
              <div className="p-2 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-slate-500 font-semibold">
                <span>Workday Global Search Results</span>
                <button onClick={() => setIsSearchFocused(false)} className="hover:text-slate-800">Close</button>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentScreen(item.screen);
                      setIsSearchFocused(false);
                      setSearchQuery('');
                      triggerLabStep('s1');
                    }}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-sky-50 flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-sky-700">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.category}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Action Icons: Inbox & Profile */}
        <div className="flex items-center gap-2">
          {/* Inbox Button with unread counter */}
          <button
            onClick={() => {
              setCurrentScreen('inbox');
              triggerLabStep('s5');
            }}
            className={`p-2 rounded-lg relative transition-colors ${
              currentScreen === 'inbox' ? 'bg-white/25 text-white' : 'hover:bg-white/10 text-blue-100'
            }`}
            title="Workday Inbox / My Tasks"
          >
            <Inbox className="w-5 h-5" />
            {inboxTasks.filter(t => t.status === 'Pending').length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-slate-950 font-black text-[9px] rounded-full flex items-center justify-center">
                {inboxTasks.filter(t => t.status === 'Pending').length}
              </span>
            )}
          </button>

          {/* Bell Notifications */}
          <button className="p-2 rounded-lg hover:bg-white/10 text-blue-100">
            <Bell className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-sm">
              LM
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold leading-tight">Logan McNeil</div>
              <div className="text-[10px] text-blue-200">HR Administrator</div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. SUB-NAVIGATION TOOLBAR (WORKDAY APPLICATION MODULES)        */}
      {/* ============================================================== */}
      <nav className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center gap-1.5 overflow-x-auto select-none">
        {[
          { id: 'org_chart' as const, label: 'Supervisory Orgs', icon: Building2 },
          { id: 'bp_config' as const, label: 'Business Processes', icon: GitBranch },
          { id: 'hire_wizard' as const, label: 'Hire Employee Wizard', icon: Users },
          { id: 'calc_fields' as const, label: 'Reporting & Calc Fields', icon: LineChart },
          { id: 'security_matrix' as const, label: 'Security & Policies', icon: ShieldCheck },
          { id: 'eib_workbench' as const, label: 'EIB & Integrations', icon: Cpu },
          { id: 'inbox' as const, label: 'My Inbox Tasks', icon: Inbox },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentScreen(tab.id);
                if (tab.id === 'org_chart') triggerLabStep('s1');
                if (tab.id === 'bp_config') triggerLabStep('s1');
                if (tab.id === 'hire_wizard') triggerLabStep('s1');
                if (tab.id === 'calc_fields') triggerLabStep('s1');
                if (tab.id === 'security_matrix') triggerLabStep('s1');
                if (tab.id === 'eib_workbench') triggerLabStep('s1');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ============================================================== */}
      {/* 3. ACTIVE LAB CHALLENGE BANNER (WHEN LAUNCHED FROM A LEVEL)     */}
      {/* ============================================================== */}
      {activeLab && (
        <div className="bg-sky-950/70 border-b border-sky-800/80 px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-sky-500/20 text-sky-400 rounded border border-sky-400/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-300">
                ACTIVE LAB CHALLENGE: {activeLab.title}
              </div>
              <div className="text-[11px] text-slate-300">
                {activeLab.businessScenario}
              </div>
            </div>
          </div>

          {/* Steps Pill checklist */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Lab Steps:</span>
            {activeLab.steps.map((st, i) => (
              <span
                key={st.id}
                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-900/60 border border-sky-600/40 text-sky-200"
                title={st.text}
              >
                Step {i + 1}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. WORKDAY SIMULATOR MAIN VIEWPORT                              */}
      {/* ============================================================== */}
      <div className="flex-1 p-5 overflow-y-auto bg-slate-900/90">
        {/* VIEW 1: SUPERVISORY ORG STUDIO */}
        {currentScreen === 'org_chart' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-sky-400" />
                  Supervisory Organization Studio
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hierarchy tree, Position Management, and management reporting lines for Apex Global Holdings.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddSubOrgModal(true)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Subordinate Org
                </button>
                <button
                  onClick={() => setShowCreatePositionModal(true)}
                  className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create Position
                </button>
              </div>
            </div>

            {/* Org Tree Selector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Hierarchy Tree Column */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Supervisory Tree
                </div>
                <div className="space-y-1.5">
                  {orgs.map((org) => {
                    const isSelected = org.id === selectedOrgId;
                    return (
                      <button
                        key={org.id}
                        onClick={() => {
                          setSelectedOrgId(org.id);
                          triggerLabStep('s2');
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-sky-950/80 border-sky-500 text-white shadow-sm'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{org.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{org.code}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                          <span>Mgr: {org.managerName}</span>
                          <span className="text-sky-400 font-semibold">{org.headcount} workers</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Org Details & Positions */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-700">
                    <div>
                      <div className="text-xs text-sky-400 font-mono">{selectedOrg.code}</div>
                      <h4 className="text-lg font-bold text-white">{selectedOrg.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-amber-300 text-xs font-semibold">
                        {selectedOrg.staffingModel}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-300 text-xs font-semibold">
                        {selectedOrg.openPositions} Open Positions
                      </span>
                    </div>
                  </div>

                  {/* Worker Roster */}
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Active Assigned Workers ({orgWorkers.length})
                    </div>
                    {orgWorkers.length === 0 ? (
                      <div className="p-4 bg-slate-900/60 rounded-lg text-center text-xs text-slate-500">
                        No workers currently assigned to this supervisory organization. Click &quot;Hire Employee Wizard&quot; or create a position.
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-700/60">
                        {orgWorkers.map((w) => (
                          <div key={w.id} className="py-2.5 flex items-center justify-between">
                            <div>
                              <div className="text-xs font-bold text-white">{w.name}</div>
                              <div className="text-[11px] text-slate-400">{w.jobProfile}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-mono font-semibold text-emerald-400">
                                {w.baseSalary > 0 ? `$${w.baseSalary.toLocaleString()} ${w.currency}` : 'Contingent (Vendor)'}
                              </div>
                              <div className="text-[10px] text-slate-500">{w.employeeId} · {w.grade}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Kapil's Architect Note */}
                <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    KN
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-amber-300 block mb-0.5">Kapil Narula’s Architectural Tip:</span>
                    <span className="text-slate-300 leading-relaxed">
                      Always ensure the Staffing Model is locked to Position Management for core enterprise departments. This enforces strict financial headcount approvals before any hiring transaction can be submitted.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: BUSINESS PROCESS CONFIGURATOR */}
        {currentScreen === 'bp_config' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-sky-400" />
                  Business Process Configurator
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Maintain Business Process Definition: Hire (US Enterprise Holdings)
                </p>
              </div>

              <button
                onClick={() => {
                  triggerLabStep('s3');
                  confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
                }}
                className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                Validate BP Step Sequence
              </button>
            </div>

            {/* BP Steps Table */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Order & Step Sequence</span>
                <span className="text-xs text-sky-400 font-mono">Effective: 2026-01-01</span>
              </div>

              <div className="divide-y divide-slate-700/60">
                {bpSteps.map((step) => (
                  <div key={step.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:bg-slate-750">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/40 text-sky-400 font-mono font-bold flex items-center justify-center text-sm">
                        {step.order}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          {step.title}
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            step.action === 'Approval' ? 'bg-amber-500/20 text-amber-300' :
                            step.action === 'Initiate' ? 'bg-sky-500/20 text-sky-300' : 'bg-purple-500/20 text-purple-300'
                          }`}>
                            {step.action}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Security Group: <span className="text-slate-300 font-medium">{step.assignedSecurityGroup}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      {step.conditionRule ? (
                        <span className="text-[11px] font-mono text-amber-400 bg-amber-950/50 px-2.5 py-1 rounded border border-amber-600/30">
                          {step.conditionRule}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">Unconditional</span>
                      )}

                      <button
                        onClick={() => {
                          triggerLabStep('s2');
                          triggerLabStep('s4');
                          confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
                        }}
                        className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 rounded"
                      >
                        Edit Rule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: HIRE EMPLOYEE WIZARD */}
        {currentScreen === 'hire_wizard' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" />
                Hire Employee Transaction Wizard
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulated Workday Task: Hire Employee on open budgeted position.
              </p>
            </div>

            {/* Stepper Header */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
              {['1. Candidate', '2. Organization', '3. Compensation', '4. Complete'].map((label, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border ${
                    hireStep === idx + 1
                      ? 'bg-sky-600 border-sky-400 text-white font-bold'
                      : hireStep > idx + 1
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-800/60 border-slate-700 text-slate-500'
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Wizard Step 1: Candidate */}
            {hireStep === 1 && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-white">Step 1: Existing or New Candidate Identification</h4>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Candidate Legal Full Name</label>
                  <input
                    type="text"
                    value={hireCandidateName}
                    onChange={(e) => setHireCandidateName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Pre-Hire Contact Email</label>
                  <input
                    type="email"
                    value="marcus.vance@candidate-mail.com"
                    readOnly
                    className="w-full px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-lg text-sm text-slate-400"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setHireStep(2);
                      triggerLabStep('s2');
                    }}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg"
                  >
                    Continue to Organization →
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 2: Org & Position */}
            {hireStep === 2 && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-white">Step 2: Supervisory Organization & Open Position</h4>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Supervisory Organization</label>
                  <select
                    value={hireOrgId}
                    onChange={(e) => setHireOrgId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
                  >
                    {orgs.map(o => (
                      <option key={o.id} value={o.id}>{o.name} ({o.openPositions} open)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Job Profile</label>
                  <input
                    type="text"
                    value={hireJobProfile}
                    onChange={(e) => setHireJobProfile(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => setHireStep(1)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setHireStep(3);
                      triggerLabStep('s3');
                    }}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg"
                  >
                    Continue to Compensation →
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 3: Compensation Plan */}
            {hireStep === 3 && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-white">Step 3: Propose Compensation Hire</h4>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Annual Base Salary (USD)</label>
                  <input
                    type="number"
                    value={hireSalary}
                    onChange={(e) => setHireSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white font-mono font-bold focus:outline-none focus:border-sky-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">
                    Grade 10 Range: $165,000 - $265,000 USD (Comp-Ratio: 0.98)
                  </div>
                </div>

                <div className="p-3 bg-sky-950/40 border border-sky-800/50 rounded-lg text-xs text-sky-300">
                  Business Process Note: Submitting will route this transaction to the Supervisory Manager and Compensation Partner for approval.
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => setHireStep(2)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCompleteHire}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Hire Transaction
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Step 4: Submission Confirmation */}
            {hireStep === 4 && (
              <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Hire Transaction Submitted!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {hireCandidateName} has been routed through Business Process: Hire. An approval task is waiting in the Workday Inbox.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCurrentScreen('inbox');
                      triggerLabStep('s5');
                    }}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg"
                  >
                    Open Workday Inbox to Approve →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: CALCULATED FIELDS & REPORTING */}
        {currentScreen === 'calc_fields' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-sky-400" />
                  Calculated Fields & Reporting Workbench
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Build and test in-memory formulas (Lookup Related Value, ESI, Evaluate Expression).
                </p>
              </div>

              <button
                onClick={() => {
                  triggerLabStep('s1');
                  setTestedFieldResult('Elena Rostova -> VP, Infrastructure Engineering');
                  confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
                }}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm"
              >
                Test In-Memory Resolution
              </button>
            </div>

            {/* Calc Field Formula List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {calcFields.map((cf) => (
                <div key={cf.id} className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-sky-400 font-mono font-semibold">{cf.functionType}</span>
                    <span className="text-slate-400">PBO: {cf.businessObject}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono">{cf.name}</h4>
                  <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-amber-300 break-all border border-slate-800">
                    {cf.formula}
                  </div>
                </div>
              ))}
            </div>

            {/* Live Formula Interactive Testing Console */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Live In-Memory Formula Evaluator
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Target Worker Instance</label>
                  <select className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white">
                    <option>Elena Rostova (EMP-10042)</option>
                    <option>Logan McNeil (EMP-10010)</option>
                    <option>Marcus Vance (EMP-10118)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Calculated Field Formula</label>
                  <select className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white">
                    <option>CF_LRV_Worker_Managers_Title</option>
                    <option>CF_ESI_Most_Recent_Compensation_Change</option>
                    <option>CF_EE_Comp_Ratio_Band_Classification</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setTestedFieldResult('Evaluated Result: "VP of Technology & Cloud Infrastructure" [Latency: 0.12ms]');
                      triggerLabStep('s4');
                      triggerLabStep('s5');
                      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
                    }}
                    className="w-full px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-bold"
                  >
                    Execute Formula
                  </button>
                </div>
              </div>

              {testedFieldResult && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 font-mono text-xs flex items-center justify-between">
                  <span>{testedFieldResult}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded">PASSED</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 5: SECURITY MATRIX & AUDIT */}
        {currentScreen === 'security_matrix' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                  Security Governance & Domain Security Matrix
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure Domain Security Policies, Role-Based Groups, and commit audited activations.
                </p>
              </div>

              <button
                onClick={() => setShowActivateModal(true)}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                Activate Pending Security Changes ({pendingSecurityCount})
              </button>
            </div>

            {/* Pending Security Notice */}
            {pendingSecurityCount > 0 && (
              <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    You have <strong className="text-white">{pendingSecurityCount} pending security policy modifications</strong> awaiting formal activation.
                  </span>
                </div>
                <button
                  onClick={() => setShowActivateModal(true)}
                  className="px-2.5 py-1 bg-amber-400 text-slate-950 rounded text-xs font-bold"
                >
                  Review & Activate
                </button>
              </div>
            )}

            {isSecurityActivated && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Security Changes Successfully Activated and Audited with SOX Timestamp!</span>
              </div>
            )}

            {/* Domain Security Policy Table */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-4 bg-slate-800 border-b border-slate-700 text-xs font-bold text-slate-300">
                Core Domain Security Policies (DSP)
              </div>
              <div className="divide-y divide-slate-700/60 text-xs">
                {[
                  { domain: 'Worker Data: Base Pay & Compensation', securityGroups: 'HR Partner, Compensation Analyst', access: 'Modify' },
                  { domain: 'Person Data: Social Security & National Tax ID', securityGroups: 'Security Administrator', access: 'Modify' },
                  { domain: 'Worker Data: Performance Reviews & Ratings', securityGroups: 'Manager, HR Partner', access: 'View Only' },
                  { domain: 'Integration System: Benefits Feeds (ISU)', securityGroups: 'ISSG_Benefits_Export', access: 'View Only' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{item.domain}</div>
                      <div className="text-[11px] text-slate-400">Assigned Groups: {item.securityGroups}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-sky-950 border border-sky-500/40 text-sky-300 font-mono text-[11px] rounded">
                      {item.access}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: EIB & INTEGRATIONS WORKBENCH */}
        {currentScreen === 'eib_workbench' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-sky-400" />
                  Enterprise Interface Builder (EIB) Workbench
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Execute Outbound Extracts to SFTP with PGP encryption and Inbound Web Service batches.
                </p>
              </div>

              <button
                onClick={handleRunEIB}
                disabled={eibRunning}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                {eibRunning ? 'Processing Integration...' : 'Launch Outbound EIB'}
              </button>
            </div>

            {/* EIB Configuration Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">1. Data Source</span>
                <h5 className="text-sm font-bold text-white mt-1">Custom Report (RaaS)</h5>
                <p className="text-xs text-slate-400 mt-1">Active Employee Roster with PBO Worker and compensation LRV fields.</p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">2. Transformation</span>
                <h5 className="text-sm font-bold text-white mt-1">PGP 2048-Bit Cipher</h5>
                <p className="text-xs text-slate-400 mt-1">Encrypted with Fidelity 401(k) public key. Zero cleartext transmission.</p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">3. Delivery Transport</span>
                <h5 className="text-sm font-bold text-white mt-1">SFTP (SSH Key Auth)</h5>
                <p className="text-xs text-slate-400 mt-1">sftp.fidelity-benefits.com:22 with timestamped filename generation.</p>
              </div>
            </div>

            {/* Live Terminal Log */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                <span>EIB RUNTIME EXECUTION CONSOLE</span>
                <span>JOB ID: EIB-2026-99014</span>
              </div>
              <div className="pt-3 space-y-1.5 min-h-[140px] text-slate-300">
                {eibLog.length === 0 ? (
                  <span className="text-slate-600">Ready to launch. Click &quot;Launch Outbound EIB&quot; above to initiate pipeline.</span>
                ) : (
                  eibLog.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-sky-500 font-bold">›</span>
                      <span>{line}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: WORKDAY INBOX */}
        {currentScreen === 'inbox' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-sky-400" />
                  Workday My Tasks / Inbox
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Approval requests and workflow to-dos waiting for your action.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {inboxTasks.map((task) => (
                <div key={task.id} className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
                    <div>
                      <div className="text-xs text-sky-400 font-semibold">{task.type} Task · {task.date}</div>
                      <h4 className="text-base font-bold text-white mt-0.5">{task.title}</h4>
                      <div className="text-xs text-slate-400 mt-0.5">Initiated by {task.initiatedBy}</div>
                    </div>

                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                      task.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}>
                      {task.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-mono mt-3 mb-4 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                    {task.details}
                  </p>

                  {task.status === 'Pending' && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApproveInboxTask(task.id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm"
                      >
                        Approve Hire
                      </button>
                      <button
                        onClick={() => setInboxTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'Sent Back' } : t))}
                        className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded-lg"
                      >
                        Send Back with Comments
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CREATE POSITION MODAL */}
      {showCreatePositionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-bold text-white">Create Position in {selectedOrg.name}</h4>
              <button onClick={() => setShowCreatePositionModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Position Title</label>
              <input
                type="text"
                value={newPositionTitle}
                onChange={(e) => setNewPositionTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Hiring Restriction: Job Profile</label>
              <input
                type="text"
                value={newPositionJobProfile}
                onChange={(e) => setNewPositionJobProfile(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCreatePositionModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePosition}
                className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded"
              >
                Submit Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD SUBORDINATE ORG MODAL */}
      {showAddSubOrgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-bold text-white">Create Subordinate Supervisory Org</h4>
              <button onClick={() => setShowAddSubOrgModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Superior Org (Parent)</label>
              <input type="text" value={selectedOrg.name} readOnly className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded text-xs text-slate-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">New Organization Name</label>
              <input
                type="text"
                value={newSubOrgName}
                onChange={(e) => setNewSubOrgName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddSubOrgModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubOrg}
                className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded"
              >
                Confirm Org Setup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVATE PENDING SECURITY CHANGES MODAL */}
      {showActivateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/40 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Activate Pending Security Changes
              </h4>
              <button onClick={() => setShowActivateModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-slate-300">
              Workday requires an immutable audit justification before changes to Domain and BP Security Policies are committed to the live runtime memory.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Mandatory SOX Audit Comment</label>
              <textarea
                value={auditComment}
                onChange={(e) => setAuditComment(e.target.value)}
                placeholder="e.g. SOX-2026-Q1: Annual Security Policy Hardening by Kapil Narula"
                rows={3}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowActivateModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleActivateSecurity}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded"
              >
                Confirm & Activate Runtime Security
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
