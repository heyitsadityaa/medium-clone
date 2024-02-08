import { Image } from "sanity";

export interface simpleBlogCard {
  _id: number;
  title: string;
  author: any;
  name: string;
  image: Image;
  description: string;
  mainImage: Image;
  slug: any;
}

export interface fullBlog {
  slug: string;
  title: string;
  body: any;
  mainImage: Image;
  description: string;
  author: any;
  name: string;
  image: Image;
  _createdAt: any;
}
