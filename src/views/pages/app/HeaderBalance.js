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
import { ethers } from 'ethers'
import { getTokenBalance } from 'src/contracts/pool'
import { useAccount } from 'wagmi'
import BalanceValueText from '../home/BalanceValueText'

const HeaderBalance = (props) => {

  const {address, isConnected} = useAccount()
  const [anchorEl, setAnchorEl] = useState(null)
  const pools = useSelector((state) => state.pools.entities);
  const [principalToken, setPrincipalToken] = useState()

  useEffect(() => {
    if (props.pool)
      setPrincipalToken(props.pool.principalToken)
  }, [props.pool])

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
              <img
                src={`/images/tokens/${getTokenImgName(principalToken)}.png`}
                className='tokenImg'
              />
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
                  <img
                    src={`/images/tokens/${getTokenImgName(_pool.principalToken)}.png`}
                    className='tokenImg'
                    />
                  {getPrincipalTokenSymbol(_pool)}
                </MenuItem>)
              )
            }
          </Menu>
          <BalanceText
            variant="h1"
            sx={{ ml: 2 }}
            token={principalToken}
          />
        </Box>
        <BalanceValueText
          token={principalToken} />
      </Box>
  )
}

export default HeaderBalance
