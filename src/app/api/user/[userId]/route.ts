import { dbconnect } from '@/lib/dbconnect';
// import { connectToDatabase } from '@/lib/mongodb'; // Assume a helper function to connect to your MongoDB
import { NextResponse } from 'next/server';

// Define the type for the parameters (optional `userId`)
type Params = {
  userId?: string; // Make `userId` optional
};

// Implement the GET request handler
export async function GET(request: Request, { params }: { params: Params }) {
  const { userId } = params;

  // If no `userId` is provided, identify the user as a "new user"
  if (!userId) {
    return NextResponse.json({ role: 'new user' }, { status: 200 });
  }

  try {
    // Connect to the database (assuming MongoDB here)
    const db = await dbconnect();
    const usersCollection = db.collection('users');

    // Find the user in the database
    const user = await usersCollection.findOne({ _id: userId });

    // If the user is not found, return a 404 response
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Extract the role from the user data
    const userRole = user.role;

    // Return the user's role in the response
    return NextResponse.json({ role: userRole }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching user role:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
