import React from 'react';
import '../../styles/chat.css';

const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="message-header">
        <span className="message-sender">{message.user.name}</span>
        <span className="message-usn">{message.user.usn}</span>
        <span className="message-time">
          {new Date(message.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="message-content">{message.message}</div>
    </div>
  );
};

export default Message;