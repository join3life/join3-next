import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import PersonProfile from '../compoents/PersonProfile'
import { useEvmNativeBalance } from '@moralisweb3/next';


const Home: NextPage = () => {
  const address = '0xc14B8187368738532c71318cD77e7e28Ed9d53d3';
  const { data: nativeBalance } = useEvmNativeBalance({ address });
  //connect wallet and live in data

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
          <h3>Wallet: {address}</h3>
          <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
      </div>
      <div>begin here</div>
      <PersonProfile></PersonProfile>
    </div>
  )
}

export default Home
