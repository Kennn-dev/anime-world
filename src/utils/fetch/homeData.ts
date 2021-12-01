export default async function getHomeData() {
  const animeRes = await fetch(`${process.env.API_URL}/trending/anime`);
  const popularRes = await fetch(
    `${process.env.API_URL}/anime?sort=-user_count&page[limit]=10`
  );
  const upcomingRes = await fetch(
    `${process.env.API_URL}/anime?filter[status]=upcoming&page[limit]=10&sort=-user_count`
  );
  const ratingRes = await fetch(
    `${process.env.API_URL}/anime?page[limit]=10&sort=-average_rating`
  );
  const { data: animes } = await animeRes.json();
  const { data: popular } = await popularRes.json();
  const { data: upcoming } = await upcomingRes.json();
  const { data: rating } = await ratingRes.json();

  return {
    animes,
    popular,
    upcoming,
    rating,
  };
}
