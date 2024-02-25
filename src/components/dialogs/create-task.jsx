import { useMutation, useQuery } from "@apollo/client";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	MenuItem,
	OutlinedInput,
	Select,
	Slide,
	Stack,
	Typography,
} from "@mui/material";
import React, { forwardRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	GET_ALL_BOARDS,
	GET_BOARD,
} from "../../../server/graphql/board-queries";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_TASK_VALIDATION } from "../../validation/task-validation";
import { CREATE_TASK } from "../../../server/graphql/tasks-queries";
import { v4 as uuidv4 } from "uuid";
const Transition = forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));

const CreateTaskDialog = (props) => {
	const { onClose, boardId } = props;

	const [createTask, { loading, error, data: task }] = useMutation(CREATE_TASK);
	const {
		data: { getAllBoards: boards },
	} = useQuery(GET_ALL_BOARDS);
	console.log(boards);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		shouldFocusError: true,
		resolver: zodResolver(CREATE_TASK_VALIDATION),
		defaultValues: {
			title: "",
			description: "",
			dueDate: null,
			boardId: null,
		},
	});
	const onSubmit = async (body) => {
		try {
			const response = await createTask({
				variables: {
					title: body.title,
					description: body.description,
					boardId: boardId,
				},
				refetchQueries: [{ query: GET_ALL_BOARDS }],
			});
			toast.success("Project board updated successfully!");
			onClose();
			return response;
		} catch (error) {
			toast.error("Failed to create task.");
		}
		// onClose();
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
											rules={{ required: true }}
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
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<Typography
									variant="h6"
									gutterBottom
									component="label"
									htmlFor="task-description-input"
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
													id="task-description-input"
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
						<Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<Typography
									variant="h6"
									gutterBottom
									component="label"
									htmlFor="task-description-input"
									fontWeight={500}
								>
									Board
									<Typography variant="subtitle2" color="text.secondary">
										Assign task to a board
									</Typography>
								</Typography>
								<Grid container spacing={{ xs: 2, md: 3 }}>
									<Grid item xs={12}>
										<Controller
											control={control}
											name="boardId"
											render={({ field }) => (
												<Select fullWidth {...field}>
													{boards?.map(({ title, _id }, index) => (
														<MenuItem key={index} id={_id} value={_id}>
															{title}
														</MenuItem>
													))}
												</Select>
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
							onClick={onClose}
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

export default CreateTaskDialog;
