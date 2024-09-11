// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { TOKENS } from 'src/contracts/tokens'


const CardMarket = (props) => {

  const [principalToken, setPrincipalToken] = useState()

  useEffect(() => {
    if (props.pool && props.pool.principalToken) {
      const token_address = props.pool.principalToken;
      const _principalToken = TOKENS.find(token => token.address == token_address);

      setPrincipalToken(_principalToken)
    }
  }, [props.pool])


  return (
    <Card sx={{ boxShadow: 4, borderRadius: 3, p: 2, color: 'common.white', backgroundColor: '#00CFF822' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h5'
          sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
        >
          {
            principalToken &&
            <img src={`/images/tokens/${principalToken.symbol.toLowerCase()}.png`} className='tokenImg' />
          }
          | CrossFi
        </Typography>
        <Box sx={{ m: 2 }}>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography sx={{ color: '#00CFE8' }}>Market Size: </Typography>
            <Typography sx={{ color: '#00CFE8', fontWeight: 'bold' }}>{props.pool?.totalDeposits.toString()} USD</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography sx={{ color: '#7367F0' }}>Total Borrows: </Typography>
            <Typography sx={{ color: '#7367F0', fontWeight: 'bold' }}>{props.pool?.totalBorrows.toString()} USD</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ color: '#FF871F' }}>Available: </Typography>
            <Typography sx={{ color: '#FF871F', fontWeight: 'bold' }}>{props.pool ? (props.pool.totalDeposits - props.pool.totalBorrows).toString() : '--' } USD</Typography>
          </Box>
          {/* <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ color: '#FF871F' }}>APR: </Typography>
            <Typography sx={{ color: '#FF871F' }}>5.2 %</Typography>
          </Box> */}
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardMarket
