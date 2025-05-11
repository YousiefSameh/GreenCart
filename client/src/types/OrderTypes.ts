import { AddAddressType } from "@validations/AddAddressSchema";

export interface IOrder {
  _id: string;
  userId: string;
  items: {
    product: {
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
    };
    quantity: number;
    _id: string;
  }[];
  amount: number;
  address: AddAddressType;
  status: string;
  paymentType: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
};