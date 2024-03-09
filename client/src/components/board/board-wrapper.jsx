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
import { memo, useMemo, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";

import { useDialog } from "../../hooks/use-dialog.js";
import { CardBorderColor } from "../base/styles/card.jsx";
import CreateTaskDialog from "../dialogs/create-task.jsx";
import Task from "../task/task-wrapper.jsx";
import { ButtonIcon } from "../inputs/button-icon.jsx";
import { MoreHoriz } from "@mui/icons-material";
import { useMutation } from "@apollo/client";

import { Controller, useForm } from "react-hook-form";
import { UPDATE_BOARD_VALIDATION } from "../../validation/board-validation.js";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	DELETE_BOARD,
	GET_ALL_BOARDS,
	UPDATE_BOARD,
} from "../../graphql/board.js";
import { GET_ALL_TASKS } from "../../graphql/task.js";
import { useDispatch, useSelector } from "../../redux/store/index.js";
import { editBoard } from "../../redux/slice/board.js";

const tasksSelector = (state, boardId) => {
	const { tasks } = state.tyra;
	return tasks.byId[boardId];
};
const BoardWrapper = (props) => {
	const { _id, title, description, provided } = { ...props };
	const theme = useTheme();
	const dispatch = useDispatch();
	const _task_dialog = useDialog();
	const _tasks = useSelector((state) => tasksSelector(state, _id));
	const tasks = useMemo(
		() => (_tasks ? [..._tasks]?.sort((a, b) => a.order - b.order) : []),
		[_tasks]
	);
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
	const [deleteBoard] = useMutation(DELETE_BOARD);
	const [updateBoard] = useMutation(UPDATE_BOARD);
	const moreRef = useRef(null);
	const [onMenuOpen, menuOpen] = useState(false);
	const openMenu = () => menuOpen(true);
	const closeMenu = () => menuOpen(false);
	const handleRenameInit = () => setRename(true);
	const handleRename = async (body) => {
		dispatch(editBoard({ _id, updates: { ...body } }));
		try {
			const { updateBoard: updatedBoard } = await updateBoard({
				variables: {
					_id: _id,
					...body,
				},
			});
			toast.success("Project board updated successfully!");
			setRename(false);
			return updatedBoard;
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
	return (
		<CardBorderColor
			key={_id}
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			elevation={7}
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
						label={tasks?.length}
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
			{tasks?.length === 0 && (
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
			<Droppable droppableId={_id} type="task">
				{(provided) => (
					<Stack
						key={_id}
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
						{_tasks?.map((task, index) => (
							<Draggable draggableId={task?._id} index={index} key={task?._id}>
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

export default memo(BoardWrapper);
