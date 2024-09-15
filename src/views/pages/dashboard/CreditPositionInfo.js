import {
  Box,
  Button,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import { ACTION_SUPPLY, ACTION_SUPPLY_WITHDRAW, formatNumber, getTokenImgName, getTokenSymbol } from 'src/wallet/utils'

export const CreditPositionInfo = (props) => {

  const {
    idx,
    position,
    openModal
  } = props

  const {
    tokenAddress,
    liquidityAmount,
    liquidityValue,
    cashAmount,
    cashValue,
    earnedAmount
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
            <Button onClick={goMarket} sx={{display: 'flex', alignItems: 'center'}}>
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
          <Typography>Supply: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(liquidityAmount)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography>Credit: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(cashAmount)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>Earned: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(earnedAmount)}</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>Rewards: </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>$</Typography>
        </Box>
      </Box>
      {
        !isSummary &&
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4}}>
          <Button
            variant='outlined'
            size="small"
            sx={{mr: 2}}
            onClick={() => openModalAction(ACTION_SUPPLY)}
          >
            Supply
          </Button>
          <Button
            variant='outlined'
            size="small"
            sx={{mr: 2}}
            onClick={() => openModalAction(ACTION_SUPPLY_WITHDRAW)}
            color="warning"
          >
            Withdraw
          </Button>
        </Box>
      }
    </Box>
  )
}

export default CreditPositionInfo
