import { useState } from 'react';
import pb from '@/lib/pocketbaseClient';

export function useChatbot(language = 'en') {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: language === 'en' 
        ? "Hello! I'm VoteWise AI. I can help you with voter registration, eligibility, voting process, and more. What would you like to know?"
        : "नमस्ते! मैं VoteWise AI हूं। मैं आपको मतदाता पंजीकरण, पात्रता, मतदान प्रक्रिया और अधिक में मदद कर सकता हूं। आप क्या जानना चाहेंगे?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    // Registration questions
    if (msg.includes('register') || msg.includes('registration') || msg.includes('पंजीकरण')) {
      return language === 'en'
        ? "To register as a voter, you need to fill Form 6 online at the National Voter Service Portal (nvsp.in) or submit it at your local election office. You must be 18 years or older on the qualifying date and have proof of residence."
        : "मतदाता के रूप में पंजीकरण करने के लिए, आपको राष्ट्रीय मतदाता सेवा पोर्टल (nvsp.in) पर फॉर्म 6 ऑनलाइन भरना होगा या इसे अपने स्थानीय चुनाव कार्यालय में जमा करना होगा। योग्यता तिथि पर आपकी आयु 18 वर्ष या उससे अधिक होनी चाहिए और निवास का प्रमाण होना चाहिए।";
    }

    // Document questions
    if (msg.includes('document') || msg.includes('id') || msg.includes('दस्तावेज')) {
      return language === 'en'
        ? "You need to carry your Voter ID card (EPIC) to the polling booth. If you don't have it, you can use other photo IDs like Aadhaar card, PAN card, passport, driving license, or bank passbook with photo."
        : "आपको मतदान केंद्र पर अपना मतदाता पहचान पत्र (EPIC) ले जाना होगा। यदि आपके पास यह नहीं है, तो आप अन्य फोटो ID जैसे आधार कार्ड, पैन कार्ड, पासपोर्ट, ड्राइविंग लाइसेंस, या फोटो के साथ बैंक पासबुक का उपयोग कर सकते हैं।";
    }

    // Eligibility questions
    if (msg.includes('eligible') || msg.includes('eligibility') || msg.includes('पात्र')) {
      return language === 'en'
        ? "To be eligible to vote, you must be: 1) An Indian citizen, 2) At least 18 years old on the qualifying date, 3) A resident of the constituency where you want to register. You should not be disqualified under any law."
        : "वोट देने के लिए पात्र होने के लिए, आपको होना चाहिए: 1) भारतीय नागरिक, 2) योग्यता तिथि पर कम से कम 18 वर्ष की आयु, 3) उस निर्वाचन क्षेत्र का निवासी जहां आप पंजीकरण करना चाहते हैं। आपको किसी भी कानून के तहत अयोग्य नहीं होना चाहिए।";
    }

    // Voting process questions
    if (msg.includes('vote') || msg.includes('voting') || msg.includes('evm') || msg.includes('मतदान')) {
      return language === 'en'
        ? "On voting day: 1) Go to your assigned polling booth, 2) Show your ID to the polling officer, 3) Get your finger marked with indelible ink, 4) Press the button next to your chosen candidate on the EVM, 5) The machine will beep to confirm your vote."
        : "मतदान के दिन: 1) अपने निर्धारित मतदान केंद्र पर जाएं, 2) मतदान अधिकारी को अपनी ID दिखाएं, 3) अपनी उंगली पर अमिट स्याही से निशान लगवाएं, 4) EVM पर अपने चुने हुए उम्मीदवार के बगल में बटन दबाएं, 5) मशीन आपके वोट की पुष्टि के लिए बीप करेगी।";
    }

    // Polling booth questions
    if (msg.includes('booth') || msg.includes('location') || msg.includes('where') || msg.includes('केंद्र')) {
      return language === 'en'
        ? "You can find your polling booth location on your Voter ID card or by visiting the National Voter Service Portal (nvsp.in). You can also use the Voter Helpline app to locate your polling station."
        : "आप अपने मतदाता पहचान पत्र पर या राष्ट्रीय मतदाता सेवा पोर्टल (nvsp.in) पर जाकर अपने मतदान केंद्र का स्थान पा सकते हैं। आप अपने मतदान केंद्र का पता लगाने के लिए मतदाता हेल्पलाइन ऐप का भी उपयोग कर सकते हैं।";
    }

    // Election date questions
    if (msg.includes('when') || msg.includes('date') || msg.includes('election') || msg.includes('चुनाव')) {
      return language === 'en'
        ? "General elections in India are held every 5 years. For specific election dates, please check the Election Commission of India website (eci.gov.in) or local news sources for the latest announcements."
        : "भारत में आम चुनाव हर 5 साल में होते हैं। विशिष्ट चुनाव तिथियों के लिए, कृपया भारत निर्वाचन आयोग की वेबसाइट (eci.gov.in) या नवीनतम घोषणाओं के लिए स्थानीय समाचार स्रोतों की जांच करें।";
    }

    // Default response
    return language === 'en'
      ? "I can help you with information about voter registration, eligibility criteria, required documents, voting process, and polling locations. What specific question do you have?"
      : "मैं आपको मतदाता पंजीकरण, पात्रता मानदंड, आवश्यक दस्तावेज, मतदान प्रक्रिया और मतदान स्थानों के बारे में जानकारी में मदद कर सकता हूं। आपका विशिष्ट प्रश्न क्या है?";
  }

  async function sendMessage(userMessage) {
    if (!userMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);

    // Get bot response
    const botResponseText = getBotResponse(userMessage);
    
    const botMsg = {
      id: Date.now() + 1,
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date()
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMsg]);
    }, 500);

    // Save to PocketBase (public create, no auth required)
    try {
      await pb.collection('chat_logs').create({
        userMessage: userMessage,
        botResponse: botResponseText,
        userId: pb.authStore.model?.id || 'anonymous'
      }, { $autoCancel: false });
    } catch (err) {
      console.error('Error saving chat log:', err);
    }
  }

  return {
    messages,
    sendMessage
  };
}