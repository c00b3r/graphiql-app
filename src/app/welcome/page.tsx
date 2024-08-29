'use client';
import Link from 'next/link';
import { Stack } from '@mui/material';

export default function WelcomePage() {
  return (
    <main className="main">
      <div className="container">
        <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
          <p>Welcome!</p>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Link href="/login">Sing In</Link>
            <Link href="/singup">Sing Up</Link>
          </Stack>
        </Stack>
      </div>
    </main>
  );
}
