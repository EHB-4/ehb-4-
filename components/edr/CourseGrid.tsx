"use client";

'use client';

import { motion } from 'framer-motion';

interface CourseGridProps {
  courses: any[];
  tutors: any;
  wallet: any;
  calculateLoyaltyDiscount: (coinLock: number) => number;
  onBookCourse: (course: any) => void;
}

export function CourseGrid({
  courses,
  tutors,
  wallet,
  calculateLoyaltyDiscount,
  onBookCourse,
}: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="col-span-full text-center text-gray-500 py-12">
        No courses found matching your criteria
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => {
        const tutor = tutors[course.tutorId.toString()];
        const discount = wallet ? calculateLoyaltyDiscount(wallet.coinLock) : 0;
        const finalPrice = course.price * (1 - discount);

        return (
          <motion.div
            key={course._id.toString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                  SQL {tutor?.sqlLevel || 3}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium mr-2">Tutor:</span>
                  {tutor?.name}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium mr-2">Subject:</span>
                  {course.subject}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium mr-2">Schedule:</span>
                  {typeof course.schedule === 'string'
                    ? course.schedule
                    : JSON.stringify(course.schedule)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium mr-2">Mode:</span>
                  {course.mode}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium mr-2">Location:</span>
                  {course.city}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-900">{finalPrice} coins</p>
                  {discount > 0 && (
                    <p className="text-sm text-green-600">
                      {discount * 100}% loyalty discount applied
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onBookCourse(course)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
