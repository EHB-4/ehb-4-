import React, { useEffect, useState } from 'react';
import { sampleTeachers, Teacher, sampleTeacherPerformance, TeacherPerformance } from '../../types/hps';

const getPerformance = (teacherId: string): TeacherPerformance | undefined => {
  return sampleTeacherPerformance.find((perf) => perf.teacherId === teacherId);
};

const TeacherDashboard: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hps/teachers')
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch(() => {
        setTeachers(sampleTeachers);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading teachers...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Teacher Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Subjects</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>SQL Level</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Assigned Students</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Earnings</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Rank</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Institute</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Affiliate Level 1</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Lectures Given</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Complaints</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Avg Progress</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Lectures Completed Ratio</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Feedback Score</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Bonuses</th>
          </tr>
        </thead>
        <tbody>
          {(teachers || []).map((teacher: Teacher) => {
            const perf = getPerformance(teacher.id);
            return (
              <tr key={teacher.id}>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.name}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.subjects.join(', ')}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.sqlLevel}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.assignedStudents.join(', ')}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.earnings}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.rank}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.institute}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.affiliateLevel1.join(', ')}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.lecturesGiven.join(', ')}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{teacher.complaints && teacher.complaints.length > 0 ? teacher.complaints.join(', ') : '-'}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{perf ? perf.avgStudentProgress + '%' : '-'}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{perf ? perf.lecturesCompletedRatio + '%' : '-'}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{perf ? perf.feedbackScore : '-'}</td>
                <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{perf ? perf.bonuses : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard; 