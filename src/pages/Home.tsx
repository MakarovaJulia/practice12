import React from 'react';
import AnimeList from '../components/AnimeList/AnimeList';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Anime List</h1>
      <AnimeList />
    </div>
  );
};

export default Home;