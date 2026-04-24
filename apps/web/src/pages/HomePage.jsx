import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Brain, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: t('learnFeatureTitle'),
      description: t('learnFeatureDesc'),
      link: '/learn'
    },
    {
      icon: CheckCircle,
      title: t('eligibilityFeatureTitle'),
      description: t('eligibilityFeatureDesc'),
      link: '/eligibility'
    },
    {
      icon: Brain,
      title: t('quizFeatureTitle'),
      description: t('quizFeatureDesc'),
      link: '/quiz'
    },
    {
      icon: MessageCircle,
      title: t('chatFeatureTitle'),
      description: t('chatFeatureDesc'),
      link: '/chatbot'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{`VoteWise AI - ${t('heroTitle')}`}</title>
        <meta name="description" content={t('heroSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] pointer-events-none mix-blend-soft-light" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                  {t('heroTitle')}
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 max-w-prose">
                  {t('heroSubtitle')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/learn">
                    <Button size="lg" className="gap-2">
                      {t('getStarted')}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/quiz">
                    <Button size="lg" variant="outline">
                      {t('learnMore')}
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1534293230397-c067fc201ab8"
                    alt="People voting in democratic elections"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" style={{ letterSpacing: '-0.02em' }}>
                Everything you need to vote
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Access comprehensive resources to become an informed and empowered voter
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}