import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatMessage from '@/components/ChatMessage';
import { useChatbot } from '@/hooks/useChatbot';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ChatbotPage() {
  const { t, language } = useLanguage();
  const { messages, sendMessage } = useChatbot(language);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    sendMessage(inputValue);
    setInputValue('');
  }

  return (
    <>
      <Helmet>
        <title>{`${t('chatbot')} - VoteWise AI`}</title>
        <meta name="description" content={t('chatbotPageSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <section className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                {t('chatbotPageTitle')}
              </h1>
              <p className="text-lg text-foreground/80">
                {t('chatbotPageSubtitle')}
              </p>
            </div>

            <div className="flex-1 bg-card rounded-2xl shadow-lg border border-border flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-muted/30">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={t('typePlaceholder')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 text-foreground"
                  />
                  <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}