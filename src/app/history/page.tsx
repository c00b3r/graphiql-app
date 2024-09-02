'use client';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HistoryPage() {
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
            <Button variant="contained" size="large" href="/restfull">
              REST Client
            </Button>
            <Button variant="contained" size="large" href="/GRAPHQL">
              GraphiQL Client
            </Button>
          </Stack>
        </Stack>
      </div>
    </main>
  );
}
