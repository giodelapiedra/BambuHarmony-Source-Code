import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Volume2, VolumeX } from 'lucide-react';
import { BRAND } from '../../utils/constants';
import { faqs } from '../../data/faqs';

const CARE_ESTIMATE_LABEL = 'Get Your Care Level & Cost Estimate';

function Launcher({ open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close support' : 'Open FAQ assistant'}
      aria-expanded={open}
      className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-lg shadow-gold/30 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#b8954f]"
    >
      {!open && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40" />
      )}
      <span className="relative">
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </span>
    </button>
  );
}

/* ── FAQ chat assistant ── */
function FaqView() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [topicsVisible, setTopicsVisible] = useState(true);
  const [speakingId, setSpeakingId] = useState(null);
  const [ttsMuted, setTtsMuted] = useState(false);
  const voiceRef = useRef(null);
  const bottomRef = useRef(null);

  const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Pick the most natural-sounding English voice the device has.
  useEffect(() => {
    if (!ttsSupported) return;
    const synth = window.speechSynthesis;

    // Score voices so we favour modern neural voices and avoid robotic ones.
    const scoreVoice = (v) => {
      if (!/^en/i.test(v.lang)) return -1; // English only
      const name = v.name.toLowerCase();
      let s = 0;
      if (/en[-_]us/i.test(v.lang)) s += 3;
      else if (/en[-_](gb|au)/i.test(v.lang)) s += 1;
      // Best: neural / cloud voices
      if (/natural|neural|online/.test(name)) s += 30;
      if (/google/.test(name)) s += 18;
      // Known good named neural voices (Edge / Apple)
      if (/(aria|jenny|guy|ryan|sonia|libby|natasha|clara|emma|michelle|ava|zoe)/.test(name)) s += 12;
      if (/(samantha|karen|daniel|moira|tessa|serena)/.test(name)) s += 10;
      // Network voices generally sound better than local ones
      if (v.localService === false) s += 6;
      // Penalise the old robotic desktop voices
      if (/(zira|david|mark|hazel|desktop|espeak|compact|e-speak|festival)/.test(name)) s -= 40;
      return s;
    };

    const loadVoice = () => {
      const voices = synth.getVoices();
      if (!voices.length) return;
      const best = voices
        .map((v) => ({ v, score: scoreVoice(v) }))
        .filter((x) => x.score >= 0)
        .sort((a, b) => b.score - a.score)[0];
      voiceRef.current = best ? best.v : voices[0];
    };
    loadVoice();
    synth.addEventListener?.('voiceschanged', loadVoice);
    return () => synth.removeEventListener?.('voiceschanged', loadVoice);
  }, [ttsSupported]);

  // Stop any speech when the FAQ view unmounts (widget closed).
  useEffect(() => {
    if (!ttsSupported) return undefined;
    return () => window.speechSynthesis.cancel();
  }, [ttsSupported]);

  const speak = (text, id) => {
    if (!ttsSupported) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    // Strip emoji / arrows / bullets and collapse whitespace for clean speech.
    const clean = text
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}←-⇿•]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!clean) return;
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate = 1;
    utter.pitch = 1.05;
    if (voiceRef.current) {
      utter.voice = voiceRef.current;
      utter.lang = voiceRef.current.lang;
    } else {
      utter.lang = 'en-US';
    }
    utter.onend = () => setSpeakingId((cur) => (cur === id ? null : cur));
    utter.onerror = () => setSpeakingId((cur) => (cur === id ? null : cur));
    setSpeakingId(id);
    synth.speak(utter);
  };

  const stopSpeaking = () => {
    if (ttsSupported) window.speechSynthesis.cancel();
    setSpeakingId(null);
  };

  const toggleSpeak = (text, id) => {
    if (speakingId === id) stopSpeaking();
    else speak(text, id);
  };

  const pushMessages = (userText, botText) => {
    setTopicsVisible(false);
    const botId = 'b' + Date.now();
    setMessages((prev) => [
      ...prev,
      { id: 'u' + Date.now(), from: 'visitor', text: userText },
      { id: botId, from: 'bot', text: botText },
    ]);
    // Automatically read the answer aloud unless the visitor muted it.
    if (!ttsMuted) speak(botText, botId);
  };

  const handleTopicClick = (faq) => pushMessages(faq.question, faq.answer);

  const handleCareEstimateClick = () => navigate('/contact?step=1');

  return (
    <div className="flex h-80 flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto bg-ivory p-4">
        {/* Read-aloud control */}
        {ttsSupported && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                setTtsMuted((m) => !m);
              }}
              aria-pressed={ttsMuted}
              className="flex items-center gap-1.5 rounded-full border border-bamboo/40 bg-white px-2.5 py-1 text-[11px] font-medium text-forest transition-colors hover:border-bamboo hover:bg-bamboo/10"
            >
              {ttsMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              {ttsMuted ? 'Read aloud: Off' : 'Read aloud: On'}
            </button>
          </div>
        )}

        {/* Welcome */}
        <div className="max-w-[85%]">
          <p className="mb-1 text-[11px] font-medium text-bamboo">Bea — Virtual Assistant</p>
          <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm text-charcoal shadow-sm">
            Hi! 🌿 Tap a topic below to get started.
          </div>
        </div>

        {/* FAQ topic chips */}
        {topicsVisible && (
          <div className="flex flex-wrap gap-2">
            {faqs.map((faq) => (
              <button
                key={faq.id}
                type="button"
                onClick={() => handleTopicClick(faq)}
                className="rounded-full border border-bamboo/40 bg-white px-3 py-1.5 text-left text-xs text-forest transition-colors hover:border-bamboo hover:bg-bamboo/10"
              >
                {faq.question.length > 40 ? faq.question.slice(0, 40) + '…' : faq.question}
              </button>
            ))}
            <button
              type="button"
              onClick={handleCareEstimateClick}
              className="rounded-full border border-gold bg-gold/10 px-3 py-1.5 text-left text-xs font-semibold text-[#8a6d33] transition-colors hover:bg-gold/20"
            >
              {CARE_ESTIMATE_LABEL}
            </button>
          </div>
        )}

        {/* Conversation */}
        {messages.map((msg) => {
          const isVisitor = msg.from === 'visitor';
          return (
            <div key={msg.id} className={`max-w-[85%] ${isVisitor ? 'ml-auto' : ''}`}>
              {!isVisitor && (
                <p className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-bamboo">
                  Bea — Virtual Assistant
                  {ttsSupported && (
                    <button
                      type="button"
                      onClick={() => toggleSpeak(msg.text, msg.id)}
                      aria-label={speakingId === msg.id ? 'Stop reading' : 'Read this answer aloud'}
                      className="text-bamboo/70 transition-colors hover:text-forest"
                    >
                      {speakingId === msg.id ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                  )}
                </p>
              )}
              <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                isVisitor
                  ? 'rounded-tr-sm bg-forest text-white'
                  : 'rounded-tl-sm bg-white text-charcoal'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-forest/10"
            role="dialog"
            aria-label="FAQ Assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-forest px-4 py-4 text-white">
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-base">FAQ Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-white/70">
                  <span className="inline-block h-2 w-2 rounded-full bg-bamboo" />
                  Online now
                </p>
              </div>
              <button type="button" onClick={close} aria-label="Close" className="shrink-0 text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <FaqView />

            {/* Footer */}
            <div className="border-t border-cream bg-ivory px-4 py-2.5 text-center text-[11px] text-charcoal/50">
              {BRAND.name} &middot; {BRAND.address}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Launcher open={open} onClick={() => (open ? close() : setOpen(true))} />
    </div>
  );
}
