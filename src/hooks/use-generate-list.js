import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const useGenerateList = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const generateTasks = () => {
			const newTasks = Array.from({ length: 30 }, (_, index) => ({
				id: uuidv4(),
				title: `Task-${index}`,
				board: getRandomBoard(),
			}));
			setTasks(newTasks);
		};

		const getRandomBoard = () => {
			const boards = ["to-do", "in-progress", "in-review", "done"];
			const randomIndex = Math.floor(Math.random() * boards.length);
			return boards[randomIndex];
		};

		generateTasks();
	}, []);

	return tasks;
};

export default useGenerateList;
