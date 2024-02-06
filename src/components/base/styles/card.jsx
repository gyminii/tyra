import { alpha, Card, CardActions, CardHeader, Divider, styled } from "@mui/material";

export const DividerLight = styled(Divider)(({ theme }) => ({
  borderColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.12)
      : alpha(theme.palette.common.white, 0.2),
}));
export const CardHeaderLight = styled(CardHeader)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.08),
  "& .MuiCardHeader-content": {
    color: theme.palette.common.white,
    "& .MuiCardHeader-subheader": {
      color: alpha(theme.palette.common.white, 0.7),
    },
  },
}));
export const CardActionsLight = styled(CardActions)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.08),
}));
export const CardAddActionDashed = styled(Card)(({ theme }) => ({
  height: "100%",
  border: `${alpha(theme.palette.secondary.main, 0.2)} dashed 3px`,
  "& > .MuiSvgIcon-root": {
    color: theme.palette.neutral[600],
  },
  "& > .MuiTypography-root": {
    color: theme.palette.neutral[800],
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& > .MuiSvgIcon-root": {
      color: theme.palette.neutral[800],
    },
    "& > .MuiTypography-root": {
      color: theme.palette.neutral[900],
    },
  },
  ".MuiCardActionArea-root": {
    height: "100%",
    "&:hover .MuiCardActionArea-focusHighlight": {
      opacity: 0.01,
    },
  },
}));
export const CardBorderColor = styled(Card, {
  shouldForwardProp: (prop) => prop !== "borderColor" && prop !== "borderPosition",
})(({ theme, borderColor, borderPosition }) => {
  const computedColor = borderColor ? theme.palette[borderColor].main : theme.palette.primary.main;
  const defaultBorderPosition = borderPosition || "bottom";
  const styles = {
    position: "relative",
    overflow: "visible",
    "&::before": {
      position: "absolute",
      content: '""',
      height: "6px",
      left: "-1px",
      width: "calc(100% + 2px)",
      backgroundColor: computedColor,
      ...(defaultBorderPosition === "top"
        ? {
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
            top: "-1px",
          }
        : {
            bottom: "-2px",
            borderBottomLeftRadius: "inherit",
            borderBottomRightRadius: "inherit",
          }),
    },
  };
  return styles;
});
