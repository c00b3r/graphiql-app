'use client';
import styles from './Form.module.css';
import { FC, useState } from 'react';
import { isValidEmail, isValidPassword } from '@/utils/validation';

type FormProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
};

export const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isValidPassword(password)) {
      setError('The password must contain at least 8 characters, one letter, one digit, and one special character.');
      return;
    }

    setError('');

    handleClick(email, password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">{title}</button>
    </form>
  );
};
