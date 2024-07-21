import { useQuery } from '@tanstack/react-query';
import {
  getComingSoon,
  getNowPlaying,
  getPopular,
  makeImagePath,
} from '../../api';
import { useLocation } from 'react-router-dom';
import { ROUTER_PATH } from '../../shared/constants';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import MovieListSkeleton from './MovieListSkeleton';
import { Movie } from '../../shared/typings';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function MovieList() {
  const { pathname } = useLocation();
  const [selectedId, setSelectedId] = useState(0);

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

  if (isPending) return <MovieListSkeleton />;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <>
      <SSwiper
        slidesPerView={'auto'}
        slidesPerGroup={5}
        spaceBetween={32}
        centeredSlides={false}
        grabCursor={true}
        breakpoints={{}}
        navigation={true}
        modules={[Navigation, Pagination]}
      >
        {data?.results.map((movie: Movie, i: number) => (
          <SSwiperSlide key={movie.id} onClick={() => setSelectedId(movie.id)}>
            <motion.div layoutId={String(movie.id)}>
              <ImgContainer>
                <img src={makeImagePath(movie.poster_path)} alt="" />
                <Ranking>{i + 1}</Ranking>
              </ImgContainer>
              <div>
                <Title>{movie.title}</Title>
                <Info>
                  <span>{movie.vote_average.toFixed(1)}</span>
                  <span>|</span>
                  <span>
                    예매율{' '}
                    {(Number(movie.popularity.toFixed()) / 100).toFixed(1)}%
                  </span>
                </Info>
              </div>
            </motion.div>
          </SSwiperSlide>
        ))}
      </SSwiper>
      <AnimatePresence>
        {selectedId && (
          <Modal
            layoutId={String(selectedId)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button onClick={() => setSelectedId(0)}>X</button>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

const Modal = styled(motion.div)`
  background-color: tomato;
  position: fixed;
  top: 0;
  left: 27.8vw;
  width: 40rem;
  height: 40rem;
  border-radius: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    top: calc(50% - 26px);
    margin-top: -20px;
    border-radius: 50%;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.2);
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    z-index: 10;
  }
  .swiper-button-next::after,
  .swiper-button-prev::after {
    background-color: rgba(255, 255, 255, 0.8);
    color: slategray;
    font-size: 1rem;
    font-weight: 700;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`;

const SSwiperSlide = styled(SwiperSlide)`
  max-width: 10.625rem;
  height: 18.4375rem;
`;

const ImgContainer = styled.div`
  position: relative;
  max-width: 10.625rem;
  height: 14.625rem;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Ranking = styled.div`
  position: absolute;
  left: 0.5rem;
  bottom: 0.5rem;
  font-weight: 400;
  font-size: 50px;
  font-style: italic;
  color: #fff;
  line-height: 1em;
  z-index: 3;
  text-shadow: 2px 5px 5px rgba(0, 0, 0, 0.45);
`;

const Title = styled.div`
  display: block;
  flex-basis: 100%;
  overflow: hidden;
  margin-top: 14px;
  font-size: 18px;

  line-height: 1.167em;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Info = styled.div`
  margin-top: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
