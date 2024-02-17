import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LogView from "./components/LogView.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            color: "white", // Change this to desired typography color
          },
        },
      },
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout children={<App />} />,
  },
  {
    path: "/services/:serviceId",
    element: <DefaultLayout children={<LogView />} />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <BrowserRouter />
    </ThemeProvider>
  </React.StrictMode>,
);
