import Link from 'next/link';
import { useRouter } from 'next/router';

import BoxContainer from 'src/@core/components/container';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import { TOKENS } from 'src/contracts/tokens';
import { useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';
import { FACTORY_ADDRESS } from 'src/contracts/tokens';
import ABI_FACTORY from 'src/contracts/artifacts/LendingPoolFactory.json'
import { getPoolCollateralsInfo } from 'src/contracts/pool';
import { formatNumber, formatPercent, formatPrice, getTokenSymbol } from 'src/wallet/utils';

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

  const [client, setClient] = useState(false)
  const [pool, setPool] = useState()
  const [collateralsInfo, setCollateralsInfo] = useState({})
  const router = useRouter();
  const { market } = router.query;
  if (!market) return null;


  const {data: pools, isLoading, isError} = useReadContract({
    address: FACTORY_ADDRESS,
    abi: ABI_FACTORY.abi,
    functionName: 'getAllPoolsInfo'
  })

  useEffect(() => {
    setClient(true)
  }, [])

  useEffect(() => {
    if (pools && pools.length != 0) {
      const principalToken = TOKENS.find(token => token.symbol == market)
      if (principalToken) {
        const _pool = pools.find(item => item.principalToken == principalToken.address)
        setPool(_pool)
      }
    }
  }, [pools])

  useEffect(() => {
    if (pool && pool.poolAddress)
      getPoolCollateralsInfo(pool.poolAddress)
        .then(value => {
          setCollateralsInfo(value)
        })
  }, [pool])


  return (
      <BoxContainer>
       <Box
          sx={{
            mt: "92px",
            mb: 6
          }}>
          <LinkStyled href='/markets' sx={{display: 'flex', alignItems: 'center'}}>
            <Icon icon="tabler:arrow-left" /> <span>Markets</span>
          </LinkStyled>
          <Typography
            variant='h2'
            sx={{ display: 'flex', mt:4, mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
          >
            <img src={`/images/tokens/${market.toLowerCase()}.png`} className='tokenImg' />
            • CrossFi
          </Typography>

        </Box>
        <Grid container spacing={6} sx={{mb: 4}}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" color='secondary'>Total Collateral</Typography>
            <Typography variant="h3" color='primary'>${ pool && formatNumber(pool.totalCollaterals)} </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" color='secondary'>Total Borrowing</Typography>
            <Typography variant="h3" color='#7367F0'>${ pool && formatNumber(pool.totalBorrows)} </Typography>
          </Grid>
        </Grid>
        <Card sx={{ boxShadow: 4, borderRadius: 1, p: 1, mb: 4, color: 'common.white', backgroundColor: '#00CFF811' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography variant='h5' sx={{mb: 2}}>
              Market Stats
            </Typography>
            <Box sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Box sx={{mr: 6}}>
                  <Typography variant="h6" color='secondary'>Total Rewards</Typography>
                  <Typography variant="h4" color='white'>8.82 M</Typography>
                </Box>
                <Box sx={{mr: 6}}>
                  <Typography variant="h6" color='secondary'>Available Liquidity</Typography>
                  <Typography variant="h4" color='white'>{pool && formatNumber(pool.totalDeposits - pool.totalBorrows)} </Typography>
                </Box>
                <Box sx={{mr: 6}}>
                  <Typography variant="h6" color='secondary'>Total Reserves</Typography>
                  <Typography variant="h4" color='white'>{pool && formatNumber(pool.totalDeposits)}</Typography>
                </Box>
                <Box sx={{mr: 6}}>
                  <Typography variant="h6" color='secondary'>Collateralization</Typography>
                  <Typography variant="h4" color='white'>{pool && pool.totalDeposits != 0 ? formatNumber(pool.totalCollaterals / pool.totalDeposits) * 100 : '--'} %</Typography>
                </Box>
              </Box>
              <div>
                <Typography variant="h6" color='secondary'>Oracle Price</Typography>
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
        <Card sx={{ boxShadow: 4, borderRadius: 2, p: 2, mb: 6, color: 'common.white', backgroundColor: '#00CFF822' }}>
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
                  <TableCell align='right'>Oracle Price</TableCell>
                  <TableCell align='right'>Collateral Factor</TableCell>
                  <TableCell align='right'>Liquidation Factor</TableCell>
                  <TableCell align='right'>Liquidation Penalty</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  collateralsInfo && collateralsInfo.tokenData && collateralsInfo.tokenData.map((token, index) => (
                    <TableRow key={index}>
                      <Cell scope='row'>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <img src={`/images/tokens/${getTokenSymbol(token.token).toLowerCase()}.png`} className='tokenImg' />
                          <Typography>{getTokenSymbol(token.token)}</Typography>
                        </Box>
                      </Cell>
                      <Cell align='right'>
                        <Typography>{formatNumber(token.totalSupply)}</Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>${formatPrice(token.oraclePrice)}</Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>{formatPercent(collateralsInfo.loanToValue)}%</Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>{formatPercent(collateralsInfo.liquidationThreshold)}%</Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>{formatPercent(collateralsInfo.liquidationBonus)}%</Typography>
                      </Cell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
            </CardContent>
        </Card>

    </BoxContainer>
  );
};

export default MarketPage;
