import React, { useEffect, useState } from 'react';

interface Company {
  name: string;
  description: string;
  [key: string]: any;
}

interface Department {
  name: string;
  people?: number;
  description: string;
}

interface Service {
  name: string;
  status: string;
  percent: number;
}

export default function DataDemo() {
  const [company, setCompany] = useState<Company | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [companyRes, deptRes, servRes] = await Promise.all([
          fetch('http://localhost:5000/api/company-info'),
          fetch('http://localhost:5000/api/departments'),
          fetch('http://localhost:5000/api/services'),
        ]);
        
        if (companyRes.ok) {
          setCompany(await companyRes.json());
        }
        if (deptRes.ok) {
          setDepartments(await deptRes.json());
        }
        if (servRes.ok) {
          setServices(await servRes.json());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>EHB Company Info</h1>
      {company && <pre>{JSON.stringify(company, null, 2)}</pre>}
      
      <h2>Departments</h2>
      <ul>
        {departments.map((d, i) => (
          <li key={i}>
            {d.name} {d.people ? `(${d.people} people)` : ''} - {d.description}
          </li>
        ))}
      </ul>
      
      <h2>Services</h2>
      <ul>
        {services.map((s, i) => (
          <li key={i}>
            {s.name} - {s.status} ({s.percent}%)
          </li>
        ))}
      </ul>
    </div>
  );
} 