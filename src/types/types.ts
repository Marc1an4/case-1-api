export interface Product {
  id: number;
  name: string;
  description: string;
}

export interface CreateProductDTO {
  name: string;
  description?: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
}