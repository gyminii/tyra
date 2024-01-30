import { Card, Modal } from "@mui/material";
import React from "react";

const useModal = () => {
	const [open, setOpen] = useState(false);
	const handleModal = () => setOpen(!open);
	const ModalComponent = ({ children }) => (
		<Modal open={open} onClose={handleModal}>
			<Card>{children}</Card>
		</Modal>
	);
	return {
		Modal: ModalComponent,
		open,
		handleModal,
	};
};

export default useModal;
