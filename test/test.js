const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

const deployer_pk = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
// const test_user = "0xE782e833af67ACB035498A8ec983541e7E073D38"
const test_user = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
const oracle_address ="0x3D63c50AD04DD5aE394CAB562b7691DD5de7CF6f"

const TOKEN_ADDRESSES = [
  '0x71a0b8A2245A9770A4D887cE1E4eCc6C1d4FF28c',
  '0xb185E9f6531BA9877741022C92CE858cDCc5760E',
  '0xAe120F0df055428E45b264E7794A18c54a2a3fAF',
  '0x193521C8934bCF3473453AF4321911E7A89E0E12',
  '0x9Fcca440F19c62CDF7f973eB6DDF218B15d4C71D',
  '0x01E21d7B8c39dc4C764c19b308Bd8b14B1ba139E',
  '0x3C1Cb427D20F15563aDa8C249E71db76d7183B6c',
  '0x1343248Cbd4e291C6979e70a138f4c774e902561',
  '0x22a9B82A6c3D2BFB68F324B2e8367f346Dd6f32a'
]

const wallet = new ethers.Wallet(deployer_pk, provider);

const contractABI = [
  'function mint(address,uint256)',
];

const mintToken = async (token_address, to, amount) => {
  try {
    const contract = new ethers.Contract(token_address, contractABI, wallet);

    const transactionResponse = await contract.mint(to, amount);
    console.log('Transaction hash:', transactionResponse.hash);

    const receipt = await transactionResponse.wait();
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.error('Error calling contract function:', error);
  }
}

const mintTokens = async(to, amount) => {
  for (let idx in TOKEN_ADDRESSES) {
    const token = TOKEN_ADDRESSES[idx];
    if (idx != 5)
      await mintToken(token, to, ethers.parseEther(amount.toString()));
    else
      await mintToken(token, to, ethers.parseUnits(amount.toString(), 6));
  }
}

const sendNativeToken = async (to, amount) => {
  try {
    const tx = {
      to: to,
      value: ethers.parseUnits(amount.toString(), 8), // Amount in wei
    };

    const transactionResponse = await wallet.sendTransaction(tx);
    console.log('Transaction hash:', transactionResponse.hash);

    // Wait for the transaction to be confirmed
    const receipt = await transactionResponse.wait();
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

const setOraclePrice = async () => {
  try {
    const contractABI = [`function setMultipleValues(string[],uint256[])`]
    const contract = new ethers.Contract(oracle_address, contractABI, wallet);

    const keys = [
      "xusd/usd",
      "empx/usd",
      "wxfi/usd",
      "xft/usd",
      "weth/usd",
      "exe/usd",
      "usdt/usd",
      "usdc/usd",
      "lpMPX/usd",
      "lpUSD/usd",
      "lpXFI/usd",
    ]

    const _prices = [
      0.83,
      0.02,
      0.63,
      0.35,
      2448,
      0.08,
      0.998,
      1.01,
      0.03,
      1.23,
      0.72,
    ]

    const currentTime = new Date().getTime() - 60;
    const prices = _prices.map(_price => BigInt(parseInt(_price * 10 ** 8) * 2 ** 128 + currentTime))

    const transactionResponse = await contract.setMultipleValues(keys, prices);
    console.log('Transaction hash:', transactionResponse.hash);

    const receipt = await transactionResponse.wait();
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

// mintTokens(test_user, 1000000)
// sendNativeToken(test_user, 10)
setOraclePrice()
