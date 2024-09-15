import { ethers } from 'ethers'

const browserExtensionProvider = createBrowserExtensionProvider()
let browserExtensionAddress

// Interfaces
export const TransactionStateFailed = 'Failed'
export const TransactionStateNew = 'New'
export const TransactionStateRejected = 'Rejected'
export const TransactionStateSending = 'Sending'
export const TransactionStateSent = 'Sent'

// Provider and Wallet Functions

export function getProvider() {
  return {
    provider: browserExtensionProvider,
    address: browserExtensionAddress
  }
}

export async function sendTransaction(
  transaction
) {
  return sendTransactionViaExtension(transaction)
}

export async function connectBrowserExtensionWallet() {
  if (!window.ethereum) {
    return null
  }

  const { ethereum } = window
  const provider = new ethers.BrowserProvider(ethereum)
  const accounts = await provider.send('eth_requestAccounts', [])

  if (accounts.length !== 1) {
    return
  }

  browserExtensionAddress = accounts[0]
  return browserExtensionAddress
}

export function createBrowserExtensionProvider() {
  try {
    return new ethers.BrowserProvider(window?.ethereum, 'any')
  } catch (e) {
    console.log('No Wallet Extension Found')
    return null
  }
}

// Transacting with a wallet extension via a Web3 Provider
async function sendTransactionViaExtension(
  transaction
) {
  try {
    const receipt = await browserExtensionProvider?.send(
      'eth_sendTransaction',
      [transaction]
    )

    if (receipt) {
      return TransactionStateSent
    } else {
      return TransactionStateFailed
    }
  } catch (e) {
    console.log(e)
    return TransactionStateRejected
  }
}
