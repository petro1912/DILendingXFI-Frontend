import { useAccount, useBalance, useReadContract } from 'wagmi';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getTokenValue } from 'src/contracts/pool';

const BalanceValueText = (props) => {
  const {address, isConnected} = useAccount();
  const [tokenValue, setTokenValue] = useState()

  useEffect(() => {

    if (props.token && address) {
      getTokenValue(props.token, address)
      .then(res => {
        const {value} = res
        console.log(value)
        setTokenValue(value)
      })
      // setTokenValue((_balance * _price).toFixed(2))
    }
  }, [props.token, address])


  return (
    <Typography {...props}>$ {tokenValue || '0.00'}</Typography>
  );
};

export default BalanceValueText;
