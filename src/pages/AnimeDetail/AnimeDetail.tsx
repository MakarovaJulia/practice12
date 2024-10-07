
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../../services/api';
import './AnimeDetail.styles.sass'

const AnimeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animeDetails, setAnimeDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAnimeDetails = async () => {
      if (id) {
        try {
          const data = await fetchAnimeDetails(id);
          setAnimeDetails(data.data);
        } catch (err) {
          setError('Failed to fetch anime details');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Anime ID is not available');
        setLoading(false);
      }
    };

    getAnimeDetails();
  }, [id]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!animeDetails) return null;

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '.');; 
  };

  const startDateFormatted = formatDate(animeDetails.aired?.from);
  const endDateFormatted = formatDate(animeDetails.aired?.to);

  return (
    <div className="anime-detail">
      <div className="detail-content">
      <div className="info-container">
        <h1>{animeDetails.title}</h1>
        <h2>{animeDetails.title_japanese}</h2>       
        <p>{startDateFormatted} - {endDateFormatted}</p>
        <p><strong>Episodes:</strong> {animeDetails.episodes}</p>
          <p><strong>Rating:</strong> {animeDetails.rating}</p>
          <p><strong>Favorites:</strong> {animeDetails.favorites}</p>
          <p><strong>Number of Ratings:</strong> {animeDetails.scored_by}</p>
        </div>
        <div className="image-container">
          <img src={animeDetails.images.jpg.large_image_url} alt={animeDetails.title} />
        </div>
        <div className="trailer-container">
          {animeDetails.trailer?.youtube_id && (
            <div className="video-container">
              <iframe
                title="Trailer"
                src={`https://www.youtube.com/embed/${animeDetails.trailer.youtube_id}`}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default AnimeDetail;