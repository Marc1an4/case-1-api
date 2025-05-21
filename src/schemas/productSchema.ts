import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const UpdateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
}).refine(
  (data) => data.name !== undefined || data.description !== undefined,
  { message: "At least one field (name or description) must be provided" }
);

export const ProductNameQuerySchema = z.object({
  name: z.string().min(1, "Product name is required")
});

export const validateCreateProduct = {
  body: CreateProductSchema,
};

export const validateUpdateProduct = {
  body: UpdateProductSchema,
};

export const validateProductNameQuery = {
  query: ProductNameQuerySchema,
};

export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;