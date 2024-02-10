import mongoose from "mongoose";
import Task from "../models/Task.js";

class TaskService {
	// Query---------------------------------------------------
	/**
	 * @returns returns all the tasks
	 */
	getAllTasks = async () => await Task.find({});
	/**
	 * @param {*} param1
	 * @returns returns a task by id
	 */
	getTaskById = async (_, taskId) => {
		const task = await Task.findOne(taskId);
		return task;
	};
	/**
	 * @param {*} param1
	 * @returns returns a list of tasks given a board.
	 */
	getTaskByBoard = async (_, boardId) => await Task.find(boardId);
	// -----------------------------------------------------------
	// Mutation-------------------------------------------------

	/**
	 * @param {*} task
	 * @returns returns response
	 */
	createTask = async (task) => {
		const newTask = new Task(task);
		console.log("NEW TASK", newTask);
		const response = await newTask.save();
		console.log("RESP{ONSE: ", response);
		return response;
	};
	/**
	 * @param {*} param1
	 * @returns taskIds
	 */
	deleteTaskById = async (_, taskId) =>
		(await Task.deleteOne(taskId)).deletedCount;
	// -----------------------------------------------------------
	/**
	 * @param {*} taskIds
	 * @returns boolean if all the tasks are deleted.
	 */
	deleteTasks = async (taskIds) =>
		await Task.deleteMany({
			taskId: { $in: taskIds },
		});
}

export default TaskService;
