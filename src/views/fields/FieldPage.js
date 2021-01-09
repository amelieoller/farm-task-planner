import React from 'react'
import { FirestoreCollection } from 'react-firestore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Error from '../misc/Error'
// import FirebaseAuth from '../misc/FirebaseAuth'
import Field from './Field'
// import { Button } from '../../styles/forms'
// import { ReactComponent as PlusSquareIcon } from '../../assets/icons/plus-square.svg'

const FieldPage = ({ match, history }) => (
  <StyledFieldPage className="page">
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
            <DndProvider backend={HTML5Backend}>
              <Field field={field} history={history} />
            </DndProvider>

            {/* <div>
              <PlusSquareIcon />
            </div> */}

            {/* <FirebaseAuth>
              {({ auth }) =>
                auth ? (
                  <Button
                    onClick={() =>
                      // eslint-disable-next-line no-alert
                      window.confirm(
                        'Are you sure you want to delete this field?',
                      ) && deleteField(field).then(() => history.push(`/`))
                    }
                    className="delete"
                  >
                    Delete Field
                  </Button>
                ) : null
              }
            </FirebaseAuth> */}
          </div>
        )
      }}
    </FirestoreCollection>
  </StyledFieldPage>
)

const StyledFieldPage = styled.div`
  .field-title {
    font-size: 1.7rem;
    border: none;
    margin-bottom: 10px;
  }

  span[role='button'] {
    &:focus {
      outline: none;
    }
  }

  svg {
    cursor: pointer;
    width: 25px;
    color: #92969b;

    &:hover {
      color: #81a2d8;
    }
  }
`

FieldPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

export default FieldPage
