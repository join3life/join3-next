import React, { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import HomeLayout from '../../components/layout/homelayout'


const Feed:NextPageWithLayout = () => {
  return <div>Feed</div>
}

Feed.getLayout = function getLayout(page: ReactElement){
  return (
    <HomeLayout>{page}</HomeLayout>    
  )
}

export default Feed
