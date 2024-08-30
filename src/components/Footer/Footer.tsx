import styles from './Footer.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import rssLogo from '../../../public/rss-logo.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
            <p className={styles.subtitle}>Our Team:</p>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <GitHubIcon></GitHubIcon>
                <Link href="https://github.com/huntertigerx" color="black" underline="hover" target="_blank">
                  {'HunterTigerX'}
                </Link>
              </Stack>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <GitHubIcon></GitHubIcon>
                <Link href="https://github.com/c00b3r" color="black" underline="hover" target="_blank">
                  {'c00b3r'}
                </Link>
              </Stack>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                <GitHubIcon></GitHubIcon>
                <Link href="https://github.com/LaraNU" color="black" underline="hover" target="_blank">
                  {'LaraNU'}
                </Link>
              </Stack>
            </Stack>
          </Stack>
          <p className={styles.subtitle}>2024</p>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
            <Link href="https://rs.school/courses/reactjs" color="black" underline="hover" target="_blank">
              <Image src={rssLogo} alt="Logo" style={{ width: '40px', height: '40px' }} />
            </Link>
          </Stack>
        </Stack>
      </div>
    </footer>
  );
};
