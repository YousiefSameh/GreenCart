import { TLoading } from ".";

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  image: string[];
  description: string[];
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
  quantity?: number;
}

export interface IProductState {
  products: IProduct[];
  loading: TLoading;
  error: string | null;
}