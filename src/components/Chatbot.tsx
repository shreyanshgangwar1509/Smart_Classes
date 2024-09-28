'use client';
import axios from 'axios';
import { useState } from 'react';

// Define the Message type
interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    
    // Update chat history with user's message
    setChatHistory((prev) => [...prev, userMessage]);
    setInput(''); // Clear the input field immediately

    setIsLoading(true); // Set loading state

    try {
      // Send request to OpenAI API
      const response = await axios.post(`/api/gpt`, {
        message: [...chatHistory, userMessage],
      });

      // Add GPT's response to chat history
      const botMessage: Message = { role: 'bot', content: response.data.botResponse };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error posting to API:', error);
      // Optionally, handle errors (e.g., show a message to the user)
      const errorMessage: Message = { role: 'bot', content: 'Sorry, something went wrong. Please try again.' };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <span>{message.role === 'user' ? 'You' : 'Bot'}: {message.content}</span>
          </div>
        ))}
        {isLoading && <div className="chat-message bot">Bot is typing...</div>} {/* Optional loading indicator */}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything..."
      />
      <button onClick={sendMessage} disabled={isLoading}>Send</button> {/* Disable button while loading */}
    </div>
  );
};

export default Chatbot;
