import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Container,
	Stack,
	Typography,
	alpha,
	lighten,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
// import Card from "../../card/card";
import { useMutation, useQuery } from "@apollo/client";
import { AddRounded } from "@mui/icons-material";
import { DragDropContext } from "react-beautiful-dnd";

// import {Board } from '../../board/board.jsx'
import { GET_ALL_BOARDS } from "../../../server/graphql/board-queries";
import { useDialog } from "../../hooks/use-dialog";
import { CardAddActionDashed } from "../base/styles/card";
import BoardWrapper from "../board/board-wrapper";
import CreateBoardDialog from "../dialogs/create-board";
import {
	EDIT_TASK,
	GET_ALL_TASKS,
	REORDER_TASK,
} from "../../../server/graphql/tasks-queries";
import toast from "react-hot-toast";

const boards = ["to-do", "in-progress", "in-review", "done"];
//  MUST CONTAIN ID, BOARD FOR BOARD SWAP LOGIC

const Board = () => {
	const theme = useTheme();
	const mdUp = useMediaQuery(theme.breakpoints.up("md"));
	const { data: boardObj, data } = useQuery(GET_ALL_BOARDS);
	const [updateTask] = useMutation(EDIT_TASK);
	const [reorderTask] = useMutation(REORDER_TASK);
	const [localBoards, setLocalBoards] = useState([]);
	const boardArr = boardObj?.getAllBoards;
	const _board_dialog = useDialog();
	useEffect(() => {
		if (boardArr) {
			setLocalBoards(boardArr);
		}
	}, [boardArr]);
	const onDragEnd = useCallback(
		async (result) => {
			const { source, destination, draggableId } = result;

			if (
				!destination ||
				(source.droppableId === destination.droppableId &&
					source.index === destination.index)
			) {
				return;
			}

			// Deep copy to ensure immutability
			let newBoards = localBoards.map((board) => ({
				...board,
				tasks: board.tasks.map((task) => ({ ...task })),
			}));

			const sourceBoardIndex = newBoards.findIndex(
				(board) => board._id === source.droppableId
			);
			const destinationBoardIndex =
				source.droppableId === destination.droppableId
					? sourceBoardIndex
					: newBoards.findIndex(
							(board) => board._id === destination.droppableId
					  );

			const sourceTasks = Array.from(newBoards[sourceBoardIndex].tasks);
			const destinationTasks =
				sourceBoardIndex === destinationBoardIndex
					? sourceTasks
					: Array.from(newBoards[destinationBoardIndex].tasks);

			const [movedTask] = sourceTasks.splice(source.index, 1);
			destinationTasks.splice(destination.index, 0, movedTask);

			// Apply updates to the local boards state
			newBoards[sourceBoardIndex].tasks = sourceTasks;
			if (sourceBoardIndex !== destinationBoardIndex) {
				newBoards[destinationBoardIndex].tasks = destinationTasks;
			}

			// Optimistically update local state
			setLocalBoards(newBoards);

			try {
				if (sourceBoardIndex === destinationBoardIndex) {
					// Reorder within the same board
					await reorderTask({
						variables: {
							boardId: source.droppableId,
							tasksOrder: sourceTasks.map((task) => task._id),
						},
					});
					toast.success("Task reordered successfully.");
				} else {
					// Move to a different board
					await updateTask({
						variables: {
							_id: draggableId,
							boardId: destination.droppableId,
						},
					});
					toast.success("Task moved successfully.");
				}
			} catch (error) {
				console.error("Failed to update task: ", error);
				toast.error(
					`Failed to ${
						sourceBoardIndex === destinationBoardIndex ? "reorder" : "move"
					} task.`
				);
				// Optionally, roll back to the previous state if the mutation fails
			}
		},
		[localBoards, reorderTask, updateTask]
	);

	return (
		<Box
			display="flex"
			flex={1}
			position="relative"
			zIndex={2}
			flexDirection="column"
			overflow="hidden"
			height="100%"
			sx={{
				backgroundColor: (theme) =>
					theme.palette.mode === "dark"
						? alpha(theme.palette.neutral[25], 0.02)
						: "neutral.25",
			}}
			p={{
				xs: 2,
				sm: 3,
			}}
		>
			<Card
				elevation={0}
				variant="outlined"
				sx={{
					border: 0,
					p: "1px",
					background:
						theme.palette.mode === "dark"
							? theme.palette.neutral[800]
							: `linear-gradient(180deg, ${theme.palette.neutral[300]} 0%, transparent 60%)`,
					overflow: "visible",
					width: "100%",
				}}
			>
				<Box
					py={{
						xs: 2,
						sm: 3,
					}}
					sx={{
						borderRadius: "inherit",
						background:
							theme.palette.mode === "dark"
								? lighten(theme.palette.neutral[900], 0.035)
								: `linear-gradient(180deg, ${theme.palette.common.white} 0%, transparent 60%)`,
					}}
				>
					<Container maxWidth="xl">
						<Box
							mt={{
								xs: 2,
								sm: 3,
							}}
						>
							{/* onDragEnd={handleDragEnd} */}
							<DragDropContext onDragEnd={onDragEnd}>
								<Box
									display="flex"
									flexDirection={{
										xs: "column",
										md: "row",
									}}
									sx={{
										overflowX: "auto",
										overflowY: "hidden",
									}}
								>
									{localBoards?.map((item, index) => (
										<BoardWrapper {...item} key={item?._id || index} />
									))}
									<CardAddActionDashed
										variant="outlined"
										elevation={0}
										sx={{
											minWidth: 160,
											flex: 1,
										}}
										onClick={_board_dialog.handleOpen}
									>
										<CardActionArea>
											<CardContent>
												<Stack
													spacing={1}
													justifyContent="center"
													direction="column"
													alignItems="center"
												>
													<AddRounded />
													<Typography
														textAlign="center"
														variant="h6"
														fontWeight={500}
													>
														Create section
													</Typography>
												</Stack>
											</CardContent>
										</CardActionArea>
									</CardAddActionDashed>
									{_board_dialog.open && (
										<CreateBoardDialog
											open={_board_dialog.open}
											onClose={_board_dialog.handleClose}
										/>
									)}
								</Box>
							</DragDropContext>
						</Box>
					</Container>
				</Box>
			</Card>
		</Box>
	);
};

export default Board;
