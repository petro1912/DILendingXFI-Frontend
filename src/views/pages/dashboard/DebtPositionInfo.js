import {
  Box,
  Button,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import { ACTION_BORROW, ACTION_REPAY, formatNumber, getTokenImgName, getTokenSymbol, toFixed } from 'src/wallet/utils'

const InfoItem = styled(Box)(() => ({
  marginTop: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const ValueText = styled(Typography) (()=> ({
  fontWeight: 'bold'
}))

const DebtPositionInfo = (props) => {

  const {
    idx,
    position,
    openModal,
    showAsToken
  } = props

  const {
    poolAddress,
    tokenAddress,
    borrowAmount,
    borrowValue,
    collateralValue,
    currentDebtAmount,
    currentDebtValue,
    liquidationPoint,
    availableToBorrowAmount,
    availableToBorrowValue
  } = position

  const router = useRouter()
  const isSummary = idx == 0
  const showInUSD = isSummary || !showAsToken

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
          <ValueText>
            {!showInUSD? toFixed(borrowAmount) : `$${toFixed(borrowValue)}`}
          </ValueText>
        </Box>
        <InfoItem>
          <Typography>Collaterals: </Typography>
          <ValueText>
            ${toFixed(collateralValue)}
          </ValueText>
        </InfoItem>
        <InfoItem>
          <Typography>Debt: </Typography>
          <ValueText>
            {!showInUSD? toFixed(currentDebtAmount) : `$${toFixed(currentDebtValue)}`}
          </ValueText>
        </InfoItem>
        <InfoItem>
          <Typography>Liquidation Point: </Typography>
          <ValueText>
            ${toFixed(liquidationPoint)}
          </ValueText>
        </InfoItem>
        <InfoItem>
          <Typography>Available to borrow: </Typography>
          <ValueText>
            {!showInUSD? toFixed(availableToBorrowAmount) : `$${toFixed(availableToBorrowValue)}`}
          </ValueText>
        </InfoItem>
        <InfoItem>
          <Typography>Rewards: </Typography>
          <ValueText> USD</ValueText>
        </InfoItem>

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
