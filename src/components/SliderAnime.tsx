import { Navigation } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';

import IAnime from '../models/Anime';
import AnimeCard from './AnimeCard';

interface SliderAnimeProps {
  data: IAnime[];
  title: string;
}
const SliderAnime = ({ data, title }: SliderAnimeProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold border-l-2 border-primary pl-3">
        {title}
      </h2>
      <div className="mt-5 relative ">
        <Swiper
          className="basic-swiper"
          autoHeight
          modules={[Navigation]}
          navigation
          // centeredSlides
          spaceBetween={14}
          slidesPerView={1.3}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 5.3,
            },
          }}
        >
          {data.map((anime: IAnime) => (
            <SwiperSlide key={anime.id}>
              <AnimeCard data={anime} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SliderAnime;
