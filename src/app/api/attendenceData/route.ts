// pages/api/attendance.ts
import { dbconnect } from '@/lib/dbconnect';
import Attendance from '@/model/AttendenceSchema'; // Ensure this path is correct
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbconnect();
    
    // Fetch all attendance records from the database
    const data = await Attendance.find({});
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    return NextResponse.json("Error in attendence data fetching ", { status: 400 });  }
}
