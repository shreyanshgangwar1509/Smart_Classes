// schemas/ResourceSchema.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for a resource document
interface IResource extends Document {
  name: string;
  type: string; // e.g., 'projector', 'computer', etc.
  quantity: number; // Number of resources available
  status: 'available' | 'unavailable'; // Availability status
}

// Create a schema corresponding to the interface
const ResourceSchema: Schema<IResource> = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
});

// Create the Resource model
const Resource: Model<IResource> = mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);

// Export the model
export default Resource;
