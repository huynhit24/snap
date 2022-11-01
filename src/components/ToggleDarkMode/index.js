import { useEffect, useState } from "react";
export const DarkModeToggle = () => {
    localStorage.setItem("theme", "black");
    const [isDark, setIsDark] = useState(true);
    useEffect(() => {
      document
      .getElementById("chat-darkmode")
      .setAttribute("background-color", localStorage.getItem("theme").toString());
    },[]);
    
    const toggleThemeChange = () => {
        if (!isDark) {
          localStorage.setItem("theme", "black");
          document
            .getElementById("chat-darkmode")
            .setAttribute("background-color", "black");
            setIsDark(true);
        } else {
          localStorage.setItem("theme", "white");
          document
            .getElementById("chat-darkmode")
            .setAttribute("background-color", "white");
            setIsDark(false);
        }
    }

    return (
        <input
          type="checkbox"
          defaultChecked={isDark}
          onChange={() => toggleThemeChange()}
        />
    )
}