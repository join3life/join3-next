import Link from 'next/link'
import React, { ReactElement } from 'react'
import HomeLayout from '../../components/layout/homelayout'

import type { NextPageWithLayout } from '../_app'

const UserProfile:NextPageWithLayout = () => {
 return<></>
}

UserProfile.getLayout = function getLayout(page: ReactElement){
  return (
    <HomeLayout>{page}</HomeLayout>
  )
}

export default UserProfile
