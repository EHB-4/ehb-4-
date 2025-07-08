'use client';

'use client';

import Modal from '@/components/Modal';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse: any;
  tutors: any;
  wallet: any;
  calculateLoyaltyDiscount: (coinLock: number) => number;
  onConfirmBooking: () => void;
}

export function BookingModal({
  isOpen,
  onClose,
  selectedCourse,
  tutors,
  wallet,
  calculateLoyaltyDiscount,
  onConfirmBooking,
}: BookingModalProps) {
  if (!selectedCourse) return null;

  const tutor = tutors[selectedCourse.tutorId.toString()];
  const finalPrice = selectedCourse.price * (1 - calculateLoyaltyDiscount(wallet?.coinLock || 0));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Course Booking">
      <div className="space-y-4">
        <p className="text-gray-600">
          You are about to book the course "{selectedCourse.title}" with {tutor?.name}
        </p>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Booking Details</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Schedule:{' '}
              {typeof selectedCourse.schedule === 'string'
                ? selectedCourse.schedule
                : JSON.stringify(selectedCourse.schedule)}
            </p>
            <p>Mode: {selectedCourse.mode}</p>
            <p>Location: {selectedCourse.city}</p>
            <p>Price: {finalPrice} coins</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmBooking}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </Modal>
  );
}
