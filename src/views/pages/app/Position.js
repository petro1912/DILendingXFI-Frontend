import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box'
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

const Position = () => {
  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2, p: 1, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
      <CardContent>
        <Typography color="primary" variant='h6'>
          Position Summary
        </Typography>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Collateral Value
          </Typography>
          <Typography variant='h5'>
            0.00
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Liquidation Point
          </Typography>
          <Typography variant='h5'>
            0.00
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Borrow Capacity
          </Typography>
          <Typography variant='h5'>
            0.00
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>
            Available to Borrow
          </Typography>
          <Typography variant='h5'>
            0.00
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Position
