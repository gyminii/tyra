import { createTheme as createMuiTheme, responsiveFontSizes } from "@mui/material/styles";
import { createOptions as createBaseOptions } from "./base/create-options.js";
import { createOptions as createDarkOptions } from "./dark/create-options.js";
import { createOptions as createLightOptions } from "./light/create-options.js";


export const createTheme = (config) => {
  let theme = createMuiTheme(
    createBaseOptions({
      direction: config.direction,
    }),
    config.paletteMode === "dark"
      ? createDarkOptions({
          colorPreset: config.colorPreset,
        })
      : createLightOptions({
          colorPreset: config.colorPreset,
          layout: config.layout,
        }),
  );
  theme = responsiveFontSizes(theme);
  return theme;
};
