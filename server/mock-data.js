import { v4 as uuidv4 } from "uuid";
const getRandomBoard = () => {
	const boards = ["to-do", "in-progress", "in-review", "done"];
	const randomIndex = Math.floor(Math.random() * boards.length);
	return boards[randomIndex];
};
const generateTasks = () => {
	const newTasks = Array.from({ length: 30 }, (_, index) => ({
		id: uuidv4(),
		title: `Task-${index}`,
		board: getRandomBoard(),
	}));
	return newTasks;
};

const sampleData = generateTasks();

export default sampleData;
