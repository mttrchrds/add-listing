import ReactDOM from "react-dom/client";
import AddListing from "./pages/add_listing";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#468cc8",
      light: "#79b6e0",
      dark: "#3469a4",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <AddListing />
    </ThemeProvider>
  </>
);
