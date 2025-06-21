import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

export interface Course {
  _id: ObjectId;
  tutorId: ObjectId;
  title: string;
  description: string;
  subject: string;
  price: number;
  schedule: {
    days: string[]; // e.g. ['Monday', 'Wednesday']
    times: string[]; // e.g. ['10:00-11:00', '14:00-15:00']
  };
  city: string;
  mode: 'online' | 'onsite';
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCourseInput {
  tutorId: string;
  title: string;
  description: string;
  schedule: {
    days: string[];
    times: string[];
  };
  price: number;
  city: string;
  mode: 'online' | 'onsite';
}

export interface UpdateCourseInput extends Partial<CreateCourseInput> {}

const courseSchema = new mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    schedule: {
      days: {
        type: [String],
        required: true,
      },
      times: {
        type: [String],
        required: true,
      },
    },
    city: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ['online', 'onsite'],
      required: true,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICourse extends Document {}

const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);

export default Course;
