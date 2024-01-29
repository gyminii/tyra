import { CssBaseline } from "@mui/material";
import {
	ThemeProvider as MuiThemeProvider,
	createTheme,
} from "@mui/material/styles";
import { useMemo } from "react";
import { palette } from "./palette";
import { typography } from "./typography";
import { overrides } from "./components";
import { customShadows } from "./shadow";
export const ThemeProvider = ({ children }) => {
	const memoizedTheme = useMemo(() => ({
		palette: palette(),
		typography,
		shape: { borderRadius: 8 },
		customShadows: customShadows(),
	}));
	const theme = createTheme(memoizedTheme);
	theme.components = overrides(theme);
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			{children}
		</MuiThemeProvider>
	);
};
