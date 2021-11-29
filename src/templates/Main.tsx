import { ReactNode } from 'react';

import Navbar from '../components/header/navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <main className="bg-gray-50 dark:bg-bg-dark-layer2">
      {props.meta}
      <Navbar />
      <div className="container px-8 mx-auto mt-10">{props.children}</div>
      <footer className="py-10 ">This is footer</footer>
    </main>
  );
};

export { Main };
