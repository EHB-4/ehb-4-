export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { format, filters } = await request.json();

    // Fetch courses with filters
    const queryParams = new URLSearchParams();
    if (filters?.subject) queryParams.append('subject', filters.subject);
    if (filters?.city) queryParams.append('city', filters.city);
    if (filters?.mode) queryParams.append('mode', filters.mode);
    if (filters?.maxFee) queryParams.append('maxFee', filters.maxFee);

    const coursesResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/courses?${queryParams.toString()}`
    );
    const coursesData = await coursesResponse.json();
    const courses = coursesData.courses || [];

    // Fetch tutor details
    const tutorIds = [...new Set(courses.map((course: any) => course.tutorId))];
    const tutorPromises = tutorIds.map(id =>
      fetch(`${process.env.NEXTAUTH_URL}/api/tutors/${id}`).then(res => res.json())
    );
    const tutorData = await Promise.all(tutorPromises);
    const tutors = tutorData.reduce((acc: any, tutor: any) => {
      acc[tutor._id.toString()] = tutor;
      return acc;
    }, {});

    let reportContent = '';
    const timestamp = new Date().toLocaleString();

    switch (format) {
      case 'txt':
        reportContent = generateTxtReport(courses, tutors, timestamp);
        break;
      case 'md':
        reportContent = generateMdReport(courses, tutors, timestamp);
        break;
      case 'pdf':
        // For now, return markdown content that can be converted to PDF
        reportContent = generateMdReport(courses, tutors, timestamp);
        break;
      default:
        return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
    }

    return NextResponse.json({
      content: reportContent,
      format,
      timestamp,
      courseCount: courses.length,
    });
  } catch (error) {
    console.error('Error generating EDR report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}

function generateTxtReport(courses: any[], tutors: any, timestamp: string): string {
  let content = `EDR - Course Report\n`;
  content += `Generated: ${timestamp}\n`;
  content += `Total Courses: ${courses.length}\n`;
  content += `========================================\n\n`;

  courses.forEach((course, index) => {
    const tutor = tutors[course.tutorId];
    content += `${index + 1}. ${course.title}\n`;
    content += `   Tutor: ${tutor?.name || 'N/A'}\n`;
    content += `   Subject: ${course.subject}\n`;
    content += `   Mode: ${course.mode}\n`;
    content += `   Price: $${course.price}\n`;
    content += `   Duration: ${course.duration || 'N/A'}\n`;
    content += `   Location: ${course.city || 'N/A'}\n`;
    content += `   Schedule: ${course.schedule || 'N/A'}\n`;
    content += `   ----------------------------------------\n`;
  });

  return content;
}

function generateMdReport(courses: any[], tutors: any, timestamp: string): string {
  let content = `# EDR - Course Report\n\n`;
  content += `**Generated:** ${timestamp}\n`;
  content += `**Total Courses:** ${courses.length}\n\n`;

  // Summary table
  content += `## Course Summary\n\n`;
  content += `| # | Course Title | Tutor | Subject | Mode | Price | Location |\n`;
  content += `|---|--------------|-------|---------|------|-------|----------|\n`;

  courses.forEach((course, index) => {
    const tutor = tutors[course.tutorId];
    content += `| ${index + 1} | ${course.title} | ${tutor?.name || 'N/A'} | ${course.subject} | ${course.mode} | $${course.price} | ${course.city || 'N/A'} |\n`;
  });

  content += `\n## Detailed Course Information\n\n`;

  courses.forEach((course, index) => {
    const tutor = tutors[course.tutorId];
    content += `### ${index + 1}. ${course.title}\n\n`;
    content += `- **Tutor:** ${tutor?.name || 'N/A'}\n`;
    content += `- **Subject:** ${course.subject}\n`;
    content += `- **Mode:** ${course.mode}\n`;
    content += `- **Price:** $${course.price}\n`;
    content += `- **Duration:** ${course.duration || 'N/A'}\n`;
    content += `- **Location:** ${course.city || 'N/A'}\n`;
    content += `- **Schedule:** ${course.schedule || 'N/A'}\n`;
    content += `- **Description:** ${course.description || 'N/A'}\n\n`;
  });

  return content;
}
