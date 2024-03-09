import { createComponents } from "./create-components";
import { createPalette } from "./create-palette";
import { createShadows } from "./create-shadows";

export const createOptions = ({ colorPreset, layout }) => {
  const palette = createPalette({
    colorPreset,
  });
  const shadows = createShadows({
    palette,
    layout,
  });
  const components = createComponents({
    palette,
  });
  return {
    components,
    palette,
    shadows,
  };
};
