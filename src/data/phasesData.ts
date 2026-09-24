import { Phase } from '../types/workday';

export const WORKDAY_PHASES: Phase[] = [
  {
    id: 1,
    title: 'Workday Foundation & Core Architecture',
    badgeTitle: 'Foundation Specialist',
    hours: 'Hours 1 - 5 (Levels 1 - 5)',
    levelRange: [1, 5],
    description: 'Master the core object-oriented data model, tenant topology, supervisory organizations, staffing models, job architectures, and compensation matrices.',
    badgeTier: 'Bronze',
    accentColor: '#B45309', // Bronze/Amber
    iconName: 'Building2',
  },
  {
    id: 2,
    title: 'Core HCM & Business Process Engine',
    badgeTitle: 'Business Process Engineer',
    hours: 'Hours 6 - 10 (Levels 6 - 10)',
    levelRange: [6, 10],
    description: 'Design and execute multi-step enterprise workflows, approval routing, condition rules, hire lifecycle, job changes, and contingent worker programs.',
    badgeTier: 'Silver',
    accentColor: '#64748B', // Silver/Slate
    iconName: 'GitBranch',
  },
  {
    id: 3,
    title: 'Security Architecture & Access Governance',
    badgeTitle: 'Enterprise Security Architect',
    hours: 'Hours 11 - 15 (Levels 11 - 15)',
    levelRange: [11, 15],
    description: 'Architect bulletproof role-based and user-based security, domain security policies, BP security, intersection groups, and audit-compliant pending security activation.',
    badgeTier: 'Titanium',
    accentColor: '#0284C7', // Blue/Titanium
    iconName: 'ShieldCheck',
  },
  {
    id: 4,
    title: 'Advanced Reporting & Calculated Fields Master',
    badgeTitle: 'Analytics & Calc Fields Master',
    hours: 'Hours 16 - 20 (Levels 16 - 20)',
    levelRange: [16, 20],
    description: 'Unlock enterprise business intelligence: PBO/RBO object traversal, Lookup Related Values (LRV), Extract Single Instance (ESI), Evaluate Expressions, and Prism dashboards.',
    badgeTier: 'Gold',
    accentColor: '#EAB308', // Gold
    iconName: 'LineChart',
  },
  {
    id: 5,
    title: 'Enterprise Integration & EIB Workbench',
    badgeTitle: 'Cloud Integration Specialist',
    hours: 'Hours 21 - 25 (Levels 21 - 25)',
    levelRange: [21, 25],
    description: 'Build robust integration pipelines: Inbound & Outbound EIBs, Web Services, XSLT transformations, Workday Studio integration assemblies, and ISU/ISSG security.',
    badgeTier: 'Platinum',
    accentColor: '#8B5CF6', // Purple/Platinum
    iconName: 'Cpu',
  },
  {
    id: 6,
    title: 'Advanced Modules & Fortune 500 Enterprise Architect',
    badgeTitle: 'Fortune 500 Principal Architect',
    hours: 'Hours 26 - 30 (Levels 26 - 30)',
    levelRange: [26, 30],
    description: 'Enterprise mastery: Benefits administration, Payroll engine concepts, Time Tracking & Absence rules, Talent Calibration, and Fortune 500 Go-Live cutover strategies.',
    badgeTier: 'Diamond',
    accentColor: '#06B6D4', // Cyan/Diamond
    iconName: 'Award',
  },
];
