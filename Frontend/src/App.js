import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Schedular from './Components/Schedular';  
import Home from './Components/Home';
import Summary from './Components/Summary' 

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scheduler" element={<Schedular />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
