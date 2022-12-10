import React, { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import {HomeLayout} from '../../components/layouts'

const Feed:NextPageWithLayout = () => {
  return <div>Feed</div>
}

Feed.getLayout = HomeLayout

export default Feed
