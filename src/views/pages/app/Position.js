import {Box, Typography} from '@mui/material'
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { getPositionInfo, getTokenPrice } from "src/contracts/pool"
import { formatNumber, getTokenSymbol, toFixed } from "src/wallet/utils"
import { Button } from "@mui/material"
import SectionCard from "../SectionCard"

const Position = (props) => {

  const { address, isConnected } = useAccount()
  const [isUSDMode, setUSDMode] = useState(true)
  const [positionInfo, setPositionInfo] = useState()
  const [price, setPrice] = useState()

  useEffect(() => {
    if (props.pool && address) {
      getPositionInfo(props.pool.poolAddress, address)
        .then(position => {
          setPositionInfo(position)
        })

      getTokenPrice(props.pool.principalToken)
        .then(value => {
          setPrice(value)
        })
    }
  }, [address, props.pool])

  const toggleMode = () => {
    setUSDMode(!isUSDMode)
  }

  const getValueByMode = (value) => {
    if (!price || price == 0)
      return '--'

    return isUSDMode? `$${toFixed(value)}` : (parseFloat(formatNumber(value)) / price).toFixed(2)
  }

  return (
    <SectionCard
      title="Position Summary"
      action={
        props.pool? (
          <Button color="warning" onClick={toggleMode}>
            {isUSDMode?  'USD' : getTokenSymbol(props.pool.principalToken)}
          </Button>
        ) : null
      }>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5'>
          Token Price
        </Typography>
        <Typography variant='h5'>
          $ {price}
        </Typography>
      </Box>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5'>
          Collateral Value
        </Typography>
        <Typography variant='h5'>
          {getValueByMode(positionInfo?.collateralValue)}
        </Typography>
      </Box>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5'>
          Current Debt Value
        </Typography>
        <Typography variant='h5'>
          {getValueByMode(positionInfo?.currentDebtValue)}
        </Typography>
      </Box>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5'>
          Liquidation Point
        </Typography>
        <Typography variant='h5'>
          {getValueByMode(positionInfo?.liquidationPoint)}
        </Typography>
      </Box>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5'>
          Borrow Capacity
        </Typography>
        <Typography variant='h5'>
          {getValueByMode(positionInfo?.borrowCapacity)}
        </Typography>
      </Box>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5'>
          Available to Borrow
        </Typography>
        <Typography variant='h5'>
          {getValueByMode(positionInfo?.availableToBorrowValue)}
        </Typography>
      </Box>
    </SectionCard>
  )
}

export default Position
