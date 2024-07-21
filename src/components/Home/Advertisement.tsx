import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Autoplay } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { getMovie, makeBgPath } from '../../api';
import { Link } from 'react-router-dom';

export default function Advertisement() {
  const id = '1022789';

  const { isPending, data } = useQuery({
    queryKey: ['movieId', id],
    queryFn: ({ queryKey }) => getMovie(queryKey[1]),
  });

  console.log(data);

  return (
    <AdContainer>
      <SSwiper
        grabCursor={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SSwiperSlide>
          <Contents>
            <ImgContainer>
              {isPending ? (
                <div></div>
              ) : (
                <>
                  <img src={makeBgPath(data.backdrop_path)} />
                  <strong>{data.title}</strong>
                  <span>{data.overview}</span>
                </>
              )}
            </ImgContainer>
          </Contents>
        </SSwiperSlide>
        <SSwiperSlide>
          <Link
            to="https://nomadcoders.notion.site/02feb5f837414326a4eb937636f96e2a"
            target="_blank"
          >
            <Contents>
              <AdImgComtainer>
                <img src="../../public/images/ad/0.jpg" alt="" />
              </AdImgComtainer>
            </Contents>
          </Link>
        </SSwiperSlide>
        <SSwiperSlide>
          <Link to="https://ha-il.github.io/" target="_blank">
            <Contents>
              <AdImgComtainer>
                <img src="../../public/images/ad/1.jpg" alt="" />
              </AdImgComtainer>
            </Contents>
          </Link>
        </SSwiperSlide>
      </SSwiper>
    </AdContainer>
  );
}

const AdContainer = styled.section`
  height: 20rem;
  background-color: #000;
`;

const SSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const SSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #000;
  min-width: 980px;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 980px;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;

const AdImgComtainer = styled.div`
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
      rgba(0, 0, 0, 0.1) 15%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.1) 85%,
      #000 100%
    );
    z-index: 2;
  }
`;

const ImgContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;

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
    z-index: 2;
  }

  & div {
    display: block;
    width: 100%;
    height: 100%;
    background-color: gray;
  }

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & strong {
    position: absolute;
    top: 25%;
    left: 1rem;
    font-weight: 700;
    font-size: 40px;
    color: #fff;
    line-height: 1.45em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.72);
    z-index: 2;
    /* animation: tt1 1s 3s ease-in forwards; */
    pointer-events: none;
  }

  & span {
    display: -webkit-box;
    overflow: hidden;
    position: absolute;
    width: 30.625rem;
    top: 50%;
    left: 1rem;
    max-width: 100%;
    font-size: 20px;
    color: #fff;
    line-height: 1.45em;
    text-overflow: ellipsis;
    word-break: break-all;
    z-index: 3;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    /* animation: tt2 1s 3s ease-in forwards; */
    pointer-events: none;
  }
`;
