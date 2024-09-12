import { ethers } from 'ethers';
import ABI_FACTORY from './artifacts/LendingPoolFactory.json';
import ABI_POOL from './artifacts/LendingPool.json';
import { FACTORY_ADDRESS } from './tokens';

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC)

export const getAllPools = async () => {

  try {
    const factoryContract = new ethers.Contract(FACTORY_ADDRESS, ABI_FACTORY.abi, provider);
    const pools = await factoryContract.getAllPoolsInfo();

    return pools;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getPoolCollateralsInfo = async (poolAddress) => {
  try {
    const poolContract = new ethers.Contract(poolAddress, ABI_POOL.abi, provider);
    const collateralsInfo = await poolContract.getCollateralsData();

    return collateralsInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getCollateralTokens = async (poolAddress) => {
  try {
    const poolContract = new ethers.Contract(poolAddress, ABI_POOL.abi, provider);
    const tokensInfo = await poolContract.getCollateralTokens();

    return tokensInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getUserCollateralsInfo = async (poolAddress, userAddress) => {
  try {
    const poolContract = new ethers.Contract(poolAddress, ABI_POOL.abi, provider);
    const collateralsInfo = await poolContract.getUserCollateralData(userAddress);

    return collateralsInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getPositionInfo = async (poolAddress, userAddress) => {
  try {
    const poolContract = new ethers.Contract(poolAddress, ABI_POOL.abi, provider);
    const collateralsInfo = await poolContract.getDebtPositionData(userAddress);

    return collateralsInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}
