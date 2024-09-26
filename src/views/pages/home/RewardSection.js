import { Box, Typography } from '@mui/material'
import BoxContainer from "src/@core/components/container"

const RewardSection = () => {
  return (
    <Box className="reward">
      <BoxContainer>
        <Box sx={{display:'flex', alignItems: 'center'}}>
          <Typography variant="h1">3.5% <sup>APR</sup> + 2.5% <sup>Rewards</sup><br/> </Typography>
          <img className="flameshot" src="/images/home/flameshot.png" />
        </Box>
        <Typography variant="h2">Interests & Rewards</Typography>
        <Typography variant="h5" color="secondary">
          Lenders earn interest from borrowers, revenue from idle liquidity and some revenue from collaterals <br />
          Borrowers: main revenue from collaterals <br />
        </Typography>
      </BoxContainer>
    </Box>
  )
}

export default RewardSection;
