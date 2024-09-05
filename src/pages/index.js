import Link from 'next/link'

import { Typography } from "@mui/material"
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import BoxContainer from "src/@core/components/container"
import FAQ from "src/views/pages/home/faq"
import MarketSwiper from "src/views/pages/home/markets"
import { styled } from '@mui/material/styles'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(8),
  fontSize: 16,
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}))

const Home = () => {
  return (
    <>
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
              <font color="#FF871F">Staking Rewards</font> to All Parties during Loans
            </Typography>
            <Typography variant="h5" color="secondary" sx={{mt: 4}}>
              Invest remaining borrow and collateral assets to Staking to support it and receive Extra Rewards. <br />
              Enhance utilization and More revenue to Users on the Protocol.
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
                <Typography sx={{textAlign: 'center'}} variant="h2">13.45 B</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{textAlign: 'center'}} variant="h2">Total Available</Typography>
                <Typography sx={{textAlign: 'center'}} variant="h2">8.82 B</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography sx={{textAlign: 'center'}} variant="h2">Total Borrows</Typography>
                <Typography sx={{textAlign: 'center'}} variant="h2">4.63 B</Typography>
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
          <MarketSwiper />
        </BoxContainer>
      </Box>

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
      <Box className="works">
        <BoxContainer>
          <Typography variant="h1" sx={{textAlign: 'center', mb: 4}}>Frequently Asked Questions</Typography>
          <FAQ sx={{mt:2}}/>
        </BoxContainer>

      </Box>
      </>
  )
}

export default Home
