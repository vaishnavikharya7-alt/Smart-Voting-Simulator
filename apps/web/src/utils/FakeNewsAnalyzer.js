export function analyzeFakeNews(text) {
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      redFlags: [],
      tips: []
    };
  }

  const redFlags = [];
  let score = 100;

  // Suspicious keywords
  const suspiciousKeywords = [
    'URGENT', 'BREAKING', 'MUST SHARE', 'FAKE', 'HOAX', 'CONSPIRACY',
    'SHOCKING', 'UNBELIEVABLE', 'THEY DON\'T WANT YOU TO KNOW',
    'SHARE BEFORE DELETED', 'GOVERNMENT HIDING', 'SECRET TRUTH'
  ];

  const foundKeywords = suspiciousKeywords.filter(keyword => 
    text.toUpperCase().includes(keyword)
  );

  if (foundKeywords.length > 0) {
    redFlags.push(`Suspicious keywords found: ${foundKeywords.join(', ')}`);
    score -= foundKeywords.length * 15;
  }

  // Excessive punctuation
  const exclamationCount = (text.match(/!/g) || []).length;
  const questionCount = (text.match(/\?/g) || []).length;

  if (exclamationCount > 3) {
    redFlags.push(`Excessive exclamation marks (${exclamationCount})`);
    score -= 10;
  }

  if (questionCount > 5) {
    redFlags.push(`Excessive question marks (${questionCount})`);
    score -= 10;
  }

  // ALL CAPS detection
  const words = text.split(/\s+/);
  const capsWords = words.filter(word => 
    word.length > 3 && word === word.toUpperCase() && /[A-Z]/.test(word)
  );

  if (capsWords.length > words.length * 0.3) {
    redFlags.push('Excessive use of ALL CAPS text');
    score -= 20;
  }

  // Emotional language patterns
  const emotionalWords = [
    'AMAZING', 'TERRIBLE', 'HORRIFIC', 'INCREDIBLE', 'DEVASTATING',
    'OUTRAGEOUS', 'DISGUSTING', 'MIRACLE', 'DISASTER'
  ];

  const foundEmotional = emotionalWords.filter(word => 
    text.toUpperCase().includes(word)
  );

  if (foundEmotional.length > 2) {
    redFlags.push('Heavy use of emotional language');
    score -= 15;
  }

  // No sources mentioned
  const hasSources = /source|according to|reported by|study|research/i.test(text);
  if (!hasSources && text.length > 100) {
    redFlags.push('No credible sources mentioned');
    score -= 10;
  }

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score));

  // Generate verification tips
  const tips = [
    'Check the source of the information',
    'Look for the same news on credible news websites',
    'Verify dates and facts mentioned in the text',
    'Check if the author or publisher is credible',
    'Look for official statements from authorities',
    'Be skeptical of sensational claims',
    'Cross-reference with multiple sources'
  ];

  return {
    score: Math.round(score),
    redFlags,
    tips: tips.slice(0, 5)
  };
}