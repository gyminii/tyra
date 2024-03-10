import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	boards: {
		byId: {},
		boards: [],
		allIds: [],
	},
	tasks: {
		byId: {},
		tasks: [],
		allIds: [],
	},
};

const slice = createSlice({
	name: "tyra_board",
	initialState,
	reducers: {
		addBoard: (state, action) => {
			const newBoard = action.payload;
			state.boards.byId[newBoard._id] = newBoard;
			state.boards.allIds.push(newBoard._id);
			state.boards.boards.push(newBoard);
		},
		editBoard: (state, action) => {
			const { _id, updates } = action.payload;
			if (state.boards.byId[_id]) {
				state.boards.byId[_id] = { ...state.boards.byId[_id], ...updates };
				const index = state.boards.boards.findIndex(
					(board) => board._id === _id
				);
				if (index !== -1) {
					state.boards.boards[index] = {
						...state.boards.boards[index],
						...updates,
					};
				}
			}
		},
		deleteBoard: (state, action) => {
			const boardId = action.payload;
			delete state.boards.byId[boardId];
			state.boards.allIds = state.boards.allIds.filter((id) => id !== boardId);
			state.boards.boards = state.boards.boards.filter(
				(board) => board._id !== boardId
			);
		},
		addTask: (state, action) => {
			const newTask = action.payload;
			const boardId = newTask.boardId;

			// Adding to tasks.byId
			if (!state.tasks.byId[boardId]) {
				state.tasks.byId[boardId] = [];
			}
			state.tasks.byId[boardId].push(newTask);
			// Adding to tasks.tasks
			state.tasks.tasks[newTask._id] = newTask;
			// Adding to tasks.allIds
			state.tasks.allIds.push(newTask._id);
		},
		editTask: (state, action) => {
			const { _id, updates } = action.payload;
			const boardId = state.tasks.tasks[_id].boardId;

			// Updating in tasks.byId
			const tasks = state.tasks.byId[boardId];
			const taskIndex = tasks.findIndex((task) => task._id === _id);
			if (taskIndex > -1) {
				tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
			}

			// Updating in tasks.tasks
			state.tasks.tasks[_id] = { ...state.tasks.tasks[_id], ...updates };
		},
		deleteTask: (state, action) => {
			const taskId = action.payload;
			const boardId = state.tasks.tasks[taskId].boardId;

			// Removing from tasks.byId
			state.tasks.byId[boardId] = state.tasks.byId[boardId].filter(
				(task) => task._id !== taskId
			);

			// Removing from tasks.tasks
			delete state.tasks.tasks[taskId];

			// Removing from tasks.allIds
			state.tasks.allIds = state.tasks.allIds.filter((id) => id !== taskId);
		},
		setBoards: (state, action) => {
			const boards = action.payload;
			// Assuming boards is an array of board objects
			state.boards.byId = boards.reduce((acc, board) => {
				acc[board._id] = board;
				return acc;
			}, {});
			state.boards.allIds = boards.map((board) => board._id);
			state.boards.boards = [...boards];
		},
		setTasks: (state, action) => {
			const tasks = action.payload;
			const boards = state.boards.allIds;
			const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);
			const initialAccumulator = boards.reduce((acc, boardId) => {
				acc[boardId] = [];
				return acc;
			}, {});
			state.tasks.byId = sortedTasks.reduce((acc, task) => {
				if (acc.hasOwnProperty(task.boardId)) {
					acc[task.boardId].push(task);
				}

				return acc;
			}, initialAccumulator);
			state.tasks.tasks = sortedTasks.reduce((acc, task) => {
				acc[task._id] = task;
				return acc;
			}, {});

			state.tasks.allIds = sortedTasks.map((task) => task._id);
		},
		reorderBoards: (state, action) => {
			const { startIndex, endIndex } = action.payload;
			const result = [...state.boards.boards];
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);
			state.boards.boards = result;
		},
		reorderTasks: (state, action) => {
			const {
				sourceBoardId,
				sourceIndex,
				destinationBoardId,
				destinationIndex,
			} = action.payload;

			// Scenario 1: Within the same board
			if (sourceBoardId === destinationBoardId) {
				const result = [...state.tasks.byId[sourceBoardId]];
				const [removed] = result.splice(sourceIndex, 1);
				result.splice(destinationIndex, 0, removed);
				state.tasks.byId[sourceBoardId] = result;
			} else {
				// Scenario 2: Across different boards
				const source = [...state.tasks.byId[sourceBoardId]];
				const destination = [...state.tasks.byId[destinationBoardId]] || [];
				const [removed] = source.splice(sourceIndex, 1);
				destination.splice(destinationIndex, 0, removed);
				state.tasks.byId[sourceBoardId] = source;
				state.tasks.byId[destinationBoardId] = destination;
			}
		},
		// Optimistic ui update when fetch call fails.
		restoreBoard: (state, action) => {
			const board = action.payload;
			if (!state.boards.byId[board._id]) {
				state.boards.byId[board._id] = board;
				state.boards.allIds.push(board._id);
				state.boards.boards.push(board);
			}
		},
		// Optimistic ui update when fetch call fails.
		restoreTask: (state, action) => {
			const { task, boardId } = action.payload;
			// Ensure the board exists for this task
			if (!state.tasks.byId[boardId]) {
				state.tasks.byId[boardId] = [];
			}
			// Restore the task to the byId mapping under its board
			state.tasks.byId[boardId].push(task);
			// Restore the task to the tasks object
			state.tasks.tasks[task._id] = task;
			// Restore the task ID to the allIds list
			state.tasks.allIds.push(task._id);
		},
	},
});

export const { reducer } = slice;
export const {
	addTask,
	setBoards,
	setTasks,
	reorderBoards,
	reorderTasks,
	editTask,
	addBoard,
	editBoard,
	deleteBoard,
	restoreBoard,
	deleteTask,
	restoreTask,
} = slice.actions;
