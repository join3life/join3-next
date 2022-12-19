import { useRouter } from 'next/router'
import { AiFillGift } from 'react-icons/ai'
import { useDisconnect, useAccount } from 'wagmi'

const Header = props => {
  const router = useRouter()
  const { disconnect } = useDisconnect()
  const { address, isConnected, connector } = useAccount()

  const isLogin = isConnected
    ? address?.slice(0, 5) + '...' + address?.slice(-4)
    : 'connect wallet'

  console.log(isConnected)
  const logout = () => {
    disconnect()
    router.push('/')
  }
  return (
    <div className="border-b h-[60px] bg-[#C9CDD4] flex justify-between items-center">
      <div className="cp pl-4" onClick={() => router.push('/')}>
        LOGO
      </div>
      <div className="flex items-center gap-2">
        <div className="indicator cursor-pointer">
          <span className="indicator-item badge badge-secondary h-[8px] w-[8px] pl-0 pr-0 top-1 right-1"></span>
          <AiFillGift size={30} />
        </div>
        <div className="dropdown dropdown-end mr-2">
          <label
            tabIndex={0}
            className="btn h-[20px] w-[150px]"
            onClick={() => {
              if (!isConnected) router.push('/')
            }}
          >
            {isLogin}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => router.push('/OrganizationProfile/Create')}>
              <a>New Organization</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <button onClick={logout}>Disconnect</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
