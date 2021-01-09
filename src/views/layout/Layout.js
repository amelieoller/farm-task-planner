// this Layout component wraps every page with the app header on top
// check out App.js to see how it's used

import React from 'react'
import PropTypes from 'prop-types'

import logIn from '../../actions/logIn'
import FirebaseAuth from '../misc/FirebaseAuth'
import { HeaderFooterWrapper, Header } from '../../styles/layout'
import { HeaderLink } from '../../styles/links'
import { Button } from '../../styles/forms'

const Layout = ({ children }) => (
  <HeaderFooterWrapper>
    <Header>
      <div>
        <div>
          <HeaderLink to="/">Home</HeaderLink> |{' '}
          <HeaderLink to="/new">New Field</HeaderLink> |{' '}
          <HeaderLink to="/stream/backstage">Backstage</HeaderLink> |{' '}
          <HeaderLink to="/stream/live">Live</HeaderLink>
        </div>
        <div>
          <FirebaseAuth>
            {({ isLoading, error, auth }) => {
              if (isLoading) {
                return '...'
              }
              if (error) {
                return '⚠️ login error'
              }
              if (auth) {
                return (
                  <HeaderLink to="/account">
                    <img
                      src="https://img.icons8.com/dusk/344/farmer-male.png"
                      alt=""
                      aria-label="account"
                    />
                  </HeaderLink>
                )
              }
              return (
                <Button type="button" onClick={logIn}>
                  Log in
                </Button>
              )
            }}
          </FirebaseAuth>
        </div>{' '}
      </div>
    </Header>

    {children}
  </HeaderFooterWrapper>
)

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
}

export default Layout
