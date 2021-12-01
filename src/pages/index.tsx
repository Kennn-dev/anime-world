import { GetStaticProps } from 'next';
import Image from 'next/image';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '../components/buttons/index';
import SliderAnime from '../components/SliderAnime';
import { Meta } from '../layout/Meta';
import IAnime from '../models/Anime';
import { Main } from '../templates/Main';
import getHomeData from '../utils/fetch/homeData';
import formatDate from '../utils/formatYear';

const Card = ({ data }: { data: IAnime }) => {
  return (
    <div>
      <div className=" h-[500px] sm:h-[450px] p-5 rounded-lg overflow-hidden bottom-4 relative bg-top w-full  bg-no-repeat bg-gradient-to-b">
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
            <h1 className="text-2xl xs:text-4xl font-bold ">
              {data.attributes.titles.en || data.attributes.titles.en_jp}
            </h1>
            <div className="flex-wrap xs:flex-nowrap flex gap-5 items-center text-gray-200">
              <span className="font-bold">
                {formatDate(data.attributes.startDate)}{' '}
              </span>{' '}
              <p>
                Rating :{' '}
                <span className="font-bold">
                  {data.attributes.averageRating}
                </span>{' '}
              </p>
              <p>
                {' '}
                <span className="font-bold">
                  {data.attributes.episodeCount}{' '}
                </span>
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
};

interface HomeProps {
  animes: IAnime[];
  popular: IAnime[];
  upcoming: IAnime[];
  rating: IAnime[];
}
const Index = ({ animes, popular, upcoming, rating }: HomeProps) => {
  // console.log();
  let swiper = null;
  if (!animes) {
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
        <SliderAnime title="Most Popular Anime" data={popular} />
      </div>
      <div className="mt-8 px-[30px]">
        <SliderAnime title="Highest Rate Anime" data={rating} />
      </div>
      <div className="mt-8 px-[30px]">
        <SliderAnime title="Top Upcoming Anime" data={upcoming} />
      </div>
    </Main>
  );
};

export default Index;
export const getStaticProps: GetStaticProps = async () => {
  try {
    const { animes, popular, upcoming, rating } = await getHomeData();
    return {
      props: {
        animes,
        popular,
        upcoming,
        rating,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
