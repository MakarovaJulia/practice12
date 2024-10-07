export interface Anime {
    mal_id: number;
    title: string;
    rating: string;
    episodes: string;
    favorites: string;
    rank: string;
    status: string;
    popularity: string;
    type: string;
    genres: [
      {
        mal_id: string;
        type: string;
        name: string;
        url: string;
      }
    ],
    producers: [
      {
        mal_id: string;
        type: string;
        name: string;
        url: string;
      }
    ],
    aired: {
      from: string;
      to: string;
    }
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    synopsis: string;
  }