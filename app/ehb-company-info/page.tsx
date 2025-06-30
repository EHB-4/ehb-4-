import React from 'react';

const companyInfo = {
  name: 'EHB Technologies',
  description:
    'Empowering businesses with innovative technology solutions. 700+ Services in One Super-App.',
  version: '1.0.0',
  contact: {
    email: 'contact@ehb.tech',
    phone: '+92-XXX-XXXXXXX',
    address: 'Karachi, Pakistan / Dubai, UAE',
    url: 'https://ehb.tech',
    twitter: 'https://twitter.com/ehbtech',
    github: 'https://github.com/ehbtech',
  },
  mission:
    'To provide 100% verified, AI-powered, blockchain-backed global services and products through a decentralized ecosystem accessible to every individual.',
  vision: `To become the world's leading unified service platform where users can trust, earn, learn, and transact securely, across all industries and countries, with full transparency and automation.`,
  coreValues: [
    'Verification Before Profit',
    'Transparency',
    'Decentralization',
    'Empowerment Through Technology',
    'Zero Tolerance for Fraud',
  ],
  goals: [
    'Launch GoSellr as a global e-commerce + services platform',
    'Deploy EHBGC token with Trusty Wallet and Validator Income Model',
    'Implement SQL-based verified profile system (PSS, EMO, EDR)',
    'Launch global franchise network (Sub, Master, Corporate)',
    'Integrate AI agents for system-wide automation and assistant tasks',
  ],
  services: [
    'GoSellr (E-commerce)',
    'EDR (Emergency Decision Registration)',
    'EMO (Health & Medical Services)',
    'JPS (Justice & Public Services)',
    'PSS (Public Safety System)',
    'Franchise System',
    'Trusty Wallet',
    'AI Assistant',
    'AI Marketplace',
    'EHB-Tube',
    'EHB-Ads',
    'EHB-Franchise',
    'EHB-Wallet',
    'EHB-Dashboard',
    'EHB-Home-Page',
    'Contracts',
    'Admin',
    'Profile',
    'Signup/Login',
    'Assistant',
    'OBS',
    'Roadmap',
    'Dashboard',
    'Wallet',
    'Affiliate',
    'Ads',
    'HPS',
    'AI',
    'Franchise',
    'PSS',
    'JPS',
  ],
  techStack: [
    { name: 'Next.js', version: '14.1.0' },
    { name: 'React', version: '18.2.0' },
    { name: 'TypeScript', version: '5.0.0' },
    { name: 'Node.js', version: '20.0.0' },
    { name: 'MongoDB', version: '5.x/6.x' },
    { name: 'PostgreSQL', version: '15.0' },
    { name: 'Redis', version: '7.0' },
    { name: 'Docker', version: '24.0' },
    { name: 'AWS', version: 'Latest' },
    { name: 'Moonbeam + BEP20', version: 'Blockchain' },
    { name: 'Custom AI Assistant', version: '' },
    { name: 'Tailwind CSS', version: '3.x' },
  ],
  departments: [
    { name: 'Engineering', size: 50 },
    { name: 'Product', size: 20 },
    { name: 'Design', size: 15 },
    { name: 'Marketing', size: 10 },
    { name: 'Sales', size: 25 },
    { name: 'PSS', desc: 'Verification, KYC, fraud prevention' },
    { name: 'Franchise', desc: 'Franchise management' },
    { name: 'AI', desc: 'AI agent development' },
  ],
  targetMarkets: [
    'Education Sector',
    'Healthcare Industry',
    'Business Services',
    'Public Services',
    'Justice System',
    'Public Safety',
    'Global product sellers and buyers',
    'Service providers',
    'Students, teachers, doctors, lawyers',
    'Franchise investors',
    'Freelancers',
    'Underserved regions',
  ],
  futureGoals: [
    'Global expansion',
    'Multi-language support',
    'Blockchain integration',
    'AI-powered services',
    'Quantum-proof security',
  ],
};

export default function EHBCompanyInfoPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">{companyInfo.name}</h1>
      <p className="text-lg text-gray-700 mb-4">{companyInfo.description}</p>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Mission</h2>
        <p>{companyInfo.mission}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Vision</h2>
        <p>{companyInfo.vision}</p>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Core Values</h2>
        <ul className="list-disc ml-6">
          {companyInfo.coreValues.map(v => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Primary Goals</h2>
        <ul className="list-disc ml-6">
          {companyInfo.goals.map(g => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Contact Information</h2>
        <ul className="ml-6">
          <li>
            <b>Email:</b> {companyInfo.contact.email}
          </li>
          <li>
            <b>Phone:</b> {companyInfo.contact.phone}
          </li>
          <li>
            <b>Address:</b> {companyInfo.contact.address}
          </li>
          <li>
            <b>Website:</b>{' '}
            <a href={companyInfo.contact.url} className="text-blue-600 underline">
              {companyInfo.contact.url}
            </a>
          </li>
          <li>
            <b>Twitter:</b>{' '}
            <a href={companyInfo.contact.twitter} className="text-blue-600 underline">
              {companyInfo.contact.twitter}
            </a>
          </li>
          <li>
            <b>GitHub:</b>{' '}
            <a href={companyInfo.contact.github} className="text-blue-600 underline">
              {companyInfo.contact.github}
            </a>
          </li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Services & Modules</h2>
        <ul className="list-disc ml-6">
          {companyInfo.services.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Technology Stack</h2>
        <ul className="list-disc ml-6">
          {companyInfo.techStack.map(t => (
            <li key={t.name}>
              {t.name} {t.version && <span className="text-gray-500">({t.version})</span>}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Departments</h2>
        <ul className="list-disc ml-6">
          {companyInfo.departments.map(d => (
            <li key={d.name}>
              {d.name}
              {d.size ? ` (Team size: ${d.size})` : ''}
              {d.desc ? ` — ${d.desc}` : ''}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Target Markets</h2>
        <ul className="list-disc ml-6">
          {companyInfo.targetMarkets.map(m => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Future Goals</h2>
        <ul className="list-disc ml-6">
          {companyInfo.futureGoals.map(f => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
