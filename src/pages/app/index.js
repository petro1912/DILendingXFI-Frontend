import { useState } from 'react';
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

const App = () => {

	const [token, setToken] = useState("usdt")


	return (
		<>
			<BoxContainer>
				<Box
					sx={{
						mt: "64px",
						mb: 6
					}}>
					<HeaderBalance
						token={token}
						setToken={setToken}
					/>
				</Box>

				<Grid
					container
					spacing={6}>

					<Grid item xs={12} sm={6} md={8}>
						<Collaterals />
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<SupplyBorrow token={token} />
						<Position />
					</Grid>

				</Grid>

			</BoxContainer>
			<FooterIllustrations />
		</>
	)
}

export default App;
