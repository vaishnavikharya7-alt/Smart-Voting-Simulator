import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationDropdown from '@/components/LocationDropdown';
import { getStates, getDistricts } from '@/utils/LocationData';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LocationsPage() {
  const { t } = useLanguage();
  const [country] = useState('India');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');

  const states = getStates();
  const districts = state ? getDistricts(state) : [];

  function handleStateChange(value) {
    setState(value);
    setDistrict('');
  }

  return (
    <>
      <Helmet>
        <title>{`${t('locations')} - VoteWise AI`}</title>
        <meta name="description" content={t('locationsPageSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                {t('locationsPageTitle')}
              </h1>
              <p className="text-lg text-foreground/80">
                {t('locationsPageSubtitle')}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl p-8 shadow-lg border border-border"
            >
              <div className="space-y-6">
                <LocationDropdown
                  label={t('selectCountry')}
                  placeholder={t('selectCountry')}
                  options={['India']}
                  value={country}
                  onChange={() => {}}
                  disabled={true}
                />

                <LocationDropdown
                  label={t('selectState')}
                  placeholder={t('selectState')}
                  options={states}
                  value={state}
                  onChange={handleStateChange}
                />

                <LocationDropdown
                  label={t('selectDistrict')}
                  placeholder={t('selectDistrict')}
                  options={districts}
                  value={district}
                  onChange={setDistrict}
                  disabled={!state}
                />
              </div>

              {state && district && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {t('selectedLocation')}
                      </h3>
                      <p className="text-foreground/80 mb-4">
                        {district}, {state}, {country}
                      </p>
                      
                      <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-2 text-foreground">
                            {t('votingInfo')}
                          </h4>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {t('votingInfoDesc')}
                          </p>
                        </div>
                      </div>
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