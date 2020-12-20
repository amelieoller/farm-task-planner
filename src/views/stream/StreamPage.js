import React, { useState } from 'react'
import { FirestoreCollection } from 'react-firestore'
import styled from 'styled-components'

import Error from '../misc/Error'
import Stream from './Steam'

const SteamPage = () => (
  <FirestoreCollection path="fields" sort="lastWorkDone:asc">
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

      return <Stream fields={data} />
    }}
  </FirestoreCollection>
)

export default SteamPage
