import { createHash } from 'crypto';
import { NextFunction, Request, Response } from 'express';

function hash(text: string): string {
    const hash = createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}

function hashPassword(req: Request, res: Response, next: NextFunction) {
    if (!req.body.password && req.originalUrl === "/register")
        return res.status(400).json({ message: 'Invalid user data' });

    if (req.body.password)
        req.body.password = hash(req.body.password);

    next();
}

export default hashPassword;