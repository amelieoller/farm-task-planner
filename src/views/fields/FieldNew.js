import React from 'react'
import PropTypes from 'prop-types'

import FirebaseAuth from '../misc/FirebaseAuth'
import Error from '../misc/Error'
import logIn from '../../actions/logIn'
import createField from '../../actions/createField'
import FieldForm from './FieldForm'
import { Button } from '../../styles/forms'

const FieldNew = ({ history }) => (
  <div className="page">
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
              <Button type="button" onClick={logIn}>
                Log in
              </Button>
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
  </div>
)

FieldNew.propTypes = {
  history: PropTypes.string,
}

export default FieldNew
