import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, foundry } from 'wagmi/chains'
import { injected, metaMask, coinbaseWallet , walletConnect } from 'wagmi/connectors'

const projectId = '170f854b82b100289c65898d1e8a7cb6'

export const config = createConfig({
  // chains: [mainnet, sepolia],
  chains: [foundry],
  connectors: [ // supported wallets
    metaMask(),
    coinbaseWallet({ appName: 'DI Lending' }),
    walletConnect({ projectId }),
  ],
  transports: {
    [foundry.id]: http(),
    // [mainnet.id]: http(),
    // [sepolia.id]: http(),
  },
})
