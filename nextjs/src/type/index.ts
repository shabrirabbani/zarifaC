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
