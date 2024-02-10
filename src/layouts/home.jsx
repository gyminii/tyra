import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Main from "../components/main";
import Nav from "./nav";
import Header from "./header";
import { Outlet } from "react-router-dom";
import { HEADER_HEIGHT } from "../theme/utils";

const Home = ({ children }) => {
	const [openNav, setOpenNav] = useState(false);
	const handleNav = () => setOpenNav(!openNav);

	return (
		<>
			<Header handleNav={handleNav} open={openNav} />
			<Box
				flex={1}
				overflow="hidden"
				sx={{
					pt: `${HEADER_HEIGHT * 1.3}px`,
					minHeight: `calc(100vh - ${HEADER_HEIGHT * 1.3}px)`,
					backgroundColor: "background.paper",
				}}
			>
				{children}
			</Box>
		</>
	);
};

export default Home;
