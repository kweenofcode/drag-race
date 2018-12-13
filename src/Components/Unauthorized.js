import React from 'react'
import { Link } from 'react-router-dom'

import {Button} from '@material-ui/core'

const Unauthorized = () => {
  return (
    <div className="modal">    
      <Link className="btn btn--rules" to="/">
        <Button>Home</Button>
      </Link>
      <h1>Sorry, Henny. You aren't authorized to see this page.</h1>
    </div>
  )
}

export default Unauthorized