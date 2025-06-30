import React from 'react';
import { sampleExamResults, ExamResult } from '../../types/hps';

const ExamAIAutoGradingDashboard: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Live Exam & AI Grading Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Student ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Exam ID</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Score</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Result</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {sampleExamResults.map((res: ExamResult, idx) => (
            <tr key={idx}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{res.studentId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{res.examId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{res.score}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{res.result}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{res.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamAIAutoGradingDashboard; 