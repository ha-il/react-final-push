import { useQuery } from '@tanstack/react-query';
import {
  BASE_URL,
  getComingSoon,
  getNowPlaying,
  getPopular,
  makeImagePath,
} from '../../api';
import { useLocation } from 'react-router-dom';
import { ROUTER_PATH } from '../../shared/constants';
import styled from 'styled-components';

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
        <Li key={movie.id}>
          <ImgContainer>
            <img src={makeImagePath(movie.poster_path)} alt="" />
          </ImgContainer>
          <div>
            <div>{movie.title}</div>
            <div>
              <span>{movie.vote_average}</span>
              <span>/</span>
              <span>{movie.popularity}</span>
            </div>
          </div>
        </Li>
      ))}
    </ul>
  );
}

const Li = styled.li`
  max-width: 10.625rem;
  height: 18.4375rem;
`;

const ImgContainer = styled.div`
  max-width: 10.625rem;
  height: 14.625rem;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;
