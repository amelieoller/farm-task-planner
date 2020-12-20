// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import FieldList from './fields/FieldList'
import FieldNew from './fields/FieldNew'
import Account from './account/Account'
import FieldEdit from './fields/FieldEdit'
import FieldPage from './fields/FieldPage'
import Error from './misc/Error'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={FieldList} />
    <Route path="/new" component={FieldNew} />
    <Route path="/account" component={Account} />
    <Route path="/:slug/edit" component={FieldEdit} />
    <Route path="/:slug" component={FieldPage} />
    <Route component={Error} />
  </Switch>
)

export default Routes
