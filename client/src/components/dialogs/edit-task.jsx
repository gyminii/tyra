import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Grid,
	MenuItem,
	OutlinedInput,
	Select,
	Slide,
	Stack,
	Switch,
	Typography,
	useTheme,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { GET_ALL_BOARDS } from "../../graphql/board";
import { EDIT_TASK } from "../../graphql/task";
import useDelay from "../../hooks/use-delay";
import { editTask } from "../../redux/slice/board";
import { useDispatch } from "../../redux/store";
const Transition = forwardRef((props, ref) => (
	<Slide direction="up" ref={ref} {...props} />
));

const EditTaskDialog = ({ task, onClose, ...props }) => {
	const [updateTask, { loading, error, data }] = useMutation(EDIT_TASK);
	const {
		data: { getAllBoards: boards },
	} = useQuery(GET_ALL_BOARDS);

	const dispatch = useDispatch();
	const [cleared, setCleared] = useState(false);
	const spinner = useDelay(loading, 1500);
	const client = useApolloClient();
	const theme = useTheme();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		shouldFocusError: true,
		// resolver: zodResolver(),
		defaultValues: {
			title: task.title,
			desription: task.description,
			dueDate: task.dueDate,
			isComplete: task.isComplete,
			boardId: task.boardId,
		},
	});

	useEffect(() => {
		if (cleared) {
			const timeout = setTimeout(() => setCleared(false), 1500);
			return () => clearTimeout(timeout);
		}
		return () => {};
	}, [cleared]);

	useEffect(() => {
		reset(task);
	}, [reset, task]);
	const onSubmit = async ({
		_id,
		title,
		description,
		dueDate,
		isComplete,
		boardId,
	}) => {
		dispatch(
			editTask({
				_id,
				updates: { title, description, dueDate, isComplete, boardId },
			})
		);
		try {
			const response = await updateTask({
				variables: {
					_id: _id,
					title: title,
					description: description,
					dueDate: dueDate,
					isComplete: isComplete,
					boardId: boardId,
				},
			});
			toast.success("Task edited successfully.");
			onClose();
			return response;
		} catch (error) {
			console.error("ERROR UPDATING TASK: ", error);
		}
	};
	return (
		<Dialog
			{...props}
			TransitionComponent={Transition}
			onClose={onClose}
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
				<Typography variant="h3" fontWeight={600}>
					Edit Task
				</Typography>
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
									htmlFor="board-input"
									fontWeight={500}
								>
									Board
									<Typography variant="subtitle2" color="text.secondary">
										Assign Task to a board
									</Typography>
								</Typography>
								<Grid container spacing={{ xs: 2, md: 3 }}>
									<Grid item xs={12}>
										<Controller
											control={control}
											name="boardId"
											render={({ field }) => (
												<Select {...field} fullWidth id="board-input">
													{boards.map(({ title, _id }, index) => (
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
						{/* <Grid item xs={12}>
							<FormControl variant="outlined" fullWidth>
								<Typography
									variant="h6"
									gutterBottom
									component="label"
									htmlFor="duedate-input"
									fontWeight={500}
								>
									Due date
									<Typography variant="subtitle2" color="text.secondary">
										Set an optional due date.
									</Typography>
								</Typography>
								<Grid container spacing={{ xs: 2, md: 3 }}>
									<Grid item xs={12}>
										<Controller
											control={control}
											name="dueDate"
											render={({ field: { onChange, value, ...field } }) => (
												<DatePicker
													{...field}
													value={moment(value) ?? null}
													onChange={(date, yo) => onChange(date.toISOString())}
													slotProps={{
														textField: {
															id: "duedate-input",
															fullWidth: true,
														},
														field: {
															clearable: true,
															onClear: () => setCleared(true),
														},
													}}
													sx={{
														"& .MuiIconButton-edgeEnd": {
															mr: -0.8,
														},
													}}
													label=""
													renderInput={(params) => (
														<OutlinedInput {...params} fullWidth />
													)}
												/>
											)}
										/>
									</Grid>
								</Grid>
							</FormControl>
						</Grid> */}
						<Grid item xs={12}>
							<FormControl variant="outlined">
								<Grid item>
									<Controller
										control={control}
										name="isComplete"
										render={({ field: { onChange, value } }) => (
											<FormControlLabel
												labelPlacement="start"
												sx={{ ml: 0 }}
												control={
													<Switch
														color="primary"
														checked={value}
														onChange={(e) => onChange(e.target.checked)}
													/>
												}
												label={
													<Typography variant="h6" sx={{ pr: 0.5 }}>
														Is Task Complete?
													</Typography>
												}
											/>
										)}
									/>
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
						<Button
							type="submit"
							variant="contained"
							autoFocus
							fullWidth
							disabled={spinner}
							sx={{
								display: "inline-flex",
								gap: "5px",
							}}
						>
							Create
							{spinner && (
								<CircularProgress
									value={25}
									size={25}
									sx={{
										color: (theme) => theme.palette.primary.light,
									}}
								/>
							)}
						</Button>
					</Stack>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default EditTaskDialog;
