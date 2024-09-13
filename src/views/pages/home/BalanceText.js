import { useAccount, useBalance } from 'wagmi';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getTokenBalance } from 'src/contracts/pool';

const BalanceText = (props) => {
  const { address } = useAccount();
  const [balance, setBalance] = useState()

  useEffect(() => {
    if (props.token && address) {
      getTokenBalance(props.token, address)
      .then(value => {
        setBalance(value)
      })
      .catch(error => {

      })
    }
  }, [props.token, address])

  return (
    <Typography {...props}> {balance || '0.00'} </Typography>
  );
};

export default BalanceText;
