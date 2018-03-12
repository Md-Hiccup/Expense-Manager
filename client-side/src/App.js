import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import ExpenseManager from './containers/ExpenseManager/ExpenseManager';
// import AllItems from './UnUsed/AllItems/AllItems';
import Home from './containers/Home/Home';
// import Toolbar from './components/Navigation/Toolbar/Toolbar';

class App extends Component {
  render() {
    return (
      // <div>
        <Layout >
            {/* <Toolbar /> */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/dashboard/:id" component={ExpenseManager}/>
                <Route path="*" render={() => <h2>404 Error Page</h2>} />_
                {/* <Route path="/:id" component={ExpenseManager} */}
                {/* <Route path="/" component={AllItems}/> */}
            </Switch>
        </Layout>
      // </div>
    );
  }
}

export default App;
