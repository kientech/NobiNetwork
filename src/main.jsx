import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { mode } from "@chakra-ui/theme-tools";

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "#1A202C")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
