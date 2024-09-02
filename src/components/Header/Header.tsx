'use client';
import styles from './Header.module.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { setUser, removeUser } from '../../reducers/reducers/userSlice';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Loader from '../Loader/Loader';
import ColorToggleButton from '../ToggleBtn/ToggleBtn';
import icon from '../../../public/icons.png';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth();
  const user = useSelector((state: RootState) => state.user);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    setInitialLoading(true);

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
        dispatch(removeUser());
      }

      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      router.push('/welcome');
    } catch (error) {
      alert('Error signing out');
      console.error('Error signing out: ', error);
    }
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton color="primary" aria-label="logo">
            <Link href="/">
              <Image src={icon} alt="Logo" style={{ width: '40px', height: '40px' }} />
            </Link>
          </IconButton>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={6}>
            <ColorToggleButton />
            {user.isAuthenticated ? (
              <Link href="/welcome" onClick={handleLogOut}>
                Sign Out
              </Link>
            ) : (
              <>
                <Link href="/login">Sign In</Link>
                <Link href="/signup" className={`${styles.link} ${isScrolled ? styles.linkScrolled : ''}`}>
                  Sign Up
                </Link>
              </>
            )}
          </Stack>
        </Stack>
      </div>
    </header>
  );
};
