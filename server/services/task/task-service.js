import Task from "../../models/Task.js";

class TaskService {
	// Query---------------------------------------------------
	/**
	 * @returns returns all the tasks
	 */
	getAllTasks = async () => {
		try {
			return await Task.find({});
		} catch (error) {
			throw new Error("Unable to fetch tasks");
		}
	};
	/**
	 * @param {*} param1
	 * @returns returns a task by id
	 */
	getTaskById = async (_, taskId) => {
		try {
			const task = await Task.findOne(taskId);
			return task;
		} catch (error) {
			throw error;
		}
	};
	/**
	 * @param {*} param1
	 * @returns returns a list of tasks given a board.
	 */
	getTaskByBoard = async (_, boardId) => {
		try {
			const tasks = await Task.find(boardId);
			return tasks;
		} catch (error) {
			throw error;
		}
	};
	// -----------------------------------------------------------
	// Mutation-------------------------------------------------

	/**
	 * @param {*} task
	 * @returns returns response
	 */
	createTask = async (task) => {
		console.log(task);
		try {
			const newTask = new Task(task);
			const response = await newTask.save();
			return response;
		} catch (error) {
			throw error;
		}
	};
	/**
	 * @param {*} param1
	 * @returns taskIds
	 */
	deleteTaskById = async (_, taskId) => {
		try {
			const isDeleted = (await Task.deleteOne(taskId)).deletedCount;
			return isDeleted;
		} catch (error) {
			throw error;
		}
	};
	// -----------------------------------------------------------
	/**
	 * @param {*} taskIds
	 * @returns boolean if all the tasks are deleted.
	 */
	deleteTasks = async (taskIds) => {
		try {
			const deletionResult = await Task.deleteMany({
				taskId: { $in: taskIds },
			});
			return deletionResult;
		} catch (error) {
			throw error;
		}
	};
}

export default TaskService;
