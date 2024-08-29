'use client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from '../Form/Form';
import { setUser } from '../../reducers/reducers/userSlice';

export const SingUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSingUp = (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
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
      .catch(console.error);
  };

  return <Form title="Sing up" handleClick={handleSingUp} />;
};
