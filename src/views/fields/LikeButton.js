import React from 'react'
import { FirestoreCollection } from 'react-firestore'

import likeField from '../../actions/likeField'
import unlikeField from '../../actions/unlikeField'
import FirebaseAuth from '../misc/FirebaseAuth'

const LikeButton = ({ field }) => (
  <FirebaseAuth>
    {({ isLoading, error, auth }) => {
      if (!auth || isLoading || error) {
        return <button disabled>like</button>
      }

      return (
        <FirestoreCollection
          path="fieldLikes"
          filter={[
            ['fieldId', '==', field.id],
            ['createdBy', '==', auth.uid],
          ]}
        >
          {({ error, isLoading, data }) => {
            if (error || isLoading) {
              return <button disabled>like</button>
            }

            const userLike = data[0]

            return (
              <button
                onClick={() => {
                  if (userLike) {
                    unlikeField(userLike)
                  } else {
                    likeField(field)
                  }
                }}
              >
                {userLike ? 'unlike' : 'like'}
              </button>
            )
          }}
        </FirestoreCollection>
      )
    }}
  </FirebaseAuth>
)

export default LikeButton
