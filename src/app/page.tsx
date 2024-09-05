import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Home() {
  return (
    <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
      This is an example of using MUI component
      <Link href={'/restfull'}>restFull</Link>
    </Typography>
  );
}
