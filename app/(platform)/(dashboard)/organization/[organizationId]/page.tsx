import { OrganizationSwitcher } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>

        <OrganizationSwitcher  hidePersonal/>
    </div>
  )
}

export default page