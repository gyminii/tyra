import Task from "../../models/Task.js";

class TaskService {
	async getAllTasks() {
		try {
			return await Task.find({});
		} catch (error) {
			throw new Error("Unable to fetch tasks");
		}
	}

	async getTaskById(ID) {
		console.log("FETCHING EACH TASK", ID);
		return "YOOO";
	}

	async getTaskByTitle(title) {
		console.log("FETCHING EACH TASK", title);
		// Implement logic to fetch a task by title
		// Example: return await Task.findOne({ title });
		return "YOOO";
	}

	async createTask(task) {
		try {
			const newTask = new Task(task);
			const response = await newTask.save();
			return response;
		} catch (error) {
			throw new Error("Unable to create Task");
		}
	}

	async deleteTaskById(ID) {
		console.log("DELETE TASK CALLED");
		const isDeleted = (await Task.deleteOne({ _id: ID })).deletedCount;
		return isDeleted;
	}
}

export default TaskService;
