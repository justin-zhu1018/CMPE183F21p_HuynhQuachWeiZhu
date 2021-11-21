import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, Routes, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// Pages
import MainGame from './pages/main/main'

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<MainGame />} />
      </Routes>
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);