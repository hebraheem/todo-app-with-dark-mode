import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const styles = {
    backgroundColor: "#303D50",
    inputBg: "#303D50",
    textColor: "#FFFDFB",
    body: "#212E3E",
  };

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, styles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
