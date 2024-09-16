import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import CloseButton from "src/views/pages/CloseModalButton"
import Box from "@mui/material/Box"
import Icon from 'src/@core/components/icon'
import Typography from "@mui/material/Typography"
import UnderlineInput from 'src/@core/components/UnderlineInput';
import { Button, DialogActions } from "@mui/material"
import { useEffect, useState } from "react"
import { ACTION_SUPPLY, formatNumber, getTokenImgName, getTokenSymbol, isOnlyNumber } from "src/wallet/utils"
import { getTokenPrice, getTokenDecimals, getTokenValue } from "src/contracts/pool"
import { useAccount } from "wagmi"
import toast from "react-hot-toast"
import { ethers } from "ethers"
import { supplyTransaction, supplyWithdrawTransaction } from "src/contracts/actions"


const LiquidityDialog = (props) => {

  const {
    action,
    position: {
      poolAddress,
      tokenAddress,
      cashAmount,
      cashValue
    },
    openModal
  } = props

  const {address} = useAccount()
  const [amount, setAmount] = useState('0')
  const [balance, setBalance] = useState()
  const [price, setPrice] = useState()
  const [value, setValue] = useState()

  useEffect(() => {
    if (tokenAddress && address) {
      getTokenValue(tokenAddress, address).then(res => {
        const {balance, value} = res
        setBalance(balance)
        setValue(value)
      })

      getTokenPrice(tokenAddress)
        .then(value => {
          setPrice(value)
        })
    }
  }, [tokenAddress, address])


  const handleClose = () => {
    if (props.handleClose)
      props.handleClose()
  }

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    if (isOnlyNumber(inputValue)) {
      if (getAvailableAmount() < parseFloat(inputValue)) {
        if (action == ACTION_WITHDRAW)
          toast.error("Withdraw amount can't exceed your current deposits")
        else
          toast.error("Deposit amount can't exceed your current balance")
        return;
      }

      setAmount(inputValue);
    }
  }

  const handleAction = () => {
    if (action == ACTION_SUPPLY) {
      supplyAction()
    } else {
      withdrawAction()
    }
  }

  const getAvailableAmount = () => {
    return action == ACTION_SUPPLY ?
      parseFloat(balance) :
      parseFloat(formatNumber(cashAmount))
  }

  const setHalfAmount = () => {
    setAmount(getAvailableAmount() / 2)
  }

  const setMaxAmount = () => {
    setAmount(getAvailableAmount())
  }

  const supplyAction = async () => {
    const _amount = parseFloat(amount)
    const _balance = parseFloat(balance)
    if (!_amount || _amount > _balance) {
      toast.error("Amount should be non-zero and less than balance")
      return
    }

    const decimals = await getTokenDecimals(tokenAddress)
    const formatAmount = ethers.parseUnits(_amount.toString(), decimals)
    const formatCredit = ethers.parseUnits('0', decimals)

    supplyTransaction(poolAddress, tokenAddress, formatAmount, formatCredit)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const withdrawAction = async () => {
    const _amount = parseFloat(amount)
    const _balance = parseFloat(balance)
    if (!_amount || _amount > _balance) {
      toast.error("Amount should be non-zero and less than balance")
      return
    }

    const decimals = await getTokenDecimals(tokenAddress)
    const formatAmount = ethers.parseUnits(_amount.toString(), decimals)

    supplyWithdrawTransaction(poolAddress, formatAmount)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='collateral-dialog'
      open={openModal}
      sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: 'none', border: '1px solid #00CFE8', overflow: 'visible' } }}>
      <DialogTitle variant='h3' color="primary" id='collateral-dialog'>
        {
          action == ACTION_SUPPLY ?
            `Supply ${getTokenSymbol(tokenAddress)}` :
            `Withdraw ${getTokenSymbol(tokenAddress)}`
        }
      </DialogTitle>
      <CloseButton
        aria-label='close'
        onClick={handleClose}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CloseButton>
      <Box sx={{ px: 8, py:4 }}>
        {
          tokenAddress &&
          <Box sx={{mb: 6}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant="h6" color="secondary">Token</Typography>
              <Typography variant="h6" color="secondary">
              {
                action == ACTION_SUPPLY?
                    'Wallet Balance' :
                    'Protocol Balance'
              }
              </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <img src={`/images/tokens/${getTokenImgName(tokenAddress)}.png`} className='tokenImg' />
                <Typography variant="h3">{getTokenSymbol(tokenAddress)}</Typography>
              </Box>
              <Typography variant="h3">
                {
                  action == ACTION_SUPPLY?
                    balance :
                    formatNumber(cashAmount)
                }
              </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
              <Typography color="grey" variant="h6">
                ${
                  formatNumber(
                    action == ACTION_SUPPLY?
                      value :
                      cashValue
                  )
                }</Typography>
            </Box>
          </Box>
        }
        {
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
            <Button
              onClick={setHalfAmount}
              color="warning"
              sx={{textTransform: 'capitalize', mx: 2}}>
              Half
            </Button>
            <Button
              onClick={setMaxAmount}
              color="success"
              sx={{textTransform: 'capitalize'}}>
              Max
            </Button>
          </Box>
        }
        <UnderlineInput
          label="amount"
          value={amount}
          onChange={handleAmountChange}
          fullWidth />

        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2}}>
          <Typography color="grey" sx={{textAlign: 'right'}}>
            Price: ${ price }
          </Typography>
          <Typography color="grey" sx={{textAlign: 'right'}}>
            Value: ${ amount && price ? (price * parseFloat (amount)).toFixed(2) : '0' }
          </Typography>
        </Box>

        <Typography color="grey" sx={{textAlign: 'right'}}>
          Available: { action == ACTION_SUPPLY ? `${balance}` : `${formatNumber(cashAmount)}` }{getTokenSymbol(tokenAddress)}
        </Typography>

      </Box>
      <DialogActions>
        <Button
          onClick={handleAction}
          sx={{textTransform: 'capitalize'}}>
          {action}
        </Button>
        <Button
          onClick={handleClose}
          color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  )

}

export default LiquidityDialog;
