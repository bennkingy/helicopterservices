export interface training {
  mainImage: any;
  updated: any;
  seoDescription: string;
  seoTitle: string;
  title: string;
  body: any;
  currentSlug: string;
}

export interface helicopter {
  model: string;
  url: string;
  type: string;
  currentSlug: string;
  capacity: number;
  topSpeed: number;
  introducedAt: string;
  description: any;
  mainImage: any;
}

export interface carouselItem {
  title: string;
  description: string;
  link: string;
  img: string;
}