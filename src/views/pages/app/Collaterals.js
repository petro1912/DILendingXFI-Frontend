import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import CollateralDialog from './CollateralDialog';
import { formatNumber, getTokenImgName, getTokenSymbol } from 'src/wallet/utils';
import { getCollateralTokens, getUserCollateralsInfo } from 'src/contracts/pool';
import { useAccount, isConnected } from 'wagmi';

const PlusButton = styled(IconButton)({
  backgroundColor: '#00CFE8',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00CFE8CC',
  },
});

const MinusButton = styled(IconButton)({
  backgroundColor: '#FF9F43',
  color: 'white',
  '&:hover': {
    backgroundColor: '#FF9F43CC',
  },
});

const Collaterals = (props) => {

  const { address, isConnected } = useAccount()
  // const address = "0x0e801d84fa97b50751dbf25036d067dcf18858bf";
  // const isConnected = true

  const [collateralsInfo, setCollateralsInfo] = useState()
  const [collateralAction, setCollateralAction] = useState('deposit')
  const [collateralToken, setCollateralToken] = useState('')
  const [openCollateralModal, setOpenCollateralModal] = useState(false)

  useEffect(() => {
    if (props.pool && props.pool.poolAddress) {
      if (address) {
        getUserCollateralsInfo(props.pool.poolAddress, address)
          .then(value => {
            setCollateralsInfo(value)
          })
      } else {
        getCollateralTokens(props.pool.poolAddress)
          .then(tokens => {
            if (tokens) {
              const collaterals = tokens.map(_token => ({token: _token, amount: 0, value: 0}))
              setCollateralsInfo({
                collaterals: collaterals,
                totalValue: 0
              })
            }
          })

      }
    }
  }, [props.pool, address])

  const showCollateralDialog = (collateral, action) => {
    setCollateralAction(action)
    setCollateralToken(collateral)
    setOpenCollateralModal(true)
  }

  const closeCollateralDialog = () => {
    setOpenCollateralModal(false)
  }

  return (
    <Box>
      <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
          <Typography color="primary" variant='h6' sx={{ my: 2 }}>
            Collateral Assets
          </Typography>
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography color="grey" variant="h6">
              Asset
            </Typography>
            <Typography color="grey" variant="h6">
              Balance
            </Typography>
          </Box>
          <Divider color='grey' />
          {
            collateralsInfo &&
            collateralsInfo.collaterals &&
            collateralsInfo.collaterals.map((collateral, index) => (
              <Box key={index} sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={`/images/tokens/${getTokenImgName(collateral.token)}.png`}
                    className='tokenImg small' />
                  <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
                    {getTokenSymbol(collateral.token)}
                  </Typography>
                </Box>
                <Box gap={3} sx={{ display: 'flex', alignItems: 'center', }}>
                  <Typography variant="h5" color={isConnected? 'white' : 'grey'}>
                    {formatNumber(collateral.value)}
                  </Typography>
                  <PlusButton size="small" color="primary" disabled={!isConnected} onClick={() => showCollateralDialog(collateral, 'deposit')}>
                    <Icon icon="tabler:plus" />
                  </PlusButton>
                  <MinusButton size="small" color="warning" disabled={!isConnected} onClick={() => showCollateralDialog(collateral, 'withdraw')}>
                    <Icon icon="tabler:minus" />
                  </MinusButton>
                </Box>
              </Box>
            ))
          }
        </CardContent>
      </Card>
      <CollateralDialog
        token={collateralToken}
        action={collateralAction}
        openModal= {openCollateralModal}
        handleClose={closeCollateralDialog} />
    </Box>
  )
}

export default Collaterals
