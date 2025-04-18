import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material";

// Pages
import Home from "./pages/Home";
import Monitoring from "./pages/Monitoring";
import ManualControl from "./pages/ManualControl";
import Database from "./pages/Database";
import AyamSettings from "./pages/AyamSettings";

// Components
import Frame from "./components/Frame";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      palette: {
        red: "#FF0000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Frame>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/controller" element={<ManualControl />} />
            <Route path="/database" element={<Database />} />
            <Route path="/settings" element={<AyamSettings />} />
          </Routes>
        </Frame>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
