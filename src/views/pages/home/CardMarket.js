// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { TOKENS } from 'src/contracts/tokens'
import { formatNumber, formatPercent, toConcise } from 'src/wallet/utils'


const CardMarket = (props) => {

  const [principalToken, setPrincipalToken] = useState()
  const {pool} = props

  useEffect(() => {
    if (pool && pool.principalToken) {
      const token_address = pool.principalToken;
      const _principalToken = TOKENS.find(token => token.address == token_address);

      setPrincipalToken(_principalToken)
    }
  }, [pool])


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
          | {principalToken && principalToken.symbol} CrossFi
        </Typography>
        <Box sx={{ m: 2 }}>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography color="primary">Market Size: </Typography>
            <Typography color="primary" sx={{ fontWeight: 'bold' }}>${toConcise(pool.totalDeposits)}</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography sx={{ }}>Total Borrows: </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>${toConcise(pool.totalBorrows)}</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ }}>Available: </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>${toConcise(pool.totalDeposits - pool.totalBorrows)}</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ }}>Utilization: </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{formatPercent(pool.utilizationRate)}%</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ }}>Borrow Rate: </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>{formatPercent(pool.borrowAPR)}%</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ }}>Total Earnings: </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>${formatNumber(pool.totalEarnings)}</Typography>
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
