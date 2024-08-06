import ReactDOM from "react-dom/client";
import AddListing from "./pages/add_listing";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <CssBaseline />
    <AddListing />
  </>
);
