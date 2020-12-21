import React from 'react'
import { FirestoreCollection } from 'react-firestore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PropTypes from 'prop-types'

import Error from '../misc/Error'
import FirebaseAuth from '../misc/FirebaseAuth'
import Field from './Field'
import { Button } from '../../styles/forms'
import deleteField from '../../actions/deleteField'

const FieldPage = ({ match, history }) => (
  <div className="page">
    <FirestoreCollection
      path="fields"
      filter={['slug', '==', match.params.slug]}
    >
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        if (data.length === 0) {
          return <Error />
        }

        const field = data[0]

        return (
          <div>
            <h1>{field.title}</h1>

            <DndProvider backend={HTML5Backend}>
              <Field field={field} />
            </DndProvider>

            <FirebaseAuth>
              {({ auth }) =>
                auth ? (
                  <Button
                    onClick={() =>
                      window.confirm(
                        'Are you sure you want to delete this field?',
                      ) && deleteField(field).then(() => history.push(`/`))
                    }
                  >
                    Delete Field
                  </Button>
                ) : null
              }
            </FirebaseAuth>
          </div>
        )
      }}
    </FirestoreCollection>
  </div>
)

FieldPage.propTypes = {
  match: PropTypes.string,
  history: PropTypes.string,
}

export default FieldPage
