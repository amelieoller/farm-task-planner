import React from 'react'

import FirebaseAuth from '../misc/FirebaseAuth'
import Error from '../misc/Error'
import logIn from '../../actions/logIn'
import createField from '../../actions/createField'
import FieldForm from './FieldForm'
import { Page } from '../../styles/layout'

const FieldNew = ({ history }) => (
  <Page>
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <div>loading...</div>
        }

        if (!auth) {
          return (
            <div>
              <p>You must be logged in to add fields</p>
              <button onClick={logIn}>log in</button>
            </div>
          )
        }

        return (
          <FieldForm
            onSubmit={(values) =>
              createField(values).then((field) =>
                history.push(`/${field.slug}`),
              )
            }
          />
        )
      }}
    </FirebaseAuth>
  </Page>
)

export default FieldNew
