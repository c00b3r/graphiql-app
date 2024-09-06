'use client';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';
import MainInform from '@/components/MainInform/MainInform';

const HomePage = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName = user.email!.split('@')[0];
        setUser(userName);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <main className="main">
      <div className="container">
        {user ? (
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
            <MainInform />
          </Stack>
        ) : (
          <>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h3" component="h1" gutterBottom>
                Welcome to our project!
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Button variant="outlined" size="large" component={Link} href="/login">
                  Sign In
                </Button>
                <Button variant="contained" size="large" component={Link} href="/signup">
                  Sign Up
                </Button>
              </Stack>
              <MainInform />
            </Stack>
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
