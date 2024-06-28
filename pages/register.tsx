import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/AuthForm.module.css';
import { useRouter } from 'next/router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/register', { username, password });
      router.push('/login');
    } catch (err) {
      setError('Username already exists');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Register</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles.inputField}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
    </div>
  );
};

export default Register;
