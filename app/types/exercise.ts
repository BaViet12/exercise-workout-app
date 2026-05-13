export interface Exercise {
  id: number;
  category: {
    id: number;
    name: string;
  };
  muscles: {
    id: number;
    name: string;
    name_en: string;
  }[];
  muscles_secondary: {
    id: number;
    name: string;
    name_en: string;
  }[];
  translations: {
    id: number;
    name: string;
    description: string;
  }[];
  images: {
    id: number;
    image: string;
    is_main: boolean;
  }[];
}
