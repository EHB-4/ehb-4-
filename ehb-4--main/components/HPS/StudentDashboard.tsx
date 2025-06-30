import React, { useEffect, useState } from 'react';
import { sampleStudents, Student } from '../../types/hps';

const StudentDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hps/students')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => {
        setStudents(sampleStudents);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading students...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Student Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Name</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Age</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Class</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>SQL Level</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Assigned Teacher</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Progress (%)</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Attendance</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Wallet</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Completed Lectures</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Assignments</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Complaints</th>
          </tr>
        </thead>
        <tbody>
          {(students || []).map((student: Student) => (
            <tr key={student.id}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.name}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.age}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.class}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.sqlLevel}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.assignedTeacher}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.progress}%</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.attendance}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.wallet}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.completedLectures.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.assignmentsSubmitted.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{student.complaints && student.complaints.length > 0 ? student.complaints.join(', ') : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard; 