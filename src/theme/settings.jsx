import { useMediaQuery } from "@mui/material";
import { createContext, useContext, useState } from "react";
const SettingsContext = createContext();

export const useColorMode = () =>{
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useColorMode must be used within SettingsProvider.")
  return context
}

export const SettingsProvider = ({ children }) => {
	const systemSettings = useMediaQuery("(prefers-color-scheme: dark)");
	const [color, setColor] = useState(systemSettings ? "dark" : "light");
	const toggleColor = () =>
		setColor(color === "light" ? "dark" : "light");
    const values = {
      color, toggleColor
    }
  return <SettingsContext.Provider value={values}>{children}</SettingsContext.Provider>
};
