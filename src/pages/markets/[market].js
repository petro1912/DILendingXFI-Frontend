import Link from 'next/link';
import { useRouter } from 'next/router';

import BoxContainer from 'src/@core/components/container';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles'
import { Icon } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(8),
  fontSize: 16,
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}))

const Cell = styled(TableCell)(() => ({
  border: 'none'
}))

const MarketPage = () => {
  const router = useRouter();
  const { market } = router.query;

  if (!market) return null; // Ensure `slug` is available before processing

  // Split slug into varA and varB
  const [supplyToken, collateralToken] = market.split('-');

  return (
      <BoxContainer>
       <Box
          sx={{
            mt: "92px",
            mb: 6
          }}>
          <LinkStyled href='/markets'>
            <Icon icon="tabler:settings" /> Markets
          </LinkStyled>
          <Typography
            variant='h2'
            sx={{ display: 'flex', mt:4, mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
          >
            <img src={`/images/tokens/${supplyToken}.png`} className='tokenImg' />
            <img src={`/images/tokens/${collateralToken}.png`} className='tokenImg' sx={{mr: -3}} />
            • CrossFi
          </Typography>

        </Box>
        <Grid container spacing={6} sx={{mb: 4}}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" color='secondary'>Total Collateral</Typography>
            <Typography variant="h3" color='primary'>13.45 B</Typography>

          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" color='secondary'>Total Borrowing</Typography>
            <Typography variant="h3" color='#7367F0'>8.82 B</Typography>
          </Grid>
        </Grid>
        <Card sx={{ boxShadow: 4, borderRadius: 1, p: 1, mb: 4, color: 'common.white', backgroundColor: '#00CFF888' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography variant='h5' sx={{mb: 2}}>
              Market Stats
            </Typography>
            <Box sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Box sx={{mr: 6}}>
                  <Typography variant="h6" color='secondary'>Total Earning</Typography>
                  <Typography variant="h4" color='white'>8.82 B</Typography>
                </Box>
                <Box sx={{mr: 6}}>
                  <Typography variant="h6" color='secondary'>Available Liquidity</Typography>
                  <Typography variant="h4" color='white'>8.82 B</Typography>
                </Box>
                <Box sx={{mr: 6}}>
                  <Typography variant="h6" color='secondary'>Total Reserves</Typography>
                  <Typography variant="h4" color='white'>9.97 M</Typography>
                </Box>
                <Box sx={{mr: 6}}>
                  <Typography variant="h6" color='secondary'>Collateralization</Typography>
                  <Typography variant="h4" color='white'>132.82%</Typography>
                </Box>
              </Box>
              <div>
                <Typography variant="h6" color='secondary'>Total Earning</Typography>
                <Typography variant="h3" color='white'>8.82 B</Typography>
              </div>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={6} sx={{mb: 4}}>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#00CFF822' }}>
              <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Typography variant='h5' sx={{mb: 2}}>
                  Market Rates
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#00CFF822' }}>
              <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                <Typography variant='h5' sx={{mb: 2}}>
                  Interest Rate Model
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card sx={{ boxShadow: 4, borderRadius: 2, p: 2, color: 'common.white', backgroundColor: '#00CFF822' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography
              variant='h4'
              sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
            >
              Collateral Assets
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Asset</TableCell>
                  <TableCell align='right'>Total Supply</TableCell>
                  <TableCell align='right'>Reserves</TableCell>
                  <TableCell align='right'>Oracle Price</TableCell>
                  <TableCell align='right'>Collateral Factor</TableCell>
                  <TableCell align='right'>Liquidation Factor</TableCell>
                  <TableCell align='right'>Liquidation Penalty</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Cell component='th' scope='row'>
                  WBTC
                </Cell>
                <Cell align='right'>
                  $414.76M
                </Cell>
                <Cell align='right'>
                  $21.61
                </Cell>
                <Cell align='right'>
                  $57,200.18
                </Cell>
                <Cell align='right'>
                  80%
                </Cell>
                <Cell align='right'>
                  85%
                </Cell>
                <Cell align='right'>
                  5%
                </Cell>
              </TableBody>
            </Table>
            </CardContent>
          </Card>

    </BoxContainer>
  );
};

export default MarketPage;
