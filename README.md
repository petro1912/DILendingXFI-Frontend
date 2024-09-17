<div align="center">
    <a href="https://dilending.portfolio-as.com">
        <img alt="logo" src="https://github.com/petro1912/DILendingXFI-Frontend/blob/main/public/images/logo.png?raw=true" style="width: 160px;">
    </a>
    <h1 style="border-bottom: none">
        <b><a href="https://dilending.portfolio-as.com">DI Lending</a></b><br />
    </h1>
</div>

# DI (Double Investment) Lending Frontend
“DI Lending” Protocol is the DeFI Lending protocol which puts the idle liquidity (principal) and collateral assets into other external staking/yield farming protocols to maximize capital utilization and revenue in the pool.

## Frontend Tech Stack
Development Environment
```
node.js (v20.14.0)
Next.js@13.3.2 / React.js@18.2.0 / mui@5.12
ethers@6.13.2
wagmi@2.12.7
```
## How to run frontend

Setting env variables
copy 
```sh
cp .env.example .env
```


Run dev server on localhost and forge local blockchain ([DILendingXFI](https://github.com/petro1912/DILendingXFI) Smart contract repo)
```sh
NEXT_PUBLIC_JSON_RPC=http://localhost:8545
NEXT_PUBLIC_CONNECT_PROJECTID=<WALLETCONNECT_PROJECTID>
```

Run start development server
```sh
yarn
yarn start
// or
npm install
npm run start
```

- Deploy to hosting server
```sh
yarn build
npm run build
```

## Features

- <b>Landing Page</b>
  `/` Introduction protocols and economics to the users on the protocol 
- <b>Market Page</b>
`/markets`:  List of Lending Pools and statistics by principal token
`/market`
- <b>App Page</b>
  `/app` Users can supply/withdraw and borrow/repay principal tokens, as well as deposit and withdraw collateral.
- <b>Dashboard Page</b>
  `/dashboard` Users can monitor their liquidity and debt positions and directly interact with their position.  
