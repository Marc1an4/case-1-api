import { Product } from "../../types/types";

export interface IProductRepository {
  findOne(id: number): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
  findAll(): Promise<Product[]>;
  update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
} 