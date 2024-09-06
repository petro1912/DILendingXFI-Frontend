import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {useState, useEffect} from 'react'

export default function WalletOption({
    connector,
    onClick,
}) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        (async () => {
            const provider = await connector.getProvider()
            setReady(!!provider)
        })()
    }, [connector])

    return (
        <Box
        sx={{
          border: '2px solid #00CFE888',
          background: '#111',
          borderRadius: 2,
          mb: 4,
          mx: 10,
          cursor: 'pointer',
          p: 6,
          '&:hover': {
            background: '#00CFE8CC'
          }
        }}

        onClick={onClick}>
           <Typography variant='h4'> {connector.name}</Typography>
        </Box>
    )
};
