import { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Message } from './Message';
import { api } from '../api';

export const ChatInterface = ({ sessionId, onSessionUpdate }) => {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (sessionId) {
      loadHistory();
    } else {
      setMessages([]);
    }
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadHistory = async () => {
    try {
      const history = await api.getSessionHistory(sessionId);
      setMessages(history);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    try {
      let currentSessionId = sessionId;

      if (!currentSessionId) {
        const newSession = await api.createSession(`Chat ${new Date().toLocaleString()}`);
        currentSessionId = newSession.id;
        onSessionUpdate(currentSessionId);
      }

      const response = await api.sendMessage(currentSessionId, userMessage);
      await loadHistory();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {messages.length === 0 && !sessionId ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-2xl">
            <h1 className={`text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              What can I help with?
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Ask me anything and I'll provide structured data and insights
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg, idx) => (
            <Message key={idx} message={msg} />
          ))}
          {loading && (
            <div className={`flex gap-4 p-6 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-green-600' : 'bg-green-500'
              } text-white`}>
                <Loader2 size={18} className="animate-spin" />
              </div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className={`border-t p-4 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className={`flex gap-3 p-3 rounded-2xl ${
            isDark ? 'bg-gray-800' : 'bg-gray-100'
          } shadow-lg`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message ChatGPT..."
              disabled={loading}
              className={`flex-1 bg-transparent outline-none px-3 ${
                isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              } disabled:opacity-50`}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={`p-2 rounded-xl transition-all ${
                input.trim() && !loading
                  ? isDark
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-gray-300 text-gray-400'
              } disabled:cursor-not-allowed`}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
