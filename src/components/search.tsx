import {
  InputHTMLAttributes,
  KeyboardEvent,
  useRef,
  useState,
  MouseEvent,
} from 'react';

import { SearchNormal1 } from 'iconsax-react';
import { useRouter } from 'next/router';

import useMediaQuery from '../hooks/useMediaQuery';

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {
  className: string;
}
const Search = ({ className, ...props }: ISearch) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const searchRef2 = useRef<HTMLInputElement>(null);
  const isActive = useMediaQuery('(min-width: 640px)');
  const [isOpen, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchRef.current) {
        const { value } = searchRef.current;
        router.push(`/search?q=${value}`);
      }
      if (searchRef2.current) {
        const { value } = searchRef2.current;
        router.push(`/search?q=${value}`);
      }
    }
  };
  const handleClickOpen = (_e: MouseEvent<SVGElement>) => {
    setOpen((p) => !p);
  };
  return (
    <div className="relative">
      {isActive ? (
        <>
          {' '}
          <input
            ref={searchRef}
            className={`${
              className || ''
            } text-sm px-5 py-2 border focus:border-2 rounded-lg text-gray-700 dark:text-gray-50 border-gray-600 dark:border-gray-500 bg-transparent`}
            onKeyPress={handleKeyPress}
            autoComplete="on"
            {...props}
          />
          <span className=" absolute right-3 top-1/2 -translate-y-1/2">
            <SearchNormal1
              size="24"
              variant="Outline"
              color="rgba(113, 128, 150)"
            />
          </span>{' '}
        </>
      ) : (
        <>
          <input
            ref={searchRef2}
            className={`${
              isOpen ? 'inline-block' : 'hidden'
            } text-sm px-5 py-2 border focus:border-2 rounded-lg text-gray-700 dark:text-gray-50 border-gray-600 dark:border-gray-500 bg-transparent`}
            onKeyPress={handleKeyPress}
            placeholder="Search Anime ..."
            autoComplete="on"
          />
          <span className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2">
            <SearchNormal1
              onClick={handleClickOpen}
              size="24"
              variant="Outline"
              color="rgba(113, 128, 150)"
            />
          </span>{' '}
        </>
      )}
    </div>
  );
};

export default Search;
