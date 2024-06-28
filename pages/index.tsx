import Link from 'next/link';
import styles from '../styles/AuthForm.module.css';

export default function Home() {
  return (
    <div className={styles.formContainer}>
        
      <h1 className={styles.formTitle}>Home Page</h1>
      <p>
        <Link href="/login">Login</Link>
      </p>
      <p>
        <Link href="/register">Register</Link>
      </p>
    </div>
  );
}
