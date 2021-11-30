export default interface IAnime {
  attributes: {
    createdAt: string;
    updatedAt: string;
    slug: string;
    synopsis: string;
    ageRatingGuide: string;
    titles: {
      en: string;
      en_us: string;
      en_jp: string;
      ja_jp: string;
    };
    canonicalTitle: string;
    averageRating: string;
    favoritesCount: number;
    startDate: string;
    endDate: string;
    popularityRank: number;
    posterImage: {
      original: string;
      large: string;
      medium: string;
    };
    coverImage: {
      large: string;
      original: string;
    };
    episodeCount: number;
    youtubeVideoId: string;
    nsfw: boolean;
  };
  id: string;
}
