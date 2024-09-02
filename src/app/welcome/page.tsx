'use client';
import Link from 'next/link';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function WelcomePage() {
  return (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="h3" component="p">
            Welcome!
          </Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Link href="/login">Sing In</Link>
            <Link href="/signup">Sing Up</Link>
          </Stack>
        </Stack>
      </div>
    </main>
  );
}
