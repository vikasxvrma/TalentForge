import rateLimit from "express-rate-limit";
import { ipKeyGenerator } from "express-rate-limit";

export const chatRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,

    keyGenerator: (req) => req.user.id || ipKeyGenerator(req.ip),

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many chat requests. Please try again in a minute."
    }
});

export const uploadResumeRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
     keyGenerator: (req) => req.user.id || ipKeyGenerator(req.ip),
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Resume upload limit exceeded. Please try again later."
    }
});

export const authRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many authentication attempts. Please try again later."
    }
});