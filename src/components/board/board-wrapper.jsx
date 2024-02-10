import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import {
	Box,
	Button,
	Chip,
	ClickAwayListener,
	List,
	ListItemButton,
	ListItemText,
	Menu,
	Stack,
	TextField,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import { useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";

import { useDialog } from "../../hooks/use-dialog.js";
import { CardBorderColor } from "../base/styles/card.jsx";
import CreateTaskDialog from "../dialogs/create-task.jsx";
import Task from "../task/task-wrapper.jsx";
import { ButtonIcon } from "../inputs/button-icon.jsx";
import { MoreHoriz } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import {
	DELETE_BOARD,
	GET_ALL_BOARDS,
	UPDATE_BOARD,
} from "../../../server/graphql/board-queries.js";
import { GET_ALL_TASKS } from "../../../server/graphql/tasks-queries.js";
import { Controller, useForm } from "react-hook-form";
import { UPDATE_BOARD_VALIDATION } from "../../validation/board-validation.js";
import { zodResolver } from "@hookform/resolvers/zod";
const BoardWrapper = (props) => {
	const { _id, title, description, tasks } = { ...props };
	const theme = useTheme();
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		mode: "onBlur",
		defaultValues: {
			title: title,
			description: "",
		},
		reValidateMode: "onChange",
		resolver: zodResolver(UPDATE_BOARD_VALIDATION),
	});
	const [isRenaming, setRename] = useState(false);
	const _task_dialog = useDialog();

	const [deleteBoard] = useMutation(DELETE_BOARD);
	const [updateBoard] = useMutation(UPDATE_BOARD);
	const moreRef = useRef(null);
	const [onMenuOpen, menuOpen] = useState(false);
	const openMenu = () => menuOpen(true);
	const closeMenu = () => menuOpen(false);

	const handleRenameInit = () => {
		setRename(true);
	};
	const handleRename = async (body) => {
		try {
			const { updateBoard } = await updateBoard({
				variables: {
					_id: _id,
					...body,
				},
				refetchQueries: [{ query: GET_ALL_BOARDS }],
			});
			toast.success("Project board updated successfully!");
			setRename(false);
			return updateBoard;
		} catch (err) {
			console.error(err);
			toast.error("There was an error, try again later");
		}
	};
	const deleteHandler = async () => {
		try {
			const response = await deleteBoard({
				variables: {
					_id: _id,
				},
				refetchQueries: [{ query: GET_ALL_BOARDS }, { query: GET_ALL_TASKS }],
			});
			closeMenu();
			return response;
		} catch (error) {
			closeMenu();
		}
	};
	console.log(errors, isValid);
	return (
		<CardBorderColor
			elevation={7}
			// borderColor={'black'}
			borderPosition="top"
			sx={{
				minWidth: {
					xs: "none",
					sm: 320,
				},
				width: {
					xs: "auto",
					md: 320,
				},
				mr: {
					xs: 0,
					md: 3,
				},
				mb: {
					xs: 2,
					md: "2px",
				},
				ml: "2px",
			}}
		>
			<Box
				px={2}
				pt={2}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				{isRenaming ? (
					<ClickAwayListener
						onClickAway={() => {
							if (!isValid) return;
							setRename(false);
						}}
					>
						<TextField
							{...register("title", {
								required: true,
								minLength: 1,
								onBlur: handleSubmit(handleRename),
								value: title,
							})}
							size="small"
							variant="outlined"
							margin="none"
							fullWidth
							error={!!errors?.title}
							helperText={errors?.title?.message}
						/>
					</ClickAwayListener>
				) : (
					<Typography
						color="inherit"
						variant="h4"
						noWrap
						fontWeight={500}
						onClick={handleRenameInit}
					>
						{title}
					</Typography>
				)}
				<Stack spacing={0.5} direction="row" alignItems="center" pl={0.5}>
					<Chip
						size="small"
						variant="outlined"
						label={tasks.length}
						color="primary"
					/>
					<ButtonIcon
						color="primary"
						size="small"
						ref={moreRef}
						onClick={openMenu}
					>
						<MoreHoriz />
					</ButtonIcon>
				</Stack>
			</Box>
			<Box px={2} pt={2}>
				<Tooltip placement="top" arrow title="Add new task">
					<Button
						variant="outlined"
						color="primary"
						fullWidth
						onClick={_task_dialog.handleOpen}
					>
						<AddTwoToneIcon fontSize="small" />
					</Button>
				</Tooltip>
			</Box>
			{tasks.length === 0 && (
				<Box
					p={{
						xs: 2,
						sm: 3,
						md: 4,
					}}
					textAlign="center"
				>
					<Typography variant="subtitle2">
						Drag tasks here to assign them to this board
					</Typography>
				</Box>
			)}
			<Droppable droppableId={_id}>
				{(provided) => (
					<Stack
						p={2}
						spacing={{
							xs: 2,
							sm: 3,
						}}
						sx={{
							minHeight: 260,
						}}
						ref={provided.innerRef}
					>
						{tasks.map((task, index) => (
							<Draggable
								draggableId={task?.taskId}
								index={index}
								key={task?.taskId}
							>
								{(provided, snapshot) => (
									<Task
										index={index}
										task={task}
										dragging={snapshot.isDragging}
										ref={provided.innerRef}
										style={{
											...provided.draggableProps.style,
										}}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									/>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</Stack>
				)}
			</Droppable>
			<Menu
				disableScrollLock
				keepMounted
				anchorEl={moreRef.current}
				open={onMenuOpen}
				onClose={closeMenu}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
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
						<ListItemText primary="Edit" onClick={handleRenameInit} />
					</ListItemButton>
					<ListItemButton>
						<ListItemText primary="Delete" onClick={deleteHandler} />
					</ListItemButton>
				</List>
			</Menu>
			{_task_dialog?.open && (
				<CreateTaskDialog
					boardId={_id}
					open={_task_dialog.open}
					onClose={_task_dialog.handleClose}
				/>
			)}
		</CardBorderColor>
	);
};

export default BoardWrapper;
