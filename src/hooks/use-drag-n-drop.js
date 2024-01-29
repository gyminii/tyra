import { useEffect, useState } from "react";

export const useDragAndDrop = (data) => {
	const [isDragging, setIsDragging] = useState(false);
	const [listItems, setListItems] = useState([...data] ?? []);

	useEffect(() => {
		setListItems([...data]);
	}, [data]);
	// if it is a different board move.
	const handleUpdateList = (id, board) => {
		let card = listItems.find((item) => item.id === id);
		if (card && card?.board !== board) {
			card.board = board;
			if (Array.isArray(listItems)) {
				const filtered = listItems?.filter((item) => item?.id !== id);
				setListItems([...filtered]);
			}
		}
	};
	const handleDragging = (dragging) => setIsDragging(dragging);
	return {
		isDragging,
		listItems,
		handleUpdateList,
		handleDragging,
	};
};
