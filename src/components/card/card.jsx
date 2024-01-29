import React from "react";
import {
	Box,
	Divider,
	IconButton,
	Card as MuiCard,
	Stack,
	Typography,
} from "@mui/material";
import { Add, List } from "@mui/icons-material";
import Task from "./task";
const Card = ({ title, sx, children, ...props }) => {
	const handleDrop = (e) => {
		e.preventDefault();
	};
	return (
		<MuiCard
			component={Stack}
			sx={{
				minWidth: "300px",
				borderRadius: 2,
				...sx,
			}}
			{...props}
		>
			<Box px={3} display="inline-flex" alignItems="center">
				<Typography flex={1} variant="subtitle2">
					{title}
				</Typography>
				<IconButton disableRipple>
					<List fontSize="small" />
				</IconButton>
			</Box>
			<Divider />
			<Stack px={3} minHeight="300px" useFlexGap flexWrap="wrap" py={3} gap={1}>
				{children}
				<Task>1</Task>
				<Task>1</Task>
			</Stack>
		</MuiCard>
	);
};

export default Card;
