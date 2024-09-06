import { useAccount, useBalance } from 'wagmi';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const BalanceText = (props) => {
  const [isClient, setIsClient] = useState(false);
  const { address, isConnected } = useAccount();
  const { data, isLoading, isError } = useBalance({
    address: isConnected ? address : null,
    token: props.token,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const balanceInToken = data
    ? (Number(data.value.toString()) / (10 ** (data.decimals || 18))).toFixed(4)
    : '0';

  if (!isClient) return null;

  return isLoading ? (
    <div className="loading-container">
      <div className="loading-bar"></div>
    </div>
  ) : isError ? (
    <Typography color="error">Error fetching balance</Typography>
  ) : (
    <Typography {...props}> {balanceInToken} </Typography>
  );
};

export default BalanceText;
