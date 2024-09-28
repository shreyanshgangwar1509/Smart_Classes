import axios from 'axios';
import { NextResponse } from 'next/server';

// Named export for POST method
export async function POST(req: Request) {
  const { message } = await req.json(); // Use req.json() to parse the JSON body

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, ...message],
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const botResponse = response.data.choices[0].message.content;
    return NextResponse.json({ botResponse }); // Use NextResponse to return JSON
  } catch (error: any) {
    console.error('Error communicating with GPT:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Failed to communicate with GPT' }, { status: 500 });
  }
}
