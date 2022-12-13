import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { useEvmNativeBalance } from "@moralisweb3/next";
import WalletOptionsModal from "../components/WalletOptionsModal";
import { useState } from "react";

const Home: NextPage = () => {
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
          className="btn"
        >
          connect wallet
        </label>
        <br />
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
  );
};

export default Home;
