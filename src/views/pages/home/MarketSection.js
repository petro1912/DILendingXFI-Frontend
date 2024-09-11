import Link from 'next/link'

import { Typography, Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import BoxContainer from "src/@core/components/container"
import MarketSwiper from "src/views/pages/home/MarketSwiper"
import { useEffect, useState } from 'react'
import { calcStatistics } from 'src/wallet/utils'
import { useSelector } from 'react-redux'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(8),
  fontSize: 16,
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}))

const MarketSection = (props) => {

  const [statistics, setStatistics] = useState()
  const pools = useSelector((state) => state.pools.entities);

  useEffect(() => {
    if (!pools || pools.length == 0)
      return

      setStatistics(calcStatistics(pools))
  }, [pools])

  return (
    <>
      <Box
        className="tvl-banner"
        sx={{
          p: [6, 12],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <BoxContainer >
          <div className="tvl-div">
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{textAlign: 'center'}} variant="h2">Total Market size</Typography>
                <Typography sx={{textAlign: 'center'}} variant="h2">{statistics?.totalDeposits.toString() || '10.3B'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{textAlign: 'center'}} variant="h2">Total Borrows</Typography>
                <Typography sx={{textAlign: 'center'}} variant="h2">{statistics?.totalBorrows.toString() || '6.5B'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{textAlign: 'center'}} variant="h2">Total Collaterals</Typography>
                <Typography sx={{textAlign: 'center'}} variant="h2">{statistics?.totalCollaterals.toString() || '4B'}</Typography>
              </Grid>
            </Grid>
          </div>
        </BoxContainer>
      </Box>

      <Box className="market">
        <BoxContainer >
          <Typography variant="h1" sx={{textAlign: 'center', color: '#FF871F'}}>Markets</Typography>
          <Box sx={{textAlign: 'right', mb: 4}}>
            <LinkStyled href='/markets'>
              See All
            </LinkStyled>
          </Box>
          <MarketSwiper pools={props.pools}/>
        </BoxContainer>
      </Box>
    </>
  )
}

export default MarketSection;
