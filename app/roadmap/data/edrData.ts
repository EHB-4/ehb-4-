export const edrData = {
  id: 'edr',
  name: 'EDR',
  title: 'Exam Decision Registration',
  mission:
    'Har user, service provider, ya franchise ko AI-powered, fair, transparent, aur globally recognized skill verification dena – jahan practical exams, interviews, aur projects ke zariye SQL level assign kiya jaye.',
  vision:
    'EDR duniya ka sab se advance, fully automated, AI-based trust engine banega – jahan sab ki skills, badges, aur trust score real-time update ho, aur compliance ecosystem-wide enforce ho.',
  aiCoreFeatures: [
    'AI Adaptive Exam Generator (role/service-based)',
    'Real-Time Proctoring (liveness/anti-cheat/AI fraud detection)',
    'Instant AI scoring, feedback & explainability',
    'Voice, Video, AR/Simulation-based test support',
    'Auto-multi-language, accessibility, & localization',
    'Predictive skill gap, compliance & fraud risk analytics',
    'Automated badge/NFT/blockchain issuance',
    'Automated refilling/reminder engine (expiry/renewal)',
    'Appeals/dispute workflow (AI+Human)',
    'Smart wallet fee/bonus/commission engine',
    'Live analytics, custom reporting, impact dashboard',
    'Public API & partner integration',
  ],
  workflows: {
    refillingCycle:
      'Har user/service/product ko har 6 mahine baad refilling (re-verification) ki requirement. AI exam/project auto-generate karta hai, fee deduction hoti hai, result aata hai, SQL level update ya downgrade ho jata hai.',
    upgradeLogic:
      'Upgrade tabhi possible hai jab teenun department (EDR, PSS, EMO) ka SQL level barabar ya higher ho. Koi ek kam hua to overall SQL wahi lowest ho jata hai.',
    integration: [
      'PSS: Document/identity check, fraud/jurmana',
      'EMO: KYC & dashboard sync, badge/status display',
      'JPS: Verified skill/job badge direct profile pe',
      'GoSellr: Product/service badge, market visibility',
      'Wallet: Fee deduction, bonus/penalty sync',
      'Franchise: Refilling test/exam, regional compliance',
      'API: Partner/school/company direct connect',
    ],
  },
  sqlLevels: [
    { name: 'Free', fee: 0, features: 'Basic listing, no badge, limited access' },
    { name: 'Basic', fee: 10, features: 'Entry badge, basic trust, listing' },
    { name: 'Normal', fee: 20, features: 'Standard badge, higher visibility' },
    { name: 'High', fee: 40, features: 'Premium badge, priority, up to 50 listings' },
    { name: 'VIP', fee: 100, features: 'Global badge, instant verify, all access' },
  ],
  refillingPolicy: {
    intervalDays: 180,
    reminderSchedule: ['30 days', '7 days', '1 day before expiry'],
    feeAutoDeduct: true,
    badgeExpiryLogic:
      'Test/fee na dene par badge hide + profile auto-downgrade, re-exam/appeal possible.',
    penalty:
      'False data, cheating, ya fraud par fine/jurmana Trusty Wallet se auto-deduct, plus ban/escalation option',
  },
  uiFrontend: {
    dashboardCards: [
      'Refilling Status/Countdown',
      'Upcoming Exams',
      'SQL badge & expiry',
      'Skill gap & analytics',
      'Wallet/Fee/Bonus',
      'Exam attempt history',
      'Appeals/disputes',
    ],
    examFlow: [
      'Role/Service select',
      'Personal info/ID confirm',
      'AI exam/interview/project (multi-modal)',
      'File/video/audio upload (if needed)',
      'AI scoring/feedback, badge display',
      'Payment confirmation/receipt',
      'Appeal/dispute if fail',
    ],
    downloadOptions: [
      'Download badge/certificate',
      'Export report (PDF/CSV/JSON)',
      'Public badge/verify link',
    ],
  },
  backendAPIs: [
    { endpoint: '/api/edr/exam/start', desc: 'Start/refilling exam, AI generator' },
    { endpoint: '/api/edr/exam/submit', desc: 'Exam/project/interview upload' },
    { endpoint: '/api/edr/exam/result', desc: 'Get result, badge, feedback' },
    { endpoint: '/api/edr/refilling/reminder', desc: 'Send reminders, handle fee' },
    { endpoint: '/api/edr/appeal', desc: 'Appeal/dispute exam/mark' },
    { endpoint: '/api/edr/sql-level', desc: 'Get/update user SQL status' },
    { endpoint: '/api/edr/report', desc: 'Analytics, reporting, dashboard' },
  ],
  adminPanel: {
    overview: [
      'Refilling/exam queue',
      'Badge/SQL audit',
      'Appeals/dispute center',
      'Fraud/risk/AI alerts',
      'Income/penalty/commission',
      'Franchise performance',
    ],
    actions: [
      'Approve/reject/refilling',
      'Manual badge/penalty/bonus',
      'Review appeals/disputes',
      'Export audit/logs/reports',
    ],
  },
  dataModels: [
    'User/Profile',
    'ExamSession',
    'PaymentTransaction',
    'Appeal/Dispute',
    'AuditLog',
    'Franchise',
    'Badge/NFT',
    'AIReport',
    'Notification',
    'Settings/Policy',
  ],
  analyticsReporting: [
    'Live refilling/exam stats (pass/fail, region, role)',
    'Fraud/risk/incident heatmaps',
    'Skill gap/upskilling trends',
    'Income/bonus/penalty logs',
    'Leaderboard (top franchise, user, badge)',
    'Export: PDF/CSV/JSON',
  ],
  technicalReadiness: {
    businessRequirements: '✅',
    userExperienceDesign: '✅',
    systemArchitecture: '✅',
    databaseSchema: '✅',
    apiEndpoints: '90%',
    aiIntegration: '80%',
    paymentWalletSystem: '80%',
    authenticationSecurity: '90%',
    adminPanel: '70%',
    analyticsReporting: '70%',
    notificationSystem: '60%',
    devOpsDeployment: '85%',
    testingQA: '60%',
    documentation: '90%',
    overall: '85%',
  },
  priorityActions: [
    'Database schema finalization',
    'API endpoints/documentation',
    'AI engine config/integration',
    'Payment/wallet system connect',
    'Security/auth compliance setup',
  ],
  documentationNeeded: [
    'Technical Architecture Document',
    'API Reference Guide',
    'Database Schema Documentation',
    'AI Integration Guide',
    'Security Implementation Guide',
    'Payment System Architecture',
    'Testing Strategy Document',
    'Deployment Guide',
  ],
};
