// a generic error page to show whenever something goes wrong in other views

import React from 'react'
import PropTypes from 'prop-types'

import { InternalLink } from '../../styles/links'

const Error = ({ error }) => (
  <div>
    <h1>Whoops</h1>
    <p>Sorry, something went wrong. We&apos;re looking into it.</p>
    <div style={{ fontFamily: 'monospace' }}>
      {error ? error.message : null}
    </div>
    <InternalLink to="/">Go to the homepage</InternalLink>
  </div>
)

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}

export default Error
