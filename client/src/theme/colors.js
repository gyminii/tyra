import { darken, getContrastRatio, lighten } from "@mui/material/styles";

const common = {
  white: "#ffffff",
  black: "#151821",
  neutral: "#14191e",
};
const baseColors = [
  {
    name: "livingCoral",
    value: "#ea2012",
  },
  {
    name: "greenery",
    value: "#018a3c",
  },
  {
    name: "ultraViolet",
    value: "#894AE0",
  },
  {
    name: "roseQuartz",
    value: "#da3c42",
  },
  {
    name: "radiantOrchid",
    value: "#d427af",
  },
  {
    name: "tangerineTango",
    value: "#cf4c10",
  },
  {
    name: "emerald",
    value: "#02876f",
  },
  {
    name: "honeyGold",
    value: "#967210",
  },
  {
    name: "monacoBlue",
    value: "#0C74E4",
  },
  {
    name: "darkViolet",
    value: "#B741FB",
  },
  {
    name: "royalBlue",
    value: "#4656E8",
  },
  {
    name: "success",
    value: "#248a01",
  },
  {
    name: "info",
    value: "#037bcd",
  },
  {
    name: "warning",
    value: "#c05a01",
  },
  {
    name: "error",
    value: "#F1393B",
  },
];
export const adjustColorForLightTheme = (color) => color;
export const adjustColorForDarkTheme = (color) => lighten(color, 0.26);
export const generateColorScale = (mainColor, theme) => {
  let adjustedMainColor =
    theme === "light" ? adjustColorForLightTheme(mainColor) : adjustColorForDarkTheme(mainColor);
  const contrastRatioWithWhite = getContrastRatio(adjustedMainColor, common.white);
  const contrastText = contrastRatioWithWhite >= 4.4 ? common.white : common.black;
  return {
    light: lighten(adjustedMainColor, 0.3),
    main: adjustedMainColor,
    dark: darken(adjustedMainColor, 0.1),
    darkest: darken(adjustedMainColor, 0.4),
    contrastText,
  };
};
export const generateThemeColors = () => {
  const themeColors = {
    light: {},
    dark: {},
  };
  baseColors.forEach((color) => {
    themeColors.light[color.name] = generateColorScale(color.value, "light");
    themeColors.dark[color.name] = generateColorScale(color.value, "dark");
  });
  return themeColors;
};
export const neutral = {
  25: lighten(common.neutral, 0.98),
  50: lighten(common.neutral, 0.96),
  100: lighten(common.neutral, 0.93),
  200: lighten(common.neutral, 0.9),
  300: lighten(common.neutral, 0.85),
  400: lighten(common.neutral, 0.77),
  500: lighten(common.neutral, 0.68),
  600: lighten(common.neutral, 0.5),
  700: lighten(common.neutral, 0.4),
  800: lighten(common.neutral, 0.2),
  900: common.neutral,
};
const { light: lightThemeColors, dark: darkThemeColors } = generateThemeColors();
export const lightTheme = lightThemeColors;
export const darkTheme = darkThemeColors;
