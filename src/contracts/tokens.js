const TOKEN_ADDRESSES = [
  '0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc',
  '0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f',
  '0xB0D4afd8879eD9F52b28595d31B441D079B2Ca07',
  '0x162A433068F51e18b7d13932F27e66a3f99E6890',
  '0x922D6956C99E12DFeB3224DEA977D0939758A1Fe',
  '0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f',
  '0x1fA02b2d6A771842690194Cf62D91bdd92BfE28d',
  '0xdbC43Ba45381e02825b14322cDdd15eC4B3164E6',
  '0x04C89607413713Ec9775E14b954286519d836FEf',
  '0x4C4a2f8c81640e47606d3fd77B353E87Ba015584',
  '0x21dF544947ba3E8b3c32561399E88B52Dc8b2823'
]

export const TOKENS = [
  {
    symbol: 'WXFI',
    address: TOKEN_ADDRESSES[0],
    name: 'Wrapped XFI',
    oracleKey: "wxfi/usd"
  },
  {
    symbol: 'WETH',
    address: TOKEN_ADDRESSES[1],
    name: 'Wrapped ETH',
    oracleKey: "weth/usd"
  },
  {
    symbol: 'XFT',
    address: TOKEN_ADDRESSES[2],
    name: 'CrossFi Foundation Token',
    oracleKey: "xft/usd"
  },
  {
    symbol: 'eMPX',
    address: TOKEN_ADDRESSES[3],
    name: 'eMPX Token',
    oracleKey: "empx/usd"
  },
  {
    symbol: 'EXE',
    address: TOKEN_ADDRESSES[4],
    name: 'EXE Token',
    oracleKey: "exe/usd"
  },
  {
    symbol: 'XUSD',
    address: TOKEN_ADDRESSES[5],
    name: 'CrossFi USD Token',
    oracleKey: "xusd/usd"
  },
  {
    symbol: 'USDT',
    address: TOKEN_ADDRESSES[6],
    name: 'Teather USD',
    oracleKey: "usdt/usd"
  },
  {
    symbol: 'USDC',
    address: TOKEN_ADDRESSES[7],
    name: 'USD Coin',
    oracleKey: "usdc/usd"
  },
  {
    symbol: 'lpXFI',
    address: TOKEN_ADDRESSES[8],
    name: 'Staked LP XFI',
    oracleKey: "lpxfi/usd"
  },
  {
    symbol: 'lpUSD',
    address: TOKEN_ADDRESSES[9],
    name: 'Staked LP USD',
    oracleKey: "lpusd/usd"
  },
  {
    symbol: 'lpMPX',
    address: TOKEN_ADDRESSES[10],
    name: 'Staked LP MPX',
    oracleKey: "lpmpx/usd"
  }
]

export const FACTORY_ADDRESS = '0x3cec062F629879e7f919D07350FB5B51eCba1366'
export const ORACLE_ADDRESS = '0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650'

