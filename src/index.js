import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, Routes, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// Pages
import MainGame from './pages/main/main'
import WorldControl from './pages/world-control/world-control'

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<MainGame />} />
        <Route exact path="/world-control" element={<WorldControl />} />
      </Routes>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);