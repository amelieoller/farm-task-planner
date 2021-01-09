import React from 'react'

import logIn from '../../actions/logIn'
import FirebaseAuth from '../misc/FirebaseAuth'
import Error from '../misc/Error'
import Profile from './Profile'
import { Button } from '../../styles/forms'

const Account = () => (
  <div className="page">
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (isLoading) {
          return <p>loading...</p>
        }

        if (error) {
          return <Error error={error} />
        }

        if (!auth) {
          return (
            <div>
              <p>Log in to see your account</p>
              <Button type="button" onClick={logIn}>
                Log in
              </Button>
            </div>
          )
        }

        return (
          <div>
            <Profile auth={auth} />
            <hr />
          </div>
        )
      }}
    </FirebaseAuth>
  </div>
)

export default Account
