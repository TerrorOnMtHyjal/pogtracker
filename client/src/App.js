import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Invalid from './components/Invalid';
import Landing from './components/Landing';
import TopBar from './components/TopBar';
import Loading from './components/Loading';
import Search from './components/Search';
import PogTracker from './containers/PogTracker';
import './App.css';

const AppW = styled.div`
  display: flex;
  align-items: stretch;
`;

class App extends Component {
  render() {
    return(
      <Router>
        <AppW>
          <TopBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/replay/:id" component={PogTracker}/>
              <Route component={Invalid} />
            </Switch>
        </AppW>
      </Router>
    )
  }
}

export default App;
