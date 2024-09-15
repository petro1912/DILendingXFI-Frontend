import {
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

  const [action, setAction] = useState()
  const [actionPosition, setActionPosition] = useState({})
  const [openCreditModal, setOpenCreditModal] = useState(false)

  useEffect(() => {
    if (address && isConnected) {
      getUserCreditPositions(address)
        .then(value => {
          if (value && value.length != 0) {
            setPositions(value/*.filter(v => {
              return v.liquidityAmount != 0n
            })*/)
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

  return (
    <SectionCard title="Liquidity Positions">
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
