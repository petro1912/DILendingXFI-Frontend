import {useState} from 'react'
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import BalanceText from '../home/BalanceText'
import Icon from 'src/@core/components/icon'

const HeaderBalance = (props) => {

  const tokens = ['usdt', 'xusd']
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const selectToken = (_token) => {
		props.setToken(_token)
		handleClose()
	}


  return (
    <Box>
      <Typography color="primary">Balance</Typography>
      <Box
        sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2
      }}>
          <Button
            variant='outlined'
            size="small"
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}>
            <img src={`/images/tokens/${props.token}.png`} className='tokenImg' />
            <Icon icon="tabler:caret-down" />
          </Button>
          <Menu
            keepMounted
            id='simple-menu'
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}>
            {
                tokens.map((_token, index) => (
                <MenuItem
                    key={index}
                    disabled={_token == props.token}
                    onClick={() => selectToken(_token)}>
                    <img src={`/images/tokens/${_token}.png`} className='tokenImg' />
                    {_token}
                </MenuItem>)
                )
            }
          </Menu>
          <BalanceText variant="h1" sx={{ ml: 2 }} />
        </Box>
        <Typography variant="h6">$0.00</Typography>
      </Box>
  )
}

export default HeaderBalance
