
export interface productCardPropsTypes {
    productId: string,
    name: string
    imageUrl: string
    description: string
    rating: number
    brand: string
    voluem: string
    abv: number
    categoryId: string
    price: number
    stockQuantity: number
    feedbacks: []
}


export type ProductResponse = {
  abv: number;
  ageRestriction: number;
  brand: string;
  category: string | null;
  categoryId: string;
  createdAt: string;
  description: string;
  feedbacks: any[];
  imageUrl: string;
  name: string;
  price: number;
  productId: string;
  rating: number;
  stockQuantity: number;
  updatedAt: string;
  volume: number;
};

export type Product = {
    productId: string;
    name: string;
    imageUrl: string;
    description: string;
    brand: string;
    volume: number;
    abv: number;
    categoryId?: string;
    price: number;
    stockQuantity: number;
};