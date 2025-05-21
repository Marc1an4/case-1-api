import { Product } from "../types/types";
import { IProductRepository } from "./interfaces/IProductRepository";

export class FakeProductRepository implements IProductRepository {
  private products: Product[] = [
    { id: 1, name: "Laptop Pro", description: "High-performance laptop with 16GB RAM and 512GB SSD" },
    { id: 2, name: "Smartphone X", description: "Latest smartphone with 5G capability and 128GB storage" },
    { id: 3, name: "Wireless Earbuds", description: "Noise-cancelling wireless earbuds with 24-hour battery life" },
    { id: 4, name: "Smart Watch", description: "Fitness tracker with heart rate monitor and GPS" },
    { id: 5, name: "Gaming Console", description: "Next-gen gaming console with 4K graphics support" },
    { id: 6, name: "Bluetooth Speaker", description: "Portable waterproof speaker with 360° sound" },
    { id: 7, name: "Tablet Pro", description: "10-inch tablet with stylus support and 256GB storage" },
    { id: 8, name: "Smart Home Hub", description: "Central control for all your smart home devices" },
    { id: 9, name: "Wireless Keyboard", description: "Ergonomic keyboard with mechanical switches" },
    { id: 10, name: "4K Monitor", description: "27-inch 4K display with HDR support" }
  ];

  public async findOne(id: number): Promise<Product | null> {
    const product = this.products.find(product => product.id === id);
    return product || null;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = this.products.find(product => product.name === name);
    return product || null;
  }

  public async create(product: Omit<Product, 'id'>): Promise<Product> {
    const newProduct: Product = {
      id: this.products.length + 1,
      ...product
    };
    if (!newProduct.description) {
      newProduct.description = "";
    }
    this.products.push(newProduct);
    return newProduct;
  }

  public async findAll(): Promise<Product[]> {
    return [...this.products];
  }
  
  public async update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.products[index] = { ...this.products[index], ...product };
    if (!this.products[index].description) {
      this.products[index].description = "";
    }
    return this.products[index];
  }

  public async delete(id: number): Promise<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }
}