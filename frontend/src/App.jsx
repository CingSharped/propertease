import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import * as Pages from "./Pages";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Topbar, Sidebar } from "./components";

import "./App.css";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Topbar setIsSidebar={setIsSidebar} />
          <main className="content" style={{ display: "flex" }}>
            {isSidebar && <Sidebar isSidebar={isSidebar} />}
            <Box flexGrow={1}>
              <Routes>
                <Route path="/" element={<Pages.Home />} />
                <Route path="/ifc" element={<Pages.IfcViewer />} />
                <Route
                  path="/LandlordDashboard"
                  element={<Pages.LandlordDashboard />}
                />
                <Route
                  path="/TenantDashboard"
                  element={<Pages.TenantDashboard />}
                />
                <Route path="/Maintainance" element={<Pages.Maintainance />} />
                <Route path="/Property" element={<Pages.Property />} />
              </Routes>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
