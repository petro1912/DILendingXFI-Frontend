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
import IconButton from '@mui/material/IconButton'

import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  backgroundColor: `#00CFE8 !important`,
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const ConnectWallet = () => {
  const [isClient, setIsClient] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setIsClient(true)
  }, [])

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

  if (isConnected && isClient) {
    return (
      <div>
        <Button variant='outlined' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
          {truncateAddress(address)}
        </Button>
        <Menu keepMounted id='simple-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
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
        <CustomCloseButton aria-label='close' onClick={handleConnectDialogClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <Box sx={{ p: 8 }}>
          {connectors.map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => selectWalletOption(connector)}
            />
          ))}
        </Box>
      </Dialog>
      <Button variant="outlined" onClick={() => handleConnectDialogOpen()}>
        Connect Wallet
      </Button>
    </>
  );
}

export default ConnectWallet;
