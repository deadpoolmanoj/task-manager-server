import rateLimit from "express-rate-limit";
import { failure } from "../shared/api-responses";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  
  max: 100,                   // 100 req per 15 mins 
  standardHeaders: true,     
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json(failure('Too many requests, please try again later.'))
  }
});