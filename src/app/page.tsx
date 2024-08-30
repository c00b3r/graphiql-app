'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function Page() {
  const { isAuth, email } = useAuth();
  const router = useRouter();
  const username = email ? email.split('@')[0] : 'User';

  return isAuth ? (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="h3" component="p">
            Welcome Back, {username}!
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Link href="/rest">REST Client</Link>
            <Link href="/graphiql">GraphiQL Client</Link>
            <Link href="/history">History</Link>
          </Stack>
        </Stack>
      </div>
    </main>
  ) : (
    router.push('/welcome')
  );
}
