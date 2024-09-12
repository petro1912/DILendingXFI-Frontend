import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import BalanceText from '../home/BalanceText'
import Icon from 'src/@core/components/icon'
import { getPrincipalTokenSymbol, getTokenImgName } from 'src/wallet/utils'

const HeaderBalance = (props) => {

  const [anchorEl, setAnchorEl] = useState(null)
  const pools = useSelector((state) => state.pools.entities);

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const selectPool = (_pool) => {
		props.setPool(_pool)
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
            {
              props.pool &&
              <img src={`/images/tokens/${getTokenImgName(props.pool.principalToken)}.png`} className='tokenImg' />
            }
            <Icon icon="tabler:caret-down" />
          </Button>
          <Menu
            keepMounted
            id='simple-menu'
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}>
            {
                pools && pools.map((_pool, index) => (
                <MenuItem
                    key={index}
                    disabled={_pool == props.pool}
                    onClick={() => selectPool(_pool)}>
                    <img src={`/images/tokens/${getTokenImgName(_pool.principalToken)}.png`} className='tokenImg' />
                    {getPrincipalTokenSymbol(_pool)}
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
