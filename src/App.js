import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Navbar/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/Routes';


function App() {
  return (
    <div className="App">
      <Router>
      <Navigation/>
     <AppRoutes/>
     </Router>

    </div>
  );
}

export default App;
