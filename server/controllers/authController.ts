import { Request, Response } from 'express';
import User from '../models/User';

export const handleGoogleLogin = async (req: Request, res: Response) => {
  const { googleId, email, name } = req.body;

  if (!googleId || !email || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { googleId },
      { email, name },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error('Error handling Google login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
