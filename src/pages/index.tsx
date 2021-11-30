import { GetStaticProps } from 'next';
import Image from 'next/image';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';

import AnimeCard from '../components/AnimeCard';
import Button from '../components/buttons/index';
import { Meta } from '../layout/Meta';
import IAnime from '../models/Anime';
import { Main } from '../templates/Main';

const formatDate = (date: string): string => date.substring(0, 4);

const Card = ({ data }: { data: IAnime }) => (
  <div>
    <div
      style={{ height: 450 }}
      className="p-5 rounded-lg overflow-hidden bottom-4 relative bg-top w-full  bg-no-repeat bg-gradient-to-b"
    >
      <Image
        src={data.attributes.coverImage.large}
        layout="fill"
        alt="Image"
        priority
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-linear-full lg:bg-linear-main ">
        <div className="w-full lg:w-1/2 absolute left-0 bottom-0 p-10 text-white">
          <span className="bg-linear-full py-1 px-2 rounded-md text-gray-300 font-bold">
            {data.attributes.ageRatingGuide}
          </span>
          <h1 className="text-4xl font-bold ">
            {data.attributes.titles.en || data.attributes.titles.en_jp}
          </h1>
          <div className="flex gap-5 items-center text-gray-200">
            <span className="font-bold">
              {formatDate(data.attributes.startDate)}{' '}
            </span>{' '}
            <p>
              Rating :{' '}
              <span className="font-bold">{data.attributes.averageRating}</span>{' '}
            </p>
            <p>
              {' '}
              <span className="font-bold">{data.attributes.episodeCount} </span>
              {' Episode'}
            </p>
          </div>
          <p className="mt-5 line-clamp-3 leading-relaxed text-gray-100">
            {data.attributes.synopsis}
          </p>
          <Button className="mt-5">View Now</Button>
        </div>
      </div>
    </div>
  </div>
);

interface HomeProps {
  animes: IAnime[];
  mangas: IAnime[];
}
const Index = ({ animes, mangas }: HomeProps) => {
  console.log(mangas);
  let swiper = null;
  if (!animes || !mangas) {
    swiper = 'Error';
  } else {
    swiper = (
      <Swiper
        className="swiper-home"
        autoHeight
        modules={[Autoplay, Navigation]}
        navigation
        autoplay={{ delay: 7000 }}
        spaceBetween={0}
        slidesPerView={1}
      >
        {animes.map((anime: IAnime) => (
          <SwiperSlide
            style={{
              padding: 30,
            }}
            key={anime.id}
          >
            <Card data={anime} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <Main
      meta={
        <Meta
          title="Anime World"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      {swiper}
      <div className="px-[30px]">
        <h2 className="text-2xl font-bold border-l-2 border-primary pl-3">
          Trending Anime
        </h2>
        <div className="mt-5 relative ">
          <Swiper
            className="basic-swiper"
            autoHeight
            modules={[Navigation]}
            navigation
            // centeredSlides
            spaceBetween={14}
            slidesPerView={2.3}
            breakpoints={{
              640: {
                slidesPerView: 3.3,
              },
              1024: {
                slidesPerView: 5.3,
              },
            }}
          >
            {animes.map((anime: IAnime) => (
              <SwiperSlide key={anime.id}>
                <AnimeCard data={anime} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="mt-8 px-[30px]">
        <h2 className="text-2xl font-bold border-l-2 border-primary pl-3">
          Trending Manga
        </h2>
        <div className="mt-5 relative ">
          <Swiper
            className="basic-swiper"
            autoHeight
            modules={[Navigation]}
            navigation
            // centeredSlides
            spaceBetween={14}
            slidesPerView={2.3}
            breakpoints={{
              640: {
                slidesPerView: 3.3,
              },
              1024: {
                slidesPerView: 5.3,
              },
            }}
          >
            {mangas.map((manga: IAnime) => (
              <SwiperSlide key={manga.id}>
                <AnimeCard data={manga} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Main>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const animeRes = await fetch(`${process.env.API_URL}/trending/anime`);
    const mangaRes = await fetch(`${process.env.API_URL}/trending/manga`);
    const { data: animes } = await animeRes.json();
    const { data: mangas } = await mangaRes.json();
    return {
      props: {
        animes,
        mangas,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
