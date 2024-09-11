import {useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Correct CSS import
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CardMarket from './CardMarket';

// Import Swiper styles
import { useRouter } from 'next/router';
import { Navigation, Autoplay } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { getPrincipalTokenSymbol } from 'src/wallet/utils';


const MarketSwiper = () => {

  const router = useRouter();
  const pools = useSelector((state) => state.pools.entities);

  const goMarket = (pool) => {
    router.push(`/markets/${getPrincipalTokenSymbol(pool)}`)
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
      {pools && pools.map((pool, index) => {
        return (
          <SwiperSlide
            hover = "true"
            style={{cursor: 'pointer'}}
            key={index}
            onClick={() => goMarket(pool)}>
            <CardMarket
              pool={pool} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
};

export default MarketSwiper;
