import {
  getProvider,
  getWalletAddress,
  sendTransaction,
  connectBrowserExtensionWallet,
  TransactionStateFailed,
  TransactionStateSent,
} from './provider'
import ABI_POOL from './artifacts/LendingPool.json'
import {ethers} from 'ethers'
import { ERC20_ABI } from './constant';

const AbiInterface = new ethers.Interface(ABI_POOL.abi);

const getProviderOrConnect = async () => {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    if (await connectBrowserExtensionWallet())
      return getProvider()
  }

  return provider
}

export async function getTokenTransferApproval(
  tokenAddress,
  spender,
  amount
) {
  const provider = getProvider()
  const address = getWalletAddress()
  if (!provider || !address) {
    console.log('No Provider Found')
    return TransactionStateFailed
  }

  try {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ERC20_ABI,
      provider
    )

    const transaction = await tokenContract.approve.populateTransaction(
      spender,
      amount
    )

    return sendTransaction({
      ...transaction,
      from: address,
    })
  } catch (e) {
    console.error(e)
    return TransactionStateFailed
  }
}

export const supplyTransaction = async (poolAddress, tokenAddress, amount, minCredit) => {
  const provider = getProviderOrConnect();
  const address = getWalletAddress()
  if (!address || !provider) {
    return TransactionStateFailed
  }

  const tokenApproval = await getTokenTransferApproval(
    tokenAddress,
    poolAddress,
    amount
  )

  if (
    tokenApproval !== TransactionStateSent
  ) {
    return TransactionStateFailed
  }

  const calldata = AbiInterface.encodeFunctionData('supply', [amount, minCredit])

  return sendTransaction({
    data: calldata,
    to: poolAddress,
    from: address,
  })

}


export const borrowTransaction = async (poolAddress, amount) => {
  const provider = getProviderOrConnect();
  const address = getWalletAddress()
  if (!address || !provider) {
    return TransactionStateFailed
  }

  const calldata = AbiInterface.encodeFunctionData('borrow', [amount])

  return sendTransaction({
    data: calldata,
    to: poolAddress,
    from: address,
  })

}

export const depositTransaction = async (poolAddress, tokenAddress, amount) => {
  const provider = getProviderOrConnect();
  const address = getWalletAddress()
  if (!address || !provider) {
    return TransactionStateFailed
  }

  const tokenApproval = await getTokenTransferApproval(
    tokenAddress,
    poolAddress,
    amount
  )

  if (
    tokenApproval !== TransactionStateSent
  ) {
    return TransactionStateFailed
  }

  const calldata = AbiInterface.encodeFunctionData('depositCollateral', [tokenAddress, amount])

  return sendTransaction({
    data: calldata,
    to: poolAddress,
    from: address,
  })

}

export const withdrawTransaction = async (poolAddress, tokenAddress, amount) => {
  const provider = getProviderOrConnect();
  const address = getWalletAddress()
  if (!address || !provider) {
    return TransactionStateFailed
  }

  const calldata = AbiInterface.encodeFunctionData('withdrawCollateral', [tokenAddress, amount])

  return sendTransaction({
    data: calldata,
    to: poolAddress,
    from: address,
  })

}

