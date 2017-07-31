import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deloadVideo } from '../actions/actions';
import Search from './Search';

const LandingW = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
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
  & > p, h3 {
    display: inline-block;
    margin: 0;
    padding: 0;
  }

  & > h3 {
    margin-right: 10px;
    font-style: italic;
    color: rgba(100, 65, 164, 1);
  }

  & > h1 {
    & > span {
      color: rgba(100, 65, 164, 1);
    }
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
      <LandingW>
        <div>
          <DescriptionW>
            <h1>The ultimate highlight generator. Powered by <span>twitch chat</span>.</h1>
            <h3>Streamers:</h3>
            <p>Find the top highlights from your stream automatically. The more active the chat, the better the results.</p>
            <br />
            <h3>Viewers:</h3>
            <p>Missed a moment? Want to see the top FailFish of your favorite streamer's recent broadcast? We got you covered.</p>
          </DescriptionW>
          <Search/>
          <InstructionW>
            <Instruction>Find a <ReplayHelper>replay ID</ReplayHelper>, drop it in and we'll generate some fun highlights for you</Instruction>
            <Emote />
          </InstructionW>
        </div>
        <Learn>Learn More</Learn>
      </LandingW>
    );
  }
}

export default connect()(Landing);