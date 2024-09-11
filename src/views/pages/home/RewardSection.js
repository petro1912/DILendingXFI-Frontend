import { Box, Typography } from '@mui/material'
import BoxContainer from "src/@core/components/container"

const RewardSection = () => {
  return (
    <Box className="reward">
      <BoxContainer>
        <Box sx={{display:'flex', alignItems: 'center'}}>
          <Typography variant="h1">0% <sup>APR</sup> + 0% <sup>APR</sup><br/> </Typography>
          <img className="flameshot" src="/images/home/flameshot.png" />
        </Box>
        <Typography variant="h2">Interests & Rewards</Typography>
        <Typography variant="h5" color="secondary">
          Contrary to popular belief, Lorem Ipsum is not simply random text. <br />
          45 BC text is It has roots in a piece of classical Latin literature from 45 BC text is
        </Typography>
      </BoxContainer>
    </Box>
  )
}

export default RewardSection;
