import { Typography } from "@mui/material"
import Box from '@mui/material/Box'
import BoxContainer from "src/@core/components/container"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles'
import FooterIllustrations from "src/views/pages/misc/FooterIllustrations"

const rows = [{
  supplyToken: 'usdt',
  collateralToken: 'xusd',
  utilization: 75.91,
  earnAPR: 3.21,
  borrowAPR: 3.67,
  totalEarning: 440.52,
  totalBorrowing: 334.42,
  totalCollateral: 681.52
}, {
  supplyToken: 'usdt',
  collateralToken: 'xfi',
  utilization: 75.91,
  earnAPR: 3.21,
  borrowAPR: 3.67,
  totalEarning: 440.52,
  totalBorrowing: 334.42,
  totalCollateral: 681.52
}, {
  supplyToken: 'usdt',
  collateralToken: 'empx',
  utilization: 75.91,
  earnAPR: 3.21,
  borrowAPR: 3.67,
  totalEarning: 440.52,
  totalBorrowing: 334.42,
  totalCollateral: 681.52
}, {
  supplyToken: 'xusd',
  collateralToken: 'xfi',
  utilization: 75.91,
  earnAPR: 3.21,
  borrowAPR: 3.67,
  totalEarning: 440.52,
  totalBorrowing: 334.42,
  totalCollateral: 681.52
}, {
  supplyToken: 'xusd',
  collateralToken: 'empx',
  utilization: 75.91,
  earnAPR: 3.21,
  borrowAPR: 3.67,
  totalEarning: 440.52,
  totalBorrowing: 334.42,
  totalCollateral: 681.52
},
]

const Cell = styled(TableCell)(() => ({
  border: 'none'
}))

const Markets = () => {
  const router = useRouter();

  const enterMarket = (supply, collateral) => {
    router.push(`/markets/${supply}-${collateral}`)
  }

  return (
    <>
      <BoxContainer>
        <Typography sx={{mt: "92px", mb: 4}} variant="h3">Markets</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 6
          }}>
          <Box>
            <Typography color="secondary">Total Supply</Typography>
            <Typography variant="h4">$1.97B</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center',}}>
            <Box sx={{ml: 8}}>
              <Typography color="primary">Earning</Typography>
              <Typography color="primary" variant="h3">$1.97B</Typography>
            </Box>
            <Box sx={{ml: 8}}>
              <Typography color="#7367F0">Borrowing</Typography>
              <Typography color="#7367F0" variant="h3">$1.97B</Typography>
            </Box>
            <Box sx={{ml: 8}}>
              <Typography color="secondary">Collateral</Typography>
              <Typography variant="h3">$1.97B</Typography>
            </Box>
          </Box>
        </Box>
        <Card sx={{ boxShadow: 4, borderRadius: 2, p: 2, color: 'common.white', backgroundColor: '#00CFF822' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Typography
              variant='h4'
              sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
            >
              <img src={`/images/xfi-logo.png`} className='chainImg' />
              | CrossFi Markets
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Market</TableCell>
                  <TableCell align='right'>Utilization</TableCell>
                  <TableCell align='right'>Net Earn APR</TableCell>
                  <TableCell align='right'>Net Borrow APR</TableCell>
                  <TableCell align='right'>Total Earning</TableCell>
                  <TableCell align='right'>Total Borrowing</TableCell>
                  <TableCell align='right'>Total Collateral</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      hover
                      style={{ cursor: 'pointer' }}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0
                        }
                      }}
                      onClick={() => enterMarket(row.supplyToken, row.collateralToken)}
                    >
                      <Cell scope='row'>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <img src={`/images/tokens/${row.supplyToken}.png`} className="tokenImg"/>
                          <img src={`/images/tokens/${row.collateralToken}.png`} className="tokenImg"/>
                          <Typography variant="h5">{row.supplyToken.toUpperCase() + ' ' + row.collateralToken.toUpperCase()}</Typography>
                        </Box>
                      </Cell>
                      <Cell align='right'>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <CircularProgress size='1.8rem' variant='determinate' value={row.utilization} />
                          <Typography sx={{ml: 4}}>{row.utilization} %</Typography>
                        </Box>
                      </Cell>
                      <Cell align='right'>
                        <Typography>{row.earnAPR} %</Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>{row.borrowAPR} %</Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>
                          $ {row.totalEarning}M
                        </Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>
                          $ {row.totalBorrowing}M
                        </Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>
                          $ {row.totalCollateral}M
                        </Typography>
                      </Cell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </BoxContainer>
      <FooterIllustrations />
    </>
  )
}

export default Markets
