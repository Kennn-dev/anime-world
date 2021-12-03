import Image from 'next/image';
import { LogoGithub, LogoLinkedin, LogoFacebook } from 'react-ionicons';

const Footer = () => {
  const iconProps = {
    style: {
      cursor: 'pointer',
      marginLeft: '1.25rem',
    },
    color: '#DC5A5B',
    height: '24px',
    width: '24px',
  };
  return (
    <footer className="mt-[100px] py-10  bg-white dark:bg-bg-dark-layer1 text-gray-700 dark:text-gray-50 ">
      <div className="flex justify-between items-center px-0 sm:px-8 mx-auto container">
        <div className="flex gap-3 text-xl items-center font-bold pl-[30px]">
          <Image
            src="/kistu.png"
            alt="Logo"
            objectFit="contain"
            width={50}
            height={50}
            priority
          />
          <h1 className="invisible xs:visible">Anime World</h1>
        </div>
        <div className="flex  pr-[30px] first:ml-0">
          <a
            href="https://github.com/Kennn-dev/anime-world"
            target="_blank"
            rel="noreferrer"
          >
            <LogoGithub {...iconProps} />
          </a>
          <LogoLinkedin {...iconProps} />
          <LogoFacebook {...iconProps} />
        </div>
      </div>
      <div className="my-8 w-full text-center">
        <p className="font-bold inline">Make with</p> &#128187;{' '}
        <p className="font-bold inline">and</p> &#128293;
        <p className="text-sm text-gray-400 ">Released under MIT License</p>
        <p className="text-sm text-gray-400 ">Copyright @ 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
