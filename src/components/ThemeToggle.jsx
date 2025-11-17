// ThemeToggle.jsx
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center rounded-2xl bg-border/40 px-1 py-1 w-16 h-9 transition-colors focus:outline-none focus-visible:ring-2 ring-primary/40"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="absolute left-2">
        <FaSun className={`text-base transition-all duration-300 ${isLight ? 'text-primary opacity-100' : 'text-primary/70 opacity-70'}`} />
      </span>
      <span className="absolute right-2">
        <FaMoon className={`text-base transition-all duration-300 ${isLight ? 'text-muted opacity-70' : 'text-primaryFg opacity-100'}`} />
      </span>
      {/* sliding thumb */}
      <span
        className={`absolute top-1 left-1 h-7 w-7 rounded-xl bg-background border border-border/60 shadow-soft transition-transform duration-300 ${isLight ? 'translate-x-0' : 'translate-x-7'}`}
      />
    </button>
  );
};

export default ThemeToggle;