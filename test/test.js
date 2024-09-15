const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

const deployer_pk = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const test_user = "0xE782e833af67ACB035498A8ec983541e7E073D38"
// const test_user = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
const oracle_address ="0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"

const TOKEN_ADDRESSES = [
  '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
  '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
  '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
  '0x9A676e781A523b5d0C0e43731313A708CB607508',
  '0x0B306BF915C4d645ff596e518fAf3F9669b97016',
  '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1',
  '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
  '0x68B1D87F95878fE05B998F19b66F4baba5De1aed',
  '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c'
]

const wallet = new ethers.Wallet(deployer_pk, provider);

const contractABI = [
  'function mint(address,uint256)',
];

const getGasPrice = async () => {
  const {gasPrice} = await provider.getFeeData();
  console.log(gasPrice);
  return gasPrice + 100n;
}

const mintToken = async (token_address, to, amount) => {
  try {

    const contract = new ethers.Contract(token_address, contractABI, wallet);

    const transactionResponse = await contract.mint(to, amount, {
      gasPrice: await getGasPrice()
    });

    console.log('Transaction hash:', transactionResponse.hash);

    const receipt = await transactionResponse.wait();
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.log(token_address)
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
      value: ethers.parseEther(amount.toString()), // Amount in wei
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

    const transactionResponse = await contract.setMultipleValues(keys, prices, {
      gasPrice: await getGasPrice()
    });

    console.log('Transaction hash:', transactionResponse.hash);

    const receipt = await transactionResponse.wait();
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

mintTokens(test_user, 10000000)
// sendNativeToken(test_user, 10)
// setOraclePrice()
// mintToken(TOKEN_ADDRESSES[0], test_user, 10000000)
// mintToken(TOKEN_ADDRESSES[1], test_user, 10000000)
