import { alpha, styled } from "@mui/material/styles";
import { forwardRef, memo } from "react";
import SimpleBar from "simplebar-react";

const RootScrollbar = styled("div")({
	flexGrow: 1,
	height: "100%",
	overflow: "hidden",
});
const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
	maxHeight: "100%",
	"& .simplebar-scrollbar": {
		"&:before": {
			backgroundColor: alpha(theme.palette.grey[600], 0.48),
		},
		"&.simplebar-visible:before": {
			opacity: 1,
		},
	},
	"& .simplebar-mask": {
		zIndex: "inherit",
	},
}));

const Scrollbar = forwardRef(({ children, sx, ...props }, ref) => (
	<RootScrollbar>
		<StyledScrollbar
			clickOnTrack={false}
			scrollableNodeProps={{
				ref,
			}}
			sx={sx}
			{...props}
		>
			{children}
		</StyledScrollbar>
	</RootScrollbar>
));

export default memo(Scrollbar);
