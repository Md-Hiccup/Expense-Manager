import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import ExpenseManager from './containers/ExpenseManager/ExpenseManager';
import AllItems from './UnUsed/AllItems/AllItems';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path="/" exact component={ExpenseManager}/>
                <Route path="/allitems" component={AllItems}/>
            </Switch>
        </Layout>
      </div>
    );
  }
}
export default App;
