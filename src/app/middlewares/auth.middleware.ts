require('dotenv').config();

import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'Not token provided' });

  const parts: Array<string> = authHeader.split(' ') || [];

  if (!parts || parts.length !== 2)
    return res.status(401).send({ error: 'Token error' });

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret, (err, decoded) => {
    if (err)
      return res.status(401).send({ error: 'Token invalid' });

    return next();
  });
}

export default authMiddleware;