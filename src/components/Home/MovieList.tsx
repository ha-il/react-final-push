import { useQuery } from '@tanstack/react-query';
import { getComingSoon, getNowPlaying, getPopular } from '../../api';
import { useLocation } from 'react-router-dom';
import { ROUTER_PATH } from '../../shared/constants';

interface Movie {
  adult: boolean;
  backdrop_path: string; // "/*.jpg"
  genre_ids: number[]; // [16, 10751, 12, 35, 18]
  id: number; // 1022789
  original_language: string; // "en"
  original_title: string; //"Inside Out 2"
  overview: string; //"Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpecte: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone."
  popularity: number; // 6482.514
  poster_path: string; // "/*.jpg"
  release_date: string; // "2024-06-11"
  title: string; // "Inside Out 2"
  video: boolean;
  vote_average: number; //7.7
  vote_count: number; // 1815
}

export default function MovieList() {
  const { pathname } = useLocation();

  const movieRoutes = {
    [ROUTER_PATH.root]: getPopular,
    [ROUTER_PATH.comingSoon]: getComingSoon,
    [ROUTER_PATH.nowPlaying]: getNowPlaying,
  };

  const queryFn = movieRoutes[pathname];

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['movies' + pathname],
    queryFn,
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <ul>
      {data?.results.map((movie: Movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}
