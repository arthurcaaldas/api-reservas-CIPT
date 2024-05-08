import express from 'express';

import Rooms from '../models/rooms';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const response = await Rooms.find();
    return res.send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar carregar registros, tente novamente' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Rooms.findById(id);
    return res.send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar carregar registros, tente novamente' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Rooms.findByIdAndUpdate(id, { ...req.body, updatedAt: new Date() }, { new: true });

    return res.send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar criar registro, tente novamente', });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Rooms.findByIdAndDelete(id);
    return res.send();
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar criar registro, tente novamente', });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const response = await Rooms.create(req.body);
    return res.send(response);
  } catch (err) {
    return res.status(400).send({ message: 'Erro ao tentar criar registro, tente novamente', });
  }
});

export default router;