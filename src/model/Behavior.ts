import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface representing a document in MongoDB
interface IBehavior extends Document {
  student: string;
  engagement: number;
  date: Date;
}

// Create a schema corresponding to the document interface
const BehaviorSchema: Schema<IBehavior> = new Schema({
  student: { type: String, required: true },
  engagement: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Create a model for the behavior schema
const Behavior: Model<IBehavior> = mongoose.models.Behavior || mongoose.model<IBehavior>('Behavior', BehaviorSchema);

export default Behavior;
