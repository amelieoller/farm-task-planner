import React from 'react'
import { Route } from 'react-router-dom'

import logOut from '../../actions/logOut'
import { Button } from '../../styles/forms'

const Profile = ({ auth }) => (
  <Route
    render={({ history }) => (
      <div>
        <img
          src={auth.photoURL}
          alt={auth.displayName}
          width="100"
          height="100"
        />
        <p>
          <strong>{auth.displayName}</strong>
        </p>
        <p>{auth.email}</p>
        <Button onClick={() => logOut().then(() => history.push(`/`))}>
          Log Out
        </Button>
      </div>
    )}
  />
)

export default Profile
