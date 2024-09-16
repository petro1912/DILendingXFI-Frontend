import {
  Button,
  Grid, Typography,
} from '@mui/material'
import SectionCard from '../SectionCard'
import DebtPositionInfo from './DebtPositionInfo'
import PositionCard from './PositionCard'
import DebtDialog from 'src/views/dialogs/DebtDialog'
import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getUserDebtPositions } from 'src/contracts/pool'

const DebtPositions = (props) => {

  const {address, isConnected} = useAccount()
  const [positions, setPositions] = useState([])
  const [showAsToken, setShowAsToken] = useState(true)

  const [action, setAction] = useState()
  const [actionPosition, setActionPosition] = useState({})
  const [openDebtModal, setOpenDebtModal] = useState(false)

  useEffect(() => {
    if (address && isConnected) {
      getUserDebtPositions(address)
        .then(value => {
          if (value && value.length != 0) {
            const filteredPositions = value/*.filter(v => {
              return v.collateralValue != 0n
            })*/

            const summary = {
              borrowValue: 0n,
              collateralValue: 0n,
              currentDebtValue: 0n,
              availableToBorrowValue: 0n,
            }

            for (let position of filteredPositions) {
              summary.borrowValue += position.borrowValue
              summary.collateralValue += position.collateralValue
              summary.currentDebtValue += position.currentDebtValue
              summary.availableToBorrowValue += position.availableToBorrowValue
            }
            setPositions([summary, ...filteredPositions])
          }

        })
    }
  }, [address])

  const openDialog = (idx, action) => {
    setAction(action)
    setActionPosition(positions[idx])
    setOpenDebtModal(true)
  }

  const closeDialog = () => {
    setOpenDebtModal(false)
  }

  const toggleMode = () => {
    setShowAsToken(!showAsToken)
  }

  return (
    <SectionCard title="Borrow Positions"
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
            <Grid key={idx} item xs={12} sm={12} md={4}>
              <PositionCard isSummary={idx == 0}>
                <DebtPositionInfo
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

      <DebtDialog
        action={action}
        position={actionPosition}
        openModal= {openDebtModal}
        handleClose={closeDialog} />
    </SectionCard>
  )
}

export default DebtPositions
