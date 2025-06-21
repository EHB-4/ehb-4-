'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BookOpen, Users, DollarSign } from 'lucide-react';

import { CourseFilters } from '@/components/edr/CourseFilters';
import { CourseGrid } from '@/components/edr/CourseGrid';
import { BookingModal } from '@/components/edr/BookingModal';
import { Course } from '@/lib/models/Course';
import { Tutor } from '@/lib/models/Tutor';
import { Wallet } from '@/lib/models/Wallet';
import { calculateLoyaltyDiscount } from '@/lib/utils/franchiseUtils';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function CourseListing() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [tutors, setTutors] = useState<{ [key: string]: Tutor }>({});
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    subject: '',
    city: '',
    mode: '',
    maxFee: '',
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchCourses();
      fetchWallet();
    }
  }, [session?.user?.id, filters]);

  const fetchCourses = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.subject) queryParams.append('subject', filters.subject);
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.mode) queryParams.append('mode', filters.mode);
      if (filters.maxFee) queryParams.append('maxFee', filters.maxFee);

      const response = await fetch(`/api/courses?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data.courses);

      // Fetch tutor details for each course
      const tutorIds = [...new Set(data.courses.map((course: Course) => course.tutorId))];
      const tutorPromises = tutorIds.map(id => fetch(`/api/tutors/${id}`).then(res => res.json()));
      const tutorData = await Promise.all(tutorPromises);
      const tutorMap = tutorData.reduce((acc: { [key: string]: Tutor }, tutor: Tutor) => {
        acc[tutor._id.toString()] = tutor;
        return acc;
      }, {});
      setTutors(tutorMap);
    } catch (err) {
      setError('Failed to load courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await fetch('/api/wallet');
      if (!response.ok) throw new Error('Failed to fetch wallet');
      const data = await response.json();
      setWallet(data.wallet);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    }
  };

  const handleBookCourse = async (course: Course) => {
    if (!wallet) {
      toast.error('Please connect your wallet first');
      return;
    }

    const discount = calculateLoyaltyDiscount(wallet.coinLock);
    const finalPrice = course.price * (1 - discount);

    if (wallet.balance < finalPrice) {
      toast.error('Insufficient balance in wallet');
      return;
    }

    setSelectedCourse(course);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedCourse) return;

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse._id,
          schedule: selectedCourse.schedule,
        }),
      });

      if (!response.ok) throw new Error('Failed to book course');

      toast.success('Course booked successfully!');
      setShowBookingModal(false);
      setSelectedCourse(null);
      fetchWallet(); // Refresh wallet balance
    } catch (err) {
      toast.error('Failed to book course');
      console.error('Error booking course:', err);
    }
  };

  const handleDownload = async (format: 'txt' | 'md' | 'pdf') => {
    try {
      const response = await fetch('/api/edr/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format,
          filters,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();

      if (format === 'pdf') {
        toast('PDF downloads are coming soon!', { icon: '📄' });
        return;
      }

      // Create and download the file
      const blob = new Blob([data.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `edr-course-report-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Report downloaded successfully! (${data.courseCount} courses)`);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report');
    }
  };

  // Calculate statistics
  const stats = {
    totalCourses: courses.length,
    averagePrice:
      courses.length > 0
        ? (courses.reduce((sum, course) => sum + course.price, 0) / courses.length).toFixed(2)
        : '0',
    totalTutors: Object.keys(tutors).length,
    subjects: [...new Set(courses.map(course => course.subject))].length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Course</h1>
            <p className="text-xl text-gray-600">
              Learn from verified tutors with SQL level 3 or higher
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleDownload('txt')}>
              <Download className="mr-2 h-4 w-4" /> TXT
            </Button>
            <Button variant="outline" onClick={() => handleDownload('md')}>
              <Download className="mr-2 h-4 w-4" /> MD
            </Button>
            <Button variant="outline" onClick={() => handleDownload('pdf')}>
              <Download className="mr-2 h-4 w-4" /> PDF
            </Button>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tutors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTutors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">${stats.averagePrice}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.subjects}</p>
              </div>
            </div>
          </div>
        </div>

        <CourseFilters filters={filters} onFiltersChange={setFilters} />

        <CourseGrid
          courses={courses}
          tutors={tutors}
          wallet={wallet}
          calculateLoyaltyDiscount={calculateLoyaltyDiscount}
          onBookCourse={handleBookCourse}
        />
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        selectedCourse={selectedCourse}
        tutors={tutors}
        wallet={wallet}
        calculateLoyaltyDiscount={calculateLoyaltyDiscount}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}
