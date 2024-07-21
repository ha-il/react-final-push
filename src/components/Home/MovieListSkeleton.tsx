import styled from 'styled-components';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MovieListSkeleton() {
  return (
    <Swiper
      slidesPerView={'auto'}
      slidesPerGroup={5}
      spaceBetween={32}
      centeredSlides={false}
      grabCursor={true}
      breakpoints={{}}
      modules={[Pagination]}
    >
      {[0, 1, 2, 3, 4].map((v: number) => (
        <SSwiperSlide key={v}>
          <ImgContainer>
            <div />
          </ImgContainer>
          <div></div>
        </SSwiperSlide>
      ))}
    </Swiper>
  );
}

const SSwiperSlide = styled(SwiperSlide)`
  max-width: 10.625rem;
  height: 18.4375rem;
`;

const ImgContainer = styled.div`
  position: relative;
  max-width: 10.625rem;
  height: 14.625rem;
  & div {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    background-color: gray;
  }
`;
