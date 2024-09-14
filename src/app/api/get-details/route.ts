import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb'; // Assume this is a helper function to connect to MongoDB
import { dbconnect } from '@/lib/dbconnect';

// Define the type for the expected request body
type Params = {
  userId: string;
};

// Implement the POST request handler
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: Params = await request.json();

    // Destructure userId from the parsed body
    const { userId } = body;

    // If no userId is provided, return an error response
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Connect to the database
    const db = await dbconnect();
    const usersCollection = db.collection('users');

    // Find the user in the database
    const user = await usersCollection.findOne({ _id: userId });

    // If the user is not found, return a 404 response
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return the user details in the response
    return NextResponse.json({ userDetails: user }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching user details:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
