import { useEffect, useState } from 'react';

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { truncateAddress } from "../../../wallet/utils";

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import WalletOption from './WalletOption';
import Icon from 'src/@core/components/icon'

import CloseButton from '../CloseModalButton';
import { useRouter } from 'next/router';


const ConnectWallet = () => {
  const [isClient, setIsClient] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const { address, isConnected } = useAccount()
  const chainId = useChainId();
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const router = useRouter();

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // console.log('chainId', chainId)
  }, [isConnected])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleConnectDialogOpen = () => setOpenModal(true)
  const handleConnectDialogClose = () => setOpenModal(false)

  const selectWalletOption = (connector) => {
    handleConnectDialogClose()
    connect({ connector })
  }

  const goDashboard = () => {
    router.push('/dashboard')
  }

  if (isConnected && isClient) {
    return (
      <div>
        <Button variant='outlined' size='large' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
          {truncateAddress(address)}
        </Button>
        <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
          <MenuItem onClick={goDashboard}>Dashboard</MenuItem>
          <MenuItem onClick={disconnect}>Disconnect</MenuItem>
        </Menu>
      </div>
    );
  }
  return (
    <>
      <Dialog
        onClose={handleConnectDialogClose}
        aria-labelledby='connect-dialog'
        open={openModal}
        sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: 'none', border: '1px solid #00CFE8', overflow: 'visible' } }}>
        <DialogTitle variant='h3' color="primary" id='connect-dialog'>Connect Wallet</DialogTitle>
        <CloseButton aria-label='close' onClick={handleConnectDialogClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CloseButton>
        <Box sx={{ p: 8 }}>
          {connectors.filter(connector => connector.type != 'injected').map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => selectWalletOption(connector)}
            />
          ))}
        </Box>
      </Dialog>
      <Button variant="outlined" size="large" onClick={() => handleConnectDialogOpen()}>
        Connect Wallet
      </Button>
    </>
  );
}

export default ConnectWallet;
