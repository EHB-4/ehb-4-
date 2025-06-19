import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const hashedPassword = await hash('test123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  // Create sample certificates
  await prisma.certificate.createMany({
    data: [
      {
        userId: user.id,
        title: 'SQL Basics Certification',
        subject: 'Database Management',
        date: new Date('2024-01-15'),
        score: 85,
        status: 'passed',
        certificateUrl: 'https://example.com/cert1.pdf',
      },
      {
        userId: user.id,
        title: 'Advanced SQL Certification',
        subject: 'Database Management',
        date: new Date('2024-02-20'),
        score: 92,
        status: 'passed',
        certificateUrl: 'https://example.com/cert2.pdf',
      },
    ],
  });

  // Create sample study resources
  await prisma.studyResource.createMany({
    data: [
      {
        title: 'SQL Fundamentals Guide',
        type: 'guide',
        provider: 'SQL Academy',
        sqlLevel: 'beginner',
        downloadUrl: 'https://example.com/sql-guide.pdf',
        tags: ['basics', 'tutorial'],
      },
      {
        title: 'Advanced SQL Exercises',
        type: 'exercises',
        provider: 'SQL Pro',
        sqlLevel: 'advanced',
        downloadUrl: 'https://example.com/advanced-exercises.pdf',
        tags: ['advanced', 'practice'],
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
