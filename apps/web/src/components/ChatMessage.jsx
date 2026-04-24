import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isBot = message.sender === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      {isBot && (
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}
      <div className={`max-w-[70%] rounded-2xl px-5 py-3 ${
        isBot 
          ? 'bg-muted text-muted-foreground' 
          : 'bg-primary text-primary-foreground'
      }`}>
        <p className="leading-relaxed">{message.text}</p>
      </div>
      {!isBot && (
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
    </motion.div>
  );
}