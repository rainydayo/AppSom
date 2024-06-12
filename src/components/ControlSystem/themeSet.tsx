import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: { som: '#FF6B18', somon: '#FDEAE3' },
  changeTheme: (newColors: any) => {},
});

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<{ som: string, somon: string }>({
    som: '#FF6B18', // Default color
    somon: '#FDEAE3', // Lighter color
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      const parsedTheme = JSON.parse(storedTheme);
      setTheme(parsedTheme);
      Object.keys(parsedTheme).forEach((key) => {
        document.documentElement.style.setProperty(`--color-${key}`, parsedTheme[key]);
      });
    }
  }, []);

  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.slice(1), 16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          G = (num >> 8 & 0x00FF) + amt,
          B = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (R<255?R<1?0:R:255) * 0x10000 + (G<255?G<1?0:G:255) * 0x100 + (B<255?B<1?0:B:255))
      .toString(16)
      .slice(1).toUpperCase()}`;
  };

  const changeTheme = (newColors: any) => {
    const lighterSomon = lightenColor(newColors.som, 80);
    const updatedColors = { ...newColors, somon: lighterSomon };

    setTheme(updatedColors);
    localStorage.setItem('theme', JSON.stringify(updatedColors));
    Object.keys(updatedColors).forEach(key => {
      document.documentElement.style.setProperty(`--color-${key}`, updatedColors[key]);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
