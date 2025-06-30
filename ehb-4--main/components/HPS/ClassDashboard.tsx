import React, { useEffect, useState } from 'react';
import { sampleClasses, ClassSubject, sampleLectures, LectureAssignment } from '../../types/hps';

const getLecturesForClass = (classId: string) => {
  return sampleLectures.filter((lec) => lec.classId === classId);
};

const ClassDashboard: React.FC = () => {
  const [classes, setClasses] = useState<ClassSubject[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hps/classes')
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      })
      .catch(() => {
        setClasses(sampleClasses);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading classes...</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Class/Subject Dashboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', marginBottom: 32 }}>
        <thead>
          <tr style={{ background: '#f3f4f6' }}>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Title</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Teacher</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Students</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Lectures</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Assignments</th>
            <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>SQL Level</th>
          </tr>
        </thead>
        <tbody>
          {(classes || []).map((cls: ClassSubject) => (
            <tr key={cls.id}>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{cls.title}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{cls.teacher}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{cls.students.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{cls.lectures.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{cls.assignments.join(', ')}</td>
              <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{cls.sqlLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Lectures for Each Class</h3>
      {(classes || []).map((cls: ClassSubject) => (
        <div key={cls.id} style={{ marginBottom: 32 }}>
          <h4 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>{cls.title}</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f9fafb' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Title</th>
                <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Type</th>
                <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Due Date</th>
                <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Students Completed</th>
                <th style={{ padding: 8, border: '1px solid #e5e7eb' }}>Teacher</th>
              </tr>
            </thead>
            <tbody>
              {getLecturesForClass(cls.id).map((lec: LectureAssignment) => (
                <tr key={lec.id}>
                  <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.title}</td>
                  <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.type}</td>
                  <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.dueDate}</td>
                  <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.status}</td>
                  <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.studentsCompleted.join(', ')}</td>
                  <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{lec.teacher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ClassDashboard; 