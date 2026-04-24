import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function CredibilityBadge({ score }) {
  let icon, color, bgColor, label;
  
  if (score >= 70) {
    icon = CheckCircle;
    color = 'text-accent';
    bgColor = 'bg-accent/10';
    label = 'High credibility';
  } else if (score >= 40) {
    icon = AlertTriangle;
    color = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
    label = 'Medium credibility';
  } else {
    icon = XCircle;
    color = 'text-destructive';
    bgColor = 'bg-destructive/10';
    label = 'Low credibility';
  }
  
  const Icon = icon;
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${bgColor}`}>
      <Icon className={`w-5 h-5 ${color}`} />
      <span className={`font-medium ${color}`}>{label}</span>
    </div>
  );
}