import Image from 'next/image';

import IAnime from '../models/Anime';

interface CardProps {
  className?: string;
  data: IAnime;
}
const Card = (props: CardProps) => {
  const localClass = 'h-[300px] relative rounded-lg overflow-hidden';
  return (
    <div
      className={
        props.className ? `${localClass}${props.className}` : localClass
      }
    >
      <Image
        src={props.data.attributes.posterImage.medium}
        layout="fill"
        alt="Image"
        priority
        objectFit="cover"
      />
    </div>
  );
};

export default Card;
