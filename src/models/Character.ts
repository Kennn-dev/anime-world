export default interface ICharacter {
  id: string;
  attributes: {
    createdAt: string;
    updatedAt: string;
    slug: string;
    names: {
      en: string;
      ja_jp: string;
    };
    canonicalName: string;
    name: string;
    malId: 4368;
    description: string;
    image: {
      tiny: string;
      large: string;
      small: string;
      medium: string;
      original: string;
    };
  };
}
