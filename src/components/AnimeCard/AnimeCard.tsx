import React from 'react';
import { useAnimeStore } from '../../store/useAnimeStore';
import { Anime } from './Anime.interfaces';
import './AnimeCard.styles.sass'; 

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const { addFavorite } = useAnimeStore();

  const handleAddFavorite = () => {
    addFavorite(anime.mal_id.toString());
  };

  return (
    <div className="anime-card">
      <img src={anime.images.jpg.image_url} alt={anime.title} />
      <h3>{anime.title}</h3>
      {anime.genres.map(genre => <p>{genre.name}</p>)}
      <p>{anime.synopsis.length > 100 ? `${anime.synopsis.substring(0, 100)}...` : anime.synopsis}</p>
      <button>
        <a href={`/anime/${anime.mal_id}`}>View Details</a>
      </button>
      <button onClick={handleAddFavorite}>Add to Favorites</button>
    </div>
  );
};

export default AnimeCard;