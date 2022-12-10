import { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import HomeLayout from '../../components/layout/HomeLayout'

const Interests: NextPageWithLayout = () => {
  return <div>Interests</div>
}

Interests.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Interests
