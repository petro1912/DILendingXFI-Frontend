import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material'

const SectionCard = ({children, title, action}) => {
  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2, color: 'common.white', backgroundColor: '#000000', mb: 6 }}>
      <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography color="primary" variant='h6' sx={{ my: 2 }}>
            {title}
          </Typography>
          {action}
        </Box>
        <Box
          sx={{m: 2}}>
          {children}
        </Box>
      </CardContent>
    </Card>
  )
}

export default SectionCard;
