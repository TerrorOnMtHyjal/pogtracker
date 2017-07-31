import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deloadVideo } from '../actions/actions';
import Search from './Search';

const LandingW = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.8rem;
`;

const InstructionW = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

const DescriptionW = styled.div`
  display: flex;
  position: relative;
  top: -11rem;
  flex-flow: column;
  align-items: flex-end;
  font-size: 1rem;

  & > h1 {
    font-size: 1.25em;
    margin: 0;
    padding: 0;
  }

  & > div {
    display: flex;
    align-items: center;
    & > h2 {
      font-size: 1em;
      margin: 0;
      margin-left: -0.6em;
      padding: 0;
      color: rgba(100, 65, 164, 1);
    }
  }
`;

const ButtonsW = styled.div`
  display: flex;
  align-items: center;

  & > button {
    padding: 0.25em 1em;
    margin-left: 0.8em;
    margin-top: 0.5em;
    background: none;
    border: 1px solid rgba(100, 65, 164, 1);
    cursor: pointer;
  }
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
  background-image: url(${props => props.url});
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
      <LandingW>
        <div>
          {/*<DescriptionW>
            <h1>THE ULTIMATE HIGHLIGHT GENERATOR</h1>
            <div><Emote url={`"https://static-cdn.jtvnw.net/emoticons/v1/156787/1.0"`}/><h2>powered by <span>twitch chat</span></h2></div>
            <ButtonsW>
              <button>Streamers</button>
              <button>Viewers</button>
            </ButtonsW>
          </DescriptionW>*/}
          <Search/>
          <InstructionW>
            <Instruction>Find a <ReplayHelper>replay ID</ReplayHelper>, drop it in and we'll generate some fun highlights for you</Instruction>
            <Emote url={`"https://static-cdn.jtvnw.net/emoticons/v1/41/1.0"`}/>
          </InstructionW>
        </div>
        <Learn>Learn More</Learn>
      </LandingW>
    );
  }
}

export default connect()(Landing);