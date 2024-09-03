'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Form } from '../Form/Form';
import { setUser } from '../../reducers/reducers/userSlice';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const userName = user.email!.split('@')[0];

        dispatch(
          setUser({
            userName: userName,
            email: user.email,
            id: user.uid,
            token: token,
          })
        );

        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch, router]);

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid credentials provided. Please check your input and try again.');
      } else {
        setError(error.message);
      }
    });
  };

  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <Form title="Sing in" handleClick={handleLogin} />
    </Stack>
  );
};
