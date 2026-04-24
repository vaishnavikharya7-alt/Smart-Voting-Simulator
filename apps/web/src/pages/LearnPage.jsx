import React from 'react';
import { Helmet } from 'react-helmet';
import { UserPlus, CheckCircle2, Calendar, Vote, FileCheck, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LearnCard from '@/components/LearnCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LearnPage() {
  const { t } = useLanguage();

  const learningCards = [
    {
      icon: UserPlus,
      title: t('registrationTitle'),
      description: t('registrationDesc')
    },
    {
      icon: CheckCircle2,
      title: t('eligibilityTitle'),
      description: t('eligibilityDesc')
    },
    {
      icon: Calendar,
      title: t('votingDayTitle'),
      description: t('votingDayDesc')
    },
    {
      icon: Vote,
      title: t('howToVoteTitle'),
      description: t('howToVoteDesc')
    },
    {
      icon: FileCheck,
      title: t('afterVotingTitle'),
      description: t('afterVotingDesc')
    },
    {
      icon: FileText,
      title: t('documentsTitle'),
      description: t('documentsDesc')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`${t('learn')} - VoteWise AI`}</title>
        <meta name="description" content={t('learnPageSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                {t('learnPageTitle')}
              </h1>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                {t('learnPageSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {learningCards.map((card, index) => (
                <LearnCard key={index} {...card} index={index} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}