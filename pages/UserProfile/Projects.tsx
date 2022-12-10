import { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import HomeLayout from '../../components/layout/HomeLayout'

const Projects: NextPageWithLayout = () => {
  return <div>Projects</div>
}

Projects.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Projects
