import React from 'react'
import { FirestoreCollection } from 'react-firestore'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Error from '../misc/Error'
import { InternalLink } from '../../styles/links'
import { Button } from '../../styles/forms'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import createField from '../../actions/createField'

const FieldList = ({ history }) => {
  const handleDuplicate = (fieldToDuplicate) => {
    const { id, ...newField } = fieldToDuplicate

    createField(newField).then((field) => history.push(`/${field.slug}`))
  }

  return (
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
                  <span className="field" key={field.id}>
                    <InternalLink to={`/${field.slug}`}>
                      <img
                        src="https://img.icons8.com/cotton/344/farm--v1.png"
                        alt=""
                      />
                      <div className="title">{field.title}</div>
                    </InternalLink>
                    <button
                      onClick={() => handleDuplicate(field)}
                      className="duplicate"
                      type="button"
                    >
                      <Copy />
                    </button>
                  </span>
                ))}
              </div>
            )
          }}
        </FirestoreCollection>
      </div>
    </StyledFieldList>
  )
}

const StyledFieldList = styled.div`
  .field-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .new-field-button {
    }
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      border: 1px solid lightgray;
      border-radius: 10px;
      padding: 10px 20px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      width: 100%;

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

    .duplicate {
      margin-left: 10px;
      cursor: pointer;
      background: none;
      border: none;

      &:hover {
        color: #73c1ac;
      }
    }
  }
`

FieldList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

export default FieldList
