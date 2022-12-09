import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, configureChains, WagmiConfig, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
)

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiConfig>
  )
}

export default MyApp
