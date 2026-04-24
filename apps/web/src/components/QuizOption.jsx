import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function QuizOption({ option, index, selected, onClick, showResult, isCorrect }) {
  const isSelected = selected === index;
  
  let bgClass = 'bg-card hover:bg-muted';
  let borderClass = 'border-border';
  
  if (showResult) {
    if (isCorrect) {
      bgClass = 'bg-accent/20';
      borderClass = 'border-accent';
    } else if (isSelected) {
      bgClass = 'bg-destructive/10';
      borderClass = 'border-destructive';
    }
  } else if (isSelected) {
    bgClass = 'bg-primary/10';
    borderClass = 'border-primary';
  }

  return (
    <motion.button
      whileHover={{ scale: showResult ? 1 : 1.02 }}
      whileTap={{ scale: showResult ? 1 : 0.98 }}
      onClick={onClick}
      disabled={showResult}
      className={`w-full text-left p-6 rounded-xl border-2 ${bgClass} ${borderClass} transition-all duration-200 ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-card-foreground font-medium">{option}</span>
        {showResult && isCorrect && (
          <Check className="w-6 h-6 text-accent" />
        )}
        {showResult && isSelected && !isCorrect && (
          <X className="w-6 h-6 text-destructive" />
        )}
      </div>
    </motion.button>
  );
}