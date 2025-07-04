// Roman Urdu: JPS System Database Seed File
// Initial data setup for Job Placement System

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

// Roman Urdu: Seed data functions
async function seedUsers() {
  console.log('🌱 Seeding users...');
  
  const users = [
    {
      email: 'admin@jps.com',
      name: 'JPS Administrator',
      role: 'ADMIN' as const,
    },
    {
      email: 'manager@jps.com',
      name: 'JPS Manager',
      role: 'MANAGER' as const,
    },
    {
      email: 'recruiter@jps.com',
      name: 'JPS Recruiter',
      role: 'USER' as const,
    },
    {
      email: 'test@jps.com',
      name: 'Test User',
      role: 'USER' as const,
    },
  ];

  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
  }
  
  console.log('✅ Users seeded successfully');
}

async function seedJobs() {
  console.log('🌱 Seeding jobs...');
  
  const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!adminUser) throw new Error('Admin user not found');
  
  const jobs = [
    {
      title: 'Senior SQL Developer',
      company: 'TechCorp Solutions',
      location: 'Karachi, Pakistan',
      salary: 150000,
      description: 'We are looking for an experienced SQL Developer to join our team. The ideal candidate will have strong experience with complex queries, stored procedures, and database optimization.',
      requirements: [
        'Minimum 5 years of SQL development experience',
        'Strong knowledge of database design and optimization',
        'Experience with stored procedures and triggers',
        'Knowledge of data warehousing concepts'
      ],
      skills: ['SQL', 'Stored Procedures', 'Database Design', 'Performance Tuning', 'Data Warehousing'],
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
    {
      title: 'Database Administrator',
      company: 'DataFlow Systems',
      location: 'Lahore, Pakistan',
      salary: 120000,
      description: 'Join our team as a Database Administrator. You will be responsible for maintaining, securing, and optimizing our database systems.',
      requirements: [
        '3+ years of database administration experience',
        'Experience with PostgreSQL and MySQL',
        'Knowledge of backup and recovery procedures',
        'Strong troubleshooting skills'
      ],
      skills: ['PostgreSQL', 'MySQL', 'Backup & Recovery', 'Database Security', 'Performance Monitoring'],
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
    {
      title: 'SQL Analyst',
      company: 'Analytics Pro',
      location: 'Islamabad, Pakistan',
      salary: 80000,
      description: 'We need a SQL Analyst to help us analyze data and create reports. The role involves writing complex queries and creating dashboards.',
      requirements: [
        '2+ years of SQL experience',
        'Experience with data analysis and reporting',
        'Knowledge of BI tools',
        'Strong analytical skills'
      ],
      skills: ['SQL', 'Data Analysis', 'Reporting', 'BI Tools', 'Excel'],
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
    {
      title: 'Lead Database Engineer',
      company: 'InnovateTech',
      location: 'Rawalpindi, Pakistan',
      salary: 200000,
      description: 'Lead our database engineering team. You will be responsible for designing and implementing database solutions for our enterprise applications.',
      requirements: [
        '7+ years of database engineering experience',
        'Experience with cloud databases (AWS RDS, Azure SQL)',
        'Knowledge of database architecture and design patterns',
        'Leadership experience'
      ],
      skills: ['Database Architecture', 'Cloud Databases', 'AWS RDS', 'Azure SQL', 'Leadership'],
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
    {
      title: 'Junior SQL Developer',
      company: 'StartupHub',
      location: 'Faisalabad, Pakistan',
      salary: 60000,
      description: 'Perfect opportunity for a junior SQL developer to grow their skills. We provide mentorship and training.',
      requirements: [
        '1+ year of SQL experience',
        'Basic knowledge of database concepts',
        'Willingness to learn and grow',
        'Good communication skills'
      ],
      skills: ['SQL', 'Database Basics', 'Learning', 'Communication'],
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
  ];

  for (const jobData of jobs) {
    await prisma.job.upsert({
      where: { 
        title_company: { 
          title: jobData.title, 
          company: jobData.company 
        } 
      },
      update: {},
      create: jobData,
    });
  }
  
  console.log('✅ Jobs seeded successfully');
}

async function seedCandidates() {
  console.log('🌱 Seeding candidates...');
  
  const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!adminUser) throw new Error('Admin user not found');
  
  const candidates = [
    {
      name: 'Ahmed Khan',
      email: 'ahmed.khan@email.com',
      phone: '+92-300-1234567',
      sqlLevel: 4,
      experience: 6,
      skills: ['SQL', 'Stored Procedures', 'Database Design', 'Performance Tuning', 'PostgreSQL', 'MySQL'],
      preferredLocation: 'Karachi, Pakistan',
      expectedSalary: 160000,
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
    {
      name: 'Fatima Ali',
      email: 'fatima.ali@email.com',
      phone: '+92-301-2345678',
      sqlLevel: 3,
      experience: 4,
      skills: ['SQL', 'Data Analysis', 'Reporting', 'Excel', 'Power BI', 'MySQL'],
      preferredLocation: 'Lahore, Pakistan',
      expectedSalary: 100000,
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
    {
      name: 'Muhammad Hassan',
      email: 'muhammad.hassan@email.com',
      phone: '+92-302-3456789',
      sqlLevel: 2,
      experience: 2,
      skills: ['SQL', 'Database Basics', 'MySQL', 'Excel'],
      preferredLocation: 'Islamabad, Pakistan',
      expectedSalary: 70000,
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
    {
      name: 'Ayesha Malik',
      email: 'ayesha.malik@email.com',
      phone: '+92-303-4567890',
      sqlLevel: 4,
      experience: 8,
      skills: ['SQL', 'Database Architecture', 'Cloud Databases', 'AWS RDS', 'Performance Tuning', 'Leadership'],
      preferredLocation: 'Rawalpindi, Pakistan',
      expectedSalary: 220000,
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
    {
      name: 'Usman Ahmed',
      email: 'usman.ahmed@email.com',
      phone: '+92-304-5678901',
      sqlLevel: 1,
      experience: 1,
      skills: ['SQL', 'Database Basics', 'Learning'],
      preferredLocation: 'Faisalabad, Pakistan',
      expectedSalary: 50000,
      status: 'ACTIVE' as const,
      userId: adminUser.id,
    },
  ];

  for (const candidateData of candidates) {
    await prisma.candidate.upsert({
      where: { email: candidateData.email },
      update: {},
      create: candidateData,
    });
  }
  
  console.log('✅ Candidates seeded successfully');
}

async function seedPlacements() {
  console.log('🌱 Seeding placements...');
  
  const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!adminUser) throw new Error('Admin user not found');
  
  const jobs = await prisma.job.findMany({ take: 3 });
  const candidates = await prisma.candidate.findMany({ take: 3 });
  
  if (jobs.length === 0 || candidates.length === 0) {
    console.log('⚠️ Skipping placements - no jobs or candidates found');
    return;
  }
  
  const placements = [
    {
      jobId: jobs[0].id,
      candidateId: candidates[0].id,
      jobTitle: jobs[0].title,
      candidateName: candidates[0].name,
      company: jobs[0].company,
      salary: jobs[0].salary,
      status: 'COMPLETED' as const,
      placementDate: new Date('2024-01-15'),
      startDate: new Date('2024-02-01'),
      userId: adminUser.id,
    },
    {
      jobId: jobs[1].id,
      candidateId: candidates[1].id,
      jobTitle: jobs[1].title,
      candidateName: candidates[1].name,
      company: jobs[1].company,
      salary: jobs[1].salary,
      status: 'IN_PROGRESS' as const,
      placementDate: new Date('2024-02-01'),
      startDate: new Date('2024-03-01'),
      userId: adminUser.id,
    },
  ];

  for (const placementData of placements) {
    await prisma.placement.create({
      data: placementData,
    });
  }
  
  console.log('✅ Placements seeded successfully');
}

async function seedInterviews() {
  console.log('🌱 Seeding interviews...');
  
  const placements = await prisma.placement.findMany({ take: 2 });
  
  if (placements.length === 0) {
    console.log('⚠️ Skipping interviews - no placements found');
    return;
  }
  
  const interviews = [
    {
      placementId: placements[0].id,
      candidateId: placements[0].candidateId,
      jobId: placements[0].jobId,
      interviewDate: new Date('2024-01-10'),
      interviewTime: '10:00 AM',
      location: 'TechCorp Solutions Office, Karachi',
      type: 'IN_PERSON' as const,
      status: 'COMPLETED' as const,
      notes: 'Excellent technical skills, good communication',
      feedback: 'Candidate performed very well in technical interview',
      score: 9,
    },
    {
      placementId: placements[1].id,
      candidateId: placements[1].candidateId,
      jobId: placements[1].jobId,
      interviewDate: new Date('2024-02-15'),
      interviewTime: '2:00 PM',
      location: 'DataFlow Systems Office, Lahore',
      type: 'VIDEO' as const,
      status: 'SCHEDULED' as const,
      notes: 'Technical interview scheduled',
    },
  ];

  for (const interviewData of interviews) {
    await prisma.interview.create({
      data: interviewData,
    });
  }
  
  console.log('✅ Interviews seeded successfully');
}

async function seedPayments() {
  console.log('🌱 Seeding payments...');
  
  const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!adminUser) throw new Error('Admin user not found');
  
  const placements = await prisma.placement.findMany({ where: { status: 'COMPLETED' } });
  
  if (placements.length === 0) {
    console.log('⚠️ Skipping payments - no completed placements found');
    return;
  }
  
  const payments = [
    {
      placementId: placements[0].id,
      candidateId: placements[0].candidateId,
      jobId: placements[0].jobId,
      amount: 15000, // 10% commission
      commissionRate: 0.10,
      paymentMethod: 'BANK_TRANSFER' as const,
      status: 'COMPLETED' as const,
      paymentDate: new Date('2024-01-20'),
      transactionId: 'TXN-001-2024',
      description: 'Commission payment for successful placement',
      userId: adminUser.id,
    },
  ];

  for (const paymentData of payments) {
    await prisma.payment.create({
      data: paymentData,
    });
  }
  
  console.log('✅ Payments seeded successfully');
}

async function seedNotifications() {
  console.log('🌱 Seeding notifications...');
  
  const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!adminUser) throw new Error('Admin user not found');
  
  const notifications = [
    {
      type: 'EMAIL' as const,
      recipient: 'ahmed.khan@email.com',
      subject: 'Interview Invitation - Senior SQL Developer',
      message: 'You have been invited for an interview for the Senior SQL Developer position at TechCorp Solutions.',
      status: 'SENT' as const,
      sentAt: new Date('2024-01-08'),
      metadata: { template: 'interview_invitation', jobId: 'job-1' },
      userId: adminUser.id,
    },
    {
      type: 'SMS' as const,
      recipient: '+92-300-1234567',
      subject: 'Interview Reminder',
      message: 'Reminder: Your interview is scheduled for tomorrow at 10:00 AM.',
      status: 'DELIVERED' as const,
      sentAt: new Date('2024-01-09'),
      metadata: { template: 'interview_reminder' },
      userId: adminUser.id,
    },
    {
      type: 'PLACEMENT_CONFIRMATION' as const,
      recipient: 'ahmed.khan@email.com',
      subject: 'Placement Confirmation',
      message: 'Congratulations! Your placement has been confirmed. You will start on February 1, 2024.',
      status: 'SENT' as const,
      sentAt: new Date('2024-01-15'),
      metadata: { template: 'placement_confirmation', placementId: 'placement-1' },
      userId: adminUser.id,
    },
  ];

  for (const notificationData of notifications) {
    await prisma.notification.create({
      data: notificationData,
    });
  }
  
  console.log('✅ Notifications seeded successfully');
}

async function seedSystemSettings() {
  console.log('🌱 Seeding system settings...');
  
  const settings = [
    {
      key: 'commission_rate',
      value: '0.10',
      description: 'Default commission rate for placements (10%)',
      category: 'payments',
      isPublic: false,
    },
    {
      key: 'max_interview_duration',
      value: '60',
      description: 'Maximum interview duration in minutes',
      category: 'interviews',
      isPublic: true,
    },
    {
      key: 'ai_matching_threshold',
      value: '0.7',
      description: 'Minimum AI matching score threshold',
      category: 'ai',
      isPublic: false,
    },
    {
      key: 'email_notifications_enabled',
      value: 'true',
      description: 'Enable email notifications',
      category: 'notifications',
      isPublic: true,
    },
    {
      key: 'sms_notifications_enabled',
      value: 'true',
      description: 'Enable SMS notifications',
      category: 'notifications',
      isPublic: true,
    },
    {
      key: 'system_maintenance_mode',
      value: 'false',
      description: 'System maintenance mode',
      category: 'system',
      isPublic: true,
    },
  ];

  for (const settingData of settings) {
    await prisma.systemSettings.upsert({
      where: { key: settingData.key },
      update: {},
      create: settingData,
    });
  }
  
  console.log('✅ System settings seeded successfully');
}

async function seedAIMatchingHistory() {
  console.log('🌱 Seeding AI matching history...');
  
  const jobs = await prisma.job.findMany({ take: 2 });
  const candidates = await prisma.candidate.findMany({ take: 2 });
  
  if (jobs.length === 0 || candidates.length === 0) {
    console.log('⚠️ Skipping AI matching history - no jobs or candidates found');
    return;
  }
  
  const matchingHistory = [
    {
      jobId: jobs[0].id,
      candidateId: candidates[0].id,
      overallScore: 0.85,
      skillsScore: 0.90,
      experienceScore: 0.80,
      locationScore: 0.95,
      salaryScore: 0.75,
      sqlLevelScore: 0.95,
      matchingSkills: ['SQL', 'Stored Procedures', 'Database Design', 'Performance Tuning'],
      missingSkills: ['Data Warehousing'],
      recommendations: [
        'Excellent SQL skills match',
        'Strong experience level',
        'Location preference matches',
        'Consider salary negotiation'
      ],
    },
    {
      jobId: jobs[1].id,
      candidateId: candidates[1].id,
      overallScore: 0.72,
      skillsScore: 0.75,
      experienceScore: 0.70,
      locationScore: 0.80,
      salaryScore: 0.85,
      sqlLevelScore: 0.70,
      matchingSkills: ['SQL', 'Data Analysis', 'Reporting'],
      missingSkills: ['PostgreSQL', 'Backup & Recovery'],
      recommendations: [
        'Good basic SQL skills',
        'Experience level suitable',
        'Consider additional training in PostgreSQL'
      ],
    },
  ];

  for (const historyData of matchingHistory) {
    await prisma.aIMatchingHistory.create({
      data: historyData,
    });
  }
  
  console.log('✅ AI matching history seeded successfully');
}

// Roman Urdu: Main seed function
async function main() {
  console.log('🚀 Starting JPS System Database Seeding...');
  console.log('==========================================');
  
  try {
    // Roman Urdu: Seed data in order
    await seedUsers();
    await seedJobs();
    await seedCandidates();
    await seedPlacements();
    await seedInterviews();
    await seedPayments();
    await seedNotifications();
    await seedSystemSettings();
    await seedAIMatchingHistory();
    
    console.log('==========================================');
    console.log('🎉 JPS System Database Seeding Completed!');
    console.log('==========================================');
    
    // Roman Urdu: Display summary
    const summary = await prisma.$transaction([
      prisma.user.count(),
      prisma.job.count(),
      prisma.candidate.count(),
      prisma.placement.count(),
      prisma.interview.count(),
      prisma.payment.count(),
      prisma.notification.count(),
      prisma.systemSettings.count(),
      prisma.aIMatchingHistory.count(),
    ]);
    
    console.log('\n📊 Seeding Summary:');
    console.log(`Users: ${summary[0]}`);
    console.log(`Jobs: ${summary[1]}`);
    console.log(`Candidates: ${summary[2]}`);
    console.log(`Placements: ${summary[3]}`);
    console.log(`Interviews: ${summary[4]}`);
    console.log(`Payments: ${summary[5]}`);
    console.log(`Notifications: ${summary[6]}`);
    console.log(`System Settings: ${summary[7]}`);
    console.log(`AI Matching History: ${summary[8]}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Roman Urdu: Run seed function
main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
