import React, { ReactNode, useState } from 'react';

import { HambergerMenu } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Search from '../search';
import ToggleButton from './toggle-button/toggle-button';

interface IMenuItem {
  children: ReactNode;
  href: string;
}
const MenuItem = ({ children, href }: IMenuItem) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <li
      className={`${
        isActive ? 'border-b-2 border-b-primary' : ''
      } py-5 sm:py-7 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer`}
    >
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
};
const DropdownMobile = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } sm:hidden px-4 pb-5 w-full  bg-gray-50 text-gray-700 dark:text-gray-50 dark:bg-bg-dark-layer1 `}
    >
      <ul className="font-bold gap-8 content-center list-none transition-colors">
        <MenuItem href="/">Home</MenuItem>
        <MenuItem href="/about">About</MenuItem>
        <MenuItem href="/settings">Settings</MenuItem>
        <div className="flex items-center justify-between gap-8 mt-5 ">
          <p className="text-opacity-80 opacity-70">Dark Mode</p>
          <ToggleButton />
        </div>
      </ul>
    </div>
  );
};
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="flex content-center  w-full  bg-gray-50 text-gray-700 dark:text-gray-50 dark:bg-bg-dark-layer1">
        <div className="flex items-center justify-between container mx-auto py-5 sm:py-0 px-4 sm:px-8">
          <div className="block sm:hidden">
            <HambergerMenu
              onClick={() => setIsOpen(!isOpen)}
              size="24"
              variant="Outline"
              color="#DC5A5B"
            />
          </div>
          <div className="flex">
            <Image
              alt="Logo"
              src="/kistu.png"
              width={35}
              height={35}
              objectFit="contain"
              quality={100}
              priority
            />
            <ul className="hidden sm:flex font-bold gap-8 content-center  ml-10 list-none transition-colors">
              <MenuItem href="/">Home</MenuItem>
              <MenuItem href="/about">About</MenuItem>
              <MenuItem href="/settings">Settings</MenuItem>
            </ul>
          </div>
          <div className="flex items-center gap-5 sm:gap-8">
            <Search width={200} placeholder="Search Anime ..." />
            <span className="hidden md:flex gap-3 text-xl">
              ⛅
              <ToggleButton />
              🕶️
            </span>
          </div>
        </div>
      </nav>
      <DropdownMobile isOpen={isOpen} />
    </>
  );
};

export default Navbar;
