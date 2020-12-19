import React from "react";
import "./App.css";
//import Vector1 from './image/Vector1.png'
import SearchField from "./components/SearchField";
import { useThemeContext } from "./context";


function App() {
  const { isDark, styles } = useThemeContext();

  document.body.style.backgroundColor = `${isDark ? "#212E3E" : "azure"} `;
  return (
      <div
        className="app"
        style={{
          backgroundColor: isDark ? styles.body : "#FFFDFB",
        }}
      >
        <SearchField />
      </div>
  );
}

export default App;
