const TOKEN_ADDRESSES = [
  '0x99dBE4AEa58E518C50a1c04aE9b48C9F6354612f',
  '0x6F6f570F45833E249e27022648a26F4076F48f78',
  '0xCA8c8688914e0F7096c920146cd0Ad85cD7Ae8b9',
  '0xB0f05d25e41FbC2b52013099ED9616f1206Ae21B',
  '0x5FeaeBfB4439F3516c74939A9D04e95AFE82C4ae',
  '0x976fcd02f7C4773dd89C309fBF55D5923B4c98a1',
  '0x19cEcCd6942ad38562Ee10bAfd44776ceB67e923',
  '0xD42912755319665397FF090fBB63B1a31aE87Cee',
  '0xfcDB4564c18A9134002b9771816092C9693622e3',
  '0x927b167526bAbB9be047421db732C663a0b77B11',
  '0x32EEce76C2C2e8758584A83Ee2F522D4788feA0f'
]

const TOKENS = [
  {
    symbol: 'WXFI',
    address: TOKEN_ADDRESSES[0],
    name: 'Wrapped XFI'
  }, {
    symbol: 'WETH',
    address: TOKEN_ADDRESSES[1],
    name: 'Wrapped ETH'
  }, {
    symbol: 'XFT',
    address: TOKEN_ADDRESSES[2],
    name: 'CrossFi Foundation Token'
  },
  {
    symbol: 'eMPX',
    address: TOKEN_ADDRESSES[3],
    name: 'eMPX Token'
  },
  {
    symbol: 'EXE',
    address: TOKEN_ADDRESSES[4],
    name: 'EXE Token'
  },
  {
    symbol: 'XUSD',
    address: TOKEN_ADDRESSES[5],
    name: 'CrossFi USD Token' },
  {
    symbol: 'USDT',
    address: TOKEN_ADDRESSES[6],
    name: 'Teather USD'
  },
  {
    symbol: 'USDC',
    address: TOKEN_ADDRESSES[7],
    name: 'USD Coin' },
  {
    symbol: 'lpXFI',
    address: TOKEN_ADDRESSES[8],
    name: 'Staked LP XFI'
  },
  {
    symbol: 'lpUSD',
    address: TOKEN_ADDRESSES[9],
    name: 'Staked LP USD'
  },
  {
    symbol: 'lpMPX',
    address: TOKEN_ADDRESSES[10],
    name: 'Staked LP MPX'
  }
]

const FACTORY_ADDRESS = '0xd6e1afe5cA8D00A2EFC01B89997abE2De47fdfAf'

export { TOKENS, FACTORY_ADDRESS }
