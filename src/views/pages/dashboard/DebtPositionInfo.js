import {
  Box,
  Button,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import { ACTION_BORROW, ACTION_REPAY, formatNumber, getTokenImgName, getTokenSymbol } from 'src/wallet/utils'

const DebtPositionInfo = (props) => {

  const {
    position,
    idx,
    openModal
  } = props

  const {
    poolAddress,
    tokenAddress,
    borrowAmount,
    collateralValue,
    currentDebtValue,
    liquidationPoint,
    availableToBorrow
  } = position

  const router = useRouter()
  const isSummary = idx == 0

  const goMarket = () => {
    router.push(`/markets/${getTokenSymbol(tokenAddress)}`)
  }

  const openModalAction = (action) => {
    openModal(idx, action)
  }

  return (
    <Box>
      {
        !isSummary? (
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center', mt: 1}}>
              <img src={`/images/tokens/${getTokenImgName(tokenAddress)}.png`} className='tokenImg small' />
              <Typography variant='h4' sx={{mr: 2}}>{getTokenSymbol(tokenAddress)}</Typography>
            </Box>
            <Button
              sx={{display: 'flex', alignItems: 'center'}}
              onClick={goMarket}>
              <span>Go Market</span> <Icon icon="tabler:arrow-right" />
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant='h3' sx={{mr: 2}}>Summary</Typography>
          </Box>
        )
      }
      <Box sx={{p: 3}}>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography>Borrows: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(borrowAmount)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography>Collaterals: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(collateralValue)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography>Debt: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(currentDebtValue)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography>Liquidation Point: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(liquidationPoint)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>Available to borrow: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(availableToBorrow)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography>Rewards: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}> USD</Typography>
        </Box>

      </Box>
      {
        !isSummary &&
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4}}>
          <Button
            variant='outlined'
            size="small"
            sx={{mr: 2}}
            onClick={() => openModalAction(ACTION_BORROW)}
          >
            Borrow
          </Button>
          <Button
            variant='outlined'
            size="small"
            sx={{mr: 2}}
            color="warning"
            onClick={() => openModalAction(ACTION_REPAY)}
          >
            Repay
            </Button>
        </Box>
      }
    </Box>
  )
}

export default DebtPositionInfo
