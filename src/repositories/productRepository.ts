import { Product } from "../models/product";
import { sequelize } from "../config/database";

export class ProductRepository {
  constructor() {
    // Ensure database connection is established
    if (!sequelize) {
      throw new Error('Database connection not initialized');
    }
  }

  public async findOne(id: number) {
    return Product.findByPk(id);
  }

  public async findByName(name: string) {
    return Product.findOne({ where: { name } });
  }

  public async create(product: Partial<Product>) {
    return Product.create(product);
  }

  public async findAll() {
    return Product.findAll();
  }
  
  public async update(id: number, product: Partial<Product>) {
    const [updatedCount] = await Product.update(product, { where: { id } });
    if (updatedCount === 0) return null;
    return this.findOne(id);
  }

  public async delete(id: number) {
    return Product.destroy({ where: { id } });
  }
}