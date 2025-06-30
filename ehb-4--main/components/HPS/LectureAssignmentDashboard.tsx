import React, { useEffect, useState } from 'react';
import { sampleLectures, LectureAssignment } from '../../types/hps';

const LectureAssignmentDashboard: React.FC = () => {
  const [lectures, setLectures] = useState<LectureAssignment[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hps/lectures')
      .then((res) => res.json())
      .then((data) => {
        setLectures(data);
        setLoading(false);
      })
      .catch(() => {
        setLectures(sampleLectures);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading lectures...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Lecture/Assignment Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Title</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Class</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Type</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Content Link</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Due Date</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Students Completed</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {(lectures || []).map((lec: LectureAssignment) => (
            <tr key={lec.id}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.title}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.classId}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.type}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>
                <a href={lec.contentLink} target="_blank" rel="noopener noreferrer">{lec.contentLink}</a>
              </td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.dueDate}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.status}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.studentsCompleted.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LectureAssignmentDashboard; 