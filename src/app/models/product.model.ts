export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  category: string;
}

export interface CartLine {
  product: Product;
  quantity: number;
}
