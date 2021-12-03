import { InputHTMLAttributes, KeyboardEvent, useRef } from 'react';

import { SearchNormal1 } from 'iconsax-react';
import { useRouter } from 'next/router';

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {}
const Search = (props: ISearch) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchRef.current) {
        const { value } = searchRef.current;
        router.push(`/search?q=${value}`);
      }
    }
  };
  return (
    <div className="relative">
      <input
        ref={searchRef}
        className="hidden sm:inline-block text-sm px-5 py-2 focus:border-2 rounded-lg text-gray-700 dark:text-gray-50 border-gray-600 dark:border-gray-500 border bg-transparent"
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
      </span>
    </div>
  );
};

export default Search;
