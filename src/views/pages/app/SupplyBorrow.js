import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Typography from "@mui/material/Typography"
import Icon from 'src/@core/components/icon'
import UnderlineInput from 'src/@core/components/UnderlineInput';
import SectionCard from '../SectionCard'
import { useAccount } from 'wagmi'
import { formatPercent, getTokenImgName, getTokenSymbol, isOnlyNumber, toFixed, toFloat } from 'src/wallet/utils'
import toast from 'react-hot-toast'
import { getTokenBalance, getTokenDecimals, getTokenPrice, getUserCollateralsInfo } from 'src/contracts/pool'
import { borrowTransaction, supplyTransaction } from 'src/contracts/actions'
import { LinearProgress } from '@mui/material'

const SupplyBorrow = (props) => {

  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState()
  const [price, setPrice] = useState()
  const [amount, setAmount] = useState('')
  const [collateralValue, setCollateralValue] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.pool && address) {
      if (address) {
        getUserCollateralsInfo(props.pool.poolAddress, address)
          .then(value => {
            const collateralsInfo = value
            let _collateralValue = 0
            for (let collateral of collateralsInfo.collaterals) {
              _collateralValue += toFloat(collateral.value)
            }
            setCollateralValue(_collateralValue)
          })
      }
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

    setLoading(true)
    supplyTransaction(poolAddress, principalToken, formatAmount, formatCredit)
      .then(res => {
        if (res == TransactionStateSent) {
          toast.success("Transaction Success")
        } else if (res == TransactionStateFailed) {
          toast.error("Transaction Failed")
        } else if (res == TransactionStateRejected) {
          toast.error("Transaction Rejected")
        }
        setLoading(false)
      })
      .catch(error => {
        toast.error("Transaction Failed")
        setLoading(false)
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

    setLoading(true)
    borrowTransaction(poolAddress, formatAmount)
      .then(res => {
        if (res == TransactionStateSent) {
          toast.success("Transaction Success")
        } else if (res == TransactionStateFailed) {
          toast.error("Transaction Failed")
        } else if (res == TransactionStateRejected) {
          toast.error("Transaction Rejected")
        }
        setLoading(false)
      })
      .catch(error => {
        toast.error("Transaction Failed")
        setLoading(false)
      })
  }

  const isWalletEmpty = !isConnected || !balance || parseFloat(balance) == 0
  const isCollateralEmpty = !isConnected || !collateralValue || collateralValue == 0
  return (
    <SectionCard title="Wallet Balance">
      {
        props.pool?
        <>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex'}}>
              <img
                src={`/images/tokens/${getTokenImgName(props.pool.principalToken)}.png`}
                className='tokenImg small' />
              <Typography variant='h4'>
                {props.pool && getTokenSymbol(props.pool.principalToken)}
              </Typography>
            </Box>

            <Typography variant='h4' sx={{ }}>
              {toFixed(balance)}
            </Typography>
          </Box>
          <Box>
            <Typography variant='h6' color="secondary" sx={{textAlign: 'right', mb: 2}}>
              ${toFixed(balance * price)}
            </Typography>
          </Box>
          <Box>
            <UnderlineInput
              value={amount}
              onChange={handleAmountChange}
              label="Amount"
              fullWidth
              disabled={isWalletEmpty && isCollateralEmpty}
              />

            <LinearProgress sx={{visibility: loading? 'visible' : 'hidden'}}/>

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
                disabled={isCollateralEmpty}
                color="info"
                variant="extended"
                sx={{ ml: 4, '& svg': { mr: 1 } }}
                onClick={borrowToken}>
                <Icon icon="tabler:circle-plus-filled" /> Borrow
              </Fab>
            </Box>
          </Box>
        </> : <Typography color="grey"></Typography>
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

    </SectionCard>
  )
}

export default SupplyBorrow
