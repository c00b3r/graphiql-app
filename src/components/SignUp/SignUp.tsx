'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Form } from '../Form/Form';
import { setUser } from '../../reducers/reducers/userSlice';

export const SingUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth();

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

  const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user, 'singup');
      })
      .catch(console.error);
  };

  return <Form title="Sing up" handleClick={handleSignUp} />;
};
