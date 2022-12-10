import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, configureChains, WagmiConfig, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
)

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Header />
          {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </WagmiConfig>
  )
}

export default MyApp
