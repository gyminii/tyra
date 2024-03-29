import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme } from "./index";
import { useColorMode } from "./settings";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Toaster } from "react-hot-toast";
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
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<CssBaseline />
				<Toaster position="top-right" reverseOrder={false} />
				{children}
			</LocalizationProvider>
		</MuiThemeProvider>
	);
};
