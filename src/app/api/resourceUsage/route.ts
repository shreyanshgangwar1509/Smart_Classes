import { dbconnect } from '@/lib/dbconnect';
import Resource from '@/model/ResourceSchema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Connect to the database
    await dbconnect();

    // Fetch data from the Resource schema
    const data = await Resource.find({});

    // Return the data with a 200 status code using NextResponse
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle any errors and send a 500 status code
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}
