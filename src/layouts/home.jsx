import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Main from "../components/main";
import Nav from "./nav";
import Header from "./header";
import { Outlet } from "react-router-dom";

const Home = ({ children }) => {
	const [openNav, setOpenNav] = useState(false);
	const handleNav = () => setOpenNav(!openNav);
	return (
		<>
			<Box
				sx={{
					minHeight: 1,
					display: "flex",
					flexDirection: { xs: "column", lg: "row" },
				}}
			>
				{/* NAV */}
				<Header handleNav={handleNav} open={openNav} />
				{/* MAIN GOES HERE */}
				<Nav handleNav={handleNav} open={openNav} />
				<Main>{children}</Main>
			</Box>
		</>
	);
};

export default Home;
