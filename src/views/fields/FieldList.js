import React from 'react'
import { FirestoreCollection } from 'react-firestore'
import styled from 'styled-components'

import Error from '../misc/Error'
import { InternalLink } from '../../styles/links'
import { Button } from '../../styles/forms'

const FieldList = () => (
  <StyledFieldList className="page">
    <Button className="new-field-button">
      <InternalLink to="/new">Create A New Field</InternalLink>
    </Button>

    <h1>Fields</h1>
    <FirestoreCollection path="fields" sort="title:asc">
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />
        }

        if (isLoading) {
          return <p>loading...</p>
        }

        if (data.length === 0) {
          return <p>No fields yet!</p>
        }

        return (
          <div>
            {data.map((field) => (
              <div key={field.id}>
                <InternalLink to={`/${field.slug}`}>{field.title}</InternalLink>
              </div>
            ))}
          </div>
        )
      }}
    </FirestoreCollection>
  </StyledFieldList>
)

const StyledFieldList = styled.div`
  .new-field-button {
    position: absolute;
    right: 0;
  }
`

export default FieldList
