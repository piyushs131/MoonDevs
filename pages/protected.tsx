import { useAuthSession } from '../hooks/useAuthSession';
import styles from '../styles/ProtectedPage.module.css';

const ProtectedPage = () => {
  const { isAuthenticated, username } = useAuthSession();

  if (!isAuthenticated) {
    return <div className={styles.container}>Access Denied</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Welcome, {username}!</h1>
      <p>This is a protected page.</p>
    </div>
  );
};

export default ProtectedPage;
