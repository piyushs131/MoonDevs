import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/user';
import dbConnect from '../../../utils/db';

dbConnect();

const JWT_SECRET = process.env.JWT_SECRET || '479e875ac1700a183586c85092b944ca046931dfe49b737a67d93288aa537f95eb92a546e2d99f1b072db12f26270d2899751c42c11b2f5bd4bb3cc43459f5';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {

      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {

    res.status(500).json({ message: 'Internal server error' });
  }
};
