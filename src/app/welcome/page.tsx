'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Loader from '@/components/Loader/Loader';

export default function WelcomePage() {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  if (isAuth) {
    return <Loader />;
  }

  return (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="h3" component="p">
            Welcome!
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Button variant="contained" size="large" component={Link} href="/login">
              Sign In
            </Button>
            <Button variant="outlined" size="large" component={Link} href="/signup">
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </div>
    </main>
  );
}
