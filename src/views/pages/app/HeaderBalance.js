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
import { getPrincipalTokenSymbol, getTokenImgName, toFixed, toFloat } from 'src/wallet/utils'
import BalanceValueText from '../home/BalanceValueText'
import { getTokenPrice } from 'src/contracts/pool'

const HeaderBalance = (props) => {

  const [anchorEl, setAnchorEl] = useState(null)
  const pools = useSelector((state) => state.pools.entities);
  const [tokenPrice, setTokenPrice] = useState(0)

  const {
    principalToken,
    totalDeposits,
    totalBorrows,
  } = props.pool

  const {creditPosition} = props

  useEffect(() => {
    if (props.pool) {
      getTokenPrice(principalToken)
        .then(value => {
          setTokenPrice(value)
        })
    }

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
      <Typography color="primary">Protocol Balance</Typography>
      <Box
        sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
        }}>
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
          <Typography
            variant="h1"
            sx={{ ml: 2 }}>
              {props.pool && toFixed(totalDeposits - totalBorrows)}
          </Typography>


        </Box>
        <Box>
          <Typography color="primary">Supply to Protocol</Typography>
          <Typography variant="h3" textAlign="right">{creditPosition && toFixed(creditPosition.liquidityAmount)}</Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
        }}>
        <Typography>${props.pool && toFixed(toFloat(totalDeposits - totalBorrows) * tokenPrice)}</Typography>
        <Typography>${props.pool && creditPosition && toFixed(creditPosition.liquidityAmount) * tokenPrice}</Typography>
      </Box>
    </Box>
  )
}

export default HeaderBalance
