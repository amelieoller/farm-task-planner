import React from 'react'
import { FirestoreCollection } from 'react-firestore'
import PropTypes from 'prop-types'

import Error from '../misc/Error'
import deleteField from '../../actions/deleteField'
import updateField from '../../actions/updateField'
import FieldForm from './FieldForm'

const FieldEdit = ({ match, history }) => (
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
            <FieldForm
              field={field}
              onSubmit={(newField) =>
                updateField(field.id, newField).then(() =>
                  history.push(`/${field.slug}`),
                )
              }
            />
            <br />
            <button
              type="button"
              onClick={() => deleteField(field).then(() => history.push(`/`))}
            >
              Delete field
            </button>
          </div>
        )
      }}
    </FirestoreCollection>
  </div>
)

FieldEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }),
  }),
  history: PropTypes.string,
}

export default FieldEdit
