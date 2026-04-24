import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FeatureCard({ icon: Icon, title, description, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Link to={link}>
        <div className="h-full bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border group">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-card-foreground">{title}</h3>
          <p className="text-card-foreground/80 leading-relaxed mb-4">{description}</p>
          <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all duration-300">
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}