import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Container,
	MenuItem,
	Select,
	Stack,
	Tabs,
	Typography,
	alpha,
	lighten,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
// import Card from "../../card/card";
import { useMutation, useQuery } from "@apollo/client";
import { AddRounded } from "@mui/icons-material";
import { DragDropContext } from "react-beautiful-dnd";

// import {Board } from '../../board/board.jsx'
import { useDialog } from "../../hooks/use-dialog";
import { CardAddActionDashed } from "../base/styles/card";
import BoardWrapper from "../board/board-wrapper";
import CreateBoardDialog from "../dialogs/create-board";
import { GET_TASKS } from "../../../server/graphql/tasks-queries";
import {
	CREATE_BOARD,
	GET_BOARDS,
} from "../../../server/graphql/board-queries";
import CreateTaskDialog from "../dialogs/create-task";

const boards = ["to-do", "in-progress", "in-review", "done"];
//  MUST CONTAIN ID, BOARD FOR BOARD SWAP LOGIC

const Board = () => {
	const theme = useTheme();
	const mdUp = useMediaQuery(theme.breakpoints.up("md"));
	const { data: boardObj, data } = useQuery(GET_BOARDS);
	const boardArr = boardObj?.allBoards;
	const _board_dialog = useDialog();
	console.log(data);
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
			<Container disableGutters={!mdUp} maxWidth={"xl"}>
				<Stack
					spacing={0.5}
					direction={{
						xs: "column",
						md: "row",
					}}
					alignItems="center"
					pb={{
						xs: 2,
						md: 0,
					}}
				>
					{mdUp ? (
						<>
							<Tabs
								// value={Number(value)}
								// onChange={handleTabChange}
								sx={{
									overflow: "visible",
									"& .MuiTabs-indicator": {
										display: "none",
									},
									"& .MuiTabs-scroller": {
										overflow: "visible !important",
									},
								}}
							>
								{/* <BaseButtonTab
									componentType="tab"
									label="React project migration"
								/>
								<BaseButtonTab
									componentType="tab"
									label="Engineering meeting"
								/>
								<BaseButtonTab componentType="tab" label="Marketing campaign" /> */}
							</Tabs>
						</>
					) : (
						<Select fullWidth>
							<MenuItem value="0">React project migration</MenuItem>
							<MenuItem value="1">Engineering meeting</MenuItem>
							<MenuItem value="2">Marketing campaign</MenuItem>
						</Select>
					)}
				</Stack>
			</Container>
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
							<DragDropContext>
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
									{boardArr?.map((item, index) => (
										<BoardWrapper {...item} key={index} />
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
									<CreateBoardDialog
										open={_board_dialog.open}
										onClose={_board_dialog.handleClose}
									/>
								</Box>
							</DragDropContext>
						</Box>
					</Container>
				</Box>
			</Card>
			{/* <MuiCard sx={{ marginBottom: 2 }}>
				<CardContent sx={{ gap: 2 }}>
					<Box width="100%" display="inline-flex" alignItems="center">
						<Box flex={1}>
							<Breadcrumbs separator="›" aria-label="breadcrumb">
								<Typography>board</Typography>
								<Typography variant="subtitle1">Tyra Personal</Typography>
							</Breadcrumbs>
						</Box>
						<Box display="inline-flex">
							<Box>
								<IconButton>
									<Schedule fontSize="small" />
								</IconButton>
								<Typography variant="subtitle3">10 Days left</Typography>
							</Box>
							<Divider flexItem orientation="vertical" sx={{ my: 1, px: 1 }} />
							<IconButton>
								<StarBorder fontSize="small" />
							</IconButton>

							<IconButton>
								<Fullscreen fontSize="small" />
							</IconButton>
						</Box>
					</Box>

					<Box mt={2}>
						<CardHeader
							sx={{ p: 0 }}
							title="Tyra Personal"
							subheader="Feel free to add more tasks by clicking on the (+) button for each card."
						/>
					</Box>
				</CardContent>
			</MuiCard>

			<Grid container gap={2} display="inline-flex">
				{boardArr?.map((board, index) => (
					<Grid item key={index}>
						<Card board={board} />
					</Grid>
				))}
			</Grid> */}
		</Box>
	);
};

export default Board;
