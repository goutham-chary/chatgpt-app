import { ThumbsUp, ThumbsDown, User, Bot } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { TableView } from './TableView';

export const Message = ({ message }) => {
  const { isDark } = useTheme();
  const [feedback, setFeedback] = useState(null);
  const isUser = message.role === 'user';

  const handleFeedback = (type) => {
    setFeedback(feedback === type ? null : type);
  };

  return (
    <div className={`flex gap-4 p-6 ${!isUser && (isDark ? 'bg-gray-800/50' : 'bg-gray-50')}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
        isUser
          ? isDark ? 'bg-blue-600' : 'bg-blue-500'
          : isDark ? 'bg-green-600' : 'bg-green-500'
      } text-white`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      <div className="flex-1 space-y-3">
        <div className={`${isDark ? 'text-gray-200' : 'text-gray-900'} leading-relaxed`}>
          {message.text}
        </div>

        {message.table && (
          <div className="mt-4">
            <TableView table={message.table} />
          </div>
        )}

        {!isUser && (
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => handleFeedback('like')}
              className={`p-2 rounded-lg transition-all ${
                feedback === 'like'
                  ? isDark
                    ? 'bg-green-600 text-white'
                    : 'bg-green-500 text-white'
                  : isDark
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-green-400'
                  : 'text-gray-500 hover:bg-gray-200 hover:text-green-600'
              }`}
              title="Like"
            >
              <ThumbsUp size={16} />
            </button>
            <button
              onClick={() => handleFeedback('dislike')}
              className={`p-2 rounded-lg transition-all ${
                feedback === 'dislike'
                  ? isDark
                    ? 'bg-red-600 text-white'
                    : 'bg-red-500 text-white'
                  : isDark
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-red-400'
                  : 'text-gray-500 hover:bg-gray-200 hover:text-red-600'
              }`}
              title="Dislike"
            >
              <ThumbsDown size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
