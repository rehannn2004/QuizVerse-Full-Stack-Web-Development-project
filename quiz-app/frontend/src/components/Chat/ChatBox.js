import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../../services/chatService';
import Message from './Message';
import '../../styles/chat.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (err) {
        setError('Failed to load messages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setError('');
      const response = await sendMessage(newMessage);
      
      // Ensure we have a valid message object
      if (!response || !response._id) {
        throw new Error('Invalid message response from server');
      }

      setMessages([response, ...messages]);
      setNewMessage('');
    } catch (err) {
      setError(err.message || 'Failed to send message');
      console.error('Message submission error:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading chat...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="chat-container">
      <h2>Doubts Discussion</h2>
      <div className="chat-box">
        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your doubt here..."
            maxLength="500"
            required
          />
          <button type="submit">Send</button>
        </form>
        <div className="messages-list">
          {messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;