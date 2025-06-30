// HPS Module Types and Sample Data

// 1. Student Interface & Sample
export interface Student {
  id: string;
  name: string;
  age: number;
  class: string;
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  assignedTeacher: string;
  institute: string;
  progress: number; // 0-100
  attendance: number;
  wallet: number;
  affiliates?: string[];
  completedLectures: string[];
  assignmentsSubmitted: string[];
  complaints?: string[];
}

export const sampleStudents: Student[] = [
  {
    id: 'S001',
    name: 'Ali Raza',
    age: 15,
    class: '9th',
    sqlLevel: 'Basic',
    assignedTeacher: 'T001',
    institute: 'I001',
    progress: 70,
    attendance: 25,
    wallet: 30,
    affiliates: [],
    completedLectures: ['L001', 'L002'],
    assignmentsSubmitted: ['A001'],
    complaints: [],
  },
];

// 2. Teacher Interface & Sample
export interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  assignedStudents: string[];
  earnings: number;
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  institute: string;
  affiliateLevel1: string[];
  lecturesGiven: string[];
  complaints?: string[];
}

export const sampleTeachers: Teacher[] = [
  {
    id: 'T001',
    name: 'Ayesha Zahid',
    subjects: ['Mathematics', 'Physics'],
    sqlLevel: 'High',
    assignedStudents: ['S001', 'S002'],
    earnings: 150,
    rank: 'Gold',
    institute: 'I001',
    affiliateLevel1: ['S001', 'S002'],
    lecturesGiven: ['L001', 'L002'],
    complaints: ['CPN002'],
  },
];

// 3. Institute Interface & Sample
export interface Institute {
  id: string;
  name: string;
  type: 'School' | 'College' | 'Academy' | 'Training Center';
  address: string;
  registeredStudents: string[];
  registeredTeachers: string[];
  affiliationLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  wallet: number;
  complaints?: string[];
}

export const sampleInstitutes: Institute[] = [
  {
    id: 'I001',
    name: 'City Public School',
    type: 'School',
    address: 'Johar Town, Lahore',
    registeredStudents: ['S001', 'S002'],
    registeredTeachers: ['T001'],
    affiliationLevel: 'Normal',
    wallet: 500,
    complaints: [],
  },
];

// 4. Class/Subject Interface & Sample
export interface ClassSubject {
  id: string;
  title: string;
  teacher: string;
  students: string[];
  lectures: string[];
  assignments: string[];
  sqlLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
}

export const sampleClasses: ClassSubject[] = [
  {
    id: 'C001',
    title: '9th Mathematics',
    teacher: 'T001',
    students: ['S001', 'S002'],
    lectures: ['L001', 'L002', 'L003'],
    assignments: ['A001', 'A002'],
    sqlLevel: 'Basic',
  },
];

// 5. Lecture/Assignment Interface & Sample
export interface LectureAssignment {
  id: string;
  title: string;
  classId: string;
  type: 'Video' | 'Assignment' | 'Quiz' | 'Live';
  contentLink: string;
  dueDate: string; // ISO date
  status: 'Not Started' | 'Pending' | 'Completed';
  studentsCompleted: string[];
  teacher: string;
}

export const sampleLectures: LectureAssignment[] = [
  {
    id: 'L001',
    title: 'Algebra Basics',
    classId: 'C001',
    type: 'Video',
    contentLink: '/videos/algebra.mp4',
    dueDate: '2025-07-01',
    status: 'Completed',
    studentsCompleted: ['S001'],
    teacher: 'T001',
  },
];

// 6. Affiliate/Earning Interface & Sample
export interface Affiliate {
  id: string;
  userId: string;
  downline: string[];
  upline: string;
  level: number;
  bonus: number;
  walletLog: { date: string; type: string; amount: number }[];
}

export const sampleAffiliates: Affiliate[] = [
  {
    id: 'AF001',
    userId: 'T001',
    downline: ['S001', 'S002'],
    upline: 'Admin',
    level: 1,
    bonus: 30,
    walletLog: [
      { date: '2025-06-25', type: 'bonus', amount: 10 },
    ],
  },
];

// 7. Wallet/SQL Fee Interface & Sample
export interface WalletInfo {
  userId: string;
  currentBalance: number;
  lockedAmount: number;
  lastSQLFeePaid: string; // ISO date
  currentSQLLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  nextLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
}

export const sampleWallets: WalletInfo[] = [
  {
    userId: 'S001',
    currentBalance: 30,
    lockedAmount: 5,
    lastSQLFeePaid: '2025-06-01',
    currentSQLLevel: 'Basic',
    nextLevel: 'Normal',
  },
];

// 8. Complaint Interface & Sample
export interface Complaint {
  id: string;
  user: string;
  type: 'Content' | 'Payment' | 'Behavior' | 'Other';
  status: 'Pending' | 'Resolved' | 'Rejected';
  assignedTo: string;
  resolutionNote?: string;
}

export const sampleComplaints: Complaint[] = [
  {
    id: 'CPN001',
    user: 'S002',
    type: 'Content',
    status: 'Pending',
    assignedTo: 'T001',
    resolutionNote: '',
  },
];

// 9. Progress/Analytics Interface & Sample
export interface StudentProgress {
  studentId: string;
  completedLectures: number;
  assignmentsSubmitted: number;
  sqlLevelHistory: string[];
  currentProgress: number;
}

