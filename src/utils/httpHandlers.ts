import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from './serviceResponse';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema | any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if (schema.body) {
      schema.body.parse(req.body);
    }
    
    if (schema.query) {
      schema.query.parse(req.query);
    }
    
    if (schema.params) {
      schema.params.parse(req.params);
    }
    
    if (!schema.body && !schema.query && !schema.params) {
      schema.parse(req.body);
    }
    
    next();
  } catch (err: any) {
    let errorMessage = 'Invalid input: ';
    if (err.errors && Array.isArray(err.errors)) {
      err.errors.forEach((error: any) => {
        const fieldPath = error.path.join('.');
        errorMessage += ` * ${fieldPath} - ${error.message}`;
      });
    } else {
      errorMessage += ' Validation failed';
    }
    const statusCode = StatusCodes.BAD_REQUEST;
    res.status(statusCode).send(errorMessage);
  }
};