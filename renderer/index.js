import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, createMemoryHistory } from 'react-router';
import Main from './components/main/main';
import Graph from './components/graph/graph';
import Layout from './layout/layout';

ReactDOM.render(
  <Router history={createMemoryHistory(window.location)}>
    <Route component={Layout}>
      <Route path="/" components={{ screen: Main }}/>
      <Route path="/graph" components={{ screen: Graph }}/>
    </Route>
  </Router>, document.getElementById('app'));
