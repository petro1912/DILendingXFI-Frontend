const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

const deployer_pk = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const test_users = [
  "0x8581B861F2E45f77eB605a0ED8D28c65d46db7D9",
  "0xACBEE5d7a78580223B76c22E9b33aE74e0D504a8"
]

const oracle_address ="0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650"

const TOKEN_ADDRESSES = [
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

const wallet = new ethers.Wallet(deployer_pk, provider);

const contractABI = [
  'function mint(address,uint256)',
  'function balanceOf(address owner) view returns (uint256)',
];

const getGasPrice = async () => {
  const {gasPrice} = await provider.getFeeData();
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
    if (idx != 6)
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
      "lpmpx/usd",
      "lpusd/usd",
      "lpxfi/usd",
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

const getTokenBalance = async (token_address, address) => {
  const contract = new ethers.Contract(token_address, contractABI, provider);

  const balance = await contract.balanceOf(address);
  const formattedBalance = ethers.formatUnits(balance, 18)

  console.log(formattedBalance)

}

mintTokens(test_users[0], 20000000).catch(console.log)
// mintTokens(test_users[1], 20000000)
// sendNativeToken(test_users[0], 100)
// sendNativeToken(test_users[1], 100)
// setOraclePrice()
// mintToken(TOKEN_ADDRESSES[0], test_user, 10000000)
// mintToken(TOKEN_ADDRESSES[1], test_user, 10000000)

// getTokenBalance("0x5081a39b8A5f0E35a8D959395a630b68B74Dd30f", "0xc2246A415432de3774D794a14b699B02b6323ce2")

// mintToken("0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f", "0x31a46feD168ECb9DE7d87E543Ba2e8DD101ad0a0", ethers.parseEther("10000000"))


