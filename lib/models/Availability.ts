import { ObjectId } from 'mongodb';

export interface Availability {
  id: string;
  doctorId: string;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAvailabilityInput {
  doctorId: string;
  day: string;
  timeSlots: string[];
}

export interface UpdateAvailabilityInput extends Partial<CreateAvailabilityInput> {}
