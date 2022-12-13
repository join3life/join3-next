import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
 
function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const [connected,setConnected] = useState(isConnected)

  if (connected)
    return (
      <div>
        {/* Connected to {address} */}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Profile