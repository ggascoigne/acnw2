import { HasPermission } from 'src/components/Acnw/Auth'
import { Loader } from 'src/components/Acnw/Loader'
import React, { Suspense } from 'react'
import { Redirect } from 'react-router-dom'

import { Perms } from '../components/Acnw/Auth/PermissionRules'

const GraphiQL = React.lazy(() => import('src/components/Acnw/GraphiQL/GraphiQL'))

export const GraphiQLPage = () => {
  const loader = <Loader />
  return (
    <HasPermission permission={Perms.GraphiqlLoad} denied={() => <Redirect to='/' />}>
      <Suspense fallback={loader}>
        <GraphiQL />
      </Suspense>
    </HasPermission>
  )
}
