import { AiFillGift } from 'react-icons/ai'

const Header = () => {
  return (
    <div className="border-b h-[60px] bg-[#C9CDD4] flex justify-between items-center">
      <div>LOGO</div>
      <div className="flex items-center gap-2">
        <div className="indicator cursor-pointer">
          <span className="indicator-item badge badge-secondary h-[8px] w-[8px] pl-0 pr-0 top-1 right-1"></span>
          <AiFillGift size={30} />
        </div>
        <div className="dropdown dropdown-end mr-2">
          <label tabIndex={0} className="btn h-[20px] w-[150px]">
            Click
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
