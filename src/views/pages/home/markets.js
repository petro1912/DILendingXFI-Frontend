import {useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Correct CSS import
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CardMarket from './CardMarket';

// Import Swiper styles
import { useRouter } from 'next/router';
import { Navigation, Autoplay } from 'swiper/modules';


const ImageSwiper = () => {

  const router = useRouter();

  const markets = [{
    supply: "usdt",
    collateral: "xusd",
  }, {
    supply: "usdt",
    collateral: "xfi",
  },{
    supply: "usdt",
    collateral: "empx",
  },{
    supply: "xusd",
    collateral: "xfi",
  },{
    supply: "xusd",
    collateral: "empx",
  }]

  const goMarket = (market) => {
    router.push(`/markets/${market.supply}-${market.collateral}`)
  }

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={4}
      navigation={true}
      autoplay={{ delay: 3000 }}
      loop={true}
      modules={[Navigation, Autoplay]}
    >
      {markets.map((market, index) => {
        return (
          <SwiperSlide
            hover = "true"
            style={{cursor: 'pointer'}}
            key={index}
            onClick={() => goMarket(market)}>
            <CardMarket
              supply={market.supply}
              collateral={market.collateral} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
};

export default ImageSwiper;
