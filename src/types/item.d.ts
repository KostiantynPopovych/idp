interface Item {
  name: { ['en-US']: string };
  description: { ['en-US']: string };
  image: { ['en-US']: string };
}

interface ItemWrap {
  fields: Item;
  sys: {
    id: string;
    version: number;
  }
}

interface NormalizedItem {
  id: string;
  name: string;
  description: string;
  image: string;
  version: number;
}
