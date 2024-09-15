import { TOKENS } from 'src/contracts/tokens';
import { ethers } from 'ethers';

export const ACTION_DEPOSIT = "deposit"
export const ACTION_WITHDRAW = "withdraw"

export const ACTION_SUPPLY = "supply"
export const ACTION_SUPPLY_WITHDRAW = "supply withdraw"
export const ACTION_BORROW = "borrow"
export const ACTION_REPAY = "repay"

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );
  if (!match) return address;
  return `${match[1]}⋯${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export const calcStatistics = (pools) => {
  const _statistics = {
    totalDeposits: BigInt(0),
    totalBorrows: BigInt(0),
    totalCollaterals: BigInt(0)
  }
  for (const pool of pools) {
    _statistics.totalDeposits += pool.totalDeposits
    _statistics.totalBorrows += pool.totalBorrows
    _statistics.totalCollaterals += pool.totalCollaterals
  }

  return _statistics
}

export const getPrincipalToken = (pool) => {
  const token_address = pool.principalToken;
  return TOKENS.find(token => token.address == token_address);
}

export const getPrincipalTokenSymbol = (pool) => {
  const token_address = pool.principalToken;
  const principalToken = TOKENS.find(token => token.address == token_address);

  return principalToken?.symbol
}

export const getTokenInfo = (token_address) => {
  const token = TOKENS.find(token => token.address == token_address);

  return token
}

export const getTokenName = (token_address) => {
  const token = TOKENS.find(token => token.address == token_address);

  return token?.name
}

export const getTokenSymbol = (token_address) => {
  const token = TOKENS.find(token => token.address == token_address);

  return token?.symbol
}

export const getTokenImgName = (token_address) => {
  const token = TOKENS.find(token => token.address == token_address);

  return token?.symbol.toLowerCase()
}

export const getTokenOracleKey = (token_address) => {
  const token = TOKENS.find(token => token.address == token_address);

  return token?.oracleKey
}

export const formatNumber = (bigNumberValue) => {
  if (typeof bigNumberValue != 'bigint')
    return 0

  return ethers.formatEther(bigNumberValue, 18);
}

export const formatNumber6 = (bigNumberValue) => {
  if (typeof bigNumberValue != 'bigint')
    return 0

  return ethers.formatEther(bigNumberValue, 6);
}

export const formatPrice = (bigNumberValue) => {
  if (typeof bigNumberValue != 'bigint')
    return 0

  return ethers.formatUnits(bigNumberValue, 8);
}

export const formatPercent = (value) => {
  return formatNumber(value) * 100
}

export const isOnlyNumber = (value) => {
  return /^-?\d*\.?\d*$/.test(value)
}
