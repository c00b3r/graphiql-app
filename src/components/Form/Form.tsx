'use client';
import styles from './Form.module.css';
import { FC, useState } from 'react';
import { isValidEmail, isValidPassword } from '@/utils/validation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type FormProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
};

export const Form: FC<FormProps> = ({ title, handleClick }) => {
  console.log('title', title);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        'The password must contain at least 8 characters, one letter, one digit, and one special character.'
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    handleClick(email, password);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button type="submit" variant="contained" size="large">
        {title}
      </Button>
    </form>
  );
};
