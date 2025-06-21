import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

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

const availabilitySchema = new mongoose.Schema(
  {
    doctorId: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAvailability extends Document {}

const Availability =
  mongoose.models.Availability || mongoose.model<IAvailability>('Availability', availabilitySchema);

export default Availability;
