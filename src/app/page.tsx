'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/reducers/reducers/userSlice';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const user = useSelector((state: RootState) => state.user.userName);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userName = user.email!.split('@')[0];
        const token = await user.getIdToken();

        setLoading(false);

        dispatch(
          setUser({
            userName: userName,
            email: user.email,
            id: user.uid,
            token: token,
          })
        );
      } else {
        router.push('/welcome');
      }
    });

    return () => unsubscribe();
  }, [router, dispatch]);

  if (loading) {
    return <main className="main">Loading...</main>;
  }

  return (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="h3" component="p">
            Welcome Back, {user}!
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Link href="/rest">REST Client</Link>
            <Link href="/GRAPHQL">GraphiQL Client</Link>
            <Link href="/history">History</Link>
          </Stack>
        </Stack>
      </div>
    </main>
  );
}
