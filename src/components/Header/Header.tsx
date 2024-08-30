'use client';
import styles from './Header.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { removeUser } from '../../reducers/reducers/userSlice';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ColorToggleButton from '../ToggleBtn/ToggleBtn';
import icon from '../../../public/icons.png';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      router.push('/welcome');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

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
            {isAuth ? (
              <Link href="/welcome" onClick={handleSignOut}>
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
