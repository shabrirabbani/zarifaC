export type NavbarAttributes = {
  title: string;
  slug: string;
  order: number;
  parent?: {
    data: {
      id: number;
    } | null;
  };
};

export type NavbarItem = {
  id: number;
  attributes: NavbarAttributes;
};
export type StrapiResponse<T> = {
  data: T[];
  meta?: any;
};

export type Submenu = {
  id: number;
  title: string;
  href: string;
};

export type Menu = {
  id: number;
  title: string;
  href: string;
  order: number;
  submenus: Submenu[];
};
export type Hero = {
  id: number;
  title: string;
  buttonText: string;
  buttonLink: string;
  background: StrapiImage[];
  backgroundUrl?: string | null;
};

export type About = {
  id: number;
  title: string;
  content: string;
  image?: StrapiImage | null;
};

export type Gallery = {
  id: number;
  title: string;
  image: StrapiImage[];
};

export type StrapiImageFormat = {
  ext: string;
  url: string;
  width: number;
  height: number;
};

export type StrapiImage = {
  id: number;
  name: string;
  url: string;
  formats?: {
    large?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    small?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  };
};

export type Category = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  image?: StrapiImage;
  products?: Product[];
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price?: number;
  sku?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  image?: StrapiImage[];
  product_variants?: ProductVariant[];
  category?: Category;
};

export type ProductVariant = {
  id: number;
  title: string;
  slug: string;
  sku?: string;
  priceOverride?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  image?: StrapiImage[];
};

export type Collection = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  image?: StrapiImage;
  products?: Product[];
};
