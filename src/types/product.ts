export type Product = {
  id: number;
  title: string;
  slug: string;
  brand: { name: string; slug: string } | null;
  price?: number | null;
  currency?: string | null;
  image: string | null;
  sizes: string[] | null;
  colors: string[] | null;
};

export type DrupalProduct = {
  id: number;
  attributes: {
    title: string;
    field_slug: string;
    field_brand?: { name: string; slug: string } | null;
    field_colors?: string[] | null;
    field_sizes?: string[] | null;
    field_price?: {
      number: number;
      currency_code: string;
    };
    field_image?: {
      data: any | null;
    };
  };
};
