import { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import HomeLayout from '../../components/layout/HomeLayout'

const Skills: NextPageWithLayout = () => {
  return <div>Skills</div>
}

Skills.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Skills
