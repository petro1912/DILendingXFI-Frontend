import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Correct CSS import
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CardMarket from './CardMarket';

// Import Swiper styles
import SwiperCore, { Navigation, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const ImageSwiper = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      navigation={true}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      <SwiperSlide>
        <CardMarket supply="usdt" collateral="xusd" />
      </SwiperSlide>
      <SwiperSlide>
        <CardMarket supply="usdt" collateral="xfi" />
      </SwiperSlide>
      <SwiperSlide>
        <CardMarket supply="usdt" collateral="empx" />
      </SwiperSlide>
      <SwiperSlide>
        <CardMarket supply="xusd" collateral="xfi" />
      </SwiperSlide>
      <SwiperSlide>
        <CardMarket supply="xusd" collateral="empx" />
      </SwiperSlide>

    </Swiper>
  );
};

export default ImageSwiper;
