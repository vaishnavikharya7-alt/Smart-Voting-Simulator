import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CredibilityBadge from '@/components/CredibilityBadge';
import { analyzeFakeNews } from '@/utils/FakeNewsAnalyzer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FakeNewsPage() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  function handleAnalyze() {
    if (!text.trim()) return;
    
    const analysis = analyzeFakeNews(text);
    setResult(analysis);
  }

  function handleReset() {
    setText('');
    setResult(null);
  }

  function getCredibilityMessage() {
    if (result.score >= 70) return t('highCredibility');
    if (result.score >= 40) return t('mediumCredibility');
    return t('lowCredibility');
  }

  return (
    <>
      <Helmet>
        <title>{`${t('fakeNews')} - VoteWise AI`}</title>
        <meta name="description" content={t('fakeNewsPageSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                {t('fakeNewsPageTitle')}
              </h1>
              <p className="text-lg text-foreground/80">
                {t('fakeNewsPageSubtitle')}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-card-foreground">
                    {t('pasteText')}
                  </label>
                  <Textarea
                    placeholder="Enter or paste the text you want to analyze..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={8}
                    className="resize-none text-foreground"
                  />
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleAnalyze} disabled={!text.trim()} className="gap-2">
                    <Search className="w-5 h-5" />
                    {t('analyzeText')}
                  </Button>
                  {result && (
                    <Button onClick={handleReset} variant="outline">
                      Analyze new text
                    </Button>
                  )}
                </div>
              </div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 space-y-6"
                >
                  <div className="p-6 bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        {t('credibilityScore')}
                      </h3>
                      <CredibilityBadge score={result.score} />
                    </div>
                    <div className="w-full bg-background rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 transition-all duration-500 ${
                          result.score >= 70 ? 'bg-accent' :
                          result.score >= 40 ? 'bg-yellow-500' : 'bg-destructive'
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {getCredibilityMessage()}
                    </p>
                  </div>

                  {result.redFlags.length > 0 && (
                    <div className="p-6 bg-destructive/5 rounded-xl border border-destructive/20">
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {t('redFlags')}
                          </h3>
                          <ul className="space-y-2">
                            {result.redFlags.map((flag, index) => (
                              <li key={index} className="text-sm text-foreground/80 flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>{flag}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
                    <h3 className="text-lg font-semibold mb-4 text-foreground">
                      {t('verificationTips')}
                    </h3>
                    <ul className="space-y-2">
                      {result.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}