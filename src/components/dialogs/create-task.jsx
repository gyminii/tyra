import { useQuery } from "@apollo/client";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	OutlinedInput,
	Slide,
	Stack,
	Typography,
} from "@mui/material";
import React, { forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { GET_BOARD } from "../../../server/graphql/board-queries";
const Transition = forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));
const CreateTaskDialog = (props) => {
	const { onClose, boardId } = props;
	// const { loading, error, data } = useQuery(GET_BOARD, {
	// 	variables: {
	// 		boardId: boardId,
	// 	},
	// });

	const { control, handleSubmit } = useForm({
		mode: "onChange",
		defaultValues: {
			title: "",
			boardId: boardId,
			description: "",
		},
	});

	const onSubmit = async (body) => {
		console.log(body);
	};
	console.count();
	return (
		<Dialog
			{...props}
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
						Create Task
					</Typography>
				</Box>
			</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						spacing={{
							xs: 2,
							md: 3,
						}}
					>
						<Grid xs={12} item>
							<FormControl fullWidth variant="outlined" required>
								<Typography
									variant="h6"
									gutterBottom
									component="label"
									htmlFor="task-title-input"
								>
									Title
								</Typography>
								<Grid container>
									<Grid xs={12}>
										<Controller
											control={control}
											name="title"
											render={({ field }) => (
												<OutlinedInput
													{...field}
													id="task-title-input"
													fullWidth
												/>
											)}
										/>
									</Grid>
								</Grid>
							</FormControl>
						</Grid>
					</Grid>
					<Stack
						mt={3}
						direction={{
							xs: "column",
							sm: "row",
						}}
						spacing={1}
					>
						<Button variant="outlined" color="secondary" autoFocus fullWidth>
							Cancel
						</Button>
						<Button type="submit" variant="contained" autoFocus fullWidth>
							Create
						</Button>
					</Stack>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateTaskDialog;
