import { Box, Typography, Button } from '@mui/material'
import BoxContainer from "src/@core/components/container"

const Banner = () => {
  return (
    <Box
      className="banner"
        sx={{
          p: [6, 12],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
      <BoxContainer>
        <div style={{marginTop: "80px", textAlign: "center"}}>
          <Typography variant="h1">
            <font color="#00CFE8">Capital Efficiency</font> &
            <font color="#28C76F"> Staking Supported</font>, <br/>
            <font color="#FF871F">Optimistic Rewards</font> to All Parties during Loans
          </Typography>
          <Typography variant="h4" color="secondary" sx={{mt: 4, lineHeight: '2rem'}}>
            Invest Idle liquidity and collateral assets <br/>
            to support Staking/Farming and receive Extra Rewards. <br />
            Maximize utilization and More revenue to Users on the Protocol.
          </Typography>
          <Button variant='contained' sx={{ mt: 6, mb: 6 }}>
            Launch App
          </Button>
        </div>
      </BoxContainer>

      <img className="flameshot-left" src="/images/home/flameshot-left.png" />
      <img className="flameshot-right" src="/images/home/flameshot-right.png" />
      <video className="crossfi-anim" poster="" loop={true} autoPlay="autoplay" muted={true} playsInline="" src="https://crossfi.org/src/assets/video/Crossfi360-1.mp4" />
    </Box>
  )
}

export default Banner;
