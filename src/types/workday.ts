export type PhaseId = 1 | 2 | 3 | 4 | 5 | 6;

export interface Phase {
  id: PhaseId;
  title: string;
  badgeTitle: string;
  hours: string;
  levelRange: [number, number];
  description: string;
  badgeTier: 'Bronze' | 'Silver' | 'Titanium' | 'Gold' | 'Platinum' | 'Diamond';
  accentColor: string;
  iconName: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LabTaskStep {
  id: string;
  text: string;
  hint?: string;
}

export interface LabChallenge {
  id: string;
  title: string;
  businessScenario: string;
  targetScreen: 'org_chart' | 'bp_config' | 'hire_wizard' | 'calc_fields' | 'security_matrix' | 'eib_workbench' | 'inbox';
  steps: LabTaskStep[];
  successMessage: string;
}

export interface Level {
  id: number;
  hour: number;
  phaseId: PhaseId;
  title: string;
  moduleName: string;
  shortDesc: string;
  durationMinutes: number;
  keyConcepts: string[];
  kapilArchitectSecret: string;
  interviewQuestion: {
    question: string;
    kapilAnswer: string;
  };
  theoryMarkdown: {
    overview: string;
    architectureHighlights: string[];
    workdayBestPractices: string[];
    commonPitfalls: string[];
  };
  lab: LabChallenge;
  quiz: QuizQuestion[];
}

export interface Badge {
  id: string;
  levelId?: number;
  phaseId?: PhaseId;
  name: string;
  category: 'Milestone' | 'Level' | 'Special';
  tier: 'Bronze' | 'Silver' | 'Titanium' | 'Gold' | 'Platinum' | 'Diamond';
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface UserProgress {
  learnerName: string;
  learnerRole: string;
  completedLevels: number[];
  labCompletions: Record<number, boolean>;
  quizScores: Record<number, number>; // levelId -> score
  unlockedBadges: string[];
  currentLevel: number;
  totalStudyMinutes: number;
  lastActiveDate: string;
}

export interface SimulatorWorker {
  id: string;
  employeeId: string;
  name: string;
  title: string;
  supervisoryOrgId: string;
  jobProfile: string;
  grade: string;
  baseSalary: number;
  currency: string;
  hireDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  email: string;
  avatarUrl?: string;
}

export interface SupervisoryOrg {
  id: string;
  name: string;
  code: string;
  parentId?: string;
  managerName: string;
  managerId: string;
  staffingModel: 'Position Management' | 'Job Management';
  headcount: number;
  openPositions: number;
  subOrgs: string[];
}

export interface BusinessProcessStep {
  id: string;
  order: string;
  action: 'Initiate' | 'Action' | 'Approval' | 'Approval Chain' | 'Review' | 'Service' | 'To Do';
  title: string;
  assignedSecurityGroup: string;
  conditionRule?: string;
  isComplete?: boolean;
}

export interface CalculatedFieldDef {
  id: string;
  name: string;
  businessObject: string;
  functionType: 'Lookup Related Value' | 'Extract Single Instance' | 'Evaluate Expression' | 'Arithmetic Calculation' | 'Format Date';
  returnType: 'Text' | 'Numeric' | 'Boolean' | 'Date';
  sourceField?: string;
  relationshipPath?: string;
  defaultVal?: string;
  formula?: string;
}
