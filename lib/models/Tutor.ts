import { ObjectId } from 'mongodb';
import mongoose, { Document } from 'mongoose';

export interface Tutor {
  _id: ObjectId;
  userId: string;
  name: string;
  city: string;
  subjects: string[];
  fee: number;
  sqlLevel: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTutorInput {
  userId: string;
  name: string;
  city: string;
  subjects: string[];
  fee: number;
  sqlLevel: number;
}

export interface UpdateTutorInput extends Partial<CreateTutorInput> {}

const tutorSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    subjects: { type: [String], required: true },
    fee: { type: Number, required: true },
    sqlLevel: { type: Number, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITutor extends Document {}

const Tutor = mongoose.models.Tutor || mongoose.model<ITutor>('Tutor', tutorSchema);

export default Tutor;
