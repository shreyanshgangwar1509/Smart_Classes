// models/AttendanceSchema.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for an attendance document
interface IAttendance extends Document {
  studentId: string; // ID of the student
  classId: string; // ID of the class
  date: Date; // Date of attendance
  status: 'present' | 'absent' | 'late'; // Attendance status
}

// Create a schema corresponding to the interface
const AttendanceSchema: Schema<IAttendance> = new Schema({
  studentId: { type: String, required: true },
  classId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
});

// Create and export the Attendance model
const Attendance: Model<IAttendance> = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;
