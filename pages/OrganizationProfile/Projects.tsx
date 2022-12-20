import React from 'react'
import { OrganizationLayout } from '../../components/layouts'
import ForceGraph from '../../components/Graph/ForceGraph'

const Projects = () => {
  return (
    <div>
      Projects
      <ForceGraph />
    </div>
  )
}

Projects.getLayout = OrganizationLayout

export default Projects
