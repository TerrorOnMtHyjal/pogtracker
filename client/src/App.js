import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jumpToTime, sendVideoRequest }  from './actions/actions';
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
  margin: 0 auto;
  width: 70%;
  height: 100%;
`;

const Buttons = styled.div`
  display: flex;
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

const mapState = ({ videoLoaded, requesting }) => ({
  videoLoaded,
  requesting
});

export default connect(mapState)(App);