export const sampleProgress: StudentProgress[] = [
  {
    studentId: 'S001',
    completedLectures: 8,
    assignmentsSubmitted: 4,
    sqlLevelHistory: ['Free', 'Basic'],
    currentProgress: 70,
  },
];

// 10. Teacher Performance & Ranking
export interface TeacherPerformance {
  teacherId: string;
  avgStudentProgress: number; // percentage
  lecturesCompletedRatio: number; // percentage
  feedbackScore: number; // 1-5
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  bonuses: number;
}

export const sampleTeacherPerformance: TeacherPerformance[] = [
  {
    teacherId: 'T001',
    avgStudentProgress: 72,
    lecturesCompletedRatio: 85,
    feedbackScore: 4.7,
    rank: 'Gold',
    bonuses: 50,
  },
];

// 11. Daily Lecture/Attendance Workflow
export interface AttendanceLog {
  date: string; // ISO date
  studentId: string;
  lectureId: string;
  duration: number; // minutes
  status: 'Present' | 'Absent';
}

export const sampleAttendanceLogs: AttendanceLog[] = [
  {
    date: '2025-06-29',
    studentId: 'S001',
    lectureId: 'L001',
    duration: 50,
    status: 'Present',
  },
];

// 12. Six-Monthly Skill/SQL Refresh
export interface SkillRefreshLog {
  userId: string;
  testDate: string; // ISO date
  result: 'Pass' | 'Fail';
  newSQLLevel: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
}

export const sampleSkillRefreshLogs: SkillRefreshLog[] = [
  {
    userId: 'S002',
    testDate: '2025-07-30',
    result: 'Fail',
    newSQLLevel: 'Free',
  },
];

// 13. Multi-Level Affiliate Tree & Payout
export interface AffiliatePayoutLog {
  teacherId: string;
  level1Earning: number;
  level2Earning: number;
  date: string; // ISO date
}

export const sampleAffiliatePayoutLogs: AffiliatePayoutLog[] = [
  {
    teacherId: 'T001',
    level1Earning: 20,
    level2Earning: 10,
    date: '2025-06-30',
  },
];

// 14. School/Institute Bulk Import
export interface ImportHistory {
  importDate: string; // ISO date
  institute: string;
  studentsImported: number;
  teachersImported: number;
  status: 'Success' | 'Failed';
}

export const sampleImportHistory: ImportHistory[] = [
  {
    importDate: '2025-06-29',
    institute: 'I001',
    studentsImported: 120,
    teachersImported: 5,
    status: 'Success',
  },
];

// 15. Live Exam & AI Grading
export interface ExamResult {
  studentId: string;
  examId: string;
  score: number;
  result: 'Pass' | 'Fail';
  grade: string;
}

export const sampleExamResults: ExamResult[] = [
  {
    studentId: 'S005',
    examId: 'E001',
    score: 78,
    result: 'Pass',
    grade: 'B+',
  },
];

// 16. Wallet & Transaction History
export interface WalletTransaction {
  userId: string;
  date: string; // ISO date
  type: 'earning' | 'fee' | 'reward' | 'spending' | 'bonus' | 'other';
  amount: number;
  balance: number;
}

export const sampleWalletTransactions: WalletTransaction[] = [
  {
    userId: 'S001',
    date: '2025-06-27',
    type: 'fee',
    amount: -5,
    balance: 25,
  },
];

// 17. Automated Notification System
export interface NotificationLog {
  userId: string;
  type: string;
  date: string; // ISO date
  status: 'read' | 'unread';
}

export const sampleNotificationLogs: NotificationLog[] = [
  {
    userId: 'S002',
    type: 'Assignment Due',
    date: '2025-06-28',
    status: 'unread',
  },
];

// 18. Complaint/Support Workflow
export interface ComplaintResponse {
  complaintId: string;
  responder: string;
  response: string;
  date: string; // ISO date
}

export const sampleComplaintResponses: ComplaintResponse[] = [
  {
    complaintId: 'CPN002',
    responder: 'Admin',
    response: 'Fee adjusted successfully.',
    date: '2025-06-28',
  },
];

// 19. SQL Level Badge & Verification
export interface VerificationLog {
  userId: string;
  levelRequested: 'Free' | 'Basic' | 'Normal' | 'High' | 'VIP';
  docs: string[];
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string; // ISO date
}

export const sampleVerificationLogs: VerificationLog[] = [
  {
    userId: 'S003',
    levelRequested: 'Normal',
    docs: ['ID card', 'Last Exam Result'],
    status: 'Approved',
    date: '2025-06-29',
  },
];

// 20. Analytics & Reporting
export interface AnalyticsReport {
  totalStudents: number;
  activeThisMonth: number;
  totalTeachers: number;
  sqlBreakdown: {
    Free: number;
    Basic: number;
    Normal: number;
    High: number;
    VIP: number;
  };
  topEarner: { teacherId: string; amount: number };
}

export const sampleAnalyticsReport: AnalyticsReport = {
  totalStudents: 320,
  activeThisMonth: 210,
  totalTeachers: 30,
  sqlBreakdown: {
    Free: 40,
    Basic: 30,
    Normal: 20,
    High: 7,
    VIP: 3,
  },
  topEarner: { teacherId: 'T001', amount: 1500 },
}; 