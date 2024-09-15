import {
  Card,
  CardContent,
} from '@mui/material'

const PositionCard = ({children, isSummary}) => {
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      boxShadow: 8,
      borderRadius: 2,
      border: isSummary?  '1px solid #00CFE8' : '1px solid grey',
      mx: 2,
      color: 'common.white',
      backgroundColor: '#22222288',
      backdropFilter: 'blur(25px)'
    }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        {children}
      </CardContent>
    </Card>

  )
}

export default PositionCard
