import { Request, Response } from 'express';
import { ProductService } from "../services/productService";
import { handleServiceResponse } from '../utils/httpHandlers';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
    this.createProduct = this.createProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body as { name: string; description: string };
    const product = await this.productService.createProduct({ name, description });

    handleServiceResponse(product, res);
  }

  public async getAllProducts(req: Request, res: Response): Promise<void> {
    const products = await this.productService.getAllProducts();
    handleServiceResponse(products, res);
  }

  public async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await this.productService.getProductById(parseInt(id));
    handleServiceResponse(product, res);
  }
  
  public async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description } = req.body as { name: string; description: string };
    const product = await this.productService.updateProduct(parseInt(id), { name, description });
    handleServiceResponse(product, res);
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await this.productService.deleteProduct(parseInt(id));
    handleServiceResponse(product, res);
  }
}