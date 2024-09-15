import { useState, useEffect } from 'react';
import {
	Box,
	Grid,
} from '@mui/material'
import BoxContainer from 'src/@core/components/container';
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations';
import Position from 'src/views/pages/app/Position';
import SupplyBorrow from 'src/views/pages/app/SupplyBorrow';
import Collaterals from 'src/views/pages/app/Collaterals';
import HeaderBalance from 'src/views/pages/app/HeaderBalance';
import { useSelector, useDispatch } from 'react-redux';
import { useReadContract } from "wagmi"
import { FACTORY_ADDRESS } from "src/contracts/tokens"
import ABI_FACTORY from 'src/contracts/artifacts/LendingPoolFactory.json'
import { setPoolsInfo } from "src/redux/poolsSlice"
import { createBrowserExtensionProvider } from 'src/contracts/provider';

const App = () => {

  const dispatch = useDispatch();

  const [pool, setPool] = useState();
  const pools = useSelector((state) => state.pools.entities);

  const {data: pools_data} = useReadContract({
    address: FACTORY_ADDRESS,
    abi: ABI_FACTORY.abi,
    functionName: 'getAllPoolsInfo'
  })

  useEffect(() => {
    createBrowserExtensionProvider()
  }, [])

  useEffect(() => {
    if (pools_data && pools_data.length != 0)
      dispatch(setPoolsInfo(pools_data))
  }, [pools_data])

  useEffect(() => {
    if (pools && pools.length != 0) {
      setPool(pools[0])
    }
  }, [pools])

	return (
		<>
			<BoxContainer>
				<Box
					sx={{
						mt: "80px",
						mb: 6
					}}>
					<HeaderBalance
            pool={pool}
            setPool={setPool}
					/>
				</Box>

				<Grid
					container
					spacing={6}>

					<Grid item xs={12} sm={6} md={8}>
						<Collaterals
              pool={pool}/>
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<SupplyBorrow pool={pool} />
						<Position pool={pool}/>
					</Grid>

				</Grid>

			</BoxContainer>
			<FooterIllustrations />
		</>
	)
}

export default App;
