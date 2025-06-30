import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IAIAgent extends Document {
  name: string;
  type: string;
  status: string;
  version: string;
  description?: string;
  config?: Record<string, any>;
  metrics?: {
    uptime?: number;
    responseTime?: number;
    throughput?: number;
    errorRate?: number;
  };
  permissions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AIAgentSchema = new Schema<IAIAgent>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'inactive' },
  version: { type: String, default: '1.0.0' },
  description: { type: String },
  config: { type: Schema.Types.Mixed },
  metrics: {
    uptime: Number,
    responseTime: Number,
    throughput: Number,
    errorRate: Number,
  },
  permissions: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.AIAgent || model<IAIAgent>('AIAgent', AIAgentSchema);
