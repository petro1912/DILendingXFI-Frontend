import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { getPositionInfo } from "src/contracts/pool"
import { position } from "stylis"
import { formatNumber } from "src/wallet/utils"

const Position = (props) => {

  const { address, isConnected } = useAccount()
  // const address = "0x0e801d84fa97b50751dbf25036d067dcf18858bf";
  const [positionInfo, setPositionInfo] = useState()

  useEffect(() => {
    if (props.pool && address) {
      getPositionInfo(props.pool.poolAddress, address)
      .then(position => {
        setPositionInfo(position)
      })
    }
  }, [address, props.pool])

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
      <CardContent>
        <Typography color="primary" variant='h6'>
          Position Summary
        </Typography>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Collateral Value
          </Typography>
          <Typography variant='h5'>
            {formatNumber(positionInfo?.collateralValue)}
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Current Debt Value
          </Typography>
          <Typography variant='h5'>
            {formatNumber(positionInfo?.currentDebtValue)}
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Liquidation Point
          </Typography>
          <Typography variant='h5'>
            {formatNumber(positionInfo?.liquidationPoint)}
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Borrow Capacity
          </Typography>
          <Typography variant='h5'>
            {formatNumber(positionInfo?.borrowCapacity)}
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Available to Borrow
          </Typography>
          <Typography variant='h5'>
            {formatNumber(positionInfo?.availableToBorrow)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Position
