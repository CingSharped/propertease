import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as Pages from "./pages";
import { NavBar } from './components';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Pages.Home />} />
          <Route path="/ifc" element={<Pages.IfcViewer />} />
          <Route path="/login" element={<Pages.LoginSignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;