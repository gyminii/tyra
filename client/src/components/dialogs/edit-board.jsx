import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	Slide,
	Typography,
} from "@mui/material";
import React from "react";
const Transition = forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));
const EditBoardDialog = ({ open, onClose }) => {
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			fullWidth
			sx={{
				".MuiDialog-container": {
					alignItems: {
						xs: "flex-end",
						sm: "center",
					},
				},
			}}
		>
			<DialogTitle>
				<Box>
					<Typography variant="h3" fontWeight={600}>
						Edit Board
					</Typography>
				</Box>
			</DialogTitle>
			<DialogContent>
				<form></form>
			</DialogContent>
		</Dialog>
	);
};

export default EditBoardDialog;
