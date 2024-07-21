import { useQuery } from '@tanstack/react-query';
import {
  getComingSoon,
  getNowPlaying,
  getPopular,
  makeBgPath,
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

  const currentMovie = data?.results.find(
    (movie: Movie) => movie.id === selectedId
  );

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
            <motion.div>
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
          <>
            <Modal
              layoutId={String(selectedId) + pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Contents>
                <ModalImgContainer>
                  <img src={makeBgPath(currentMovie.backdrop_path)} />
                  <strong>{currentMovie.title}</strong>
                </ModalImgContainer>
                <ModalInfoContainer>
                  <ModalInfo>
                    <Popularity>
                      {'예매율 '}
                      {(
                        Number(currentMovie.popularity.toFixed()) / 100
                      ).toFixed(1)}
                    </Popularity>
                    <ReleaseDate>
                      {'개봉 ' + currentMovie.release_date}
                    </ReleaseDate>
                    <VoteAverage>
                      {'평점 ' + currentMovie.vote_average.toFixed(1)}
                    </VoteAverage>
                  </ModalInfo>
                  <Overview>{currentMovie.overview}</Overview>
                </ModalInfoContainer>
                <ModalButton onClick={() => setSelectedId(0)}>X</ModalButton>
              </Contents>
            </Modal>
            <BackDropContainer tabIndex={-1}>
              <BackDrop tabIndex={-1}></BackDrop>
            </BackDropContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

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

const Modal = styled(motion.div)`
  background-color: #23272f;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;

  width: 30rem;
  height: 40rem;
  border-radius: 0.5rem;
  z-index: 11;

  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;

const ModalImgContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 50%;
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: linear-gradient(
      to right,
      #000 0%,
      rgba(0, 0, 0, 0.25) 25%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.25) 75%,
      #000 100%
    );
    background: linear-gradient(0deg, #23272f, transparent 50%);
    z-index: 2;
  }

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & strong {
    position: absolute;
    bottom: 3rem;
    left: 3rem;
    font-weight: 700;
    font-size: 40px;
    color: #fff;
    line-height: 1.45em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.72);
    z-index: 2;
    /* animation: tt1 1s 3s ease-in forwards; */
    pointer-events: none;
  }
`;

const ModalInfoContainer = styled.div`
  padding: 0 3rem;
`;

const ModalInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  margin: 1rem 0 2rem 0;
  font-weight: 700;
`;
const Popularity = styled.div`
  color: #46d369;
`;
const ReleaseDate = styled.div``;

const VoteAverage = styled.div``;

const Overview = styled.div`
  font-size: 1;
  line-height: 24px;
`;

const BackDropContainer = styled.div`
  z-index: 999;
  opacity: 0.7;
`;

const BackDrop = styled.div`
  background-color: #000;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const ModalButton = styled.button`
  background-color: #181818;
  cursor: pointer;
  margin: 1em;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
  border-radius: 50%;
  height: 36px;
  padding: 8px;
  width: 36px;
  color: white;
  border: none;
`;
