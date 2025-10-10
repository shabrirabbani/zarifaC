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
  submenus?: Submenu[];
};
export type Hero = {
  id: number;
  title: string;
  background: {
    id: number;
    url: string;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  }[];
  buttonText: string;
  buttonLink: string;
};
