import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
