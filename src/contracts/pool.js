import { ethers } from 'ethers';
import ABI_FACTORY from './artifacts/LendingPoolFactory.json';
import ABI_POOL from './artifacts/LendingPool.json';
import { FACTORY_ADDRESS } from './tokens';

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC)

const getAllPools = async () => {

  try {
    const factoryContract = new ethers.Contract(FACTORY_ADDRESS, ABI_FACTORY.abi, provider);
    const pools = await factoryContract.getAllPoolsInfo();

    return pools;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

const getPoolCollateralsInfo = async (poolAddress) => {
  try {
    const factoryContract = new ethers.Contract(poolAddress, ABI_POOL.abi, provider);
    const collateralsInfo = await factoryContract.getCollateralsData();

    return collateralsInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export {
  getAllPools,
  getPoolCollateralsInfo
}
