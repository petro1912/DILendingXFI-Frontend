import Container from '@mui/material/Container';

export default function BoxContainer({children}) {
  return (
    <Container
      sx={{
        maxWidth: '100%',
        '@media (min-width:1440px)': {
          maxWidth: '1440px', // Max width when the viewport is at least 1440px wide
        },
      }}
    >
      {children}
    </Container>
  );
}
