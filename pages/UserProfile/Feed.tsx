import type { NextPageWithLayout } from '../_app'
import { UserLayout } from '../../components/layouts'

const Feed: NextPageWithLayout = () => {
  return <div>Feed</div>
}

Feed.getLayout = UserLayout

export default Feed
