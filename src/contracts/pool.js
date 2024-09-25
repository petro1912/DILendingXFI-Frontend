import { ethers } from 'ethers';
import ABI_FACTORY from './artifacts/LendingPoolFactory.json';
import ABI_POOL from './artifacts/LendingPool.json';
import ABI_DIAORACLE from 'src/contracts/artifacts/DIAOracleV2.json'

import { FACTORY_ADDRESS, ORACLE_ADDRESS } from './tokens';
import { getTokenOracleKey } from 'src/wallet/utils';
import { ERC20_ABI } from './constant';

const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC)

const factoryContract = () =>  {
  return new ethers.Contract(FACTORY_ADDRESS, ABI_FACTORY.abi, provider);
}

const poolContract = (poolAddress) => {
  return new ethers.Contract(poolAddress, ABI_POOL.abi, provider);
}

const tokenContract = (tokenAddress) => {
  return new ethers.Contract(tokenAddress, ERC20_ABI, provider);
}

const oracleContract = () => {
  return new ethers.Contract(ORACLE_ADDRESS, ABI_DIAORACLE.abi, provider);
}

export const getAllPools = async () => {

  try {
    const pools = await factoryContract().getAllPoolsInfo();

    return pools;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getPoolCollateralsInfo = async (poolAddress) => {
  try {
    const collateralsInfo = await poolContract(poolAddress).getCollateralsData();

    return collateralsInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getCollateralTokens = async (poolAddress) => {
  try {
    const tokensInfo = await poolContract(poolAddress).getCollateralTokens();

    return tokensInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getUserCollateralsInfo = async (poolAddress, userAddress) => {
  try {
    const collateralsInfo = await poolContract(poolAddress).getUserCollateralData(userAddress);

    return collateralsInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getPositionInfo = async (poolAddress, userAddress) => {
  try {
    const collateralsInfo = await poolContract(poolAddress).getDebtPositionData(userAddress);

    return collateralsInfo;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getTokenDecimals = async (tokenAddress) => {
  try {
    const decimals = await tokenContract(tokenAddress).decimals();

    return Number(decimals);
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getTokenBalance = async (tokenAddress, user) => {
  try {
    const balance = await tokenContract(tokenAddress).balanceOf(user);
    const decimals = await tokenContract(tokenAddress).decimals();

    return ethers.formatUnits(balance, decimals);
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getTokenValue = async (tokenAddress, user) => {
  try {
    const oracleKey = getTokenOracleKey(tokenAddress)
    const _balance = await getTokenBalance(tokenAddress, user);
    const _price = await oracleContract().getValue(oracleKey);
    if (!_balance || _price.length != 2)
      return 0;

    const balance = parseFloat(_balance)
    const price = parseFloat(ethers.formatUnits(_price[0], 8))
    const value = balance * price;

    return {
      balance,
      value
    }
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getTokenPrice = async (tokenAddress) => {
  try {
    const oracleKey = getTokenOracleKey(tokenAddress)
    const _price = await oracleContract().getValue(oracleKey);
    if (_price.length != 2)
      return 0;

    return parseFloat(ethers.formatUnits(_price[0], 8))
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getUserCreditPositions = async (address) => {
  try {
    const positions = await factoryContract().getUserCreditPositions(address);
  return positions;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getUserCreditPosition = async (pool_address, address) => {
  try {
    const position = await poolContract(pool_address).getLiquidityPositionData(address);
  return position;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}

export const getUserDebtPositions = async (address) => {
  try {
    const positions = await factoryContract().getUserDebtPositions(address);
  return positions;
  } catch (error) {
    console.error('Error calling view function:', error);
  }
}
