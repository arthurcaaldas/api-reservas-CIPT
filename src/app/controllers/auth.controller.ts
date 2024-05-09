require('dotenv').config();

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Users from '../models/users';

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET_KEY as string, {
    expiresIn: 24 * 60 * 60 // one day in seconds
  });
}

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    let response = await Users.findOne({ email }).select('+password');

    if(!response || !await bcrypt.compare(password, response.password))
      return res.status(400).send({ message: 'Usuário ou senha incorretos' });

    response = await Users.findOneAndUpdate({ email }, { lastLoginAt: new Date() });
    
    return res.send({ token: generateToken({ ...response })});
  } catch (err) {
    return res.status(400).send({
      message: 'Erro ao tentar criar registro, tente novamente',
    });
  }
});

router.post('/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email }).select('+password');
  
    if (!user)
      return res.status(400).send({ message: 'Usuário ou senha incorretos' });
  
    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ message: 'Usuário ou senha incorretos' });

    await user.updateOne({ lastLoginAt: new Date() })
    user.password = undefined as unknown as string;

    res.send({
      user,
      token: generateToken({ id: user.id })
    });
  } catch (err) {
    res.status(400).send({ message: 'Falha ao tentar fazer login' });
  }
});

export default router;