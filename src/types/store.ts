export type Store = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  address: string | null;
  url: string | null;
  phone: string | null;
  description: string | null;
};

export type DrupalStore = {
  id: number;
  attributes: {
    title: string;
    field_address?: string | null;
    field_url?: string | null;
    field_phone?: string | null;
    field_slug: string;
    field_description?: string | null;
    field_logo?: {
      data: any | null;
    };
  };
};
