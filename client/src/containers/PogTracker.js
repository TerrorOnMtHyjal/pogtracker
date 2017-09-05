import React, { Component } from 'react';
import { sendVideoRequest, updateActive } from '../actions/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import qs from 'query-string'

import Loading from '../components/Loading';
import ReplayStats from '../components/ReplayStats';
import EmoteButtons from '../components/EmoteButtons';
import TwitchPlayer from '../components/TwitchPlayer';

const PogTrackerW = styled.div`
  width: 100%;
  margin-top: 5rem;
`;

const PogTrackerInnerW = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

class PogTracker extends Component {

  componentWillMount(){
    this.dispatchNewRequest(this.props);
  }

  getQueries(){
    const queries = this.props.location.search ? qs.parse(this.props.location.search) : undefined;
    const formattedDispatchQueries = {};

    for(let query in queries){
      query === "e" && (formattedDispatchQueries["activeEmote"] = queries[query]);
      query === "m" && (formattedDispatchQueries["activeMoment"] = queries[query]);
    }

    return formattedDispatchQueries;
  }

  dispatchNewRequest(currentProps){
    this.props.dispatch(updateActive(this.getQueries()));
    this.props.dispatch(sendVideoRequest(currentProps.match.params.id));
  }

  componentWillReceiveProps(newProps){
    if(newProps.match.params.id != this.props.match.params.id){
      this.dispatchNewRequest(newProps);
    }
  }

  render() {
    return (
      <PogTrackerW>
         {
          this.props.requesting 
            ? <Loading />
            : 
            this.props.videoLoaded 
              ? 
                <PogTrackerInnerW>
                  <ReplayStats />
                  <TwitchPlayer/>
                  <EmoteButtons />
                </PogTrackerInnerW>
              : undefined
         }
      </PogTrackerW>
    );
  }
}

const mapState = ({ requesting, videoLoaded, loadedData}) => ({
  requesting,
  videoLoaded
});

export default connect(mapState)(PogTracker);