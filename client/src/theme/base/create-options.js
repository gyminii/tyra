import { BORDER_RADIUS } from "../utils";
import { createComponents } from "./create-components";
import { createTypography } from "./create-typography";

export const createOptions = (config) => {
  const { direction = "ltr" } = config;
  return {
    components: createComponents(),
    direction,
    spacing: 10,
    shape: {
      borderRadius: BORDER_RADIUS,
    },
    typography: createTypography(),
  };
};
