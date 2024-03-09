import {
	AppBar,
	Box,
	IconButton,
	Stack,
	SwipeableDrawer,
	Typography,
	alpha,
	styled,
	useMediaQuery,
} from "@mui/material";
import React from "react";
import { neutral } from "../theme/colors.js";

import { lighten, useTheme } from "@mui/material/styles";

import {
	Brightness3,
	Brightness7,
	DarkMode,
	List,
	MenuRounded,
	NotificationsActive,
	Person,
} from "@mui/icons-material";
import Searchbar from "../common/searchbar.jsx";
import { DividerLight } from "../components/base/styles/card.jsx";
import { Menu } from "../components/base/styles/menu.jsx";
import { useColorMode } from "../theme/settings.jsx";
import { HEADER_HEIGHT } from "../theme/utils.js";
const HeaderWrapper = styled(AppBar)(({ theme }) => ({
	height: HEADER_HEIGHT,
	background: lighten(theme.palette.neutral[900], 0.04),
	color: theme.palette.neutral[400],
	backdropFilter: "blur(8px)",
	right: 0,
	left: "auto",
	display: "flex",
}));
const SidebarWrapper = styled(Box)({
	height: "100vh",
	color: neutral[200],
	display: "flex",
	flexDirection: "column",
});

const Header = ({ open, handleNav }) => {
	const theme = useTheme();
	const { color, toggleColor } = useColorMode();
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
	const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

	const menuItems = [];
	const renderContent = (
		<>
			{!lgUp && (
				<IconButton onClick={handleNav} sx={{ mr: 1 }}>
					<List />
				</IconButton>
			)}
			<Searchbar />
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
		<>
			<HeaderWrapper
				role="banner"
				elevation={12}
				sx={{
					height: HEADER_HEIGHT * 1.3,
					width: "100%",
				}}
			>
				<Stack
					px={2}
					flex={1}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Stack direction="row" alignItems="center" spacing={2}>
						{/* <Logo
						dark
						isLinkStatic
					/> */}
						<Typography variant="h4">TYRA</Typography>
						{lgUp && <Menu menuItems={menuItems} />}
					</Stack>
					<Stack
						direction="row"
						divider={
							<DividerLight
								sx={{
									height: 24,
									alignSelf: "center",
								}}
								orientation="vertical"
								flexItem
							/>
						}
						alignItems="center"
						spacing={{
							xs: 1,
							sm: 2,
						}}
					>
						<Stack
							display="flex"
							spacing={1}
							direction="row"
							alignItems="center"
						>
							{smUp && (
								<>
									<IconButton
										sx={{
											"&:hover": {
												background: alpha(theme.palette.common.white, 0.08),
												color: theme.palette.common.white,
											},
										}}
										color="inherit"
										onClick={toggleColor}
									>
										{theme.palette.mode === "dark" ? (
											<Brightness7 />
										) : (
											<Brightness3 />
										)}
									</IconButton>
								</>
							)}
							{/* <CustomizationButton
								sx={{
									"&:hover": {
										background: alpha(theme.palette.common.white, 0.08),
										color: theme.palette.common.white,
									},
								}}
							/> */}
						</Stack>
						{!lgUp && (
							<IconButton
								// onClick={onOpen}
								color="inherit"
								sx={{
									"&:hover": {
										background: alpha(theme.palette.common.white, 0.08),
										color: theme.palette.common.white,
									},
								}}
							>
								<MenuRounded />
							</IconButton>
						)}
					</Stack>
				</Stack>
			</HeaderWrapper>
			{!lgUp && (
				<SwipeableDrawer
					anchor="left"
					// onClose={onClose}
					// onOpen={onOpen}
					// open={open}
					ModalProps={{
						keepMounted: true,
					}}
					PaperProps={{
						sx: {
							backgroundColor: "neutral.900",
							overflow: "hidden",
							boxShadow: (theme) => theme.shadows[24],
						},
					}}
					variant="temporary"
					// {...other}
				>
					{/* {sidebarContentMobile} */}
					contents
				</SwipeableDrawer>
			)}
		</>
	);
};

export default Header;
