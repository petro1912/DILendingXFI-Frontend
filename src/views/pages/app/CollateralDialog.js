import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import CloseButton from "src/views/pages/CloseModalButton"
import Box from "@mui/material/Box"
import Icon from 'src/@core/components/icon'
import Typography from "@mui/material/Typography"
import UnderlineInput from 'src/@core/components/UnderlineInput';
import { Button, DialogActions } from "@mui/material"
import { useState } from "react"
import { getTokenImgName, getTokenSymbol } from "src/wallet/utils"


const CollateralDialog = (props) => {

  const [amount, setAmount] = useState(100)
  const handleClose = () => {
    if (props.handleClose)
      props.handleClose()
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='collateral-dialog'
      open={props.openModal}
      sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: 'none', border: '1px solid #00CFE8', overflow: 'visible' } }}>
      <DialogTitle variant='h3' color="primary" id='collateral-dialog'>
        {
          props.action == 'deposit' ? 'Deposit Collateral' : 'Withdraw Collateral'
        }
      </DialogTitle>
      <CloseButton
        aria-label='close'
        onClick={handleClose}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CloseButton>
      <Box sx={{ px: 8, py:4 }}>
        {
          props.token &&
          <Box sx={{mb: 4}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant="h6" color="secondary">Token</Typography>
              <Typography variant="h6" color="secondary">Protocol Balance</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <img src={`/images/tokens/${getTokenImgName(props.token.token)}.png`} className='tokenImg' />
                <Typography variant="h3">{getTokenSymbol(props.token.token)}</Typography>
              </Box>
              <Typography variant="h3">0.0</Typography>
            </Box>
          </Box>
        }
        <UnderlineInput
          label="amount"
          amount={amount}
          onChange={handleAmountChange}
          fullWidth />

        <Typography sx={{textAlign: 'right', mb: 2}}>
          {amount * 100}
        </Typography>
      </Box>
      <DialogActions>
        <Button
          sx={{textTransform: 'capitalize'}}>
          {props.action}
        </Button>
        <Button color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  )

}

export default CollateralDialog;
