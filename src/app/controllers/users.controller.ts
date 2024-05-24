import express from 'express';
import bcrypt from 'bcrypt';

import Users from '../models/users';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const response = await Users.find();
    return res.send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar carregar registros, tente novamente' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Users.findById(id);
    return res.send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar carregar registros, tente novamente' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { tokenPass } = req.body;

    if (!tokenPass || tokenPass !== process.env.MASTER_PASSWORD)
      return res
      .sendStatus(401)
      .send({ message: 'É necessário o token para criar usuário' });
      
    const { id } = req.params;

    const response = req.body.password
      ? await Users.findByIdAndUpdate(id, { ...req.body, password: await bcrypt.hash(req.body.password, 10) }, { new: true })
      : await Users.findByIdAndUpdate(id, { ...req.body, updatedAt: new Date() }, { new: true });

    return res.send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar criar registro, tente novamente', });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { tokenPass } = req.body;
    if (!tokenPass || tokenPass !== process.env.MASTER_PASSWORD)
      return res
      .sendStatus(401)
      .send({ message: 'É necessário o token para deletar usuário' });

    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    return res.send();
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar criar registro, tente novamente', });
  }
});

router.post('/', async (req, res) => {
  try {
    const { tokenPass, email } = req.body;

    if (!tokenPass || tokenPass !== process.env.MASTER_PASSWORD)
      return res
      .sendStatus(401)
      .send({ message: 'É necessário o token para criar usuário' });

    const hasUser = await Users.findOne({ email });

    if (hasUser) return res.status(401).send({ message: 'Usuário já existe!' })

    const payload = { ...req.body, password: await bcrypt.hash(req.body.password, 10) }
    const response = await Users.create(payload);
    (response as any).password = undefined;
    return res.send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar criar registro, tente novamente', });
  }
});

export default router;