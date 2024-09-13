import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Icon from 'src/@core/components/icon'
import UnderlineInput from 'src/@core/components/UnderlineInput';
import { useAccount } from 'wagmi'
import { formatPercent, getTokenImgName, getTokenSymbol, isOnlyNumber } from 'src/wallet/utils'
import toast from 'react-hot-toast'
import { getTokenBalance, getTokenDecimals, getTokenPrice } from 'src/contracts/pool'
import { supplyTransaction } from 'src/contracts/actions'

const SupplyBorrow = (props) => {

  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState()
  const [price, setPrice] = useState()
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if (props.pool && address) {
      getTokenBalance(props.pool.principalToken, address)
        .then(value => {
          setBalance(value)
        })

      getTokenPrice(props.pool.principalToken)
        .then(value => {
          setPrice(value)
        })
    }

  }, [props.pool, address])

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    if (isOnlyNumber(inputValue)) {
      setAmount(inputValue);
    }
  }

  const supplyToken = async () => {
    if (!address && !isConnected) {
      toast.error("Please connect wallet first")
    }

    const _amount = parseFloat(amount)
    if (!_amount || _amount == 0) {
      toast.error("Amount should not be 0")
      return
    }
    if (_amount > parseFloat(balance)) {
      toast.error("Amount should not be 0")
      return
    }

    const {poolAddress, principalToken} = props.pool
    const decimals = await getTokenDecimals(principalToken)
    const formatAmount = ethers.parseUnits(_amount.toString(), decimals)
    const formatCredit = ethers.parseUnits('0', decimals)

    supplyTransaction(poolAddress, principalToken, formatAmount, formatCredit)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const borrowToken = async () => {
    if (!address && !isConnected) {
      toast.error("Please connect wallet first")
    }

    const _amount = parseFloat(amount)
    if (!_amount || _amount == 0) {
      toast.error("Amount should not be 0")
      return
    }

    const {poolAddress, principalToken} = props.pool
    const decimals = await getTokenDecimals(principalToken)
    const formatAmount = ethers.parseUnits(_amount.toString(), decimals)

    borrowTransaction(poolAddress, formatAmount)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const isWalletEmpty = !isConnected || !balance || parseFloat(balance) == 0

  return (
    <Card sx={{ boxShadow: 12, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography color="primary" variant='h6' sx={{ my: 2 }}>
          Wallet Balance
        </Typography>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          {
            props.pool &&
            <img
              src={`/images/tokens/${getTokenImgName(props.pool.principalToken)}.png`}
              className='tokenImg small' />
          }
          <Typography variant='h4' sx={{ }}>
            {balance} {props.pool && getTokenSymbol(props.pool.principalToken)}
          </Typography>
        </Box>
        {
          props.pool && <>
            <UnderlineInput
              value={amount}
              onChange={handleAmountChange}
              label="Amount"
              fullWidth
              disabled={isWalletEmpty}
              />

          <Typography color="grey" sx={{textAlign: 'right', my: 2}}>
            $ { amount && price ? (price * parseFloat (amount)).toFixed(2) : '0' }
          </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4}}>
              <Fab
                disabled={isWalletEmpty}
                color="success"
                variant="extended"
                sx={{ '& svg': { mr: 1 } }}
                onClick={supplyToken}>
                <Icon icon="tabler:circle-plus-filled" /> Supply
              </Fab>
              <Fab
                disabled={isWalletEmpty}
                color="info"
                variant="extended"
                sx={{ ml: 4, '& svg': { mr: 1 } }}
                onClick={borrowToken}>
                <Icon icon="tabler:circle-plus-filled" /> Borrow
              </Fab>
            </Box>
          </>
        }
        <Box sx={{ p: 3, mt: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 1, backgroundColor: '#00CFE822' }}>
          <Box>
            <Typography variant='h6' color="grey" sx={{ mr: 2, mb: 2 }}>
              Net Borrow APR
            </Typography>
            <Typography variant='h5' sx={{ mr: 2 }}>
              {formatPercent(props.pool?.borrowAPR)} %
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='h6' color="grey" sx={{ mr: 2, mb: 2 }}>
              Net Supply APR
            </Typography>
            <Typography variant='h5' sx={{ mr: 2 }}>
              {formatPercent(props.pool?.earnAPR)} %
            </Typography>
          </Box>
        </Box>

      </CardContent>
    </Card>
  )
}

export default SupplyBorrow
