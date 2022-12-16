import { FaUserCircle } from 'react-icons/fa'
import { OrganizationLayout } from '../../components/layouts'
import PreviewContainer from '../../components/PreviewContainer'
import type { NextPageWithLayout } from '../_app'

const OrganizationProfile: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col gap-5">
      <PreviewContainer
        title="Member"
        intro="Thirty people have been awarded skills certification badges"
      >
        <div className="flex gap-8">
          {['Tom', 'Jerry', 'John', 'Doe', 'Jane', 'chares'].map(item => {
            return (
              <div className="f-c-c gap-2 cp">
                <FaUserCircle size={30} />
                {item}
              </div>
            )
          })}
        </div>
      </PreviewContainer>
      <PreviewContainer
        title="Events"
        intro="There are five event under way. You can participate in collecting the badge."
      >
        <div className="flex gap-8">
          {['Tom', 'Jerry', 'John', 'Doe', 'Jane', 'chares'].map(item => {
            return (
              <div className="f-c-c gap-2 cp">
                <FaUserCircle size={30} />
                {item}
              </div>
            )
          })}
        </div>
      </PreviewContainer>
      <PreviewContainer
        title="Projects"
        intro="Four projects have been completed so far."
      >
        <div className="flex gap-8">
          {['Tom', 'Jerry', 'John', 'Doe', 'Jane', 'chares'].map(item => {
            return (
              <div className="f-c-c gap-2 cp">
                <FaUserCircle size={30} />
                {item}
              </div>
            )
          })}
        </div>
      </PreviewContainer>
    </div>
  )
}

OrganizationProfile.getLayout = OrganizationLayout

export default OrganizationProfile
