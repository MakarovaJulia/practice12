import React, { useEffect, useState } from 'react';
import { fetchAnime } from '../../services/api';
import { Anime } from '../AnimeCard/Anime.interfaces';
import AnimeCard from '../AnimeCard/AnimeCard';
import Pagination from '../Pagination/Pagination';
import './AnimeList.styles.sass';

const AnimeList: React.FC = () => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>(''); 
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [ratingFilter, setRatingFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [genresFilter, setGenresFilter] = useState<string[]>([]);
  const [excludedGenresFilter, setExcludedGenresFilter] = useState<string[]>([]);
  const [producersFilter, setProducersFilter] = useState<string[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [uniqueRatings, setUniqueRatings] = useState<string[]>([]);
  const [uniqueStatuses, setUniqueStatuses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAnime(page);
      setAnime(data.data);

      const types = [...new Set(data.data.map((item: Anime) => item.type))].filter((type): type is string => typeof type === 'string');
      const ratings = [...new Set(data.data.map((item: Anime) => item.rating))].filter((rating): rating is string => typeof rating === 'string');
      const statuses = [...new Set(data.data.map((item: Anime) => item.status))].filter((status): status is string => typeof status === 'string');
      
      setUniqueTypes(types);
      setUniqueRatings(ratings);
      setUniqueStatuses(statuses);
      setSortBy('popularity')
    };
    
    getData();
  }, [page]);
  

  const sortAnime = (a: Anime, b: Anime) => {
    switch (sortBy) {
      case 'popularity':
        return Number(b.popularity) - Number(a.popularity);
      case 'rating':
        return Number(b.rating) - Number(a.rating);
      case 'favorites':
        return Number(b.favorites) - Number(a.favorites);
      case 'scored_by':
        return Number(b.rank) - Number(a.rank);
      case 'episodes':
        return Number(b.episodes) - Number(a.episodes);
      case 'start_date':
        return new Date(a.aired?.from || '').getTime() - new Date(b.aired?.from || '').getTime();
      case 'end_date':
        return new Date(a.aired?.to || '').getTime() - new Date(b.aired?.to || '').getTime();
      default:
        return 0;
    }
  };

  const filterAnime = (animeList: Anime[]) => {
    return animeList.filter((item) => {
      if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

      if (typeFilter && item.type !== typeFilter) return false;

      if (ratingFilter && item.rating !== ratingFilter) return false;

      if (statusFilter && item.status !== statusFilter) return false;

      if (timePeriod.start && new Date(item.aired?.from || '').getTime() < new Date(timePeriod.start).getTime()) return false;
      if (timePeriod.end && new Date(item.aired?.to || '').getTime() > new Date(timePeriod.end).getTime()) return false;

      if (genresFilter.length > 0 && !genresFilter.some(genre => item.genres.some(g => g.name === genre))) return false;

      if (excludedGenresFilter.length > 0 && excludedGenresFilter.some(genre => item.genres.some(g => g.name === genre))) return false;


      if (producersFilter.length > 0 && !producersFilter.some(producer => item.producers.some(p => p.name === producer))) return false;

      return true;
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortedAndFilteredAnime = filterAnime([...anime]).sort(sortAnime);

  return (
    <div className="anime-list">
      <div className="search-bar">
          <input
            type="text"
            placeholder="Search anime by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
      </div>
      
      <div className="sort-options">
        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="favorites">Favorites</option>
          <option value="scored_by">Score</option>
          <option value="episodes">Episodes</option>
          <option value="start_date">Start Date</option>
          <option value="end_date">End Date</option>
        </select>
      </div>
      
      <div className="filter-options">
      <div>
          <label>Type:</label>
          <select onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
            <option value="">All</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Rating:</label>
          <select onChange={(e) => setRatingFilter(e.target.value)} value={ratingFilter}>
            <option value="">All</option>
            {uniqueRatings.map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Status:</label>
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
            <option value="">All</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Start Date:</label>
          <input type="date" onChange={(e) => setTimePeriod(prev => ({ ...prev, start: e.target.value }))} />
          <label>End Date:</label>
          <input type="date" onChange={(e) => setTimePeriod(prev => ({ ...prev, end: e.target.value }))} />
        </div>

        <div>
          <label>Genres:</label>
          {anime.flatMap(item => item.genres.map(genre => genre.name)).filter((value, index, self) => self.indexOf(value) === index).map((genre) => (
            <label key={genre}>
              <input 
                type="checkbox" 
                checked={genresFilter.includes(genre)} 
                onChange={() => {
                  setGenresFilter(prev =>
                    prev.includes(genre)
                      ? prev.filter(g => g !== genre)
                      : [...prev, genre]
                  );
                }} 
              />
              {genre}
            </label>
          ))}
        </div>

        <div>
          <label>Excluded Genres:</label>
          {anime.flatMap(item => item.genres.map(genre => genre.name)).filter((value, index, self) => self.indexOf(value) === index).map((genre) => (
            <label key={genre}>
              <input 
                type="checkbox" 
                checked={excludedGenresFilter.includes(genre)} 
                onChange={() => {
                  setExcludedGenresFilter(prev =>
                    prev.includes(genre)
                      ? prev.filter(g => g !== genre)
                      : [...prev, genre]
                  );
                }} 
              />
              {genre}
            </label>
          ))}
        </div>

        <div>
          <label>Producers:</label>
          {anime.flatMap(item => item.producers.map(producer => producer.name)).filter((value, index, self) => self.indexOf(value) === index).map((producer) => (
            <label key={producer}>
              <input 
                type="checkbox" 
                checked={producersFilter.includes(producer)} 
                onChange={() => {
                  setProducersFilter(prev =>
                    prev.includes(producer)
                      ? prev.filter(p => p !== producer)
                      : [...prev, producer]
                  );
                }} 
              />
              {producer}
            </label>
          ))}
        </div>

      </div>

      {sortedAndFilteredAnime.map((item) => (
        <AnimeCard key={item.mal_id} anime={item} />
      ))}
      
      <Pagination currentPage={page} setPage={setPage} />
    </div>
  );
};

export default AnimeList;