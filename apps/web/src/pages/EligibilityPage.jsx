import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { validateEligibility } from '@/utils/EligibilityValidator';
import { useLanguage } from '@/contexts/LanguageContext';

export default function EligibilityPage() {
  const { t } = useLanguage();
  const [age, setAge] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!age || !citizenship || !location) {
      return;
    }

    const validation = validateEligibility(parseInt(age), citizenship);
    setResult(validation);
  }

  function handleReset() {
    setAge('');
    setCitizenship('');
    setLocation('');
    setResult(null);
  }

  return (
    <>
      <Helmet>
        <title>{`${t('eligibility')} - VoteWise AI`}</title>
        <meta name="description" content={t('eligibilityPageSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                {t('eligibilityPageTitle')}
              </h1>
              <p className="text-lg text-foreground/80">
                {t('eligibilityPageSubtitle')}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="age">{t('ageLabel')}</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder={t('agePlaceholder')}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="0"
                    max="120"
                    required
                    className="text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citizenship">{t('citizenshipLabel')}</Label>
                  <Select value={citizenship} onValueChange={setCitizenship} required>
                    <SelectTrigger id="citizenship">
                      <SelectValue placeholder={t('citizenshipPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Indian">{t('indian')}</SelectItem>
                      <SelectItem value="Non-Indian">{t('nonIndian')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t('locationLabel')}</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder={t('locationPlaceholder')}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="text-foreground"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  {t('checkEligibility')}
                </Button>
              </form>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-8 p-6 rounded-xl ${
                    result.eligible 
                      ? 'bg-accent/10 border-2 border-accent' 
                      : 'bg-destructive/10 border-2 border-destructive'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {result.eligible ? (
                      <CheckCircle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
                    )}
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${
                        result.eligible ? 'text-accent' : 'text-destructive'
                      }`}>
                        {result.eligible ? t('eligible') : t('notEligible')}
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {t(result.message)}
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="mt-4"
                      >
                        Check again
                      </Button>
                    </div>
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