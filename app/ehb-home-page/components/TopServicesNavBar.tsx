import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Brain,
  Megaphone,
  GraduationCap,
  Briefcase,
  BookOpen,
  Settings,
  Puzzle,
  Users,
  Bot,
  Scale,
  MonitorSmartphone,
  Mic,
  Search as SearchIcon,
  Moon,
} from 'lucide-react';

interface Service {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const services: Service[] = [
  { name: 'GoSellr', icon: <ShoppingCart size={18} />, path: '/gosellr' },
  { name: 'AI Marketplace', icon: <Brain size={18} />, path: '/ehb-ai-marketplace' },
  { name: 'EHB Ads', icon: <Megaphone size={18} />, path: '/ehb-ads' },
  { name: 'HPS', icon: <GraduationCap size={18} />, path: '/hps' },
  { name: 'JPS', icon: <Briefcase size={18} />, path: '/jps' },
  { name: 'OBS', icon: <BookOpen size={18} />, path: '/obs' },
  { name: 'SOT', icon: <Settings size={18} />, path: '/sot' },
  { name: 'Franchise', icon: <Puzzle size={18} />, path: '/franchise' },
  { name: 'Affiliate', icon: <Users size={18} />, path: '/affiliate' },
  { name: 'AI Agent', icon: <Bot size={18} />, path: '/ai-agent' },
  { name: 'OLS', icon: <Scale size={18} />, path: '/ols' },
  { name: 'EHB Tube', icon: <MonitorSmartphone size={18} />, path: '/ehb-tube' },
];

const TopServicesNavBar: React.FC = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<{ label: string; path: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Voice Navigation
  const startVoiceCommand = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Voice recognition not supported in this browser.');
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      const found = services.find(service => command.includes(service.name.toLowerCase()));
      if (found) router.push(found.path);
    };
  };

  // AI Search (debounced)
  useEffect(() => {
    if (search.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        setSuggestions([]);
      }
    };
    const delayDebounce = setTimeout(() => fetchSuggestions(), 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Dark mode toggle (demo: local state only)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`sticky top-0 z-50 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      } shadow-md transition-colors`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent py-1">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => router.push(service.path)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#2452FF]/40"
              tabIndex={0}
              aria-label={service.name}
            >
              {service.icon}
              <span>{service.name}</span>
            </button>
          ))}
        </div>
        {/* Search & Controls */}
        <div className="flex items-center gap-2 ml-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="AI search..."
              className="px-3 py-1 rounded-md border dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2452FF]/40 min-w-[160px]"
              aria-label="AI search box"
            />
            <SearchIcon className="absolute right-2 top-1.5 text-gray-400" size={16} />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute bg-white dark:bg-gray-800 shadow-md mt-1 rounded w-full z-50">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer text-sm"
                    onMouseDown={() => {
                      router.push(s.path);
                      setShowSuggestions(false);
                      setSearch('');
                    }}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={startVoiceCommand} className="hover:scale-110" aria-label="Voice search">
            <Mic size={18} />
          </button>
          <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
            <Moon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopServicesNavBar;
