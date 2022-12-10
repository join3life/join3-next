import type { NextPageWithLayout } from '../_app'
import { UserLayout } from '../../components/layouts'

const Projects: NextPageWithLayout = () => {
  return <div>Projects</div>
}

Projects.getLayout = UserLayout

export default Projects
