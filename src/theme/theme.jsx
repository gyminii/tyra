import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme } from "./index";
import { useColorMode } from "./settings";
export const ThemeProvider = ({ children }) => {
	const { color } = useColorMode();
	const theme = createTheme({
		colorPreset: "royalblue",
		direction: "ltr",
		paletteMode: color,
		// layout,
	});
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
};
