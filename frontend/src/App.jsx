import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Pages from "./pages";
import { NavBar } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Pages.Home />} />
          <Route path="/ifc" element={<Pages.IfcViewer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
