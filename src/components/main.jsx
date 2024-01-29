import { Box } from "@mui/material";
import { HEADER, NAV } from "../layouts/config-layout";
import { useResponsive } from "../hooks/use-responsive";
const SPACING = 8;
const Main = ({ children, sx, ...other }) => {
	const lgUp = useResponsive("up", "lg");
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				minHeight: 1,
				display: "flex",
				flexDirection: "column",
				py: `${HEADER.H_MOBILE + SPACING}px`,
				...(lgUp && {
					px: 2,
					py: `${HEADER.H_DESKTOP + SPACING}px`,
					width: `calc(100% - ${NAV.WIDTH}px)`,
				}),
				...sx,
			}}
			{...other}
		>
			{children}
		</Box>
	);
};

export default Main;
