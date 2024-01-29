import { useTheme } from "@emotion/react";
import { List } from "@mui/icons-material";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import EditableTypography from "../inputs/editable-text";

const Task = ({ children }) => {
	return (
		<Paper
			variant="outlined"
			square={false}
			sx={{
				background: (theme) => theme.palette.background.default,
				px: 1,
				py: 1,
			}}
		>
			<Box display="flex" flexDirection="column">
				<Box display="inline-flex" width="100%" alignItems="center">
					<Box flex={1}>
						<EditableTypography initialText="Todo2" variant="subtitle3" />
						{/* <Typography variant="subtitle3">Todo 1</Typography> */}
					</Box>
					<Box>
						<IconButton>
							<List fontSize="small" />
						</IconButton>
					</Box>
				</Box>
				<Box alignSelf="flex-end" pr="8px">
					<Avatar sx={{ width: 24, height: 24 }} variant="rounded" />
				</Box>
			</Box>
		</Paper>
	);
};

export default Task;
