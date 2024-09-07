import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Icon from 'src/@core/components/icon'
import UnderlineInput from 'src/@core/components/UnderlineInput';
import { useAccount } from 'wagmi'

const SupplyBorrow = (props) => {

  const { isConnected } = useAccount()
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <Card sx={{ boxShadow: 12, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography color="primary" variant='h6' sx={{ my: 2 }}>
          Wallet Balance
        </Typography>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }}>
          <img
            src={`/images/tokens/${props.token}.png`}
            className='tokenImg small' />
          <Typography variant='h4' sx={{ mr: 2 }}>
            0.0000
          </Typography>
        </Box>
        {
          client && <>
            <UnderlineInput label="Amount" fullWidth disabled={!isConnected}/>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4}}>
              <Fab disabled={!isConnected} color="success" variant="extended" sx={{ '& svg': { mr: 1 } }}>
                <Icon icon="tabler:circle-plus-filled" /> Supply
              </Fab>
              <Fab disabled={!isConnected} color="info" variant="extended" sx={{ ml: 4, '& svg': { mr: 1 } }}>
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
              3.72 %
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='h6' color="grey" sx={{ mr: 2, mb: 2 }}>
              Net Supply APR
            </Typography>
            <Typography variant='h5' sx={{ mr: 2 }}>
              3.53 %
            </Typography>
          </Box>
        </Box>

      </CardContent>
    </Card>
  )
}

export default SupplyBorrow
