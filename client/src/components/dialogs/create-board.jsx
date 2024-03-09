import { useMutation } from "@apollo/client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
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
	useTheme,
} from "@mui/material";
import React, { forwardRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { CREATE_BOARD_VALIDATION } from "../../validation/board-validation";
import { CREATE_BOARD, GET_ALL_BOARDS } from "../../graphql/board";
import { useDispatch } from "../../redux/store";
import { addBoard, editBoard } from "../../redux/slice/board";
const Transition = forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));
const CreateBoardDialog = (props) => {
	const { onClose } = props;
	const theme = useTheme();
	const dispatch = useDispatch();
	const [createBoard, { loading, error, data: board }] =
		useMutation(CREATE_BOARD);
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
		// const {title, description} = body
		const optimisticBoardId = Date.now().toString();
		const optimisticBoard = {
			_id: optimisticBoardId,
			...body,
		};
		dispatch(addBoard(optimisticBoard));
		try {
			const response = await createBoard({
				variables: {
					...body,
				},
			});
			toast.success("Board created successfully.");
			dispatch(
				editBoard({
					_id: optimisticBoardId,
					updates: response.data.createBoard,
				})
			);
			onClose();
			return response;
		} catch (error) {
			console.log(error);
			toast.error("Failed to create board.", error);
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
									<Grid xs={12} item>
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
									<Grid xs={12} item>
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
