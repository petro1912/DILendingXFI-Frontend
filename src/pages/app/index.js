import { useState } from 'react';
import BoxContainer from 'src/@core/components/container';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fab from '@mui/material/Fab'
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Icon from 'src/@core/components/icon'
import UnderlineInput from 'src/@core/components/UnderlineInput';
import { Divider, IconButton } from '@mui/material';
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations';
import { styled } from '@mui/material/styles'

const PlusButton = styled(IconButton)({
    backgroundColor: '#00CFE8', // Fill color
    color: 'white', // Icon color
    '&:hover': {
      backgroundColor: '#00CFE8CC', // Darker on hover
    },
});

const MinusButton = styled(IconButton)({
    backgroundColor: '#FF9F43', // Fill color
    color: 'white', // Icon color
    '&:hover': {
      backgroundColor: '#FF9F43CC', // Darker on hover
    },
});

const App = () => {

  const [token, setToken] = useState("usdt")
  const tokens = ['usdt', 'xusd']
  const collateralTokens = ['xfi', 'empx', 'xusd']


  const [anchorEl, setAnchorEl] = useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const selectToken = (_token) => {
    setToken(_token)
    handleClose()
  }

  return (
    <>
    <BoxContainer>
     <Box
        sx={{
          mt: "92px",
          mb: 6
        }}>
        <Typography color="primary">Balance</Typography>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Button variant='outlined' size="small" aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
              <img src={`/images/tokens/${token}.png`} className='tokenImg'/> <Icon icon="tabler:caret-down" />
            </Button>
            <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
              {
                tokens.map((_token, index) =>(
                    <MenuItem
                      key={index}
                      disabled={_token == token}
                      onClick={() => selectToken(_token)}>
                      <img src={`/images/tokens/${_token}.png`} className='tokenImg'/>
                      {_token}
                    </MenuItem>)
                )
              }
            </Menu>
            <Typography variant="h1" sx={{ml: 2}}>0.00</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Fab color="success" variant="extended" sx={{ '& svg': { mr: 1 } }}>
              <Icon icon="tabler:circle-plus-filled" /> Supply {token}
            </Fab>
            <Fab color="info" variant="extended" sx={{ ml: 4, '& svg': { mr: 1 } }}>
              <Icon icon="tabler:circle-plus-filled" /> Borrow {token}
            </Fab>
          </Box>
        </Box>
        <Typography variant="h6">$0.00</Typography>
      </Box>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={8}>
          <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
            <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
              <Typography color="primary" variant='h6' sx={{my: 2}}>
                Collateral Assets
              </Typography>
              <Box sx={{p:3, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography color="grey" variant="h6">
                  Asset
                </Typography>
                <Typography color="grey" variant="h6">
                  Balance
                </Typography>
              </Box>
              <Divider color='grey'/>
              {
                collateralTokens.map((collateral, index) => (
                  <Box key={index} sx={{p:3, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <img src={`/images/tokens/${collateral}.png`} className='tokenImg small'/>
                      <Typography variant="h4" sx={{textTransform: 'uppercase'}}>{collateral}</Typography>
                    </Box>
                    <Box gap={3} sx={{display: 'flex', alignItems: 'center', }}>
                      <Typography variant="h5">
                        0.0000
                      </Typography>
                      <PlusButton size="small" color="primary">
                        <Icon icon="tabler:plus" />
                      </PlusButton>
                      <MinusButton size="small" color="warning">
                        <Icon icon="tabler:minus" />
                      </MinusButton>
                    </Box>
                  </Box>
                ))
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 12, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
            <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
              <Typography color="primary" variant='h6' sx={{my: 2}}>
                Wallet Balance
              </Typography>
              <Box sx={{p:2, display: 'flex', alignItems: 'center', mb: 4}}>
                <img
                  src={`/images/tokens/${token}.png`}
                  className='tokenImg small'/>
                <Typography variant='h4' sx={{mr: 2}}>
                  0.0000
                </Typography>
              </Box>
              <UnderlineInput fullWidth />
              <Box sx={{p:3, mt: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 1, backgroundColor: '#00CFE822'}}>
                <Box>
                  <Typography variant='h6' color="grey" sx={{mr: 2, mb: 2}}>
                    Net Borrow APR
                  </Typography>
                  <Typography variant='h5' sx={{mr: 2}}>
                    3.72 %
                  </Typography>
                </Box>
                <Box sx={{textAlign: 'right'}}>
                  <Typography variant='h6' color="grey" sx={{mr: 2, mb: 2}}>
                    Net Supply APR
                  </Typography>
                  <Typography variant='h5' sx={{mr: 2}}>
                    3.53 %
                  </Typography>
                </Box>
              </Box>

            </CardContent>
          </Card>
          <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
            <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
              <Typography color="primary" variant='h6' sx={{my: 2}}>
                Position Summary
              </Typography>
              <Box sx={{p:2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h5' sx={{mb: 2}}>
                  Collateral Value
                </Typography>
                <Typography variant='h5' sx={{mb: 2}}>
                  0.00
                </Typography>
              </Box>
              <Box sx={{p:2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h5' sx={{mb: 2}}>
                  Liquidation Point
                </Typography>
                <Typography variant='h5' sx={{mb: 2}}>
                  0.00
                </Typography>
              </Box>
              <Box sx={{p:2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h5' sx={{mb: 2}}>
                  Borrow Capacity
                </Typography>
                <Typography variant='h5' sx={{mb: 2}}>
                  0.00
                </Typography>
              </Box>
              <Box sx={{p:2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h5' sx={{mb: 2}}>
                  Available to Borrow
                </Typography>
                <Typography variant='h5' sx={{mb: 2}}>
                  0.00
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </BoxContainer>
    <FooterIllustrations />
    </>
  )
}

export default App;
