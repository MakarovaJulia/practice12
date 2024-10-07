const BASE_URL = 'https://api.jikan.moe/v4';

export const fetchAnime = async (page: number) => {
  const response = await fetch(`${BASE_URL}/anime?page=${page}`);
  const data = await response.json();
  return data;
};

export const fetchAnimeDetails = async (id: string) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch anime details');
    }
    const data = await response.json();
    return data;
  };