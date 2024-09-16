import {
  Button,
  Grid, Typography
} from '@mui/material'
import SectionCard from '../SectionCard'
import PositionCard from './PositionCard'
import CreditPositionInfo from './CreditPositionInfo'
import LiquidityDialog from 'src/views/dialogs/LiquidityDialog'
import { useEffect, useState } from 'react'
import { getUserCreditPositions } from 'src/contracts/pool'
import { useAccount } from 'wagmi'

const CreditPositions = (props) => {

  const {address, isConnected} = useAccount()
  const [positions, setPositions] = useState([])
  const [showAsToken, setShowAsToken] = useState(true)

  const [action, setAction] = useState()
  const [actionPosition, setActionPosition] = useState({})
  const [openCreditModal, setOpenCreditModal] = useState(false)

  useEffect(() => {
    if (address && isConnected) {
      getUserCreditPositions(address)
        .then(value => {
          if (value && value.length != 0) {
            const filteredPositions = value/*.filter(v => {
              return v.liquidityValue != 0n
            })*/

            const summary = {
              liquidityValue: 0n,
              cashValue: 0n,
              earnedValue: 0n
            }
            for (let position of filteredPositions) {
              summary.liquidityValue += position.liquidityValue
              summary.cashValue += position.cashValue
              summary.earnedValue += position.earnedValue
            }
            setPositions([summary, ...filteredPositions])
          }

        })
    }
  }, [address])

  const openDialog = (idx, action) => {
    setAction(action)
    setActionPosition(positions[idx])
    setOpenCreditModal(true)
  }

  const closeDialog = () => {
    setOpenCreditModal(false)
  }

  const toggleMode = () => {
    setShowAsToken(!showAsToken)
  }

  return (
    <SectionCard
      title="Liquidity Positions"
      action={
        <Button onClick={toggleMode}>
          { showAsToken ? 'Token' : 'USD' }
        </Button>
      }>
      <Grid
        sx={{mt: 2}}
        container
        spacing={4}
        alignItems="stretch">
        {
          positions.length != 0 ?
          positions.map((position, idx) => (
            <Grid key={idx} item xs={12} sm={6} md={4}>
              <PositionCard isSummary={idx == 0}>
                <CreditPositionInfo
                  showAsToken={showAsToken}
                  openModal={openDialog}
                  position={position}
                  idx={idx}
                />
              </PositionCard>
            </Grid>
          )) : <Typography sx={{p: 4}}>There's no liquidity positions</Typography>
        }
      </Grid>

      <LiquidityDialog
        action={action}
        position={actionPosition}
        openModal= {openCreditModal}
        handleClose={closeDialog} />
    </SectionCard>
  )
}

export default CreditPositions
