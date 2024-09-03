'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Loader from '@/components/Loader/Loader';

export default function HistoryPage() {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  if (isAuth) {
    return <Loader />;
  }

  return (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={4}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
            <Typography variant="h4" component="p">
              You haven&apos;t executed any requests.
            </Typography>
            <Typography variant="h4" component="p">
              It&apos;s empty here. Try:
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Button variant="contained" size="large" component={Link} href="/restfull">
              REST Client
            </Button>
            <Button variant="contained" size="large" component={Link} href="/GRAPHQL">
              GraphiQL Client
            </Button>
          </Stack>
        </Stack>
      </div>
    </main>
  );
}
