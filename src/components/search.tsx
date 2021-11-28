import { InputHTMLAttributes } from 'react';

import { SearchNormal1 } from 'iconsax-react';

interface ISearch extends InputHTMLAttributes<HTMLInputElement> {}
const Search = (props: ISearch) => {
  return (
    <div className="relative">
      <input
        className="hidden sm:inline-block text-sm px-5 py-2 focus:border-2 rounded-lg text-gray-700 dark:text-gray-50 border-gray-600 dark:border-gray-500 border bg-transparent"
        {...props}
      />
      <span className=" absolute right-3 top-1/2 -translate-y-1/2">
        <SearchNormal1 size="24" variant="Outline" color="#DC5A5B" />
      </span>
    </div>
  );
};

export default Search;
