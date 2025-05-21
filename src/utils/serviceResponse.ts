import { z } from 'zod';

export enum ResponseStatus {
  Success = "success",
  Failed = "failed"
}

export class ServiceResponse<T = any> {
  constructor(
    public status: ResponseStatus,
    public message: string,
    public data: T,
    public statusCode: number
  ) {}
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    responseObject: dataSchema.optional(),
    statusCode: z.number(),
  });
