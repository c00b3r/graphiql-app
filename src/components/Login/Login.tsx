'use client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Form } from '../Form/Form';
import { setUser } from '../../reducers/reducers/userSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        console.log(user);
        const token = await user.getIdToken();

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: token,
          })
        );
        router.push('/');
      })
      .catch(() => console.error('error'));
  };

  return <Form title="Sing in" handleClick={handleLogin} />;
};
