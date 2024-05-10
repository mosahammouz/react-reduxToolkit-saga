import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SwapiView from './items/swapi/SwapiView';
import DetailsPageView from './items/details/detailsView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SwapiView />} />
          <Route path="details/:id" element={<DetailsPageView/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
