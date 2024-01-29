import {
	AppBar,
	Box,
	IconButton,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";

import { useTheme } from "@mui/material/styles";
import { HEADER, NAV } from "./config-layout";
import { bgBlur } from "./style";

import { useResponsive } from "../hooks/use-responsive";
import {
	DarkMode,
	List,
	NotificationsActive,
	Person,
	Search,
} from "@mui/icons-material";
const Header = ({ open, handleNav }) => {
	const theme = useTheme();
	const lgUp = useResponsive("up", "lg");
	const renderContent = (
		<>
			{!lgUp && (
				<IconButton onClick={handleNav} sx={{ mr: 1 }}>
					<List />
				</IconButton>
			)}
			<Box>
				<IconButton>
					<Search />
				</IconButton>
			</Box>
			<Box sx={{ flexGrow: 1 }} />
			<Stack direction="row" alignItems="center" spacing={1}>
				<IconButton>
					<NotificationsActive />
				</IconButton>
				<IconButton>
					<Person />
				</IconButton>
				<IconButton>
					<DarkMode />
				</IconButton>
			</Stack>
		</>
	);
	return (
		<AppBar
			sx={{
				boxShadow: "none",
				height: HEADER.H_MOBILE,
				zIndex: theme.zIndex.appBar + 1,
				...bgBlur({
					color: theme.palette.background.default,
				}),
				transition: theme.transitions.create(["height"], {
					duration: theme.transitions.duration.shorter,
				}),
				...(lgUp && {
					width: `calc(100% - ${NAV.WIDTH + 1}px)`,
					height: HEADER.H_DESKTOP,
				}),
			}}
		>
			<Toolbar
				sx={{
					height: 1,
					px: { lg: 5 },
				}}
			>
				{renderContent}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
