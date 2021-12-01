import { ReactNode } from 'react';

import { Heart, Profile2User, Rank } from 'iconsax-react';
import Image from 'next/image';

import { Meta } from '../../layout/Meta';
import IAnime from '../../models/Anime';
import ICharacter from '../../models/Character';
import { Main } from '../../templates/Main';
import formatDate from '../../utils/formatYear';

type Params = {
  params: {
    id: string | number;
  };
};
interface DetailAnimeProps {
  anime: {
    data: IAnime;
    included: any[];
  };
  casting: {
    included: ICharacter[];
  };
}
interface IconTextProps {
  icon: ReactNode;
  text: string;
}
const IconWithText = (props: IconTextProps) => (
  <div className="flex items-center gap-2 font-bold">
    <span>{props.icon}</span>
    <p>{props.text}</p>
  </div>
);
const Character = ({ data }: { data: ICharacter }) => (
  <div className="group flex gap-5 rounded-xl p-3 w-full cursor-pointer hover:bg-white hover:shadow-xl dark:hover:bg-bg-dark-layer1 transition-all">
    <div className="h-[130px] w-1/3 relative flex-shrink-0  rounded-xl overflow-hidden">
      <Image
        src={data.attributes.image.original}
        layout="fill"
        objectFit="cover"
        priority
        alt={data.attributes.slug}
      />
    </div>
    <div className="flex-1">
      <h5 className="text-lg font-bold group-hover:text-primary">
        {data.attributes.names.en}
      </h5>
      <p className="text-gray-600 text-sm mt-3">
        {data.attributes.names.ja_jp}
      </p>
    </div>
  </div>
);
const Genres = ({ text }: { text: string }) => (
  <div className="cursor-default px-2 py-1 rounded-lg font-bold hover:bg-gray-900 text-gray-100 bg-gray-700 transition-all">
    {text}
  </div>
);
const Category = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div
    title={description}
    className="cursor-default px-2 py-1 rounded-lg font-bold hover:bg-gray-900 text-gray-100 bg-gray-700 transition-all"
  >
    {title}
  </div>
);
const DetailAnime = ({ anime, casting }: DetailAnimeProps) => {
  const iconProps = {
    className: 'bold-svg',
    size: '24',
    color: '#a0aec0',
  };
  return (
    <Main
      meta={
        <Meta
          title={anime.data.attributes.titles.en}
          description="Something ...."
        />
      }
    >
      <div className=" flex-wrap lg:flex-nowrap flex gap-8 ">
        <div className="flex-1">
          <div className="w-full overflow-hidden h-auto rounded-lg">
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${anime.data.attributes.youtubeVideoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h1 className="text-3xl font-bold mt-5">
            {anime.data.attributes.titles.en}
            <span className="text-xl text-gray-600 dark:text-gray-500 font-bold">
              {`  ( ${formatDate(anime.data.attributes.startDate)} )`}
            </span>
          </h1>
          <div className="mt-3">
            <div className="flex flex-wrap md:flex-nowrap gap-3 items-center justify-between text-gray-600 dark:text-gray-500">
              <p className="font-bold">
                Start date at {anime.data.attributes.startDate}
              </p>
              <div className="flex items-center gap-4">
                <IconWithText
                  icon={<Heart {...iconProps} />}
                  text={`${anime.data.attributes.favoritesCount} favourite`}
                />
                <IconWithText
                  icon={<Profile2User {...iconProps} />}
                  text={`${anime.data.attributes.userCount} views`}
                />
                <IconWithText
                  icon={<Rank {...iconProps} />}
                  text={`Rank ${anime.data.attributes.popularityRank}`}
                />
              </div>
            </div>
            <p className="mt-5 text-gray-700 dark:text-gray-100 leading-7">
              {anime.data.attributes.synopsis}
            </p>
          </div>
          <h2 className="mt-8 text-2xl font-bold border-l-2 border-primary pl-3">
            Characters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mt-5 gap-2">
            {casting?.included.map((char) => (
              <>
                <div className="col-span-1">
                  <Character data={char} key={char.id} />
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-full lg:flex-shrink-0 lg:w-[350px] space-y-8">
          <div className="relative h-[480px]  overflow-hidden rounded-lg">
            <Image
              alt={anime.data.attributes.slug}
              src={anime.data.attributes.posterImage.large}
              objectFit="cover"
              layout="fill"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold border-l-2 border-primary pl-3">
              Genres
            </h2>
            <div className="mt-5 flex gap-2 flex-wrap">
              {anime.included &&
                anime.included
                  .filter((a: any) => a.type === 'genres')
                  .map((ani: any) => (
                    <Genres
                      key={ani.id as string}
                      text={ani.attributes.name as string}
                    />
                  ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold border-l-2 border-primary pl-3">
              Categories
            </h2>
            <div className="mt-5 flex gap-2 flex-wrap">
              {anime.included &&
                anime.included
                  .filter((a: any) => a.type === 'categories')
                  .map((ani: any) => (
                    <Category
                      key={ani.id as string}
                      title={ani.attributes.title as string}
                      description={ani.attributes.description as string}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default DetailAnime;

export const getServerSideProps = async ({ params }: Params) => {
  const { id } = params;
  try {
    const animeRes = await fetch(
      `${process.env.API_URL}/anime/${id}?include=categories,genres`
    );
    const castingRes = await fetch(
      `${process.env.API_URL}/castings?filter[media_id]=${id}&include=character`
    );
    const anime = await animeRes.json();
    const casting = await castingRes.json();
    if (!anime.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        anime,
        casting,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
