import { dbconnect } from '@/lib/dbconnect';
import Behavior from '@/model/Behavior';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Connect to the database
    await dbconnect();

    // Fetch data from the Behavior schema
    const data = await Behavior.find({});

    // Return the data with a 200 status code using NextResponse
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle any errors and send a 500 status code
    return NextResponse.json({ error: 'Failed to fetch behavior data' }, { status: 500 });
  }
}
