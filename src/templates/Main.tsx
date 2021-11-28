import { ReactNode } from 'react';

import Navbar from '../components/header/navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <>
      <Navbar />
      <div className="container">{props.children}</div>
    </>
  );
};

export { Main };
