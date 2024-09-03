'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoadingUser } from '@/reducers/reducers/userSlice';
import Loader from '@/components/Loader/Loader';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userName);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    dispatch(setLoadingUser(true));

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userName = user.email!.split('@')[0];
        const token = await user.getIdToken();

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

      dispatch(setLoadingUser(false));
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [router, dispatch]);

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="h3" component="p">
            Welcome Back, {user}!
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Button variant="contained" size="large" component={Link} href="/restfull">
              REST Client
            </Button>
            <Button variant="contained" size="large" component={Link} href="/GRAPHQL">
              GraphiQL Client
            </Button>
            <Button variant="contained" size="large" component={Link} href="/history">
              History
            </Button>
          </Stack>
        </Stack>
      </div>
    </main>
  );
}
