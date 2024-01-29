import {
	Avatar,
	Box,
	Drawer,
	ListItemButton,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePathname } from "../hooks/use-pathname";
import { useResponsive } from "../hooks/use-responsive";
import { NAV } from "./config-layout";
import RouterLink from "../components/router-link";
import Scrollbar from "../components/scrollbar/scrollbar";
import { useEffect } from "react";
import { navConfig } from "./config-nav";

const NavItem = ({ path, title, icon }) => {
	const pathname = usePathname();
	const active = path === pathname;
	return (
		<ListItemButton
			component={RouterLink}
			href={path}
			sx={{
				minHeight: 44,
				borderRadius: 0.75,
				typography: "body2",
				color: "text.secondary",
				textTransform: "capitalize",
				fontWeight: "fontWeightMedium",
				...(active && {
					color: "primary.main",
					fontWeight: "fontWeightSemiBold",
					bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
					"&:hover": {
						bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
					},
				}),
			}}
		>
			<Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
				{icon}
			</Box>
			<Box component="span">{title}</Box>
		</ListItemButton>
	);
};
const Nav = ({ open, handleNav }) => {
	const pathname = usePathname();
	const upLg = useResponsive("up", "lg");
	useEffect(() => {
		if (open) handleNav();
	}, [pathname]);

	const renderMenu = (
		<Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
			{navConfig.map(({ title, path, icon }, index) => (
				<NavItem path={path} title={title} key={index} icon={icon} />
			))}
		</Stack>
	);
	const renderName = (
		<Box
			sx={{
				my: 3,
				mx: 2.5,
				py: 2,
				px: 2.5,
				display: "flex",
				borderRadius: 1.5,
				alignItems: "center",
				justifyContent: "center",
				bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
			}}
		>
			<Box>
				<Typography variant="subtitle1">Tyra</Typography>
			</Box>
		</Box>
	);
	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				// border: "1px solid black",
				"& .simplebar-content": {
					height: 1,
					display: "flex",
					flexDirection: "column",
				},
			}}
		>
			<Box sx={{ mt: 3, ml: 4 }} />
			{renderName}
			{renderMenu}
			<Box sx={{ flexGrow: 1 }} />
		</Scrollbar>
	);
	return (
		<Box
			sx={{
				flexShrink: { lg: 0 },
				width: { lg: NAV.WIDTH },
			}}
		>
			{upLg ? (
				<Box
					sx={{
						height: 1,
						position: "fixed",
						width: NAV.WIDTH,
						borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
					}}
				>
					{renderContent}
				</Box>
			) : (
				<Drawer
					open={open}
					onClose={handleNav}
					PaperProps={{
						sx: {
							width: NAV.WIDTH,
						},
					}}
				>
					<Toolbar>{renderContent}</Toolbar>
				</Drawer>
			)}
		</Box>
	);
};

export default Nav;
