import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createClient, configureChains, WagmiConfig, mainnet } from "wagmi";
import { polygon, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import Collection from "../contexts/Collection";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { QueryClient, QueryClientProvider } from "react-query";
import Organization from "../contexts/Organization";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, polygon],
    [publicProvider()]
  );

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  });

  const getLayout = Component.getLayout ?? ((page) => page);

  const [collectionName, setCollectionName] = useState("");
  const [type, setType] = useState("skills");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [info, setInfo] = useState<any>();

  const collectionContextValue = {
    collectionName,
    setCollectionName,
    type,
    setType,
    description,
    setDescription,
    projectName,
    setProjectName,
  };

  const organizationContextValue = {
    info,
    setInfo,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Collection.Provider value={collectionContextValue}>
            <Organization.Provider value={organizationContextValue}>
              {getLayout(<Component {...pageProps} />)}
            </Organization.Provider>
          </Collection.Provider>
        </SessionProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
