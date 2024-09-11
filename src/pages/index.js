import { useState, useEffect } from 'react'

import { Typography } from "@mui/material"
import Box from '@mui/material/Box'
import BoxContainer from "src/@core/components/container"

import MarketSection from 'src/views/pages/home/MarketSection'
import Banner from 'src/views/pages/home/Banner'
import RewardSection from 'src/views/pages/home/RewardSection'
import FAQ from "src/views/pages/home/FAQ"

import { getAllPools } from 'src/contracts/pool'
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
          <Typography variant="h1" sx={{textAlign: 'center'}}>Industry Loading Rewards</Typography>
          <Typography variant="h5" sx={{textAlign: 'center'}} color="secondary">
            Contrary to popular belief, Lorem Ipsum is not simply random text.  45 BC text is It has roots in a piece
          </Typography>
        </BoxContainer>
      </Box>
      <Box className="works">
        <BoxContainer>
          <Typography variant="h1">How it works</Typography>
          <Typography variant="h5" color="secondary">
            Contrary to popular belief, Lorem Ipsum is not simply random text.  45 BC text is It has roots in a piece
          </Typography>
        </BoxContainer>
      </Box>
      <FAQ />
    </>
  )
}

export default Home
