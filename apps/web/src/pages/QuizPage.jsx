import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuizOption from '@/components/QuizOption';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useQuiz } from '@/hooks/useQuiz';
import { useLanguage } from '@/contexts/LanguageContext';

export default function QuizPage() {
  const { t } = useLanguage();
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    score,
    percentage,
    isLoading,
    error,
    quizCompleted,
    selectAnswer,
    nextQuestion,
    resetQuiz
  } = useQuiz();

  function getFeedback() {
    if (percentage >= 80) return t('excellent');
    if (percentage >= 60) return t('good');
    return t('needImprovement');
  }

  return (
    <>
      <Helmet>
        <title>{`${t('quiz')} - VoteWise AI`}</title>
        <meta name="description" content={t('quizPageSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                {t('quizPageTitle')}
              </h1>
              <p className="text-lg text-foreground/80">
                {t('quizPageSubtitle')}
              </p>
            </div>

            {isLoading && (
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                <LoadingSpinner count={4} />
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 border-2 border-destructive rounded-2xl p-8 text-center">
                <p className="text-destructive font-medium mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  {t('tryAgain')}
                </Button>
              </div>
            )}

            {!isLoading && !error && !quizCompleted && currentQuestion && (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Question {currentQuestionIndex + 1} {t('outOf')} {totalQuestions}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {t('yourScore')}: {score}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mb-8 text-card-foreground leading-snug">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <QuizOption
                      key={index}
                      option={option}
                      index={index}
                      selected={selectedAnswer}
                      onClick={() => selectAnswer(index)}
                      showResult={false}
                      isCorrect={false}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextQuestion}
                  disabled={selectedAnswer === null}
                  className="w-full"
                  size="lg"
                >
                  {currentQuestionIndex < totalQuestions - 1 ? t('nextQuestion') : t('submitQuiz')}
                </Button>
              </motion.div>
            )}

            {quizCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-primary" />
                </div>

                <h2 className="text-3xl font-bold mb-4 text-card-foreground">
                  Quiz completed
                </h2>

                <div className="mb-8">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {percentage}%
                  </div>
                  <p className="text-lg text-card-foreground/80">
                    {t('yourScore')}: {score} {t('outOf')} {totalQuestions}
                  </p>
                </div>

                <p className="text-lg text-card-foreground/80 mb-8 max-w-md mx-auto">
                  {getFeedback()}
                </p>

                <Button onClick={resetQuiz} size="lg" className="gap-2">
                  <RotateCcw className="w-5 h-5" />
                  {t('retakeQuiz')}
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}