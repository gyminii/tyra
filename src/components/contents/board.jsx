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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// import {Board } from '../../board/board.jsx'
import toast from "react-hot-toast";
import { GET_ALL_BOARDS } from "../../../server/graphql/board-queries";
import { EDIT_TASK, REORDER_TASK } from "../../../server/graphql/tasks-queries";
import { useDialog } from "../../hooks/use-dialog";
import { CardAddActionDashed } from "../base/styles/card";
import BoardWrapper from "../board/board-wrapper";
import CreateBoardDialog from "../dialogs/create-board";

const boards = ["to-do", "in-progress", "in-review", "done"];
//  MUST CONTAIN ID, BOARD FOR BOARD SWAP LOGIC

const Board = () => {
	const theme = useTheme();
	const mdUp = useMediaQuery(theme.breakpoints.up("md"));
	const { data: boardObj, loading, error, data } = useQuery(GET_ALL_BOARDS);
	const [updateTask] = useMutation(EDIT_TASK);
	const [reorderTask] = useMutation(REORDER_TASK);
	const boardArr = boardObj?.getAllBoards;

	const [localBoards, setLocalBoards] = useState(boardObj?.getAllBoards || []);
	const _board_dialog = useDialog();
	useEffect(() => {
		if (data && localBoards.length === 0) setLocalBoards(data?.getAllBoards);
	}, [data]);
	const onDragEnd = useCallback(
		async (result) => {
			const { source, destination, draggableId, type } = result;
			if (!destination) return;
			if (
				type === "task" &&
				source.droppableId === destination.droppableId &&
				source.index === destination.index
			) {
				// Do nothing if the task position hasn't changed
				return;
			}
			if (type === "board") {
				// Board reordering logic
				const reorderedBoards = Array.from(localBoards);
				const [reorderedBoard] = reorderedBoards.splice(source.index, 1);
				reorderedBoards.splice(destination.index, 0, reorderedBoard);
				setLocalBoards(reorderedBoards);
			} else if (type === "task") {
				const newBoards = localBoards.map((board) => ({
					...board,
					tasks: board.tasks.map((task) => ({ ...task })),
				}));
				const sourceBoardIndex = localBoards.findIndex(
					(board) => board._id === source.droppableId
				);
				const destinationBoardIndex = localBoards.findIndex(
					(board) => board._id === destination.droppableId
				);

				const taskToMove = {
					...newBoards[sourceBoardIndex].tasks.find(
						(task) => task._id === draggableId
					),
				};
				newBoards[sourceBoardIndex].tasks = newBoards[sourceBoardIndex].tasks
					.filter((task) => task._id !== draggableId)
					.map((task, index) => ({ ...task, order: index }));

				if (sourceBoardIndex !== destinationBoardIndex) {
					taskToMove.boardId = newBoards[destinationBoardIndex]._id;
				}

				newBoards[destinationBoardIndex].tasks.splice(
					destination.index,
					0,
					taskToMove
				);
				newBoards[destinationBoardIndex].tasks = newBoards[
					destinationBoardIndex
				].tasks.map((task, index) => ({ ...task, order: index }));
				setLocalBoards(newBoards);

				const operationPromise =
					sourceBoardIndex === destinationBoardIndex
						? reorderTask({
								variables: {
									boardId: source.droppableId,
									tasksOrder: newBoards[sourceBoardIndex].tasks.map(
										(task) => task._id
									),
								},
								optimisticResponse: {
									__typename: "Mutation",
									reorderTask: newBoards[sourceBoardIndex].tasks.map(
										(task, index) => ({
											...task,
											__typename: "Task",
											_id: task._id,
											title: task.title, // Assuming title is static and not affected by the reorder
											order: index, // Reflect the new order based on the destination index
										})
									),
								},
						  })
						: updateTask({
								variables: {
									_id: draggableId,
									boardId: destination.droppableId,
								},
								optimisticResponse: {
									__typename: "Mutation",
									updateTask: {
										__typename: "Task",
										_id: draggableId,
										boardId: destination.droppableId,
										order: destination.index, // Assuming 'order' needs to be updated
										// Replicate the optimistic values for other fields as necessary
										...taskToMove,
									},
								},
						  });

				operationPromise
					.then(() => {
						toast.success("Task updated successfully!");
					})
					.catch((error) => {
						console.error("Failed to update task: ", error);
						toast.error("Failed to update task. Please try again.");
					});
			}
		},
		[localBoards, reorderTask, updateTask]
	);
	// if (boardArr && localBoards.length === 0) {
	// 	setLocalBoards(boardArr);
	// }
	// if (loading) return <Typography>Loading</Typography>;
	// if (error) return <Typography>Error: </Typography>;
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
			<DragDropContext onDragEnd={onDragEnd}>
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
						<Droppable droppableId="boards" direction="horizontal" type="board">
							{(provided) => (
								<Container
									maxWidth="xl"
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									<Box
										mt={{
											xs: 2,
											sm: 3,
										}}
									>
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
												<Draggable
													key={item._id}
													index={index}
													draggableId={item._id}
												>
													{(provided) => (
														<BoardWrapper
															{...item}
															key={item?._id || index}
															provided={provided}
														/>
													)}
												</Draggable>
											))}
											{provided.placeholder}
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
										</Box>
									</Box>
								</Container>
							)}
						</Droppable>
					</Box>
				</Card>
			</DragDropContext>
			{_board_dialog.open && (
				<CreateBoardDialog
					open={_board_dialog.open}
					onClose={_board_dialog.handleClose}
				/>
			)}
		</Box>
	);
};

export default Board;
