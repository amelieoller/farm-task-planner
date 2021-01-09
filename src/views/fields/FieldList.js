import React from 'react'
import { FirestoreCollection } from 'react-firestore'
import styled from 'styled-components'

import Error from '../misc/Error'
import { InternalLink } from '../../styles/links'
import { Button } from '../../styles/forms'

const FieldList = () => (
  <StyledFieldList className="page">
    <div>
      <div className="field-header">
        <h1>Fields</h1>
        <Button className="new-field-button">
          <InternalLink to="/new">Create A New Field</InternalLink>
        </Button>
      </div>

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
                <InternalLink
                  to={`/${field.slug}`}
                  key={field.id}
                  className="field"
                >
                  <img
                    src="https://img.icons8.com/cotton/344/farm--v1.png"
                    alt=""
                  />
                  <div className="title">{field.title}</div>
                </InternalLink>
              ))}
            </div>
          )
        }}
      </FirestoreCollection>
    </div>
  </StyledFieldList>
)

const StyledFieldList = styled.div`
  .field-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .new-field-button {
    }
  }

  .field {
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 10px 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .title {
      font-size: 22px;
      color: #32353e;
      margin-left: 12px;
    }

    img {
      width: 35px;
    }

    &:hover {
      text-decoration: none;
      background: #829ed1;
      transition: all 0.3s ease;

      .title {
        transition: all 0.3s ease;
        color: white;
      }
    }
  }
`

export default FieldList
