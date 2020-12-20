// this Layout component wraps every page with the app header on top
// check out App.js to see how it's used

import React from 'react'

import logIn from '../../actions/logIn'
import FirebaseAuth from '../misc/FirebaseAuth'
import { HeaderFooterWrapper, Header, Footer } from '../../styles/layout'
import { HeaderLink } from '../../styles/links'
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg'

const Layout = ({ children }) => (
  <HeaderFooterWrapper>
    <Header>
      <HeaderLink to="/">Home</HeaderLink> ·{' '}
      <HeaderLink to="/new">New Field</HeaderLink> ·{' '}
      <HeaderLink to="/new">Backstage</HeaderLink> ·{' '}
      <HeaderLink to="/new">Live</HeaderLink>
      <div style={{ float: 'right' }}>
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
                  <span role="img" aria-label="account">
                    <UserIcon />
                  </span>
                </HeaderLink>
              )
            }
            return <button onClick={logIn}>log in</button>
          }}
        </FirebaseAuth>
      </div>
    </Header>

    {children}
  </HeaderFooterWrapper>
)

export default Layout
