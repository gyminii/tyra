import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	OutlinedInput,
	Slide,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { CREATE_BOARD_VALIDATION } from "../../validation/board-validation";
import { ErrorMessage } from "@hookform/error-message";
import {
	CREATE_BOARD,
	GET_BOARDS,
} from "../../../server/graphql/board-queries";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
const Transition = forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));
const CreateBoardDialog = (props) => {
	const { onClose } = props;
	const theme = useTheme();
	const [createBoard, { loading, error, data: board }] =
		useMutation(CREATE_BOARD);
	const { refetch } = useQuery(GET_BOARDS);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		shouldFocusError: true,
		resolver: zodResolver(CREATE_BOARD_VALIDATION),
		defaultValues: {
			title: "",
			description: "",
		},
	});
	const onSubmit = async (body) => {
		try {
			const response = await createBoard({
				variables: {
					board: {
						...body,
						boardId: uuidv4(),
					},
				},
			});
			onClose();
			refetch();
			return response;
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => () => reset(), []);
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
						Create Board
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
									htmlFor="board-title-input"
									fontWeight={500}
								>
									Title
								</Typography>
								<Grid container>
									<Grid xs={12}>
										<Controller
											control={control}
											name="title"
											rules={{ required: true }}
											render={({ field }) => (
												<OutlinedInput
													id="board-titleb-input"
													fullWidth
													{...field}
												/>
											)}
										/>
									</Grid>
									<Grid xs={12}>
										<ErrorMessage
											errors={errors}
											name="title"
											render={({ message }) => (
												<Typography
													mt={0.5}
													variant="subtitle2"
													color="error.main"
												>
													{message}
												</Typography>
											)}
										/>
									</Grid>
								</Grid>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<Typography
									variant="h6"
									gutterBottom
									component="label"
									htmlFor="company-name-input"
									fontWeight={500}
								>
									Description
									<Typography variant="subtitle2" color="text.secondary">
										Write a short description about the section
									</Typography>
								</Typography>

								<Grid container spacing={{ xs: 2, md: 3 }}>
									<Grid item xs={12}>
										<Controller
											control={control}
											name="description"
											render={({ field }) => (
												<OutlinedInput
													{...field}
													fullWidth
													multiline
													maxRows={6}
													minRows={2}
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
						<Button
							variant="outlined"
							color="secondary"
							autoFocus
							fullWidth
							// onClick={handleClose}
						>
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

export default CreateBoardDialog;
