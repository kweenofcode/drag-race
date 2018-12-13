import React from 'react'
import {Link} from 'react-router-dom'

import Button from '@material-ui/core/Button'

const AdminBtn = () => {
  return (
    <Link className="btn btn--admin" to="/admin">
      <Button>Admin</Button>
    </Link>
  )
}

export default AdminBtn