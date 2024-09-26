import { useState, useEffect } from 'react'

import { Typography } from "@mui/material"
import {
  Box,
  Grid,
  Card,
  CardContent
}from '@mui/material'
import BoxContainer from "src/@core/components/container"

import MarketSection from 'src/views/pages/home/MarketSection'
import Banner from 'src/views/pages/home/Banner'
import RewardSection from 'src/views/pages/home/RewardSection'
import FAQ from "src/views/pages/home/FAQ"

import { useReadContract } from 'wagmi'
import { FACTORY_ADDRESS } from 'src/contracts/tokens'
import ABI_FACTORY from 'src/contracts/artifacts/LendingPoolFactory.json'
import { useSelector, useDispatch } from 'react-redux';
import { setPoolsInfo } from 'src/redux/poolsSlice';


const Home = () => {

  const pools = useSelector((state) => state.pools.entities);
  const dispatch = useDispatch();

  const {data: pools_data} = useReadContract({
    address: FACTORY_ADDRESS,
    abi: ABI_FACTORY.abi,
    functionName: 'getAllPoolsInfo'
  })

  useEffect(() => {
    if (pools_data && pools_data.length != 0)
      dispatch(setPoolsInfo(pools_data))
  }, [pools_data])

  return (
    <>
      <Banner />

      <MarketSection pools={pools}/>

      <RewardSection />

      <Box className="industry">
        <BoxContainer>
          <Typography variant="h1">How it works</Typography>
          <Box sx={{mb: 10}}>
            <Grid
              container
              spacing={6}
              mt={6}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: 4,
                    borderRadius: 2,
                    // border: '1px solid #00CFE8',
                    mx: 6,
                    p: 2,
                    color: 'common.white',
                    backgroundColor: '#00CFF822',
                    backdropFilter: 'blur(12px)'
                  }}>
                    <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                      <Box textAlign={'center'} my={4}>
                        <img className="feature-image" src="/images/icons/lending.png" />
                      </Box>
                      <Typography variant='h2' color="primary" textAlign={'center'}>
                        Lock assets to Protocol
                      </Typography>
                      <Typography variant='h5' sx={{pt: 3, lineHeight: 1.8, px: 6}}>
                        Lenders lock principal token to supply,
                        Borrowers deposit collateral token to borrow.<br />
                      </Typography>
                    </CardContent>
                  </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: 4,
                    borderRadius: 2,
                    // border: '1px solid #00CFE8',
                    mx: 6,
                    p: 2,
                    color: 'common.white',
                    backgroundColor: '#00CFF822',
                    backdropFilter: 'blur(12px)'
                  }}>
                    <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                      <Box textAlign={'center'} my={4}>
                        <img className="feature-image" src="/images/icons/investment.png" />
                      </Box>
                      <Typography variant='h2' color="primary" textAlign={'center'} sx={{px: 4}}>
                        Investment idle Assets
                      </Typography>
                      <Typography variant='h5' sx={{pt: 3, lineHeight: 1.8, px: 4}}>
                        Determine idle liquidity and collateral assets to invest. <br />
                        Transfer Idle liquidity and collaterals to external revenue protocol
                      </Typography>
                    </CardContent>
                  </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: 4,
                    borderRadius: 2,
                    // border: '1px solid #00CFE8',
                    mx: 6,
                    p: 2,
                    color: 'common.white',
                    backgroundColor: '#00CFF822',
                    backdropFilter: 'blur(12px)'
                  }}>
                    <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
                      <Box textAlign={'center'} my={4}>
                        <img className="feature-image" src="/images/icons/distribution.png" />
                      </Box>
                      <Typography variant='h2' color="primary" textAlign={'center'}>
                        Revenue <br/> Distribution
                      </Typography>
                      <Typography variant='h5' sx={{pt: 3, lineHeight: 1.8, px: 4, textAlign: 'justify'}}>
                        Lenders: interest from borrowers, revenue from idle liquidity and some revenue from collaterals <br/>
                        Borrowers: main revenue from collaterals
                      </Typography>
                    </CardContent>
                  </Card>
              </Grid>
            </Grid>
          </Box>
        </BoxContainer>
      </Box>
      <FAQ />
    </>
  )
}

export default Home
