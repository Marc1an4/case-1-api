import { ProductRepository} from "../repositories/productRepository";
import { FakeProductRepository } from "../repositories/fakeProductRepository";
import { CreateProduct, UpdateProduct } from "../schemas/productSchema";
import { ServiceResponse, ResponseStatus } from "../utils/serviceResponse" 
import { StatusCodes } from "http-status-codes";

export class ProductService {
  private productRepository: ProductRepository | FakeProductRepository;

  constructor() {
    this.productRepository = process.env.DB_HOST ? 
      new ProductRepository() : new FakeProductRepository();
  }

  public async createProduct(product: CreateProduct) {
    try {
      const existingProduct = await this.productRepository.findByName(product.name);
      if (existingProduct) {
        return new ServiceResponse(ResponseStatus.Failed, "Product with this name already exists", {}, StatusCodes.BAD_REQUEST);
      }

      const productToCreate = {
        ...product,
        description: product.description || ''
      };

      const newProduct = await this.productRepository.create(productToCreate);
      return new ServiceResponse(ResponseStatus.Success, "Product created successfully", newProduct, StatusCodes.CREATED);
    } catch (error) {
      return new ServiceResponse(ResponseStatus.Failed, `Error creating product: ${error}`, {}, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAllProducts() {
    try {
      const products = await this.productRepository.findAll();
      if (!products || products.length === 0) {
        return new ServiceResponse(ResponseStatus.Failed, "No products found", [], StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse(ResponseStatus.Success, "Products fetched successfully", products, StatusCodes.OK);
    } catch (error) {
      return new ServiceResponse(ResponseStatus.Failed, `Error fetching products: ${error}`, [], StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async getProductById(id: number) {
    try {
      const product = await this.productRepository.findOne(id);
      if (!product) {
        return new ServiceResponse(ResponseStatus.Failed, "Product not found", {}, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse(ResponseStatus.Success, "Product fetched successfully", product, StatusCodes.OK);
    } catch (error) {
      return new ServiceResponse(ResponseStatus.Failed, `Error fetching product: ${error}`, {}, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateProduct(id: number, product: UpdateProduct) {
    try {
      const existingProduct = await this.productRepository.findOne(id);
      if (!existingProduct) {
        return new ServiceResponse(ResponseStatus.Failed, "Product not found", {}, StatusCodes.NOT_FOUND);
      }

      if (product.name) {
        const existingProduct = await this.productRepository.findByName(product.name);
        if (existingProduct) {
          return new ServiceResponse(ResponseStatus.Failed, "Product with this name already exists", {}, StatusCodes.BAD_REQUEST);
        }
      }

      const productToUpdate = await this.productRepository.findOne(id);
      if (!productToUpdate) {
        return new ServiceResponse(ResponseStatus.Failed, "Product not found", {}, StatusCodes.NOT_FOUND);
      }

      await this.productRepository.update(id, product);
      const updatedProduct = await this.productRepository.findOne(id);
      return new ServiceResponse(ResponseStatus.Success, "Product updated successfully", updatedProduct, StatusCodes.OK);
    } catch (error) {
      return new ServiceResponse(ResponseStatus.Failed, `Error updating product: ${error}`, {}, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteProduct(id: number) {
    try {
      const productToDelete = await this.productRepository.findOne(id);
      if (!productToDelete) {
        return new ServiceResponse(ResponseStatus.Failed, "Product not found", {}, StatusCodes.NOT_FOUND);
      }
      
      await this.productRepository.delete(id);
      return new ServiceResponse(ResponseStatus.Success, "Product deleted successfully", {}, StatusCodes.OK);
    } catch (error) {
      return new ServiceResponse(ResponseStatus.Failed, `Error deleting product: ${error}`, {}, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
