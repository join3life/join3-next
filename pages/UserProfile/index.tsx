import { HomeLayout } from '../../components/layout/HomeLayout'
import type { NextPageWithLayout } from '../_app'

const UserProfile: NextPageWithLayout = () => {
  return <div className="flex justify-center">123</div>
}

UserProfile.getLayout = HomeLayout

export default UserProfile
