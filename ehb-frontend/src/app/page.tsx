import Image from 'next/image';
import { Box, Container, Typography, Button, Card, CardContent, Grid, Link as MuiLink } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 8 }}>
      <Box component="main" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', mt: 4 }}>
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Card sx={{ width: '100%', maxWidth: 600, mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Get started by editing <Box component="span" sx={{ bgcolor: 'grey.200', px: 1, py: 0.5, borderRadius: 1, fontFamily: 'monospace', fontWeight: 600 }}>src/app/page.tsx</Box>.
            </Typography>
            <Typography variant="body2">Save and see your changes instantly.</Typography>
          </CardContent>
        </Card>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              startIcon={<Image src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />}
              sx={{ borderRadius: '999px', px: 3, py: 1.5 }}
            >
              Deploy now
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              sx={{ borderRadius: '999px', px: 3, py: 1.5 }}
            >
              Read our docs
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box component="footer" sx={{ mt: 8, display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <MuiLink
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </MuiLink>
        <MuiLink
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </MuiLink>
        <MuiLink
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </MuiLink>
      </Box>
    </Container>
  );
}
