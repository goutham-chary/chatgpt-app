import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`border-b ${
      isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } px-6 py-4`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3 lg:ml-0 ml-16">
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ChatGPT Clone
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            isDark
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};
