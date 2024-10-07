import {create} from 'zustand';

interface AnimeStore {
  favorites: string[];
  addFavorite: (animeId: string) => void;
}

export const useAnimeStore = create<AnimeStore>((set) => ({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  addFavorite: (animeId) => set((state) => {
    const newFavorites = [...state.favorites, animeId];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    return { favorites: newFavorites };
  }),
}));