import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import Error from '../misc/Error'
import { InternalLink } from '../../styles/links'
import { Page } from '../../styles/layout'

const FieldList = () => (
  <Page>
    <InternalLink to="/new">New field</InternalLink>
    <hr />
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
  </Page>
)

export default FieldList
