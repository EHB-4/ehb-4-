import React, { useState } from 'react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import InstituteDashboard from './InstituteDashboard';
import ClassDashboard from './ClassDashboard';
import LectureAssignmentDashboard from './LectureAssignmentDashboard';
import AffiliateEarningDashboard from './AffiliateEarningDashboard';
import WalletSQLFeeDashboard from './WalletSQLFeeDashboard';
import ComplaintDashboard from './ComplaintDashboard';
import ProgressAnalyticsDashboard from './ProgressAnalyticsDashboard';
import TeacherPerformanceDashboard from './TeacherPerformanceDashboard';
import AttendanceDashboard from './AttendanceDashboard';
import SkillRefreshDashboard from './SkillRefreshDashboard';
import AffiliateTreePayoutDashboard from './AffiliateTreePayoutDashboard';
import BulkImportDashboard from './BulkImportDashboard';
import ExamAIAutoGradingDashboard from './ExamAIAutoGradingDashboard';
import WalletTransactionHistoryDashboard from './WalletTransactionHistoryDashboard';
import NotificationDashboard from './NotificationDashboard';
import ComplaintSupportWorkflowDashboard from './ComplaintSupportWorkflowDashboard';
import SQLBadgeVerificationDashboard from './SQLBadgeVerificationDashboard';
import AnalyticsReportingDashboard from './AnalyticsReportingDashboard';

const tabs = [
  { label: 'Student', component: <StudentDashboard /> },
  { label: 'Teacher', component: <TeacherDashboard /> },
  { label: 'Institute', component: <InstituteDashboard /> },
  { label: 'Class', component: <ClassDashboard /> },
  { label: 'Lecture/Assignment', component: <LectureAssignmentDashboard /> },
  { label: 'Affiliate/Earning', component: <AffiliateEarningDashboard /> },
  { label: 'Wallet/SQL Fee', component: <WalletSQLFeeDashboard /> },
  { label: 'Complaint', component: <ComplaintDashboard /> },
  { label: 'Progress/Analytics', component: <ProgressAnalyticsDashboard /> },
  { label: 'Teacher Performance', component: <TeacherPerformanceDashboard /> },
  { label: 'Attendance', component: <AttendanceDashboard /> },
  { label: 'Skill Refresh', component: <SkillRefreshDashboard /> },
  { label: 'Affiliate Tree', component: <AffiliateTreePayoutDashboard /> },
  { label: 'Bulk Import', component: <BulkImportDashboard /> },
  { label: 'Exam/AI Grading', component: <ExamAIAutoGradingDashboard /> },
  { label: 'Wallet Txn', component: <WalletTransactionHistoryDashboard /> },
  { label: 'Notification', component: <NotificationDashboard /> },
  { label: 'Complaint Workflow', component: <ComplaintSupportWorkflowDashboard /> },
  { label: 'SQL Badge', component: <SQLBadgeVerificationDashboard /> },
  { label: 'Analytics', component: <AnalyticsReportingDashboard /> },
];

const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>HPS Main Dashboard</h1>
      <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: 24, overflowX: 'auto' }}>
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            style={{
              padding: '12px 20px',
              fontWeight: 600,
              fontSize: 16,
              border: 'none',
              borderBottom: activeTab === idx ? '4px solid #2563eb' : '4px solid transparent',
              background: 'none',
              color: activeTab === idx ? '#2563eb' : '#333',
              cursor: 'pointer',
              outline: 'none',
              transition: 'color 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default MainDashboard; 