import { MessageSquarePlus, Menu, X, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Sidebar = ({ sessions, currentSessionId, onSelectSession, onNewChat, isOpen, onToggle }) => {
  const { isDark } = useTheme();

  return (
    <>
      <button
        onClick={onToggle}
        className={`fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden transition-colors ${
          isDark
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            : 'bg-white text-gray-800 hover:bg-gray-100'
        } shadow-lg`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed lg:relative inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-r flex flex-col`}
      >
        <div className="p-4 border-b border-current">
          <button
            onClick={onNewChat}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } shadow-md hover:shadow-lg`}
          >
            <MessageSquarePlus size={20} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  currentSessionId === session.id
                    ? isDark
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div className="font-medium truncate">{session.title}</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {new Date(session.createdAt).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={`p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
            isDark ? 'bg-gray-800' : 'bg-white shadow-sm'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDark ? 'bg-blue-600' : 'bg-blue-500'
            } text-white`}>
              <User size={18} />
            </div>
            <div>
              <div className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                Guest User
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                guest@example.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};
