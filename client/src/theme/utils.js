import { darkTheme, lightTheme } from "./colors";

export const getPrimaryDark = (preset) => {
  if (!preset) {
    console.error("Preset is not available!");
    return darkTheme.royalBlue; // Default case
  }
  const color = darkTheme[preset.replace("-", "")];
  return color ? color : darkTheme.royalBlue; // Fallback
};
export const getPrimary = (preset) => {
  if (!preset) {
    console.error("Preset is not available!");
    return lightTheme.royalBlue; // Default case
  }
  const color = lightTheme[preset.replace("-", "")];
  return color ? color : lightTheme.royalBlue; // Fallback
};

// Extended Sidebar Layout

export const SIDEBAR_WIDTH = 288;
export const SIDEBAR_WIDTH_COLLAPSED = 98;
export const HEADER_HEIGHT = 54;

// Common
export const BORDER_RADIUS = 10;
export const SPACING_UNIT = 10;
