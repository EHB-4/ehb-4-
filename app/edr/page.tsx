'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { CourseFilters } from '@/components/edr/CourseFilters';
import { CourseGrid } from '@/components/edr/CourseGrid';
import { BookingModal } from '@/components/edr/BookingModal';
import { Course } from '@/lib/models/Course';
import { Tutor } from '@/lib/models/Tutor';
import { Wallet } from '@/lib/models/Wallet';
import { calculateLoyaltyDiscount } from '@/lib/utils/franchiseUtils';

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Course</h1>
          <p className="text-xl text-gray-600">
            Learn from verified tutors with SQL level 3 or higher
          </p>
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
