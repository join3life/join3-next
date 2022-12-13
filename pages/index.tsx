import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useEvmNativeBalance } from '@moralisweb3/next'
import WalletOptionsModal from '../components/WalletOptionsModal'
import { useState } from 'react'

const Home: NextPage = () => {
  const address = '0xc14B8187368738532c71318cD77e7e28Ed9d53d3'
  const { data: nativeBalance } = useEvmNativeBalance({ address })
  //connect wallet and live in data
  const [showWalletOptions, setShowWalletOptions] = useState(false)

  return (
    <>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Join3</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <label
          onClick={() => setShowWalletOptions(true)}
          tabIndex={0}
          className="btn h-[20px] w-[150px]"
        >
          connect wallet
        </label>
        <div>
          <h3>Wallet: {address}</h3>
          <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3>
        </div>
        <div>begin here</div>
        <div className="flex gap-2">
          <Link href="/UserProfile/Feed">
            <div className="p-2 border rounded-lg">to user-profile</div>
          </Link>
          <Link href="/OrganizationProfile">
            <div className="p-2 border rounded-lg">to organization-profile</div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
