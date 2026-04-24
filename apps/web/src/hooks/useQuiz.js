import { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

export function useQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      setIsLoading(true);
      setError(null);
      const records = await pb.collection('quizzes').getFullList({
        $autoCancel: false,
        sort: 'created'
      });
      setQuestions(records);
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
      console.error('Error fetching questions:', err);
    } finally {
      setIsLoading(false);
    }
  }

  function selectAnswer(answerIndex) {
    setSelectedAnswer(answerIndex);
  }

  function nextQuestion() {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect
      }
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    score,
    percentage,
    answeredQuestions,
    isLoading,
    error,
    quizCompleted,
    selectAnswer,
    nextQuestion,
    resetQuiz
  };
}