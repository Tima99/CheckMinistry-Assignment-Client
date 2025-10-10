export interface Order {
  id: number;
  orderDescription: string;
  createdAt: string;
  count: number;
  products: (Product & { productId: number })[];
}
