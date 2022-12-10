import type { NextPageWithLayout } from '../_app'
import { HomeLayout } from '../../components/layouts'

const Projects: NextPageWithLayout = () => {
  return <div>Projects</div>
}

Projects.getLayout = HomeLayout

export default Projects
