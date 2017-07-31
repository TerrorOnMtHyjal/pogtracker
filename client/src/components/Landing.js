import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deloadVideo } from '../actions/actions';
import Search from './Search';

const LandingW = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: ${props => props.modal ? 0 : "200px"};
  color: ${props => props.modal ? "white" : "black"};
`;

const InstructionW = styled.div`
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.8rem;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

const Instruction = styled.p`
  margin: 0;
  padding: 0;
`;

const ReplayHelper = styled.button`
  border: none;
  cursor: pointer;
  font-style: italic;
  font-weight: bold;
  color: ${props => props.modal ? "white" : "black"};
  background: rgba(100, 65, 164, 0.2);
`;

const Emote = styled.div`
  background-image: url("https://static-cdn.jtvnw.net/emoticons/v1/41/1.0");
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 10px 0 0;
  padding-bottom: 5px;
  width: 30px;
  height: 30px;

  &:hover{
    background-image: url("https://static-cdn.jtvnw.net/emoticons/v1/25/1.0");
  }
`;

const Learn = styled.button`
  outline: none;
  background: none;
  cursor: pointer;
  border: none;
  text-decoration: underline;
  color: rgba(100, 65, 164, 1);
  margin-top: 4rem;

  &:hover {
    color: rgba(100, 65, 164, 0.5);
  }
`;


class Landing extends Component {

  componentDidMount(){
    if(this.props.match.path === "/"){
      this.props.dispatch(deloadVideo());
    }
  }

  render() {
    return (
      <LandingW modal={!!this.props.modal}>
        <div>
          <Search modal={!!this.props.modal}/>
          <InstructionW>
            <Instruction>Find a <ReplayHelper modal={!!this.props.modal}>replay ID</ReplayHelper>, drop it in and we'll generate some fun highlights for you</Instruction>
            <Emote />
          </InstructionW>
        </div>
        {!this.props.modal && <Learn>Learn More</Learn>}
      </LandingW>
    );
  }
}

export default connect()(Landing);