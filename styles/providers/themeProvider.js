import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";
import typography from "../theme/typography";
import palette from "../theme/palette";
import ComponentsOverrides from "../overrides";
import customShadows from "../theme/customShadows";
import shadows from "../theme/shadows";

export default function ThemeProvider({ children }) {
  const themeOptions = {
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    palette,
    shape: { borderRadius: 6 },
    typography: typography,
    shadows: shadows(),
  };
  const theme = createTheme(themeOptions);

  theme.components = ComponentsOverrides({
    ...theme,
    customShadows: customShadows(),
  });

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        />

        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
