import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import Reservations from '../models/reservations';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const response = await Reservations.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId',
        },
      },
      { $unwind: "$userId" },
      {
        $lookup: {
          from: 'rooms',
          localField: 'roomId',
          foreignField: '_id',
          as: 'roomId',
        },
      },
      { $unwind: "$roomId" },
      {
        $project: {
          userId: {
            password: 0,
            lastLoginAt: 0,
            createdAt: 0,
            updatedAt: 0,
          },
          roomId: {
            createdAt: 0,
            updatedAt: 0
          }
        }
      },
      {
        $sort: {
          createdAt: -1
        }
      }
    ])
    return res.send(response);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await Reservations.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId',
        },
      },
      { $unwind: "$userId" },
      {
        $lookup: {
          from: 'rooms',
          localField: 'roomId',
          foreignField: '_id',
          as: 'roomId',
        },
      },
      { $unwind: "$roomId" },
      {
        $project: {
          userId: {
            password: 0,
            lastLoginAt: 0,
            createdAt: 0,
            updatedAt: 0,
          },
          roomId: {
            createdAt: 0,
            updatedAt: 0
          }
        }
      },
    ]);
    return res.send(response.length === 1 ? response[0] : []);
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await Reservations.findByIdAndUpdate(id, req.body, { new: true });
    return res.send(response);
  } catch (err: any) {
    return res.status(500).send({ message: 'Erro ao tentar criar registro, tente novamente', });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await Reservations.findByIdAndDelete(id);
    return res.send();
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await Reservations.create(req.body);
    return res.send(response);
  } catch (err: any) {
    return res.status(500).send({ message: 'Erro ao tentar criar registro, tente novamente', });
  }
});

export default router;