import {
	Box,
	Card,
	List,
	ListItemButton,
	ListItemText,
	Menu,
	Typography,
} from "@mui/material";
import clsx from "clsx";
import React, { forwardRef, memo, useRef, useState } from "react";
import { ButtonIcon } from "../inputs/button-icon.jsx";
import { MoreHorizTwoTone } from "@mui/icons-material";
import { useDialog } from "../../hooks/use-dialog.js";
import EditTaskDialog from "../dialogs/edit-task.jsx";
import { useDispatch } from "../../redux/store/index.js";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/task.js";
import {
	deleteTask as deleteSlice,
	restoreTask,
} from "../../redux/slice/board.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const taskSelector = (state, taskId) => {
	const { tasks } = state.tyra;
	return tasks.tasks[taskId];
};
const Task = forwardRef(({ task, dragging, ...props }, ref) => {
	const { _id, title, taskId, description, dateCreated } = task;
	const [deleteTask] = useMutation(DELETE_TASK);
	const state = useSelector((state) => state);
	const _task = useSelector((state) => taskSelector(state, _id));
	const moreRef = useRef(null);
	const dispatch = useDispatch();
	const [onMenuOpen, menuOpen] = useState(false);
	const openMenu = () => menuOpen(true);
	const closeMenu = () => menuOpen(false);
	const _edit_dialog = useDialog();
	const deleteHandler = async () => {
		dispatch(deleteSlice(_id));
		try {
			const response = await deleteTask({
				variables: {
					_id: _id,
				},
			});
			toast.success("Task Deleted Successfully");
			closeMenu();
			return response;
		} catch (error) {
			toast.error("Failed to delete Task.");
			dispatch(restoreTask(_task));
			closeMenu();
		}
	};
	return (
		<>
			<Box key={taskId} ref={ref} {...props}>
				<Card
					sx={{
						p: 2,
					}}
					className={clsx({
						dragging: dragging,
					})}
					raised={dragging}
					variant={dragging ? "elevation" : "outlined"}
					elevation={dragging ? 14 : 0}
				>
					<Typography variant="h5" gutterBottom fontWeight={500} noWrap>
						{title}
					</Typography>
					<Typography variant="subtitle2" color="text.secondary">
						{description}
					</Typography>
					<Typography gutterBottom variant="subtitle2">
						{dateCreated}
					</Typography>

					<Box
						pt={2}
						display="flex"
						alignItems="center"
						justifyContent="flex-end"
					>
						<ButtonIcon
							color="primary"
							size="small"
							onClick={openMenu}
							ref={moreRef}
						>
							<MoreHorizTwoTone />
						</ButtonIcon>
					</Box>
				</Card>
			</Box>

			<Menu
				disableScrollLock
				keepMounted
				anchorEl={moreRef.current}
				open={onMenuOpen}
				onClose={closeMenu}
				anchorOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "center",
					horizontal: "center",
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
						<ListItemText
							primary="Edit"
							onClick={(e) => {
								_edit_dialog.handleOpen();
								closeMenu();
							}}
						/>
					</ListItemButton>
					<ListItemButton>
						<ListItemText primary="Delete" onClick={deleteHandler} />
					</ListItemButton>
				</List>
			</Menu>
			{_edit_dialog.open && (
				<EditTaskDialog
					task={task}
					open={_edit_dialog.open}
					onClose={_edit_dialog.handleClose}
				/>
			)}
		</>
	);
});

export default memo(Task);
