import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const EditableTypography = ({ initialText, variant }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [text, setText] = useState(initialText);
	const inputRef = useRef(null);
	const handleDoubleClick = () => setIsEdit(true);
	const handleChange = (event) => setText(event.target.value);
	const handleBlur = () => setIsEdit(false);
	useEffect(() => {
		if (isEdit) inputRef.current.focus();
	}, [isEdit]);
	return (
		<div onDoubleClick={handleDoubleClick}>
			{isEdit ? (
				<input
					type="text"
					value={text}
					ref={inputRef}
					onChange={handleChange}
					onBlur={handleBlur}
					style={{
						"&:focusWithin": {
							border: "1px solid pink",
						},
					}}
				/>
			) : (
				<Typography variant={variant}>{text}</Typography>
			)}
		</div>
	);
};

export default EditableTypography;
