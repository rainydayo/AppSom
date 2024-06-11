import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: { som: '#FF6B18' },
  changeTheme: (newColors: any) => {},
});

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<{ som: string }>({
    som: '#FF6B18', // Default color
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

  const changeTheme = (newColors: any) => {
    setTheme(newColors);
    localStorage.setItem('theme', JSON.stringify(newColors));
    Object.keys(newColors).forEach(key => {
      document.documentElement.style.setProperty(`--color-${key}`, newColors[key]);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
