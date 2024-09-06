// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'


const CardMarket = (props) => {
  return (
    <Card sx={{ boxShadow: 4, borderRadius: 3, p: 2, color: 'common.white', backgroundColor: '#00CFF822' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h5'
          sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
        >
          <img src={`/images/tokens/${props.supply}.png`} className='tokenImg' />
          <img src={`/images/tokens/${props.collateral}.png`} className='tokenImg' />
           | XFI
        </Typography>
        <Box sx={{ m: 2 }}>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography sx={{ color: '#00CFE8' }}>Collateral: </Typography>
            <Typography sx={{ color: '#00CFE8', fontWeight: 'bold' }}>47.2M</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography sx={{ color: '#7367F0' }}>Borrows: </Typography>
            <Typography sx={{ color: '#7367F0', fontWeight: 'bold' }}>47.2M</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ color: '#FF871F' }}>Earned: </Typography>
            <Typography sx={{ color: '#FF871F', fontWeight: 'bold' }}>47.2M</Typography>
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
