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

interface HeaderProps {
  isScrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  return isAuth ? (
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
            <Link
              onClick={() => dispatch(removeUser())}
              href="/welcome"
              className={`${styles.link} ${isScrolled ? styles.linkScrolled : ''}`}
            >
              {'Sign Out'}
            </Link>
          </Stack>
        </Stack>
      </div>
    </header>
  ) : (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton color="primary" aria-label="logo">
            <Link href="/welcome">
              <Image src={icon} alt="Logo" style={{ width: '40px', height: '40px' }} />
            </Link>
          </IconButton>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={6}>
            <ColorToggleButton />
            <Link href="/login">{'Sign In'}</Link>
            <Link href="/singup" className={`${styles.link} ${isScrolled ? styles.linkScrolled : ''}`}>
              {'Sign Up'}
            </Link>
          </Stack>
        </Stack>
      </div>
    </header>
  );
};
