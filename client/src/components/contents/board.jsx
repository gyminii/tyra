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
import React, { useCallback } from "react";
// import Card from "../../card/card";
import { useMutation, useQuery } from "@apollo/client";
import { AddRounded, Create } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import toast from "react-hot-toast";

import { GET_ALL_BOARDS, REORDER_BOARD } from "../../graphql/board";
import { GET_ALL_TASKS, REORDER_TASK } from "../../graphql/task";
import { useDialog } from "../../hooks/use-dialog";
import {
	reorderBoards,
	reorderTasks,
	setBoards,
	setTasks,
} from "../../redux/slice/board";
import { useDispatch, useSelector } from "../../redux/store";
import { CardAddActionDashed } from "../base/styles/card";
import BoardWrapper from "../board/board-wrapper";
import CreateBoardDialog from "../dialogs/board";
import { useNavigate } from "react-router-dom";

const Board = () => {
	const theme = useTheme();

	const dispatch = useDispatch();
	const mdUp = useMediaQuery(theme.breakpoints.up("md"));
	const { boards: _boards } = useSelector((state) => state?.tyra);
	const boards = _boards.boards ?? [];

	const [reorderBoard] = useMutation(REORDER_BOARD, {
		onCompleted: () => toast.success("Board updated successfully!"),
	});

	const [reorderTask] = useMutation(REORDER_TASK, {
		onCompleted: () => toast.success("Task updated successfully!"),
	});

	const { data: boardObj } = useQuery(GET_ALL_BOARDS, {
		onCompleted: (data) => {
			dispatch(setBoards(data?.getAllBoards || []));
		},
	});

	const { data: tasksObj } = useQuery(GET_ALL_TASKS, {
		onCompleted: (data) => dispatch(setTasks(data?.getAllTasks || [])),
	});

	const navigate = useNavigate();
	const onDragEnd = useCallback(
		async ({ source, destination, draggableId, type }) => {
			if (
				!destination ||
				(source.droppableId === destination.droppableId &&
					source.index === destination.index)
			)
				return;
			if (source.droppableId === "board") {
				dispatch(
					reorderBoards({
						startIndex: source.index,
						endIndex: destination.index,
					})
				);
				await reorderBoard({
					variables: {
						boardId: draggableId,
						sourceIndex: source.index,
						destinationIndex: destination.index,
					},
				});
			}
			if (type === "task") {
				dispatch(
					reorderTasks({
						sourceBoardId: source.droppableId,
						sourceIndex: source.index,
						destinationBoardId: destination.droppableId,
						destinationIndex: destination.index,
					})
				);
				await reorderTask({
					variables: {
						taskId: draggableId,
						sourceBoardId: source.droppableId,
						sourceIndex: source.index,
						destinationBoardId: destination.droppableId,
						destinationIndex: destination.index,
					},
				});
			}
		},
		[reorderTask, reorderBoard]
	);

	// const renderCreateBoard = () => {
	// 	if (!_board_dialog.open) return null;
	// 	return (
	// 		<CreateBoardDialog
	// 			open={_board_dialog.open}
	// 			onClose={_board_dialog.handleClose}
	// 		/>
	// 	);
	// };
	return (
		<>
			{/* {renderCreateBoard()} */}
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
							<Droppable
								droppableId="board"
								direction="horizontal"
								type="board"
							>
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
												{boards?.map((item, index) => (
													<Draggable
														key={item?._id}
														index={index}
														draggableId={item?._id}
													>
														{(parentProvided) => (
															<BoardWrapper
																{...item}
																key={item?._id || index}
																provided={parentProvided}
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
													onClick={() => {
														const id = Date.now().toString();
														navigate(`/${id}/create`);
													}}
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
			</Box>
		</>
	);
};

export default Board;
