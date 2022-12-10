import { ReactElement } from 'react'
import HomeLayout from '../../components/layout/HomeLayout'
import type { NextPageWithLayout } from '../_app'

const UserProfile: NextPageWithLayout = () => {
  return <div className="flex justify-center">123</div>
}

UserProfile.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}

export default UserProfile
