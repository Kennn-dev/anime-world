import { GetServerSideProps } from 'next';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Paginate from 'react-paginate';

import AnimeCard from '../components/AnimeCard';
import { Meta } from '../layout/Meta';
import IAnime from '../models/Anime';
import { Main } from '../templates/Main';

const PAGE_NUMBER = 20;
interface SearchProps {
  query: string;
  page: number;
  anime: {
    data: IAnime[];
    meta: {
      count: number;
    };
  };
}

const Search = ({ anime, query, page }: SearchProps) => {
  // console.log(page);
  const router = useRouter();
  const { theme } = useTheme();
  const classPaginate = `${
    theme === 'dark' ? `dark-pagination` : ''
  } pagination m-auto`;

  const handlePageClick = (e: any) => {
    router.push(`/search?q=${query}&page=${e.selected + 1}`);
  };
  return (
    <Main
      meta={<Meta title={`${query} | Search`} description="Search Anime" />}
    >
      <div className="container mx-auto px-[30px]">
        <h1 className="text-2xl font-bold">
          Search result for <span className="text-primary">{query}</span>
        </h1>
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 mt-8">
          {anime.data.map((ani) => (
            <div key={ani.id} className="col-span-1">
              <AnimeCard fullTitle data={ani} />
            </div>
          ))}
        </div>
        <div className="mt-7 ">
          <Paginate
            forcePage={page - 1}
            onPageChange={handlePageClick}
            className={classPaginate}
            pageCount={Math.floor(anime.meta.count / PAGE_NUMBER)}
          />
        </div>
      </div>
    </Main>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;
  const page = context.query.page || 1;
  try {
    const animeRes = await fetch(
      `${
        process.env.API_URL
      }/anime/?filter[text]=${q}&page[limit]=${PAGE_NUMBER}&page[offset]=${
        page === 1 ? page - 1 : (Number(page) - 1) * PAGE_NUMBER
      }`
    );
    const anime = await animeRes.json();
    if (!anime.data) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        query: q,
        page: page ? Number(page) : 0,
        anime,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
