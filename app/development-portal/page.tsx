'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DevelopmentPortalPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const services = [
    {
      title: 'EHB Dashboard',
      description: 'Central dashboard for analytics and management',
      href: '/ehb-dashboard',
      status: 'Working (85%)',
    },
    {
      title: 'GoSellr Platform',
      description: 'Global e-commerce platform for product listing and sales',
      href: '/gosellr',
      status: 'Development (40%)',
    },
    {
      title: 'AI Marketplace',
      description: 'AI service listing and agent management',
      href: '/ai-marketplace',
      status: 'Development (50%)',
    },
    {
      title: 'PSS (Personal Security System)',
      description: 'KYC, identity verification, and fraud prevention',
      href: '/pss',
      status: 'Working (75%)',
    },
    {
      title: 'EDR (Exam Decision Registration)',
      description: 'Skill assessment and certification system',
      href: '/edr',
      status: 'Working (60%)',
    },
    {
      title: 'Project Roadmap',
      description: 'Track progress of ongoing and future projects',
      href: '/roadmap',
      status: 'Working (75%)',
    },
    {
      title: 'Franchise System',
      description: 'Global franchise network management',
      href: '/franchise',
      status: 'Not Started',
    },
    {
      title: 'JPS (Job Placement System)',
      description: 'Job posting and candidate matching',
      href: '/jps',
      status: 'Not Started',
    },
  ];

  const stats = [
    { label: 'Total Services', value: '14+' },
    { label: 'Completed', value: '1' },
    { label: 'In Progress', value: '8' },
    { label: 'Overall Progress', value: '70%' },
  ];

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '20px' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#1e40af', 
        color: 'white', 
        padding: '60px 20px',
        textAlign: 'center',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          🚀 EHB Development Portal
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '30px', opacity: 0.9 }}>
          Your gateway to world-class software development services
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/development/contact" style={{
            backgroundColor: 'white',
            color: '#1e40af',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Start Your Project
          </Link>
          <Link href="/development/portfolio" style={{
            border: '2px solid white',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        backgroundColor: 'white',
        padding: '40px 20px',
        borderRadius: '8px',
        marginBottom: '40px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          textAlign: 'center'
        }}>
          {stats.map((stat, index) => (
            <div key={index}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#666', fontSize: '16px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          textAlign: 'center',
          marginBottom: '40px',
          color: '#1f2937'
        }}>
          Our Services
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {services.map((service, index) => (
            <Link key={index} href={service.href} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
                cursor: 'pointer',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: '#1f2937'
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  color: '#6b7280',
                  marginBottom: '16px',
                  lineHeight: '1.6'
                }}>
                  {service.description}
                </p>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: service.status.includes('Working') ? '#10b981' : 
                                 service.status.includes('Development') ? '#f59e0b' : '#6b7280',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {service.status}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        borderRadius: '8px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Ready to Build Something Amazing?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '24px', opacity: 0.9 }}>
          Let's discuss your project and turn your vision into reality
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/development/contact" style={{
            backgroundColor: 'white',
            color: '#1f2937',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Get Started Today
          </Link>
          <Link href="/development/consultation" style={{
            border: '2px solid white',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Free Consultation
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        textAlign: 'center',
        padding: '20px 0',
        color: '#6b7280'
      }}>
        <p>&copy; 2024 EHB Development Portal. All rights reserved.</p>
        <p style={{ marginTop: '8px' }}>Building the future, one project at a time</p>
      </div>
    </div>
  );
}
