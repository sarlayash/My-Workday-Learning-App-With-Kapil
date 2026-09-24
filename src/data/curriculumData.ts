import { Level } from '../types/workday';

export const WORKDAY_LEVELS: Level[] = [
  // ==========================================
  // PHASE 1: FOUNDATION & CORE ARCHITECTURE (Hours 1 - 5)
  // ==========================================
  {
    id: 1,
    hour: 1,
    phaseId: 1,
    title: 'Workday Architecture, Data Model & Tenant Topology',
    moduleName: 'Foundation Specialist',
    shortDesc: 'Deconstruct the In-Memory Object Graph, Business Objects, Fields, and Workday Release Cadence (R1/R2).',
    durationMinutes: 60,
    keyConcepts: [
      'Multi-tenant Cloud In-Memory Architecture',
      'Business Objects (Workers, Positions, Organizations)',
      'Primary Business Objects (PBO) vs Related Business Objects (RBO)',
      'Tenant Topology: Implementation, Sandbox, Production & Preview',
      'The "Single Version of Software" paradigm and weekly patches',
    ],
    kapilArchitectSecret: 'Unlike legacy relational databases (tables with foreign keys), Workday is an in-memory object-oriented graph. Never think in SQL terms like JOIN. Think in Object Pointers! When you look up a worker, their position, compensation, and manager are direct instance pointers.',
    interviewQuestion: {
      question: 'How does Workdays in-memory object model differ from traditional RDBMS like Oracle or SAP HR, and why does it make calculated fields so fast?',
      kapilAnswer: 'Workday holds the entire graph of business objects in memory (RAM). When traversing from Worker to Position to Supervisory Organization, there are no disk I/O penalties or relational JOIN overheads; it is simple pointer resolution. This allows real-time calculated fields and reporting on live production data without data warehousing delays.',
    },
    theoryMarkdown: {
      overview: 'Welcome to Hour 1 of your Zero to Infinity journey! Workday is built from the ground up on modern multi-tenant cloud architecture. Every piece of business logic is modeled as an Object rather than a row in a SQL table.',
      architectureHighlights: [
        'Multi-tenant single-codebase: All Fortune 500 clients run the exact same underlying software version.',
        'Object Data Model: Business Objects represent real-world entities (e.g., Worker, Event, Organization).',
        'Instance References: Fields store pointers to unique instances identified by WIDs (Workday Internal IDs) and Reference IDs.',
        'Weekly maintenance windows and major semi-annual releases (March & September).',
      ],
      workdayBestPractices: [
        'Always verify which tenant you are logged into (look for the gold/red banner in Sandbox/Implementation).',
        'Use Workday Reference IDs instead of relying on display names when building integrations.',
        'Bookmark the Workday Community documentation for release feature flags.',
      ],
      commonPitfalls: [
        'Assuming data is saved in relational tables and attempting SQL-like queries.',
        'Running mass updates directly in Production without pre-testing in Sandbox.',
      ],
    },
    lab: {
      id: 'lab-1',
      title: 'Tenant Navigation & Global Search Discovery',
      businessScenario: 'You just joined Apex Global as the lead Workday Architect. Familiarize yourself with the enterprise tenant and search index.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Open the Workday Global Search bar and enter "Apex Global Holdings"', hint: 'Use the top navigation bar search input' },
        { id: 's2', text: 'Locate the top-level Supervisory Organization in the hierarchy viewer', hint: 'Check the Org Studio hierarchy tab' },
        { id: 's3', text: 'Inspect the primary manager and total worker headcount', hint: 'Review Logan McNeils department stats' },
      ],
      successMessage: 'Great job! You have mastered Workday tenant exploration and object hierarchy resolution.',
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'What is the primary architectural differentiator of Workday compared to legacy ERPs?',
        options: ['It uses an in-memory object-oriented graph rather than a relational disk database', 'It runs only on on-premise local servers', 'It requires daily database compiling', 'It stores all data in static CSV files'],
        correctIndex: 0,
        explanation: 'Workday stores all operational and reporting data in an in-memory object database, enabling instantaneous traversals across related business objects.',
      },
      {
        id: 'q1-2',
        question: 'Which tenant type is automatically refreshed weekly with a snapshot of Production data?',
        options: ['Implementation Tenant (IMP)', 'Sandbox (SBX)', 'Preview Tenant (PRE)', 'Golden Master Tenant'],
        correctIndex: 1,
        explanation: 'Sandbox is refreshed weekly from Production so consultants can safely test business processes and configuration against real production data snapshots.',
      },
    ],
  },
  {
    id: 2,
    hour: 2,
    phaseId: 1,
    title: 'Organizations & Supervisory Organization Hierarchy',
    moduleName: 'Foundation Specialist',
    shortDesc: 'Architect Supervisory Orgs, Company Orgs, Cost Centers, and Reorganization Events.',
    durationMinutes: 60,
    keyConcepts: [
      'Supervisory Organizations: The backbone of all HCM business processes',
      'Superior vs Subordinate Organization relationships',
      'Organization Types: Company, Cost Center, Region, Matrix Org',
      'Reorganization Events: The legal container for moving or creating orgs',
      'Primary vs Secondary Org assignments',
    ],
    kapilArchitectSecret: 'Supervisory Organizations are NOT company legal entities; they represent "Who reports to whom". Every single business process (Hire, Terminate, Promote) routes through the Supervisory Org chain of the manager. If your Sup Org structure is messy, your approvals will stall!',
    interviewQuestion: {
      question: 'What is the difference between a Supervisory Organization, a Company, and a Cost Center in Workday?',
      kapilAnswer: 'A Supervisory Organization manages workers and dictates management reporting hierarchies and BP routing. A Company is the primary legal entity for tax, financial reporting, and balance sheets. A Cost Center is a financial organization used to track operating expenses and payroll chargebacks.',
    },
    theoryMarkdown: {
      overview: 'In Workday, organizational structures define both organizational hierarchy and financial accounting. The Supervisory Organization is the foundational building block of Workday HCM.',
      architectureHighlights: [
        'Supervisory Orgs hold workers directly and establish the management hierarchy.',
        'Inheritance: Subordinate organizations inherit staffing models, roles, and security groups unless explicitly overridden.',
        'Reorganization Date: You cannot edit org hierarchies freely without creating an official Reorganization Event tied to an effective date.',
      ],
      workdayBestPractices: [
        'Always assign a single active manager to every Supervisory Org to avoid unassigned approval queue deadlocks.',
        'Maintain consistent naming conventions across subordinate hierarchies (e.g., "[Region] - [Function] - [Team]").',
      ],
      commonPitfalls: [
        'Using Supervisory Orgs for financial rollups instead of using Cost Center Hierarchies or Matrix Orgs.',
        'Leaving vacant manager seats without assigning an acting manager role.',
      ],
    },
    lab: {
      id: 'lab-2',
      title: 'Configure Subordinate Supervisory Org & Assign Manager',
      businessScenario: 'Apex Global is expanding its Cloud Engineering practice. Create a new subordinate organization under Technology Division.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Select "Apex Global - Technology Division" from the Org tree', hint: 'Click on the Technology Division node' },
        { id: 's2', text: 'Click "Add Subordinate Org" to launch the organization creation panel', hint: 'Use the action button in the Org panel' },
        { id: 's3', text: 'Set Organization Name to "Cloud & DevOps Engineering" and assign Staffing Model to Position Management', hint: 'Fill out the form fields' },
        { id: 's4', text: 'Save and verify the new node appears nested in the live org tree', hint: 'Click Confirm Org Setup' },
      ],
      successMessage: 'Subordinate Supervisory Organization successfully provisioned with active management hierarchy!',
    },
    quiz: [
      {
        id: 'q2-1',
        question: 'Which organization type directly determines how Business Processes (like Hires and Leaves) route for approval?',
        options: ['Cost Center', 'Supervisory Organization', 'Company Organization', 'Location Organization'],
        correctIndex: 1,
        explanation: 'Supervisory Organizations establish who reports to whom and define the routing hierarchy for HCM business processes.',
      },
      {
        id: 'q2-2',
        question: 'What required artifact must be created before creating or moving a Supervisory Organization?',
        options: ['A Reorganization Event with an effective date', 'A Purchase Order', 'A SQL Stored Procedure', 'An Integration System User'],
        correctIndex: 0,
        explanation: 'Every structural organization change in Workday must be tracked under an effective-dated Reorganization Event.',
      },
    ],
  },
  {
    id: 3,
    hour: 3,
    phaseId: 1,
    title: 'Staffing Models: Position Management vs Job Management',
    moduleName: 'Foundation Specialist',
    shortDesc: 'Evaluate and configure Position Management versus Job Management for Fortune 500 scalability.',
    durationMinutes: 60,
    keyConcepts: [
      'Position Management: 1 Position = 1 Worker (strict headcount control)',
      'Job Management: 1 Definition = Unlimited Workers (flexible headcount)',
      'Job Management vs Position Management trade-offs in enterprise scale',
      'Hiring Restrictions: Job Profile, Location, Time Type, Worker Type',
      'Freeze Position, Close Position, and Edit Position Restrictions',
    ],
    kapilArchitectSecret: '98% of Fortune 500 enterprises use Position Management. Why? Because CFOs and Finance teams demand strict headcount control and budgeted position tracking. Job Management is typically only used for seasonal retail staff or university student interns.',
    interviewQuestion: {
      question: 'When would you recommend Job Management over Position Management in an enterprise implementation?',
      kapilAnswer: 'Job Management is recommended when the client has high-turnover, non-budgeted, or volume-based staffing where tracking individual vacant chairs has no business value—such as call center contractors, warehouse shift workers, or seasonal retail associates.',
    },
    theoryMarkdown: {
      overview: 'The staffing model defines the rules governing how workers are hired into a supervisory organization. Choosing the right staffing model is one of the most critical foundational decisions.',
      architectureHighlights: [
        'Set once per Supervisory Org: Can be inherited or overridden at subordinate levels.',
        'Position Management: Each position has its own unique Position ID, hiring restrictions, and funding allocation.',
        'Positions can be opened, filled, frozen, or closed with historical tracking.',
      ],
      workdayBestPractices: [
        'Standardize on Position Management for salaried, professional, and corporate staff.',
        'Set accurate Hiring Restrictions (Job Profile, Location, Worker Type) on positions to prevent unauthorized hiring deviations.',
      ],
      commonPitfalls: [
        'Trying to change staffing models after workers and positions are already populated (requires complex migration).',
      ],
    },
    lab: {
      id: 'lab-3',
      title: 'Create and Configure an Enterprise Position with Restrictions',
      businessScenario: 'Open a new budgeted position for a Senior Cloud Architect in the newly created Cloud & DevOps org.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Select "Cloud & DevOps Engineering" supervisory org', hint: 'Locate the node in the tree' },
        { id: 's2', text: 'Click "Create Position" in the Org Actions panel', hint: 'Click the + Create Position button' },
        { id: 's3', text: 'Specify Job Profile: "Enterprise Cloud Architect" and Worker Type: "Regular"', hint: 'Configure hiring restrictions' },
        { id: 's4', text: 'Submit to open the position for hiring', hint: 'Click Submit Position' },
      ],
      successMessage: 'Position created with strict hiring restrictions, ready for Business Process routing!',
    },
    quiz: [
      {
        id: 'q3-1',
        question: 'Under Position Management, how many workers can occupy a single non-overlapping position at any given time?',
        options: ['Exactly 1 worker', 'Up to 5 workers', 'Unlimited workers', 'Depends on the Cost Center'],
        correctIndex: 0,
        explanation: 'In Position Management, a position is a single seat: 1 position corresponds to at most 1 worker at a given point in time.',
      },
    ],
  },
  {
    id: 4,
    hour: 4,
    phaseId: 1,
    title: 'Job Architecture: Job Families, Profiles & Classification',
    moduleName: 'Foundation Specialist',
    shortDesc: 'Structure Global Job Catalogs, Job Profiles, Job Families, Management Levels, and FLSA Exemptions.',
    durationMinutes: 60,
    keyConcepts: [
      'Job Architecture Hierarchy: Job Family Group -> Job Family -> Job Profile',
      'Job Profile Attributes: Exempt/Non-Exempt, Pay Rate Type, Management Level',
      'Job Classifications: EEO, SOC, Global Regulatory Compliance Codes',
      'Job Overrides on Positions vs Inherited Defaults',
      'Localization: Multi-country Job Profile adjustments',
    ],
    kapilArchitectSecret: 'Do not allow HR departments to create a unique Job Profile for every manager title! A healthy Fortune 500 company should have a lean job catalog (e.g., 500–1,200 job profiles globally). Keep titles standardized and use Business Titles for vanity.',
    interviewQuestion: {
      question: 'What is the relationship between a Job Profile, a Job Family, and a Job Family Group?',
      kapilAnswer: 'Job Family Group is the highest taxonomy container (e.g. Information Technology). Under it sit Job Families (e.g. Cloud Infrastructure, Application Development). Under each Job Family are specific Job Profiles (e.g. Cloud Architect I, Senior Cloud Architect, Principal Cloud Architect).',
    },
    theoryMarkdown: {
      overview: 'Job Architecture is the backbone of talent, compensation, and reporting. It defines the generic capabilities, qualifications, and pay classifications for work performed in the enterprise.',
      architectureHighlights: [
        'Job Profile is the central blueprint for workers: defines default grade, compensation package, and benefits eligibility.',
        'Workers are assigned a Job Profile, but can be given a custom Business Title for day-to-day display.',
      ],
      workdayBestPractices: [
        'Map default compensation grades directly to Job Profiles to reduce data entry errors during hiring.',
      ],
      commonPitfalls: [
        'Creating duplicates of the same job profile with regional names instead of using localization overrides.',
      ],
    },
    lab: {
      id: 'lab-4',
      title: 'Inspect Job Architecture & Profile Classification',
      businessScenario: 'Review the Cloud Architecture job profile and verify its management level and default pay grade.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Open the Job Architecture tab in Org Studio', hint: 'Switch to the Job Profiles view' },
        { id: 's2', text: 'Select "Enterprise Cloud Architect (TECH-901)"', hint: 'Click on the profile row' },
        { id: 's3', text: 'Verify Job Family: "Cloud Engineering" and Pay Rate Type: "Salary"', hint: 'Inspect details modal' },
      ],
      successMessage: 'Job profile classifications verified against enterprise compliance standards!',
    },
    quiz: [
      {
        id: 'q4-1',
        question: 'Which attribute on a Job Profile defines whether overtime must be paid under US labor law?',
        options: ['FLSA Status (Exempt vs Non-Exempt)', 'Supervisory Level', 'Job Family Code', 'Cost Center Allocator'],
        correctIndex: 0,
        explanation: 'FLSA (Fair Labor Standards Act) status designates whether an employee is exempt from overtime or non-exempt.',
      },
    ],
  },
  {
    id: 5,
    hour: 5,
    phaseId: 1,
    title: 'Compensation Fundamentals: Packages, Grades & Eligibility Rules',
    moduleName: 'Foundation Specialist',
    shortDesc: 'Design Compensation Packages, Grade Profiles, Salary Ranges, and Configurable Eligibility Rules.',
    durationMinutes: 60,
    keyConcepts: [
      'Compensation Framework: Elements, Plans, Grades, Packages',
      'Compensation Eligibility Rules (Condition rules filtering who gets what)',
      'Compensation Grade Profiles for geographic cost-of-labor pay bands (Zone A/B/C)',
      'Base Pay Plans (Salary vs Hourly) and Allowance Plans',
      'Merit Plans and Bonus Target Percentages',
    ],
    kapilArchitectSecret: 'Always remember: Compensation Packages do NOT assign pay! Eligibility Rules do. A worker only sees the compensation plans that their eligibility rules qualify them for based on Country, Location, or Job Profile. Never hardcode compensation.',
    interviewQuestion: {
      question: 'How do Compensation Grade Profiles solve for regional salary differences (e.g., San Francisco vs Austin) within the same Job Profile?',
      kapilAnswer: 'Instead of creating multiple job profiles, you attach a single Compensation Grade to the job profile, and under that grade, you create multiple Grade Profiles (e.g. Grade 10 - Bay Area, Grade 10 - National). Each Grade Profile has an Eligibility Rule matching the workers location, automatically assigning the correct pay range.',
    },
    theoryMarkdown: {
      overview: 'Compensation in Workday is modular and rule-driven. It ties base pay, allowances, bonuses, and equity into a cohesive package governed by automated eligibility rules.',
      architectureHighlights: [
        'Compensation Package combines Compensation Plans and Compensation Grades into a single offering.',
        'Eligibility Rules use logical condition expressions (e.g., Country = United States AND Time Type = Full_Time).',
      ],
      workdayBestPractices: [
        'Always configure min, midpoint, and max values on Grade Profiles to enable comp-ratio calculation.',
      ],
      commonPitfalls: [
        'Overlapping eligibility rules where a worker qualifies for conflicting compensation plans.',
      ],
    },
    lab: {
      id: 'lab-5',
      title: 'Audit Compensation Grade & Range Spans',
      businessScenario: 'Inspect the salary band for Grade 10 Executive Technical Architect to confirm min/mid/max spread.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Navigate to the Compensation Bands inspector', hint: 'Click Compensation in the navigation' },
        { id: 's2', text: 'Select "Grade 10: Principal / Architect"', hint: 'Choose Grade 10' },
        { id: 's3', text: 'Confirm the range: $165,000 - $210,000 - $265,000 USD', hint: 'Inspect the salary spread meter' },
      ],
      successMessage: 'Phase 1 Complete! Bronze Foundation Specialist Milestone Achieved!',
    },
    quiz: [
      {
        id: 'q5-1',
        question: 'What mechanism in Workday dynamically determines which compensation plans a worker receives?',
        options: ['Compensation Eligibility Rules', 'Manual entry by HR each month', 'Database triggers', 'CSV upload'],
        correctIndex: 0,
        explanation: 'Compensation Eligibility Rules evaluate worker attributes (location, job profile, company) to automatically default appropriate plans.',
      },
    ],
  },

  // ==========================================
  // PHASE 2: CORE HCM & BUSINESS PROCESS ENGINE (Hours 6 - 10)
  // ==========================================
  {
    id: 6,
    hour: 6,
    phaseId: 2,
    title: 'Business Process Framework: Step Types, Order & Actions',
    moduleName: 'Business Process Engineer',
    shortDesc: 'Master the BP Engine: Initiation, Action, Approval, Approval Chains, Reviews, and To-Dos.',
    durationMinutes: 60,
    keyConcepts: [
      'The BP Framework: State machine driving all Workday transactions',
      'Step Types: Initiation (A), Action, Approval, Approval Chain, To-Do, Service',
      'Alphabetical vs Sequence Ordering (Step a, b, c, d)',
      'Security Groups assigned to each step (Who takes action)',
      'BP Event History and Process Monitor',
    ],
    kapilArchitectSecret: 'In Workday Business Processes, step ordering uses letters (a, b, c, c1, d). Two steps with the SAME letter (e.g., b1 and b2) run in PARALLEL! This is the classic trick used in Fortune 500 implementations to trigger IT provisioning and Background Check simultaneously!',
    interviewQuestion: {
      question: 'What happens when two steps in a Business Process definition have the exact same step order label (e.g. step c)?',
      kapilAnswer: 'They execute in parallel! Both steps are routed simultaneously to their respective assignees, and the business process will wait until both are satisfied before proceeding to step d.',
    },
    theoryMarkdown: {
      overview: 'The Business Process (BP) Framework is the heartbeat of Workday. Everything from hiring an employee to requesting vacation or changing a salary is executed as an instance of a Business Process Definition.',
      architectureHighlights: [
        'A BP definition consists of sequential and parallel steps.',
        'Each step specifies an Action (Approval, Review, To-Do), assigned Security Group, and optional Condition Rule.',
        'Events hold the runtime snapshot: who initiated, who approved, when it completed, and full audit logs.',
      ],
      workdayBestPractices: [
        'Keep approval chains streamlined: avoid more than 3 approval steps to prevent bottlenecking HR operations.',
      ],
      commonPitfalls: [
        'Assigning a step to a security group that has no active members in that supervisory org, causing unassigned task errors.',
      ],
    },
    lab: {
      id: 'lab-6',
      title: 'Analyze & Reorder Business Process Definition Steps',
      businessScenario: 'Open the Hire Business Process and examine the sequence of Initiation, Compensation Review, and Management Approval.',
      targetScreen: 'bp_config',
      steps: [
        { id: 's1', text: 'Select "Business Process: Hire" in the BP Configurator', hint: 'Click BP Configurator in the top nav' },
        { id: 's2', text: 'Review Step a (Initiate), Step b (Propose Compensation), and Step c (Manager Approval)', hint: 'Inspect the step sequence table' },
        { id: 's3', text: 'Verify the assigned security groups for each step', hint: 'Check the Security Group column' },
      ],
      successMessage: 'BP step definitions and approval routing thoroughly mapped!',
    },
    quiz: [
      {
        id: 'q6-1',
        question: 'Which step type halts the business process until a specific user or role explicitly clicks Approve or Deny?',
        options: ['Approval Step', 'To-Do Step', 'Service Step', 'Notification Step'],
        correctIndex: 0,
        explanation: 'Approval steps require explicit affirmative approval from the assigned security group before downstream steps can proceed.',
      },
    ],
  },
  {
    id: 7,
    hour: 7,
    phaseId: 2,
    title: 'BP Routing, Condition Rules & Approval Matrix',
    moduleName: 'Business Process Engineer',
    shortDesc: 'Build dynamic conditional branches: Rule-based routing based on salary thresholds and job levels.',
    durationMinutes: 60,
    keyConcepts: [
      'Condition Rules in Business Processes (IF / THEN logic)',
      'Entry Conditions vs Exit Conditions',
      'Consolidated Approvals and Delegations',
      'Escalation and Due Date Rules (Automatic routing if idle for 48 hours)',
      'Subprocesses (e.g. Propose Compensation Hire as a sub-process of Hire)',
    ],
    kapilArchitectSecret: 'Always write your condition rules using "Fields on Business Object" rather than hardcoding static values. For example, use "Proposed Base Salary > Threshold Rule" so when thresholds change, you update one rule instead of 20 BP definitions!',
    interviewQuestion: {
      question: 'How do you route a VP-level hire for CEO approval while allowing standard engineer hires to stop at the Director level?',
      kapilAnswer: 'You add an Approval Step assigned to the CEO with a Condition Rule: "Proposed Management Level in (Vice President, Senior Vice President, C-Suite)". For lower levels, this condition evaluates to FALSE, so Workday silently skips the step and advances to completion.',
    },
    theoryMarkdown: {
      overview: 'Condition rules give Business Processes enterprise intelligence. Instead of static one-size-fits-all approvals, rules inspect the data being submitted and dynamically route tasks.',
      architectureHighlights: [
        'If a condition rule evaluates to False, the step is skipped cleanly.',
        'Consolidated Approvals allow managers to approve the hire, compensation, and org assignment in a single inbox screen.',
      ],
      workdayBestPractices: [
        'Test condition rules with boundary values (e.g., exactly $150,000 salary) to confirm proper boolean evaluation.',
      ],
      commonPitfalls: [
        'Creating mutually exclusive rules that result in zero approvals, bypassing executive oversight.',
      ],
    },
    lab: {
      id: 'lab-7',
      title: 'Configure Executive Approval Condition Rule',
      businessScenario: 'Add a condition rule to Step d (VP Approval) in the Hire BP so it only fires if Proposed Salary exceeds $180,000.',
      targetScreen: 'bp_config',
      steps: [
        { id: 's1', text: 'In the Hire BP, click "Add Condition" on Step d', hint: 'Click the edit rule icon on step d' },
        { id: 's2', text: 'Select Field: "Annual Base Salary" and Operator: ">"', hint: 'Configure rule logic' },
        { id: 's3', text: 'Set Threshold: "$180,000 USD"', hint: 'Enter the value' },
        { id: 's4', text: 'Save Condition Rule and confirm badge updates to "Rule Active"', hint: 'Click Save Rule' },
      ],
      successMessage: 'Condition rule configured and validated against enterprise governance criteria!',
    },
    quiz: [
      {
        id: 'q7-1',
        question: 'What happens if a condition rule on an Approval step evaluates to FALSE during a transaction?',
        options: ['The step is skipped and the process moves to the next step', 'The entire business process errors out', 'The process waits forever', 'The transaction is cancelled'],
        correctIndex: 0,
        explanation: 'Workday automatically skips steps whose condition rules evaluate to FALSE, allowing seamless branching.',
      },
    ],
  },
  {
    id: 8,
    hour: 8,
    phaseId: 2,
    title: 'Hire an Employee: End-to-End Enterprise Flow',
    moduleName: 'Business Process Engineer',
    shortDesc: 'Simulate the full lifecycle: Requisition, Candidate match, Org selection, Job Profile, Comp, and Onboarding.',
    durationMinutes: 60,
    keyConcepts: [
      'The Hire Employee Task: End-to-end data intake',
      'Hire Date vs Effective Date vs First Day of Work',
      'Propose Compensation Hire sub-process',
      'Assign Pay Group & US Form I-9 / W-4 Tax setups',
      'Onboarding subprocess and Welcome email triggers',
    ],
    kapilArchitectSecret: 'In production, the most frequent reason a Hire gets stuck is duplicate national IDs (SSN / Tax ID)! Workday has an automated duplicate person detector. Always ensure pre-hire records are checked before creating a brand new worker.',
    interviewQuestion: {
      question: 'Walk me through the stages of a Hire transaction from the moment a recruiter clicks submit until the worker has system access.',
      kapilAnswer: '1. Recruiter initiates Hire on an open position. 2. Hire BP fires. 3. Sub-process Propose Compensation is initiated and reviewed by Comp Partner. 4. Manager reviews and approves. 5. Upstream notifications trigger IT account creation (Active Directory / Okta). 6. On Hire Date, worker transitions from Pre-Hire to Active Worker status.',
    },
    theoryMarkdown: {
      overview: 'Hiring is the central HCM transaction in Workday. It transforms a Pre-Hire entity into an Active Employee linked to a Supervisory Org, Position, and Compensation Plan.',
      architectureHighlights: [
        'Pre-Hire: An entity containing personal information before employment commences.',
        'Hire Event: The historical container tracking all approvals, documents, and compensation offers.',
      ],
      workdayBestPractices: [
        'Always verify the Position has "Open for Hire" status before initiating.',
      ],
      commonPitfalls: [
        'Setting the Hire Date in the past without checking retroactive payroll impacts.',
      ],
    },
    lab: {
      id: 'lab-8',
      title: 'Execute Full Hire Transaction in the Simulator',
      businessScenario: 'Hire candidate "Marcus Vance" as Senior Cloud Architect in Cloud & DevOps Engineering.',
      targetScreen: 'hire_wizard',
      steps: [
        { id: 's1', text: 'Launch the Hire Employee Wizard from Global Search or the menu', hint: 'Click Hire Employee Wizard' },
        { id: 's2', text: 'Select Supervisory Org: "Cloud & DevOps Engineering"', hint: 'Step 1 of wizard' },
        { id: 's3', text: 'Select Open Position: "Senior Cloud Architect (POS-1044)"', hint: 'Step 2 of wizard' },
        { id: 's4', text: 'Set Base Salary: $175,000 USD and submit the transaction', hint: 'Step 3 of wizard' },
        { id: 's5', text: 'Open the Workday Inbox and approve the pending Hire task as Logan McNeil', hint: 'Check Inbox for pending task' },
      ],
      successMessage: 'Employee successfully hired and active in the enterprise directory!',
    },
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the system status of an individual in Workday after an offer is accepted but BEFORE their official start date arrives?',
        options: ['Pre-Hire', 'Terminated', 'Applicant', 'Archived'],
        correctIndex: 0,
        explanation: 'Until the effective hire date arrives, the person exists as a Pre-Hire record linked to the future hire event.',
      },
    ],
  },
  {
    id: 9,
    hour: 9,
    phaseId: 2,
    title: 'Worker Life Cycle: Transfer, Promote, Change Job & Terminate',
    moduleName: 'Business Process Engineer',
    shortDesc: 'Orchestrate lateral transfers, promotions with compensation adjustments, and involuntary terminations.',
    durationMinutes: 60,
    keyConcepts: [
      'The "Change Job" overarching business process',
      'Change Job reasons: Lateral Transfer, Promotion, Demotion, Location Change',
      'Position handling during Transfer: Overlap vs Vacating the position',
      'Termination Business Process: Primary reason, eligibility for rehire, severance',
      'Close Position vs Retain Position for future backfill',
    ],
    kapilArchitectSecret: 'Did you know that in modern Workday, "Transfer", "Promote", and "Demote" are not separate BPs? They all run through the single master "Change Job" Business Process! The Reason Code selected determines which condition rules and steps fire.',
    interviewQuestion: {
      question: 'When a worker is transferred to another department, what options exist for their current position?',
      kapilAnswer: 'Workday allows you to: 1. Keep the position open in the departing org for backfill. 2. Close the position immediately. 3. Move the position along with the worker to the new organization.',
    },
    theoryMarkdown: {
      overview: 'A workers career in Workday is a succession of effective-dated lifecycle events. The Change Job BP coordinates transfers, promotions, and compensation recalculations.',
      architectureHighlights: [
        'Effective-dating: Workday maintains full point-in-time history of every position, manager, and pay grade change.',
        'Retroactive changes: If an effective date is set in the past, Workday recalculates reporting and triggers retro-pay in payroll.',
      ],
      workdayBestPractices: [
        'Enforce clear termination reason codes for legal compliance and unemployment filings.',
      ],
      commonPitfalls: [
        'Failing to reassign direct reports before terminating a people manager.',
      ],
    },
    lab: {
      id: 'lab-9',
      title: 'Promote Worker with Compensation Adjustment',
      businessScenario: 'Promote Elena Rostova from Cloud Specialist to Lead Cloud Architect with a 15% salary increase.',
      targetScreen: 'bp_config',
      steps: [
        { id: 's1', text: 'Select "Business Process: Change Job" in the configurator', hint: 'Switch to Change Job BP' },
        { id: 's2', text: 'Review the Promotion approval branch and compensation review step', hint: 'Inspect the Change Job rules' },
        { id: 's3', text: 'Confirm the effective date audit trail policy', hint: 'Verify audit settings' },
      ],
      successMessage: 'Worker lifecycle governance rules successfully verified!',
    },
    quiz: [
      {
        id: 'q9-1',
        question: 'Which master business process handles Promotions, Lateral Moves, and Location Changes in Workday?',
        options: ['Change Job', 'Move Employee', 'Employee Adjuster', 'Position Rebalance'],
        correctIndex: 0,
        explanation: 'Change Job is the master business process in Workday that handles all internal employee transitions and reassignments.',
      },
    ],
  },
  {
    id: 10,
    hour: 10,
    phaseId: 2,
    title: 'Contingent Worker Management & Contracting Program',
    moduleName: 'Business Process Engineer',
    shortDesc: 'Implement contingent worker staffing, supplier contracts, worker conversions, and contracted service terms.',
    durationMinutes: 60,
    keyConcepts: [
      'Contingent Worker (CW) vs Regular Employee distinction',
      'Contracting Vendor & Staffing Supplier relationships',
      'Contract Start & End Dates, Contract Extensions',
      'Contingent Worker Conversion to Regular Employee (Contract-to-Hire)',
      'Security separation for non-employee workforce',
    ],
    kapilArchitectSecret: 'Crucial Fortune 500 legal tip: Contingent workers must NEVER have compensation plans assigned in Workday! They are paid by their external vendor agency. If you assign a base salary in Workday to a contractor, you risk co-employment labor lawsuits!',
    interviewQuestion: {
      question: 'How does Workday prevent co-employment risks for contingent workers?',
      kapilAnswer: 'Workday prohibits standard employee compensation plans, benefit enrollments, and performance reviews on contingent worker profiles. Instead, they are tied to a Contracting Vendor, PO number, and contracted hourly rate/statement of work.',
    },
    theoryMarkdown: {
      overview: 'Over 40% of the Fortune 500 workforce consists of contingent workers (contractors, agency temps, consultants). Workday tracks them with dedicated Contract Contingent Worker business processes.',
      architectureHighlights: [
        'Contract Contingent Worker BP initiates staffing agency onboarding.',
        'Convert to Employee BP facilitates frictionless conversion while preserving worker history and WID.',
      ],
      workdayBestPractices: [
        'Set mandatory Contract End Dates with automated notifications 30 days prior to expiration.',
      ],
      commonPitfalls: [
        'Creating a duplicate pre-hire when converting a contractor to full-time instead of using the Convert to Employee task.',
      ],
    },
    lab: {
      id: 'lab-10',
      title: 'Review Contingent Worker Contracting Safeguards',
      businessScenario: 'Inspect the Contingent Worker configuration to ensure compensation plans are locked out.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Filter org directory by Worker Type: "Contingent Worker"', hint: 'Use the filter in Org Studio' },
        { id: 's2', text: 'Select contractor profile "Alex Chen (CW)"', hint: 'Click on Alex Chens record' },
        { id: 's3', text: 'Verify Vendor Agency is set to "Apex Staffing Partners" and Compensation is marked N/A', hint: 'Inspect CW details' },
      ],
      successMessage: 'Phase 2 Complete! Silver Business Process Engineer Milestone Achieved!',
    },
    quiz: [
      {
        id: 'q10-1',
        question: 'Why are standard Employee Compensation and Benefit plans disabled for Contingent Workers in Workday?',
        options: ['To mitigate co-employment liability risks since they are paid by third-party suppliers', 'Because Workday cannot calculate contractor numbers', 'Because contractors do not have names', 'To save disk space'],
        correctIndex: 0,
        explanation: 'Assigning employee comp and benefits to contractors creates legal co-employment risks; contractors are paid through accounts payable / supplier invoices.',
      },
    ],
  },

  // ==========================================
  // PHASE 3: SECURITY & ACCESS GOVERNANCE (Hours 11 - 15)
  // ==========================================
  {
    id: 11,
    hour: 11,
    phaseId: 3,
    title: 'Configurable Security Architecture: Domains & Policies',
    moduleName: 'Enterprise Security Architect',
    shortDesc: 'Architect Domain Security Policies (DSP), View vs Modify permissions, and security inheritance.',
    durationMinutes: 60,
    keyConcepts: [
      'Functional Areas & Domain Security Policies (DSP)',
      'View vs Modify permissions on data and reports',
      'Actionable Domains (Tasks) vs Reporting Domains (Data Fields)',
      'Security Policy Hierarchy and Functional Governance',
      'The difference between Domain Security and Business Process Security',
    ],
    kapilArchitectSecret: 'Remember the golden rule of Workday Security: Domain Security Policies govern WHAT data and tasks you can see or edit. Business Process Security Policies govern WHO can participate in a workflow step. They are two halves of the security coin!',
    interviewQuestion: {
      question: 'Explain the difference between a Domain Security Policy and a Business Process Security Policy.',
      kapilAnswer: 'A Domain Security Policy controls access to items, reports, and individual data fields (e.g. Worker Compensation, SSN). A Business Process Security Policy controls who can initiate, view, approve, cancel, or rescind steps within a specific business process workflow.',
    },
    theoryMarkdown: {
      overview: 'Workday security is declarative, configurable, and baked directly into the object model. Every field, task, and report belongs to a Domain protected by a Domain Security Policy (DSP).',
      architectureHighlights: [
        'Security Groups are granted View or Modify access to Domains.',
        'Changes to security policies remain in PENDING status until an authorized administrator activates them.',
      ],
      workdayBestPractices: [
        'Follow the Principle of Least Privilege: never grant Modify access when View access is sufficient.',
      ],
      commonPitfalls: [
        'Modifying a domain security policy in production and forgetting to run "Activate Pending Security Changes".',
      ],
    },
    lab: {
      id: 'lab-11',
      title: 'Inspect Domain Security Policy Permissions',
      businessScenario: 'Examine the Domain Security Policy for "Worker Data: Compensation" and review who has View vs Modify rights.',
      targetScreen: 'security_matrix',
      steps: [
        { id: 's1', text: 'Open the Security Matrix Workbench from top navigation', hint: 'Click Security Matrix' },
        { id: 's2', text: 'Select Domain: "Worker Data: Base Pay"', hint: 'Locate Base Pay domain' },
        { id: 's3', text: 'Review the assigned groups: HR Partner (Modify), Compensation Partner (Modify), Employee As Self (View)', hint: 'Inspect permissions grid' },
      ],
      successMessage: 'Domain security policies inspected and governance roles verified!',
    },
    quiz: [
      {
        id: 'q11-1',
        question: 'Which policy type controls whether a user can see a workers salary on their profile?',
        options: ['Domain Security Policy', 'Business Process Security Policy', 'Firewall Rule', 'Active Directory Policy'],
        correctIndex: 0,
        explanation: 'Domain Security Policies protect data fields and reports, such as worker compensation or birth dates.',
      },
    ],
  },
  {
    id: 12,
    hour: 12,
    phaseId: 3,
    title: 'Role-Based Security Groups (RBSG) & Contextual Roles',
    moduleName: 'Enterprise Security Architect',
    shortDesc: 'Design Role-Based Security Groups (Constrained vs Unconstrained) and assign organization roles.',
    durationMinutes: 60,
    keyConcepts: [
      'Role-Based Security Groups (RBSG): Inherited through org role assignment',
      'Constrained vs Unconstrained Security Groups',
      'Contextual Roles: Manager, HR Partner, Talent Partner assigned to Sup Orgs',
      'Inherited roles down the supervisory organization hierarchy',
      'Single vs Multiple assignees per organization role',
    ],
    kapilArchitectSecret: 'Never, EVER make an HR Partner unconstrained in production! If an HR Partner is unconstrained, they can see salaries, terminations, and confidential disciplinary records across the ENTIRE company, including the CEO and Board of Directors! Always constrain roles to their specific Sup Org.',
    interviewQuestion: {
      question: 'What is the critical difference between a Constrained and an Unconstrained Security Group in Workday?',
      kapilAnswer: 'An Unconstrained security group has access to its granted domains across the entire tenant with zero boundary limits. A Constrained security group only has access to workers and data within the specific contextual organization (Supervisory Org, Cost Center, Region) where that user holds the assigned role.',
    },
    theoryMarkdown: {
      overview: 'RBSGs are the most widely used security group type in Workday. Membership is not granted to an individual user directly, but to a Role assigned on an Organization.',
      architectureHighlights: [
        'When Jane Doe is assigned the role of "HR Partner" on "Engineering Org", she automatically gains all security permissions associated with the HR Partner RBSG for workers in that org.',
        'If Jane moves to Marketing, simply reassigning the role automatically updates her security—no manual user security maintenance needed!',
      ],
      workdayBestPractices: [
        'Keep roles constrained to prevent organizational data leakage.',
      ],
      commonPitfalls: [
        'Assigning individuals to User-Based security groups for operational HR tasks instead of using RBSGs.',
      ],
    },
    lab: {
      id: 'lab-12',
      title: 'Configure Role-Based Security Group on a Supervisory Org',
      businessScenario: 'Assign Sarah Jenkins as the HR Partner for the Cloud & DevOps Engineering supervisory organization.',
      targetScreen: 'security_matrix',
      steps: [
        { id: 's1', text: 'Select "Role Assignments" in the Security Workbench', hint: 'Click Role Assignments tab' },
        { id: 's2', text: 'Locate "Cloud & DevOps Engineering"', hint: 'Find the org in the list' },
        { id: 's3', text: 'Assign Role "HR Partner" to worker "Sarah Jenkins"', hint: 'Select Sarah Jenkins from the worker dropdown' },
        { id: 's4', text: 'Confirm the constraint shows "Inherited to Subordinates"', hint: 'Check the inheritance toggle' },
      ],
      successMessage: 'Role-Based Security Group assigned with strict organizational constraint boundaries!',
    },
    quiz: [
      {
        id: 'q12-1',
        question: 'Why are Role-Based Security Groups preferred over manual User-Based Security Groups for HR team members?',
        options: ['Security automatically follows the person whenever they change jobs or departments without manual IT tickets', 'They make the database smaller', 'They require no passwords', 'They can only be used by managers'],
        correctIndex: 0,
        explanation: 'RBSGs provide dynamic, automated security: when an HR Partner changes orgs, their permissions automatically shift to their new scope.',
      },
    ],
  },
  {
    id: 13,
    hour: 13,
    phaseId: 3,
    title: 'User-Based Security Groups & Segmented Security',
    moduleName: 'Enterprise Security Architect',
    shortDesc: 'Implement User-Based Security Groups (UBSG), Integration System Users (ISU), and Segmented Access.',
    durationMinutes: 60,
    keyConcepts: [
      'User-Based Security Groups: Assigned directly to individual Workday accounts',
      'Use cases: System Administrators, Implementers, Security Administrators',
      'Segmented Security: Restricting pay components or personal data within a single domain',
      'Integration System Users (ISU) & Integration System Security Groups (ISSG)',
      'Audit logging of direct user security grants',
    ],
    kapilArchitectSecret: 'Fortune 500 audit teams scrutinize User-Based Security Groups! In a compliant enterprise, only 0.1% of users (system administrators and integration service accounts) should have UBSGs. If everyday recruiters or managers have UBSGs, your SOX compliance auditor will flag it!',
    interviewQuestion: {
      question: 'When should a Workday Architect use Segmented Security?',
      kapilAnswer: 'Segmented Security is used when you need to grant access to a subset of data within a domain. For instance, allowing standard HR Partners to view base salary, but restricting Executive Stock Options and Retention Bonuses to an Executive Compensation Partner segment.',
    },
    theoryMarkdown: {
      overview: 'User-Based Security Groups apply tenant-wide regardless of organizational reporting. Because they bypass organizational constraints, they are reserved for global administrative roles.',
      architectureHighlights: [
        'Workday Administrator, Security Administrator, Report Administrator are standard delivered UBSGs.',
        'Segmented Security slices domains into secure data segments protected by dedicated security groups.',
      ],
      workdayBestPractices: [
        'Require dual authorization before granting Workday Administrator UBSG to any employee.',
      ],
      commonPitfalls: [
        'Granting the Workday Administrator role to developers who only need integration access.',
      ],
    },
    lab: {
      id: 'lab-13',
      title: 'Audit User-Based Security & Executive Segmented Access',
      businessScenario: 'Review the Executive Compensation Segment to verify only the VP of Total Rewards has modify rights.',
      targetScreen: 'security_matrix',
      steps: [
        { id: 's1', text: 'Click "Segmented Security" in the Security Matrix', hint: 'Switch to Segmented Security tab' },
        { id: 's2', text: 'Select Segment: "Executive Stock & Equity Plans"', hint: 'Locate the equity segment' },
        { id: 's3', text: 'Verify that Standard HR Partner is excluded from this segment', hint: 'Confirm the exclusion flag' },
      ],
      successMessage: 'Segmented security boundaries verified against SOX compliance standards!',
    },
    quiz: [
      {
        id: 'q13-1',
        question: 'Who should typically be assigned to User-Based Security Groups in a Fortune 500 Workday tenant?',
        options: ['Global System Administrators and Integration System Users (ISUs)', 'All frontline managers', 'All newly hired employees', 'All contractor agencies'],
        correctIndex: 0,
        explanation: 'User-Based Security Groups grant tenant-wide unconstrained permissions and should be restricted to system administrators and integration accounts.',
      },
    ],
  },
  {
    id: 14,
    hour: 14,
    phaseId: 3,
    title: 'Business Process Security Policies (BPSP)',
    moduleName: 'Enterprise Security Architect',
    shortDesc: 'Configure who can Initiate, Approve, Review, Cancel, Rescind, and Correct business processes.',
    durationMinutes: 60,
    keyConcepts: [
      'Business Process Security Policy (BPSP) Architecture',
      'Action permissions: Who Can Start, Who Can Approve, Who Can Rescind',
      'Correct vs Rescind permissions and SOX compliance rules',
      'Delegate Authority policies (Vacation and Leave delegations)',
      'Mass Cancel and Advance in Process administrative overrides',
    ],
    kapilArchitectSecret: 'Pay close attention to "Who Can Rescind" vs "Who Can Correct". "Correct" modifies data in an ongoing or completed event while preserving history. "Rescind" completely rolls back the transaction as if it never happened! Rescind should be locked down to top-level HR Operations only.',
    interviewQuestion: {
      question: 'What is the risk of granting "Who Can Rescind" broadly on the Hire or Terminate Business Process?',
      kapilAnswer: 'Rescinding a Hire after payroll has already run or after benefit feeds have synced with external carriers causes massive desynchronization: employees receive paychecks for unlinked workers, and insurance providers maintain ghost policies. It creates severe financial and compliance hazards.',
    },
    theoryMarkdown: {
      overview: 'Every Business Process type in Workday has an associated Business Process Security Policy (BPSP) that strictly defines which security groups can interact with events of that type.',
      architectureHighlights: [
        'Configures granular lifecycle actions: Initiate, Cancel, Rescind, Correct, Reassign, and View Process History.',
        'Enforces separation of duties (e.g. initiator cannot be sole approver).',
      ],
      workdayBestPractices: [
        'Restrict Rescind and Correct permissions to dedicated HR Systems Specialists.',
      ],
      commonPitfalls: [
        'Allowing initiators to approve their own transactions without compensatory review.',
      ],
    },
    lab: {
      id: 'lab-14',
      title: 'Configure BPSP for Compensation Changes',
      businessScenario: 'Update the Request Compensation Change BPSP so that only Compensation Partners can Rescind completed events.',
      targetScreen: 'security_matrix',
      steps: [
        { id: 's1', text: 'Select "BP Security Policies" in the Security Workbench', hint: 'Click BP Security tab' },
        { id: 's2', text: 'Locate "Request Compensation Change" BPSP', hint: 'Find the policy row' },
        { id: 's3', text: 'Ensure "Who Can Rescind" only includes "Compensation Administrator"', hint: 'Verify security group list' },
      ],
      successMessage: 'BPSP governance policies locked down to certified administrators!',
    },
    quiz: [
      {
        id: 'q14-1',
        question: 'What is the effect of "Rescinding" a completed business process event in Workday?',
        options: ['It reverses the event completely, rolling back all data changes as if the event never took place', 'It deletes the entire tenant', 'It emails the user a warning', 'It duplicates the position'],
        correctIndex: 0,
        explanation: 'Rescinding undoes the event and restores the pre-event state, which is why it is strictly controlled.',
      },
    ],
  },
  {
    id: 15,
    hour: 15,
    phaseId: 3,
    title: 'Security Audit & Activate Pending Security Changes',
    moduleName: 'Enterprise Security Architect',
    shortDesc: 'Execute the mandatory "Activate Pending Security Changes" workflow with audit comment trails.',
    durationMinutes: 60,
    keyConcepts: [
      'The "Pending Security Changes" staging buffer',
      'The "Activate Pending Security Changes" task',
      'Audit Trail requirements: Mandatory timestamped audit comment',
      'Security Health Check & Segregation of Duties (SoD) audits',
      'View Security History for Worker and Security Policy',
    ],
    kapilArchitectSecret: 'Every Workday beginner makes this mistake: they spend 2 hours configuring the perfect security policy, but when they log in as a test user, nothing works! Why? Because they forgot to run "Activate Pending Security Changes"! In Workday, no security edits take effect until officially activated!',
    interviewQuestion: {
      question: 'Why does Workday buffer security changes in a "Pending" state rather than applying them instantly on Save?',
      kapilAnswer: 'Security updates can alter access to millions of sensitive data points and impact running business processes. The Pending buffer allows security architects to batch complex modifications across multiple domains and BPSPs, review the consolidated impact, and commit them atomically with an immutable audit comment required for SOX/SOC compliance.',
    },
    theoryMarkdown: {
      overview: 'Security changes in Workday have a two-phase commit: configuration followed by formal activation. This guarantees enterprise auditability and atomic deployment.',
      architectureHighlights: [
        'Security activation is an immutable system event recorded in the system audit log with user, timestamp, and audit comment.',
        'View Security History provides full diffs of before-and-after permissions.',
      ],
      workdayBestPractices: [
        'Always include Jira/ServiceNow ticket numbers in the activation comment (e.g. "SEC-4401: Annual SOX Segregation of Duties alignment").',
      ],
      commonPitfalls: [
        'Leaving pending security changes lingering across weeks, causing unintended security activations during emergency fixes.',
      ],
    },
    lab: {
      id: 'lab-15',
      title: 'Execute "Activate Pending Security Changes" in the Simulator',
      businessScenario: 'Commit all recent security changes by running the formal Workday activation workflow.',
      targetScreen: 'security_matrix',
      steps: [
        { id: 's1', text: 'Review the list of Pending Security modifications in the staging panel', hint: 'Check the Pending Changes alert' },
        { id: 's2', text: 'Click "Activate Pending Security Changes"', hint: 'Click the primary action button' },
        { id: 's3', text: 'Enter Audit Comment: "SOX-2026-Q1: Annual Security Policy Hardening by Kapil Narula"', hint: 'Type in the audit justification' },
        { id: 's4', text: 'Confirm activation and verify status transitions to "ACTIVE & AUDITED"', hint: 'Click Confirm Activation' },
      ],
      successMessage: 'Phase 3 Complete! Titanium Enterprise Security Architect Milestone Achieved!',
    },
    quiz: [
      {
        id: 'q15-1',
        question: 'What mandatory action must be completed before any Domain or BP Security Policy changes take effect in a tenant?',
        options: ['Run the "Activate Pending Security Changes" task with an audit comment', 'Restart the cloud server', 'Clear the browser cookies', 'Create a new user account'],
        correctIndex: 0,
        explanation: 'Workday buffers all security changes until an administrator runs "Activate Pending Security Changes" with a documented audit explanation.',
      },
    ],
  },

  // ==========================================
  // PHASE 4: ADVANCED REPORTING & CALCULATED FIELDS (Hours 16 - 20)
  // ==========================================
  {
    id: 16,
    hour: 16,
    phaseId: 4,
    title: 'Report Writer: Simple, Advanced & Matrix Reports',
    moduleName: 'Analytics & Calc Fields Master',
    shortDesc: 'Master Report Writer report types, Sorting, Filtering, Prompts, and RaaS (Report-as-a-Service).',
    durationMinutes: 60,
    keyConcepts: [
      'Report Types: Simple, Advanced, Matrix, Search, Transposed',
      'Why Advanced Reports are the standard for 90% of enterprise needs',
      'Matrix Reports for multi-dimensional crosstabs and drilldowns',
      'Report Prompts: Default values, prompt qualifiers, and required flags',
      'Enabling RaaS (Report-as-a-Service) for REST/JSON/XML data feeds',
    ],
    kapilArchitectSecret: 'Whenever building an integration that extracts Workday data to external systems (like ADP, ServiceNow, or Tableau), always use an Advanced Report with "Enable as Web Service" checked! This turns your report into a high-speed RESTful JSON endpoint (RaaS) without writing a single line of backend code!',
    interviewQuestion: {
      question: 'What is the difference between an Advanced Report and a Matrix Report, and when would you use each?',
      kapilAnswer: 'An Advanced Report outputs tabular detail records (like a roster of all active employees with their title, manager, and salary) and supports related business object traversal and calculated fields. A Matrix Report aggregates data into multi-dimensional summary grids (e.g. Headcount by Region vs Cost Center with drilldown capability to row-level details).',
    },
    theoryMarkdown: {
      overview: 'Workdays built-in Report Writer enables business users and architects to query live operational data without an external data warehouse.',
      architectureHighlights: [
        'Advanced Reports can access fields on the Primary Business Object as well as multi-level Related Business Objects.',
        'Report-as-a-Service (RaaS) exposes report results in CSV, XML, RSS, and JSON formats for outbound integrations.',
      ],
      workdayBestPractices: [
        'Always filter early: apply filters on indexed fields (like Active Status = True) to ensure optimal report runtimes.',
      ],
      commonPitfalls: [
        'Sharing reports globally with "All Employees" instead of sharing with specific role-based security groups.',
      ],
    },
    lab: {
      id: 'lab-16',
      title: 'Build Enterprise Headcount Advanced Report',
      businessScenario: 'Configure an Advanced Report on the Worker business object with filters for Active Status.',
      targetScreen: 'calc_fields',
      steps: [
        { id: 's1', text: 'Select Report Designer in the Analytics Workbench', hint: 'Click Report Designer tab' },
        { id: 's2', text: 'Choose Primary Business Object: "Worker"', hint: 'Select Worker from the PBO list' },
        { id: 's3', text: 'Add Columns: Legal Name, Supervisory Org, Job Profile, Base Salary', hint: 'Check the field boxes' },
        { id: 's4', text: 'Enable "Report-as-a-Service (RaaS)" endpoint', hint: 'Toggle the RaaS switch' },
      ],
      successMessage: 'Advanced Report configured with live RaaS web service endpoint enabled!',
    },
    quiz: [
      {
        id: 'q16-1',
        question: 'Which checkbox on an Advanced Report exposes its output as a RESTful web service endpoint for external tools?',
        options: ['Enable as Web Service (RaaS)', 'Make Public to Internet', 'Export to Disk', 'Allow Direct SQL'],
        correctIndex: 0,
        explanation: 'Checking "Enable as Web Service" exposes the custom report as a secure REST API endpoint accessible via basic auth or OAuth.',
      },
    ],
  },
  {
    id: 17,
    hour: 17,
    phaseId: 4,
    title: 'Primary Business Objects (PBO) vs Related Business Objects (RBO)',
    moduleName: 'Analytics & Calc Fields Master',
    shortDesc: 'Navigate 1-to-1 and 1-to-many object relationships across the in-memory graph.',
    durationMinutes: 60,
    keyConcepts: [
      'PBO (Primary Business Object) defines the grain of the report (1 row per PBO)',
      'RBO (Related Business Object) represents connected entities in the object graph',
      '1-to-1 relationships (e.g. Worker -> Primary Position)',
      '1-to-Many relationships (e.g. Worker -> Dependent Children, Worker -> Compensation History)',
      'Multi-instance fields and the need for aggregation or single-instance extraction',
    ],
    kapilArchitectSecret: 'The #1 rookie reporting mistake is picking the wrong Primary Business Object! If you want a report of all open and filled positions, do NOT pick "Worker" as your PBO—because vacant positions have no workers! Your PBO must be "Position Restrictions"!',
    interviewQuestion: {
      question: 'If you need a report showing all employees and their emergency contacts, what is the PBO, what is the RBO, and why can you not just add Emergency Contact Phone directly to a single-line report?',
      kapilAnswer: 'The PBO is "Worker", and the RBO is "Emergency Contacts". Because an employee can have multiple emergency contacts (1-to-many), adding the contact phone directly would result in multiple repeating rows or a concatenated multi-instance cell. To display a single phone on one clean row, you must use an Extract Single Instance (ESI) calculated field.',
    },
    theoryMarkdown: {
      overview: 'Understanding the relationship between PBO and RBO is the dividing line between amateur report builders and certified Workday Architects.',
      architectureHighlights: [
        'Primary Business Object dictates the starting node in the in-memory graph.',
        'Single-instance RBO: Navigates cleanly with direct field selection.',
        'Multi-instance RBO: Returns a collection of instances that require calculated field functions (ESI, LRV, Count).',
      ],
      workdayBestPractices: [
        'Always verify relationship cardinality (1:1 vs 1:N) before adding columns to prevent row multiplication.',
      ],
      commonPitfalls: [
        'Creating duplicate report rows because a 1-to-many relationship wasn’t filtered down to a single instance.',
      ],
    },
    lab: {
      id: 'lab-17',
      title: 'Trace PBO to RBO Object Traversal Path',
      businessScenario: 'Trace the path from Worker (PBO) -> Primary Position -> Supervisory Organization -> Manager.',
      targetScreen: 'calc_fields',
      steps: [
        { id: 's1', text: 'Open the Object Graph Navigator', hint: 'Click Object Graph tab' },
        { id: 's2', text: 'Select PBO: "Worker"', hint: 'Choose Worker' },
        { id: 's3', text: 'Traverse into RBO: "Primary Position"', hint: 'Click Primary Position link' },
        { id: 's4', text: 'Traverse into RBO: "Supervisory Organization" and locate "Manager"', hint: 'Follow the pointer link' },
      ],
      successMessage: 'In-memory multi-level object traversal path confirmed!',
    },
    quiz: [
      {
        id: 'q17-1',
        question: 'If a worker has three emergency contacts, what type of relationship exists between Worker and Emergency Contacts?',
        options: ['One-to-Many (Multi-Instance)', 'One-to-One (Single-Instance)', 'Many-to-None', 'Static Relational'],
        correctIndex: 0,
        explanation: 'A worker having multiple contacts represents a 1-to-many (multi-instance) relationship.',
      },
    ],
  },
  {
    id: 18,
    hour: 18,
    phaseId: 4,
    title: 'Calculated Fields Mastery: LRV & Extract Single Instance',
    moduleName: 'Analytics & Calc Fields Master',
    shortDesc: 'Build Lookup Related Value (LRV) and Extract Single Instance (ESI) with sorting and conditions.',
    durationMinutes: 60,
    keyConcepts: [
      'Calculated Fields: Workdays in-memory transformation formulas',
      'Lookup Related Value (LRV): Pulling fields across object pointer paths',
      'Extract Single Instance (ESI): Selecting one item from a 1-to-many collection',
      'ESI Sort Keys: First, Last, Highest Compensation, Most Recent Date',
      'Combining ESI and LRV for surgical data extraction',
    ],
    kapilArchitectSecret: 'Master this exact formula combination, because it accounts for 70% of all Fortune 500 Workday technical interview tests: "How do you display an employees most recent degree or most recent compensation change?" Answer: First build an ESI on the Worker object extracting the 1st instance sorted by Effective Date descending. Then build an LRV using that ESI to pull the Degree or Salary field!',
    interviewQuestion: {
      question: 'Explain how you would build a calculated field to retrieve a workers manager’s manager’s email address.',
      kapilAnswer: '1. Create an LRV on "Worker" using the relationship field "Manager" to pull the managers "Manager" (yielding the Grand-Manager worker instance). 2. Create a second LRV using that Grand-Manager instance to pull their "Primary Work Email". Both resolve in-memory in microseconds.',
    },
    theoryMarkdown: {
      overview: 'Calculated Fields allow you to compute, transform, format, and traverse data on the fly without writing SQL or modifying the database schema.',
      architectureHighlights: [
        'LRV pulls a field from a related business object into the context of your current object.',
        'ESI filters a multi-instance list down to a single instance based on sort conditions (e.g. Top 1, Newest Date).',
      ],
      workdayBestPractices: [
        'Use strict naming prefixes (e.g. `CF_LRV_Worker_Managers_Email` or `CF_ESI_Latest_Bonus`) to keep your tenant organized.',
      ],
      commonPitfalls: [
        'Building circular calculated fields that reference each other, causing recursive execution loops.',
      ],
    },
    lab: {
      id: 'lab-18',
      title: 'Build and Test an ESI + LRV Calculated Field',
      businessScenario: 'Build a calculated field on the Worker object to extract their Manager’s Job Title.',
      targetScreen: 'calc_fields',
      steps: [
        { id: 's1', text: 'Click "Create Calculated Field" in the Calc Fields Workbench', hint: 'Click Create Calc Field' },
        { id: 's2', text: 'Set Name: "CF_LRV_Managers_Title", Business Object: "Worker"', hint: 'Fill out field header' },
        { id: 's3', text: 'Select Function: "Lookup Related Value (LRV)"', hint: 'Choose LRV from function dropdown' },
        { id: 's4', text: 'Set Lookup Field: "Manager" and Return Field: "Job Profile"', hint: 'Configure lookup parameters' },
        { id: 's5', text: 'Run the live calculation test to verify output against sample worker "Elena Rostova"', hint: 'Click Test Calc Field' },
      ],
      successMessage: 'LRV calculated field compiled and verified in-memory!',
    },
    quiz: [
      {
        id: 'q18-1',
        question: 'Which calculated field function is required to isolate the MOST RECENT compensation change from a worker’s historical list of changes?',
        options: ['Extract Single Instance (ESI)', 'Concatenate Text', 'Format Date', 'Arithmetic Calculation'],
        correctIndex: 0,
        explanation: 'ESI sorts multi-instance records (e.g. by effective date descending) and picks the top 1 single instance.',
      },
    ],
  },
  {
    id: 19,
    hour: 19,
    phaseId: 4,
    title: 'Conditional Logic: True/False, Evaluate Expression & Arithmetic',
    moduleName: 'Analytics & Calc Fields Master',
    shortDesc: 'Construct True/False conditions, Evaluate Expression (IF-THEN-ELSE), Text manipulation, and Date formatting.',
    durationMinutes: 60,
    keyConcepts: [
      'True/False Condition calculated fields (Boolean flags)',
      'Evaluate Expression: Workdays equivalent of a CASE / SWITCH statement',
      'Evaluate Expression Band (Numeric intervals for tenure/age brackets)',
      'Arithmetic Calculations: Comp-ratio, overtime rates, prorated bonuses',
      'Format Date & Date Difference calculations (e.g. Years of Service)',
    ],
    kapilArchitectSecret: 'In Evaluate Expression, Workday evaluates conditions top-to-bottom and stops at the FIRST condition that is True! Always arrange your conditions from most specific to least specific, and always include a Default Value at the bottom as a fallback!',
    interviewQuestion: {
      question: 'How do you create a calculated field that groups workers into Tenure Bands: <1 Year, 1-3 Years, 3-5 Years, and 5+ Years?',
      kapilAnswer: 'Use an Evaluate Expression Band (or Evaluate Expression) on the Worker business object with the field "Length of Service in Years". Set Band 1: Value < 1 Return "< 1 Year". Band 2: Value < 3 Return "1-3 Years". Band 3: Value < 5 Return "3-5 Years". Default Return "5+ Years".',
    },
    theoryMarkdown: {
      overview: 'Evaluate Expression (EE) is the Swiss Army knife of Workday calculated fields. It enables complex business logic, categorizations, and conditional routing.',
      architectureHighlights: [
        'Accepts multiple condition rows: each row pairs a Condition Rule with a Return Value.',
        'Arithmetic calculations can add, subtract, multiply, or divide numeric fields with precision rounding.',
      ],
      workdayBestPractices: [
        'Always test edge cases (e.g. null salary, exactly 1.0 years tenure) when setting comparison operators (< vs <=).',
      ],
      commonPitfalls: [
        'Placing a broad condition at the top of an Evaluate Expression, blocking subsequent conditions from ever being reached.',
      ],
    },
    lab: {
      id: 'lab-19',
      title: 'Build Comp-Ratio Bracket Evaluate Expression',
      businessScenario: 'Build an Evaluate Expression calculated field that classifies workers as "Below Range", "In Range", or "Above Range".',
      targetScreen: 'calc_fields',
      steps: [
        { id: 's1', text: 'Select "Evaluate Expression" in the Calc Field builder', hint: 'Choose Evaluate Expression' },
        { id: 's2', text: 'Set Condition 1: Comp-Ratio < 0.85 -> Return: "Below Market Range"', hint: 'Add condition 1' },
        { id: 's3', text: 'Set Condition 2: Comp-Ratio <= 1.15 -> Return: "Competitive Market Range"', hint: 'Add condition 2' },
        { id: 's4', text: 'Set Default Return: "Above Market Premium"', hint: 'Enter default fallback' },
        { id: 's5', text: 'Execute preview test on active workforce', hint: 'Click Run Simulation' },
      ],
      successMessage: 'Evaluate Expression verified with accurate multi-tier bracket logic!',
    },
    quiz: [
      {
        id: 'q19-1',
        question: 'How does Workday evaluate multiple rows inside an Evaluate Expression calculated field?',
        options: ['Top-to-bottom sequentially, stopping at the first condition that evaluates to True', 'All rows simultaneously in random order', 'Bottom-to-top only', 'Only the last condition is evaluated'],
        correctIndex: 0,
        explanation: 'Evaluate Expression evaluates rows from top to bottom and returns the value of the first true match.',
      },
    ],
  },
  {
    id: 20,
    hour: 20,
    phaseId: 4,
    title: 'Prism Analytics, Discovery Boards & Executive Dashboards',
    moduleName: 'Analytics & Calc Fields Master',
    shortDesc: 'Blend external business data with Workday records, design Discovery Boards, and build C-Suite Dashboards.',
    durationMinutes: 60,
    keyConcepts: [
      'Workday Prism Analytics: Data preparation, pipelines, and external blending',
      'Ingesting external CRM, sales commission, or badge swipe data into Prism',
      'Discovery Boards: Drag-and-drop interactive visual analytics',
      'Workday Dashboards & Worklets: Embedding live KPIs onto homepages',
      'Auditing report runtimes and index optimization',
    ],
    kapilArchitectSecret: 'Prism Analytics is how Fortune 500 CHROs calculate true "Cost per Hire" or "Sales Productivity per Employee". By combining Workday HR worker records with Salesforce revenue data directly inside Workdays secure perimeter, you eliminate the need to export sensitive employee salaries to external data lakes!',
    interviewQuestion: {
      question: 'What is Workday Prism Analytics, and how does it maintain Workdays role-based security on external datasets?',
      kapilAnswer: 'Prism Analytics is an integrated big data engine inside Workday. It allows enterprises to ingest external datasets (e.g. POS sales, ATS candidate records), transform them using data pipelines, and join them with core Workday business objects. Crucially, Prism data is published as Data Datasets subject to standard Workday Domain Security Policies.',
    },
    theoryMarkdown: {
      overview: 'Modern Fortune 500 organizations demand instant visual analytics. Discovery Boards and Prism Analytics elevate raw data into executive intelligence.',
      architectureHighlights: [
        'Discovery Boards offer drag-and-drop charts, heatmaps, and pivot grids.',
        'Custom Dashboards group multiple operational worklets into a single unified view for managers and executives.',
      ],
      workdayBestPractices: [
        'Keep dashboard worklets limited to 4–6 per screen to maintain sub-second homepage load times.',
      ],
      commonPitfalls: [
        'Building heavy calculated fields in dashboard reports that cause slow page rendering for thousands of daily users.',
      ],
    },
    lab: {
      id: 'lab-20',
      title: 'Assemble Executive Diversity & Compensation Dashboard',
      businessScenario: 'Configure an executive dashboard view featuring Headcount by Org, Average Comp-Ratio, and Turnover Trends.',
      targetScreen: 'calc_fields',
      steps: [
        { id: 's1', text: 'Click "Dashboard Builder" in the Analytics Workbench', hint: 'Switch to Dashboard Builder' },
        { id: 's2', text: 'Add Worklet: "Headcount by Supervisory Organization"', hint: 'Add Org worklet' },
        { id: 's3', text: 'Add Worklet: "Comp-Ratio Distribution by Job Family"', hint: 'Add Comp worklet' },
        { id: 's4', text: 'Preview live dashboard view with real-time in-memory charts', hint: 'Click Launch Dashboard Preview' },
      ],
      successMessage: 'Phase 4 Complete! Gold Analytics & Calc Fields Master Milestone Achieved!',
    },
    quiz: [
      {
        id: 'q20-1',
        question: 'What is the primary benefit of using Prism Analytics over exporting Workday data to an external SQL data warehouse?',
        options: ['Security governance remains inside Workday, honoring domain policies and avoiding salary data leaks', 'Prism deletes all old data automatically', 'Prism does not require computers', 'Prism only works on paper'],
        correctIndex: 0,
        explanation: 'Prism Analytics processes external data directly inside Workday, enforcing Workdays native security and privacy governance.',
      },
    ],
  },

  // ==========================================
  // PHASE 5: ENTERPRISE INTEGRATION & EIB (Hours 21 - 25)
  // ==========================================
  {
    id: 21,
    hour: 21,
    phaseId: 5,
    title: 'Enterprise Interface Builder (EIB) Outbound: CSV & XML',
    moduleName: 'Cloud Integration Specialist',
    shortDesc: 'Configure Outbound EIBs, select Custom Report data sources, and deliver via SFTP, AS2, or HTTPS.',
    durationMinutes: 60,
    keyConcepts: [
      'Enterprise Interface Builder (EIB): Guided no-code/low-code integration framework',
      'Outbound EIB architecture: Data Source -> Transformation -> Delivery',
      'Custom Report as a Data Source (RaaS)',
      'Delivery transport protocols: SFTP, FTPS, AS2, HTTPS, Email',
      'PGP Encryption & Digital Signatures for payroll/banking security',
    ],
    kapilArchitectSecret: 'When configuring Outbound EIB delivery to a client’s SFTP server, ALWAYS enable PGP Public Key Encryption and specify a timestamped file naming pattern (e.g. `WORKFORCE_EXTRACT_%YYYY%%MM%%DD%_%HH%%MM%.csv`). If you do not use timestamps, the vendor’s server will overwrite previous batches, destroying historical audit logs!',
    interviewQuestion: {
      question: 'Explain the three core architectural components of an Outbound Enterprise Interface Builder (EIB).',
      kapilAnswer: '1. Data Source: Typically a Custom Report (RaaS) that extracts and filters data. 2. Transformation (Optional): An XSLT or Workday-delivered stylesheet that restructures XML into vendor-specific formats. 3. Delivery Service: The transport protocol and endpoint (e.g. SFTP with SSH key authentication and PGP encryption) that sends the file.',
    },
    theoryMarkdown: {
      overview: 'The Enterprise Interface Builder (EIB) is Workdays workhorse integration tool, powering over 75% of all integrations across Fortune 500 companies.',
      architectureHighlights: [
        'Outbound EIBs extract data from Workday and transmit it to third-party vendors (benefits providers, 401k administrators, badge systems).',
        'Built-in security supports SSH Key authentication and PGP file encryption.',
      ],
      workdayBestPractices: [
        'Always test SFTP connections using "Integration Attachment Service" before enabling production schedules.',
      ],
      commonPitfalls: [
        'Hardcoding passwords in delivery configurations instead of using stored SSH Private Keys.',
      ],
    },
    lab: {
      id: 'lab-21',
      title: 'Configure and Launch Outbound EIB to Secure SFTP',
      businessScenario: 'Build an Outbound EIB to transmit employee roster data to Fidelity 401(k) via secure SFTP.',
      targetScreen: 'eib_workbench',
      steps: [
        { id: 's1', text: 'Select "Create EIB: Outbound" in the Integration Workbench', hint: 'Click Create EIB' },
        { id: 's2', text: 'Select Data Source: "Report-as-a-Service: Active Employee Roster"', hint: 'Choose RaaS source' },
        { id: 's3', text: 'Configure Delivery Transport: SFTP (sftp.fidelity-benefits.com:22) with PGP Encryption', hint: 'Configure SFTP settings' },
        { id: 's4', text: 'Launch Integration now and observe live execution status', hint: 'Click Launch EIB' },
      ],
      successMessage: 'Outbound EIB executed successfully with encrypted delivery confirmed!',
    },
    quiz: [
      {
        id: 'q21-1',
        question: 'What is the most common data source used for an Outbound EIB in Workday?',
        options: ['A Custom Report enabled as a Web Service (RaaS)', 'A raw SQL script', 'A manual Excel paste', 'A direct database dump'],
        correctIndex: 0,
        explanation: 'Custom Reports enabled for RaaS provide the flexible filtering, calculations, and security filtering for Outbound EIBs.',
      },
    ],
  },
  {
    id: 22,
    hour: 22,
    phaseId: 5,
    title: 'EIB Inbound: Web Services, Spreadsheets & XSLT',
    moduleName: 'Cloud Integration Specialist',
    shortDesc: 'Automate mass data imports: Web Service Operations (Put_Worker, Change_Job), Custom XSLT, and Validation.',
    durationMinutes: 60,
    keyConcepts: [
      'Inbound EIB architecture: Retrieval -> Transformation -> Workday Web Service',
      'Workday-Generated Excel Template spreadsheets',
      'Workday Web Services (WWS) Operations (e.g. Put_Worker, Submit_Payroll_Input)',
      'Custom XSLT for parsing third-party XML/JSON into Workday-compliant schema',
      'Handling validation errors, partial successes, and rollback',
    ],
    kapilArchitectSecret: 'When running mass Inbound EIBs (like annual merit compensation increases for 20,000 workers), ALWAYS run with the "Validate Only" checkbox checked first! Validate Only runs the entire business logic and validation rules WITHOUT committing changes, allowing you to catch errors before a single production record is touched!',
    interviewQuestion: {
      question: 'What is the purpose of the "Validate Only" execution parameter on an Inbound EIB launch?',
      kapilAnswer: 'Validate Only simulates the complete data import against Workday validation rules, business process requirements, and data constraints without committing any changes to the database. It produces an execution log highlighting errors (e.g. missing required fields, invalid cost centers) so architects can fix data prior to the live run.',
    },
    theoryMarkdown: {
      overview: 'Inbound EIBs allow external systems or spreadsheet uploads to execute transactions in Workday just like a human user clicking through forms.',
      architectureHighlights: [
        'Translates inbound files into Workday Web Services SOAP/REST calls.',
        'Honors all business process routing, approval steps, and security permissions.',
      ],
      workdayBestPractices: [
        'Always review the error log spreadsheet generated by failed records to diagnose root causes.',
      ],
      commonPitfalls: [
        'Launching an Inbound EIB with 10,000 records without testing a 5-record sample file first.',
      ],
    },
    lab: {
      id: 'lab-22',
      title: 'Run Inbound EIB with "Validate Only" Pre-Flight Check',
      businessScenario: 'Validate a batch of 50 new position requests using Inbound EIB before committing to production.',
      targetScreen: 'eib_workbench',
      steps: [
        { id: 's1', text: 'Select "Inbound EIB: Mass Position Request"', hint: 'Choose Inbound EIB' },
        { id: 's2', text: 'Attach payload file: "positions_batch_q2.xml"', hint: 'Select sample file' },
        { id: 's3', text: 'Check "Validate Only" mode in launch options', hint: 'Toggle Validate Only' },
        { id: 's4', text: 'Launch integration and verify all 50 records pass schema validation with 0 errors', hint: 'Click Launch' },
      ],
      successMessage: 'Inbound validation completed with 100% schema compliance!',
    },
    quiz: [
      {
        id: 'q22-1',
        question: 'Why should you always test an Inbound EIB with "Validate Only" enabled first?',
        options: ['It checks for data and business logic errors without committing any changes to production', 'It speeds up your internet connection', 'It changes the font size', 'It bypasses security approvals permanently'],
        correctIndex: 0,
        explanation: 'Validate Only runs the full transaction logic and produces an audit report of validation issues without saving changes to the tenant.',
      },
    ],
  },
  {
    id: 23,
    hour: 23,
    phaseId: 5,
    title: 'Workday Studio Foundations: Assemblies & Components',
    moduleName: 'Cloud Integration Specialist',
    shortDesc: 'Understand when EIB is not enough: Eclipse-based Workday Studio, Mediation, Routing & Splitters.',
    durationMinutes: 60,
    keyConcepts: [
      'When to choose Workday Studio over EIB (Complex branching, multi-system choreography)',
      'Studio Architecture: Assemblies, Mediation Components, Sub-routes',
      'Splitter, Aggregator, and Async-Mediation patterns',
      'MVEL expressions and Java-like scripting inside components',
      'Studio deployment to tenant as an Integration System',
    ],
    kapilArchitectSecret: 'Architect rule of thumb for integrations: 1. If it is 1 source to 1 destination without complex logic -> use EIB. 2. If it is a standard vendor format (like ADP or Benefitfocus) -> use Core Connector. 3. If it requires multiple API calls, state machines, custom encryption, or file splitting -> use Workday Studio!',
    interviewQuestion: {
      question: 'Give three concrete scenarios where an EIB is insufficient and Workday Studio is required.',
      kapilAnswer: '1. Multi-source integration: Calling an external REST API to fetch exchange rates, then enriching employee records before pushing to a third system. 2. Large file streaming with Splitter/Aggregator: Processing a 500MB global payroll file that exceeds EIB memory limits. 3. Complex conditional branching: Routing records to different endpoints based on dynamic payload inspections.',
    },
    theoryMarkdown: {
      overview: 'Workday Studio is the heavy-duty enterprise integration development environment. It is an Eclipse-based visual IDE where developers build integration flows with complex logic.',
      architectureHighlights: [
        'Deploys directly into the Workday cloud as a compiled Integration System.',
        'Runs in Workdays managed execution sandbox with access to all Web Service endpoints.',
      ],
      workdayBestPractices: [
        'Implement structured error handling components (CatchBlocks) to gracefully report failures.',
      ],
      commonPitfalls: [
        'Using Workday Studio for simple reports where an EIB would take 10 minutes to configure and maintain.',
      ],
    },
    lab: {
      id: 'lab-23',
      title: 'Analyze Workday Studio Assembly Architecture',
      businessScenario: 'Inspect the architecture of an enterprise Studio flow: Async Inbound -> Splitter -> Transform -> Web Service Call.',
      targetScreen: 'eib_workbench',
      steps: [
        { id: 's1', text: 'Select "Studio Topology Viewer" in the workbench', hint: 'Click Studio Topology tab' },
        { id: 's2', text: 'Inspect the Splitter component dividing employee payloads by Region', hint: 'Click on the Splitter node' },
        { id: 's3', text: 'Verify the Error Handler Catch Block routes notifications to the Integration Admin queue', hint: 'Check the error route' },
      ],
      successMessage: 'Studio assembly components and mediation architecture mapped!',
    },
    quiz: [
      {
        id: 'q23-1',
        question: 'Which tool should a Workday Architect select when an integration requires calling three different external APIs sequentially and splitting files by region?',
        options: ['Workday Studio', 'Simple EIB', 'Calculated Field', 'Workday Inbox'],
        correctIndex: 0,
        explanation: 'Workday Studio is designed specifically for complex, multi-service, conditional, and high-volume integrations.',
      },
    ],
  },
  {
    id: 24,
    hour: 24,
    phaseId: 5,
    title: 'Core Connectors & Document Transformation (DT)',
    moduleName: 'Cloud Integration Specialist',
    shortDesc: 'Deploy pre-built Core Connectors (Worker, Payroll, Benefits) and apply Document Transformation XSLT.',
    durationMinutes: 60,
    keyConcepts: [
      'Workday Delivered Core Connectors (Worker, Positions, Payroll, Benefits)',
      'Transaction-log driven change detection (Delta feeds / changes only)',
      'Document Transformation (DT) Integration Systems',
      'Integration Attributes and Integration Maps',
      'Integration XSLT stylesheets for formatting output',
    ],
    kapilArchitectSecret: 'The superpower of Core Connectors is the "Transaction Log"! Unlike an EIB which extracts all 10,000 workers every time, a Core Connector inspects Workdays internal change log and extracts ONLY the 4 workers who had a salary increase or address change since yesterday!',
    interviewQuestion: {
      question: 'What is a "Changes Only" (Delta) integration, and how does Core Connector Worker leverage the Transaction Log to achieve it?',
      kapilAnswer: 'A "Changes Only" integration sends only the records that were created, updated, or terminated within a specific time window. Core Connector Worker monitors Workdays Transaction Log. When launched, it queries events (e.g. Compensation Change, Legal Name Change) that occurred since the Last Successful Run Date, generating a minimal payload.',
    },
    theoryMarkdown: {
      overview: 'Core Connectors are Workday-delivered, pre-built integration engines for standard business entities. They come pre-wired with change-detection capabilities.',
      architectureHighlights: [
        'Document Transformation (DT) attaches to a Core Connector to transform Workdays standard XML output into external vendor formats.',
        'Integration Maps map Workday internal codes (e.g., Male/Female/Non-Binary) to vendor codes (e.g., M/F/U).',
      ],
      workdayBestPractices: [
        'Always set the Transaction Log criteria to include future-dated events when integrating with benefit carriers.',
      ],
      commonPitfalls: [
        'Manually resetting the Last Successful Run Date in production, causing duplicate record transmissions.',
      ],
    },
    lab: {
      id: 'lab-24',
      title: 'Configure Core Connector Delta Run & Mapping',
      businessScenario: 'Set up an Integration Map for Country Codes and configure a Delta run for employee changes.',
      targetScreen: 'eib_workbench',
      steps: [
        { id: 's1', text: 'Select "Core Connector: Worker Changes"', hint: 'Choose Core Connector' },
        { id: 's2', text: 'Open the Integration Map table for "Gender & Marital Status"', hint: 'Inspect value mapping' },
        { id: 's3', text: 'Set Run Option to "Changes Only Since Last Successful Run"', hint: 'Select Changes Only' },
        { id: 's4', text: 'Launch delta test and review the resulting change log payload', hint: 'Click Launch Delta' },
      ],
      successMessage: 'Core connector delta configuration verified with transaction log tracking!',
    },
    quiz: [
      {
        id: 'q24-1',
        question: 'What mechanism enables Core Connectors to generate "Changes Only" files without scanning the entire employee database?',
        options: ['The Workday Transaction Log', 'External cron jobs', 'SQL trigger tables', 'Manual spreadsheet tracking'],
        correctIndex: 0,
        explanation: 'The Workday Transaction Log records every effective-dated business event, allowing Core Connectors to extract only recent changes.',
      },
    ],
  },
  {
    id: 25,
    hour: 25,
    phaseId: 5,
    title: 'Integration Security, ISU (Integration System User) & ISSG',
    moduleName: 'Cloud Integration Specialist',
    shortDesc: 'Lock down integration accounts: Non-human ISUs, ISSGs, Session Security, and Least Privilege.',
    durationMinutes: 60,
    keyConcepts: [
      'Integration System User (ISU): Dedicated non-human service accounts',
      'Integration System Security Group (ISSG): Constrained permissions for ISU',
      'Never using human user credentials for automated integrations',
      'Session Security: IP Whitelisting, Mutual TLS (mTLS), and OAuth 2.0 Client Credentials',
      'Disabling UI access for ISUs to prevent unauthorized logins',
    ],
    kapilArchitectSecret: 'Here is a guaranteed Fortune 500 audit failure: creating an integration that runs under a human consultant’s name (e.g. "John Smith"). What happens when John leaves the company and his account is terminated? All 15 payroll integrations crash! Always create dedicated ISUs with "Do Not Allow UI Sessions" checked!',
    interviewQuestion: {
      question: 'Why must every automated integration run under a dedicated Integration System User (ISU) rather than a system administrator account?',
      kapilAnswer: '1. Operational stability: ISU accounts are permanent and do not break when individual employees leave. 2. Least Privilege: An ISU is granted only the exact domain policies needed for its specific task. 3. Auditability: Transaction logs clearly distinguish between human user edits and automated batch system feeds.',
    },
    theoryMarkdown: {
      overview: 'Integration security is critical because integrations transmit high volumes of sensitive employee and financial data outside the company.',
      architectureHighlights: [
        'An ISU is created via "Create Integration System User".',
        'An ISSG is created via "Create Integration System Security Group" and linked to the ISU.',
        'Permissions are granted via Domain Security Policies and activated.',
      ],
      workdayBestPractices: [
        'Always check "Do Not Allow UI Sessions" on ISUs to restrict access strictly to API/SOAP/REST endpoints.',
      ],
      commonPitfalls: [
        'Reusing a single ISU for multiple integrations, violating segregation of duties.',
      ],
    },
    lab: {
      id: 'lab-25',
      title: 'Provision an ISU and Bind to a Least-Privilege ISSG',
      businessScenario: 'Create a dedicated ISU for the Benefits Carrier feed and verify UI login restrictions.',
      targetScreen: 'security_matrix',
      steps: [
        { id: 's1', text: 'Select "Integration System Users" in Security Workbench', hint: 'Switch to ISU tab' },
        { id: 's2', text: 'Create ISU: "ISU_Benefits_Outbound"', hint: 'Fill out username' },
        { id: 's3', text: 'Enable "Do Not Allow UI Sessions" and bind to "ISSG_Benefits_Export"', hint: 'Configure security flags' },
        { id: 's4', text: 'Verify granted domain: "Worker Data: Benefit Enrollments (View Only)"', hint: 'Inspect domain rights' },
      ],
      successMessage: 'Phase 5 Complete! Platinum Cloud Integration Specialist Milestone Achieved!',
    },
    quiz: [
      {
        id: 'q25-1',
        question: 'Which setting should always be enabled on an Integration System User (ISU) to prevent users from logging into the Workday UI with its credentials?',
        options: ['Do Not Allow UI Sessions', 'Disable Inbound API', 'Hide from Search', 'Clear Cache'],
        correctIndex: 0,
        explanation: 'Enabling "Do Not Allow UI Sessions" ensures the service account can only authenticate via web service APIs and never via the web browser UI.',
      },
    ],
  },

  // ==========================================
  // PHASE 6: ADVANCED MODULES & FORTUNE 500 ARCHITECT (Hours 26 - 30)
  // ==========================================
  {
    id: 26,
    hour: 26,
    phaseId: 6,
    title: 'Benefits Administration & Open Enrollment Architecture',
    moduleName: 'Fortune 500 Principal Architect',
    shortDesc: 'Architect Benefit Groups, Coverage Targets, Life Events, Open Enrollment, and Evidence of Insurability (EOI).',
    durationMinutes: 60,
    keyConcepts: [
      'Benefit Groups & Benefit Plans (Health, Dental, Vision, Life, Disability)',
      'Benefit Coverage Targets: Employee Only, Employee + Spouse, Family',
      'Life Events: Marriage, Birth of Child, Divorce (Mid-year enrollment triggers)',
      'Open Enrollment Event configuration and employee self-service elections',
      'Integration feeds to Health Care carriers (EDI 834 standard)',
    ],
    kapilArchitectSecret: 'When designing Open Enrollment in Workday, always configure "Cross-Plan Dependencies"! For example, an employee should not be allowed to elect a Health Savings Account (HSA) unless they have also selected a High Deductible Health Plan (HDHP). Workday can automatically enforce this eligibility rule!',
    interviewQuestion: {
      question: 'How does Workday handle passive vs active enrollment during an Open Enrollment cycle?',
      kapilAnswer: 'In an active enrollment, employees are required to review and submit new elections or default rules apply. In a passive enrollment, an employees current elections roll forward automatically into the new plan year unless they explicitly log in to make changes, except for spending accounts like FSA which require active annual re-enrollment under IRS rules.',
    },
    theoryMarkdown: {
      overview: 'Workday Benefits automates the complex ecosystem of healthcare, insurance, retirement, and wellness plans with employee self-service and automated carrier feeds.',
      architectureHighlights: [
        'Benefit Eligibility Rules determine which plans a worker can select based on location, FTE percentage, and employment type.',
        'Life Events trigger localized enrollment windows with document proof requirements.',
      ],
      workdayBestPractices: [
        'Run pre-Open Enrollment audits to verify dependent records and Social Security numbers.',
      ],
      commonPitfalls: [
        'Allowing employees to submit elections without validating dependent age limits (e.g. age 26 cutoff).',
      ],
    },
    lab: {
      id: 'lab-26',
      title: 'Audit Open Enrollment Plan Year Configuration',
      businessScenario: 'Inspect the Open Enrollment setup and verify that medical plans link to the correct carrier deductions.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Select "Benefits Workbench" in the menu', hint: 'Click Benefits Workbench' },
        { id: 's2', text: 'Review Plan: "Executive High-Deductible Health Plan (HDHP)"', hint: 'Inspect HDHP plan' },
        { id: 's3', text: 'Verify Cross-Plan Dependency: "Requires HSA Account Election"', hint: 'Check dependencies' },
      ],
      successMessage: 'Benefit plans and cross-plan eligibility verified for enterprise open enrollment!',
    },
    quiz: [
      {
        id: 'q26-1',
        question: 'Under US regulations, which type of benefit plan typically requires active employee re-enrollment every plan year and CANNOT roll over passively?',
        options: ['Flexible Spending Accounts (FSA)', 'Medical Insurance', 'Dental Insurance', 'Basic Life Insurance'],
        correctIndex: 0,
        explanation: 'IRS rules require employees to make an active annual election for Flexible Spending Accounts (FSAs); they do not roll over passively.',
      },
    ],
  },
  {
    id: 27,
    hour: 27,
    phaseId: 6,
    title: 'Workday Payroll Architecture: Pay Groups, Earnings & Deductions',
    moduleName: 'Fortune 500 Principal Architect',
    shortDesc: 'Master Pay Groups, Run Categories, Earning Elements, Pre/Post-Tax Deductions, and Settlement.',
    durationMinutes: 60,
    keyConcepts: [
      'Workday Payroll Architecture: Seamlessly integrated with Core HCM (zero integration lag)',
      'Pay Groups & Period Schedules (Bi-weekly, Semi-monthly, Monthly)',
      'Earning Elements vs Deduction Elements (Pre-tax 401k/HSA vs Post-tax Roth/Garnishments)',
      'Retroactive Payroll: Automated retro-pay calculation on effective-dated changes',
      'Payroll Settlement, Pay Slips, and General Ledger (GL) Accounting Journals',
    ],
    kapilArchitectSecret: 'The single greatest advantage of Workday Payroll is "Continuous Payroll Calculation"! In legacy systems, payroll was a batch job run once a week. In Workday, every time an HR user changes a salary or adds a bonus, Workday instantly recalculates gross-to-net in the background! You can see paycheck results 24/7!',
    interviewQuestion: {
      question: 'How does Workday handle retroactive compensation adjustments in payroll?',
      kapilAnswer: 'When a compensation increase is entered with an effective date in a prior closed pay period, Workdays retro-calculation engine automatically detects the change, calculates the delta for gross pay, taxes, and deductions across the affected periods, and creates automated Retro Earning lines in the current open pay period.',
    },
    theoryMarkdown: {
      overview: 'Workday Payroll is built directly on the same in-memory object graph as Core HCM, eliminating the data synchronization lag and file integration errors common with third-party payroll engines.',
      architectureHighlights: [
        'Pay Groups organize workers who share the same period schedule and legal entity.',
        'Run Categories define regular, bonus, or off-cycle on-demand payroll runs.',
      ],
      workdayBestPractices: [
        'Always run the Pre-Complete Payroll Audit to catch negative net pay or missing tax configurations.',
      ],
      commonPitfalls: [
        'Overriding payroll inputs manually instead of fixing the root cause in Core HCM compensation.',
      ],
    },
    lab: {
      id: 'lab-27',
      title: 'Inspect Pay Group Period Schedule & Retro Calculations',
      businessScenario: 'Examine the US Bi-Weekly Pay Group period schedule and verify retro-pay calculation triggers.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Navigate to Payroll Administration in the menu', hint: 'Click Payroll Administration' },
        { id: 's2', text: 'Select Pay Group: "US Corporate Salaried (Bi-Weekly)"', hint: 'Choose US Pay Group' },
        { id: 's3', text: 'Inspect the Gross-to-Net calculation summary and retroactive adjustment ledger', hint: 'Review pay summary' },
      ],
      successMessage: 'Payroll architecture and gross-to-net ledger mechanics verified!',
    },
    quiz: [
      {
        id: 'q27-1',
        question: 'What happens when a salary increase is submitted with an effective date two months in the past?',
        options: ['Workday automatically recalculates the historical pay periods and generates retroactive pay earnings in the next open payroll run', 'The user must manually calculate and type the numbers on a calculator', 'The transaction is rejected by the system', 'The employee must return previous paychecks'],
        correctIndex: 0,
        explanation: 'Workday automatically detects retroactive effective dates and computes accurate retro delta earnings for the current open cycle.',
      },
    ],
  },
  {
    id: 28,
    hour: 28,
    phaseId: 6,
    title: 'Time Tracking & Absence Management: Plans, Balances & Accruals',
    moduleName: 'Fortune 500 Principal Architect',
    shortDesc: 'Structure Time Off Plans, Accrual Calculations, Carryover Limits, Time Entry Templates, and Overtime Rules.',
    durationMinutes: 60,
    keyConcepts: [
      'Absence Management: Time Off Plans vs Leave of Absence (LOA)',
      'Accrual Calculations: Formula-based vacation accrual per pay period',
      'Balance Tracking, Carryover Limits, and Balance Forfeiture rules',
      'Time Tracking: Time Entry Templates, Web Clock, and Mobile Geofencing',
      'Overtime Calculation Rules (Daily, Weekly, 7th Consecutive Day)',
    ],
    kapilArchitectSecret: 'When configuring Leave of Absence (LOA) for FMLA or Parental Leave, make sure you configure the "Impact on Compensation & Benefits" setting! If an employee goes on unpaid leave, Workday can automatically pause salary pay while continuing medical coverage with employee arrears!',
    interviewQuestion: {
      question: 'What is the structural difference between a Time Off Plan and a Leave of Absence (LOA) in Workday?',
      kapilAnswer: 'A Time Off Plan is designed for short, incidental absences (e.g. Vacation, Sick Day, Bereavement) where the worker remains active in their position. A Leave of Absence (LOA) is for extended durations (e.g. Parental Leave, Sabbatical, Military Leave) that changes the workers active status, potentially vacates their seat, and directly impacts payroll and benefits.',
    },
    theoryMarkdown: {
      overview: 'Time and Absence work together to ensure compliance with global wage and hour laws, union agreements, and corporate leave policies.',
      architectureHighlights: [
        'Time Off Plans track units of time (Hours or Days) with automated accruals, eligibility rules, and balance limits.',
        'Calculated Time rules translate raw clock punches into regular hours, overtime, and meal penalties.',
      ],
      workdayBestPractices: [
        'Configure automated alerts for workers approaching maximum vacation balance caps to encourage time off.',
      ],
      commonPitfalls: [
        'Failing to configure statutory holiday calendars, causing incorrect overtime calculations during holiday weeks.',
      ],
    },
    lab: {
      id: 'lab-28',
      title: 'Configure Accrual Rule and Balance Cap Limits',
      businessScenario: 'Audit the Annual PTO Plan accrual rate (6.67 hours/month) and confirm the 200-hour rollover cap.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Select "Absence Management" in the enterprise menu', hint: 'Click Absence Management' },
        { id: 's2', text: 'Open Plan: "US Corporate Paid Time Off (PTO)"', hint: 'Select PTO plan' },
        { id: 's3', text: 'Confirm the carryover ceiling rule: "Max Balance Cap = 200.0 Hours"', hint: 'Verify balance limit' },
      ],
      successMessage: 'Absence accrual rules and balance cap limits validated!',
    },
    quiz: [
      {
        id: 'q28-1',
        question: 'Which Workday feature changes a worker’s employment status and can automatically suspend regular salary payments?',
        options: ['Leave of Absence (LOA)', 'Incidental Sick Hour', 'Badge swipe', 'Coffee break'],
        correctIndex: 0,
        explanation: 'Leave of Absence (LOA) transitions the worker to a leave status, which can automatically trigger unpaid payroll processing.',
      },
    ],
  },
  {
    id: 29,
    hour: 29,
    phaseId: 6,
    title: 'Talent & Performance Management: Calibration & 9-Box Grid',
    moduleName: 'Fortune 500 Principal Architect',
    shortDesc: 'Deploy Performance Reviews, Goal Cascading, Talent Matrices (9-Box), Calibration Sessions, and Succession.',
    durationMinutes: 60,
    keyConcepts: [
      'Performance Review Templates: Competencies, Goals, Responsibilities',
      'The 9-Box Talent Matrix: Performance vs Potential calibration',
      'Calibration Sessions: Enabling executive leadership alignment on ratings',
      'Succession Planning: Succession pools, readiness indicators (Ready Now, 1-2 Years)',
      'Linking Performance ratings directly into Annual Merit Compensation cycles',
    ],
    kapilArchitectSecret: 'The pinnacle of Workday HCM maturity is the automated "Performance-to-Merit Link"! When calibration is finalized, Workday feeds performance ratings directly into the Compensation Merit Matrix, automatically generating recommended merit increase percentages for every employee without a single spreadsheet!',
    interviewQuestion: {
      question: 'How does Workdays Calibration feature assist HR leaders in eliminating manager rating bias during annual performance reviews?',
      kapilAnswer: 'Calibration provides an interactive graphical interface (like a 9-Box grid or bell-curve distribution) where leadership can view all workers in a division side-by-side. Managers can drag and drop workers across rating bands in real time while tracking budget impacts and ensuring diversity and distribution benchmarks are met before ratings become official.',
    },
    theoryMarkdown: {
      overview: 'Workday Talent and Performance empowers organizations to identify top performers, close skill gaps, calibrate leadership evaluations, and build succession pipelines.',
      architectureHighlights: [
        'Multi-rater reviews support 360-degree feedback from peers and direct reports.',
        'Succession pools identify internal talent pipelines for critical executive seats.',
      ],
      workdayBestPractices: [
        'Lock down performance rating visibility until corporate calibration sessions are officially finalized.',
      ],
      commonPitfalls: [
        'Launching performance reviews without testing review templates on mobile devices.',
      ],
    },
    lab: {
      id: 'lab-29',
      title: 'Review 9-Box Talent Matrix & Succession Pool',
      businessScenario: 'Inspect the Technology Division 9-Box matrix and verify readiness for the Chief Architect succession pool.',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Select "Talent & Succession Matrix" in the menu', hint: 'Click Talent Matrix' },
        { id: 's2', text: 'Inspect the 9-Box Grid (High Performance / High Potential)', hint: 'Review matrix distribution' },
        { id: 's3', text: 'Confirm worker "Elena Rostova" is marked "Ready Now" for the Enterprise Chief Architect succession seat', hint: 'Check readiness' },
      ],
      successMessage: 'Talent calibration and executive succession pipeline validated!',
    },
    quiz: [
      {
        id: 'q29-1',
        question: 'What two primary dimensions are calibrated on the standard Workday 9-Box talent matrix?',
        options: ['Performance vs Potential', 'Salary vs Age', 'Hours Worked vs Commute Time', 'Height vs Weight'],
        correctIndex: 0,
        explanation: 'The classic 9-Box talent matrix plots Performance on one axis and Potential on the other axis to classify talent.',
      },
    ],
  },
  {
    id: 30,
    hour: 30,
    phaseId: 6,
    title: 'Capstone: Fortune 500 Enterprise Cutover, Go-Live & Tenant Migration',
    moduleName: 'Fortune 500 Principal Architect',
    shortDesc: 'Lead the final cutover: Ox (Object Transporter), iLoad/EIB data migration, Freeze windows, and Go-Live signing.',
    durationMinutes: 60,
    keyConcepts: [
      'The Fortune 500 Workday Deployment Methodology',
      'Configuration Migration: Workday Object Transporter (Ox) & Solutions',
      'The Cutover Window: Blackout/freeze period, catch-up data loads, validation',
      'Go-Live Readiness Scorecards and Executive Sign-off',
      'Hypercare Support & Post-Production Stabilization with Kapil Narula',
    ],
    kapilArchitectSecret: 'Congratulations on reaching Hour 30! Here is my ultimate parting advice as your mentor: In a Fortune 500 Go-Live, the technology rarely fails—it is change management and data cutover timing that breaks implementations. Always rehearse your cutover weekend at least TWICE in a dedicated Gold tenant with mock execution down to the minute. You are now ready to operate as a certified Workday Enterprise Architect!',
    interviewQuestion: {
      question: 'Describe how you would plan and execute a 72-hour Go-Live Cutover weekend for a global enterprise with 50,000 employees.',
      kapilAnswer: '1. Friday 6 PM: Initiate legacy freeze and extract final delta datasets. 2. Friday 9 PM: In Production, load Foundation data (Orgs, Jobs, Comp) via Ox and EIB. 3. Saturday 6 AM: Load Worker demographic data and historical compensation. 4. Saturday 2 PM: Load active Benefit enrollments and open Payroll balances. 5. Sunday 10 AM: Run automated reconciliation reports comparing Legacy vs Workday totals down to the cent. 6. Sunday 6 PM: Executive Go/No-Go decision. 7. Monday 6 AM: Open tenant to employees!',
    },
    theoryMarkdown: {
      overview: 'Hour 30 is the capstone of your journey! You have mastered the entire spectrum of Workday: from tenants and supervisory orgs to business processes, security, reporting, calculated fields, integrations, and enterprise modules.',
      architectureHighlights: [
        'Workday Object Transporter (Ox) automates the migration of configuration between tenants.',
        'Cutover reconciliation guarantees zero data loss during enterprise system transition.',
      ],
      workdayBestPractices: [
        'Establish an around-the-clock Hypercare war room during the first two pay cycles post-Go-Live.',
      ],
      commonPitfalls: [
        'Allowing configuration changes directly in Production during the cutover freeze window.',
      ],
    },
    lab: {
      id: 'lab-30',
      title: 'Execute Final Enterprise Go-Live Readiness Sign-Off',
      businessScenario: 'Complete the final architectural checklist, certify tenant cutover readiness, and unlock your Fortune 500 Certificate!',
      targetScreen: 'org_chart',
      steps: [
        { id: 's1', text: 'Open the Go-Live Readiness Center in the tenant simulator', hint: 'Click Go-Live Center' },
        { id: 's2', text: 'Verify all 6 Architectural Phase Gates are 100% certified', hint: 'Check phase gate statuses' },
        { id: 's3', text: 'Sign off as Certified Workday Enterprise Architect under Kapil Narula’s sponsorship', hint: 'Click Sign Off' },
        { id: 's4', text: 'Unlock the Capstone Diamond Credential and generate official Certificate', hint: 'Click Claim Certificate' },
      ],
      successMessage: 'CONGRATULATIONS! You have completed all 30 hours! You are now a certified Fortune 500 Workday Enterprise Architect!',
    },
    quiz: [
      {
        id: 'q30-1',
        question: 'What is the standard tool used by Workday certified consultants to migrate configuration objects between tenants (e.g. from Sandbox to Production)?',
        options: ['Workday Object Transporter (Ox) / Solutions', 'USB Flash Drive', 'Copy-Pasting HTML code', 'Manual re-typing only'],
        correctIndex: 0,
        explanation: 'Workday Object Transporter (Ox) and Solutions packages packages and migrates configuration safely between tenants with dependency checking.',
      },
    ],
  },
];
