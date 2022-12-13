import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createClient, configureChains, WagmiConfig, mainnet } from "wagmi";
import { polygon, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import Collection from "../contexts/Collection";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [collectionName, setCollectionName] = useState("");
  const [type, setType] = useState("Skill");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");

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

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Collection.Provider value={collectionContextValue}>
          {getLayout(<Component {...pageProps} />)}
        </Collection.Provider>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
