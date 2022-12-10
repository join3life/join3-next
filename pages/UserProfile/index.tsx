import React from 'react'
import { HomeLayout } from '../../components/layouts'

import type { NextPageWithLayout } from '../_app'

const UserProfile: NextPageWithLayout = () => {
  return <div className="flex justify-center">123</div>
}

UserProfile.getLayout = HomeLayout

export default UserProfile
