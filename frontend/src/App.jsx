import React from 'react';
import './App.css';
import {IfcViewer} from './Pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>IFC Viewer with React</h1>
      <Routes>
        <Route index element= {<IfcViewer />}/>
      </Routes>
      
    </div>
  );
}

export default App;