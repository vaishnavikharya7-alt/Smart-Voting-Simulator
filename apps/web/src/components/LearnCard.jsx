import React from 'react';
import { motion } from 'framer-motion';

export default function LearnCard({ icon: Icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-card-foreground">{title}</h3>
      <p className="text-card-foreground/80 leading-relaxed">{description}</p>
    </motion.div>
  );
}