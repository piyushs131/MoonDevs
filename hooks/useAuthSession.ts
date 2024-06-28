import jwt from 'jsonwebtoken';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuthSession = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  let isAuthenticated = false;
  let username = '';

  if (token) {
    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
      isAuthenticated = true;
      username = decodedToken.username;

    }
     catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return { isAuthenticated, username };
};
