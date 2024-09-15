import {
  Box,
  Grid,
  Typography
} from "@mui/material"
import CreditPositions from "src/views/pages/dashboard/CreditPositions"
import DebtPositions from "src/views/pages/dashboard/DebtPositions"
import BoxContainer from "src/@core/components/container"

const Dashboard = () => {

  return (
    <BoxContainer>
      <Box
        sx={{
          mt: "80px",
          mb: 6
        }}>
        <Typography variant="h4" mb={4}>Dashboard</Typography>
        <CreditPositions />
        <DebtPositions />
      </Box>
    </BoxContainer>
  )
}

export default Dashboard
