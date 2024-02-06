import {
	Box,
	Card,
	List,
	ListItemButton,
	ListItemText,
	Menu,
	Typography,
} from "@mui/material";
import clsx from "clsx";
import React, { forwardRef, useRef, useState } from "react";
import { ButtonIcon } from "../inputs/button-icon.jsx";
import { MoreHorizTwoTone } from "@mui/icons-material";
const Task = forwardRef(({ task, dragging, ...props }, ref) => {
	const { title, taskId, description, dateCreated } = task;
	const moreRef = useRef(null);
	const [onMenuOpen, menuOpen] = useState(false);
	const openMenu = () => menuOpen(true);
	const closeMenu = () => menuOpen(false);

	return (
		<>
			<Box key={taskId} ref={ref} {...props}>
				<Card
					sx={{
						p: 2,
					}}
					className={clsx({
						dragging: dragging,
					})}
					raised={dragging}
					variant={dragging ? "elevation" : "outlined"}
					elevation={dragging ? 14 : 0}
				>
					<Typography variant="h5" gutterBottom fontWeight={500} noWrap>
						{title}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary">
						{description}
					</Typography>
					<Typography gutterBottom variant="subtitle2">
						{dateCreated}
					</Typography>

					<Box
						pt={2}
						display="flex"
						alignItems="center"
						justifyContent="flex-end"
					>
						<ButtonIcon
							color="primary"
							size="small"
							onClick={openMenu}
							ref={moreRef}
						>
							<MoreHorizTwoTone />
						</ButtonIcon>
					</Box>
				</Card>
			</Box>

			<Menu
				disableScrollLock
				keepMounted
				anchorEl={moreRef.current}
				open={onMenuOpen}
				onClose={closeMenu}
				anchorOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
			>
				<List
					sx={{
						p: 0,
						"& .MuiListItemButton-root": {
							borderRadius: (theme) => theme.shape.borderRadius + "px",
						},
					}}
					component="nav"
				>
					<ListItemButton>
						<ListItemText primary="Delete" />
					</ListItemButton>
				</List>
			</Menu>
		</>
	);
});

export default Task;
