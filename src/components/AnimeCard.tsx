import Image from 'next/image';
import Link from 'next/link';

import IAnime from '../models/Anime';

interface CardProps {
  className?: string;
  data: IAnime;
}
const Card = (props: CardProps) => {
  const localClass =
    'h-[300px] relative rounded-lg overflow-hidden cursor-pointer';
  const title =
    props.data.attributes.titles.en ||
    props.data.attributes.titles.en_us ||
    props.data.attributes.titles.en_jp ||
    props.data.attributes.titles.ja_jp;
  return (
    <>
      {' '}
      <Link href={`/detail/${props.data.id}`}>
        <a>
          <div
            title={title}
            className={
              props.className ? `${localClass} ${props.className} ` : localClass
            }
          >
            <span className="z-10 absolute top-[5%] left-[5%] bg-primary px-2 py-1 rounded-md text-gray-50 ">
              {`Rank ${props.data.attributes?.popularityRank}`}
            </span>
            <Image
              src={props.data.attributes?.posterImage?.medium}
              layout="fill"
              alt="Image"
              priority
              objectFit="cover"
            />
          </div>
          <h3 className="mt-2 text-lg line-clamp-1 font-bold text-gray-700 dark:text-gray-100">
            {title}{' '}
          </h3>
        </a>
      </Link>
    </>
  );
};

export default Card;
