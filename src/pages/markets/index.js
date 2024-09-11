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
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { calcStatistics, formatNumber, formatPercent, getPrincipalToken, getPrincipalTokenSymbol } from "src/wallet/utils"
import { useReadContract } from "wagmi"
import { FACTORY_ADDRESS } from "src/contracts/tokens"
import ABI_FACTORY from 'src/contracts/artifacts/LendingPoolFactory.json'
import { setPoolsInfo } from "src/redux/poolsSlice"

const Cell = styled(TableCell)(() => ({
  border: 'none'
}))

const Markets = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const pools = useSelector((state) => state.pools.entities);
  const [statistics, setStatistics] = useState()

  const {data: pools_data} = useReadContract({
    address: FACTORY_ADDRESS,
    abi: ABI_FACTORY.abi,
    functionName: 'getAllPoolsInfo'
  })

  useEffect(() => {
    if (pools_data && pools_data.length != 0)
      dispatch(setPoolsInfo(pools_data))
  }, [pools_data])

  useEffect(() => {
    if (!pools || pools.length == 0)
      return

      setStatistics(calcStatistics(pools))
  }, [pools])

  const goMarket = (pool) => {
    router.push(`/markets/${getPrincipalTokenSymbol(pool)}`)
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
            <Typography variant="h4">$ {statistics?.totalDeposits.toString() || '1.97B'}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center',}}>
            <Box sx={{ml: 8}}>
              <Typography color="primary">Rewards</Typography>
              <Typography color="primary" variant="h3">$ {statistics?.totalRewards?.toString() || '1.97B'}</Typography>
            </Box>
            <Box sx={{ml: 8}}>
              <Typography color="#7367F0">Borrowing</Typography>
              <Typography color="#7367F0" variant="h3">$ {statistics?.totalBorrows.toString() || '1.97B'}</Typography>
            </Box>
            <Box sx={{ml: 8}}>
              <Typography color="secondary">Collateral</Typography>
              <Typography variant="h3">$ {statistics?.totalCollaterals.toString() || '1.97B'}</Typography>
            </Box>
          </Box>
        </Box>
        <Card sx={{ boxShadow: 4, borderRadius: 2, p: 2, color: 'common.white', backgroundColor: '#00CFF822' }}>
          <CardContent sx={{ p: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
            <Box
              sx={{ display: 'flex', mb: 2.75, alignItems: 'center', color: 'common.white', '& svg': { mr: 2.5 } }}
            >
              <img src={`/images/xfi-logo.png`} className='chainImg' />
              <Typography variant="h4">| CrossFi Markets</Typography>
            </Box>
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
                {pools && pools.map((pool, index) => (
                    <TableRow
                      key={index}
                      hover
                      style={{ cursor: 'pointer' }}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0
                        }
                      }}
                      onClick={() => goMarket(pool)}
                    >
                      <Cell scope='row'>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <img src={`/images/tokens/${getPrincipalTokenSymbol(pool).toLowerCase()}.png`} className="tokenImg"/>
                          <Typography variant="h5">{getPrincipalTokenSymbol(pool).toUpperCase()}</Typography>
                        </Box>
                      </Cell>
                      <Cell align='right'>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                          <CircularProgress size='1.8rem' variant='determinate' value={formatPercent(pool.utilization)} />
                          <Typography sx={{ml: 4}}>
                            {formatPercent(pool.utilization)} %
                          </Typography>
                        </Box>
                      </Cell>
                      <Cell align='right'>
                        <Typography>{formatPercent(pool.earnAPR)} %</Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>{formatPercent(pool.borrowAPR)} %</Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>
                          $ {formatNumber(pool.totalRewards)}M
                        </Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>
                          $ {formatNumber(pool.totalBorrowings)}M
                        </Typography>
                      </Cell>
                      <Cell align='right'>
                        <Typography>
                          $ {formatNumber(pool.totalCollaterals)}M
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
