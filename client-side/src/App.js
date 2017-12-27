import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import ExpenseManager from './containers/ExpenseManager/ExpenseManager';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <ExpenseManager/>
        </Layout>
      </div>
    );
  }
}
export default App;
