import { TOKENS } from 'src/contracts/tokens';
import { ethers } from 'ethers';

export const ACTION_DEPOSIT = "deposit"
export const ACTION_WITHDRAW = "withdraw"

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
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

export const getTokenSymbol = (token_address) => {
  const token = TOKENS.find(token => token.address == token_address);

  return token?.symbol
}

export const getTokenImgName = (token_address) => {
  const token = TOKENS.find(token => token.address == token_address);

  return token?.symbol.toLowerCase()
}

export const formatNumber = (bigNumberValue) => {
  if (typeof bigNumberValue != 'bigint')
    return 0

  return ethers.formatUnits(bigNumberValue, 18);
}

export const formatPercent = (value) => {
  return formatNumber(value) * 100
}
