import { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import { HomeLayout } from '../../components/layout'

const Interests: NextPageWithLayout = () => {
  return <div>Interests</div>
}

Interests.getLayout = HomeLayout

export default Interests
