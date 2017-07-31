import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StatsW = styled.div`
  display: flex;
  font-family: 'Open Sans', serif;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;
const OwnerW = styled.div`
  display: flex;
`;

const ShareW = styled.div`
`;

const ShareButton = styled.button`
  color: #fff;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058 0%, #28a745 90%);
  background-size: 110% 110%;
  border-radius: 3px;
  border: 1px solid rgba(27, 31, 35, 0.2);
  cursor: pointer;
  margin: 0;
  padding: 3px 10px;
`;

const ChannelLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
`;

const InfoW = styled.div`
  display: flex; 
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const ChannelLink = styled.a`
  text-decoration: none;
  color: rgba(100, 65, 164, 1);
`;

const Title = styled.p`
  margin: 0;
  font-size: 0.8em;
`;

const GameName = styled.p`
  margin: 0;
  font-size: 0.8em;
`

class ReplayStats extends Component {
  render() {
    return (
      <StatsW>
        <ShareW>
          <ShareButton>Share this highlight</ShareButton>
        </ShareW>
        <OwnerW>
          <InfoW>
            <ChannelLink href={`http://www.twitch.tv/${this.props.name}`}>{this.props.displayName}</ChannelLink>
            <Title>{this.props.title}</Title>
            <GameName>{this.props.game}</GameName>
          </InfoW>
          <ChannelLogo src={this.props.logo} alt="Channel Logo"/>
        </OwnerW>
      </StatsW>
    );
  }
}


const mapState = ({ loadedData }) => {
  const { channelData, replayData } = loadedData;

  return {
    title : replayData.title,
    displayName : channelData.displayName,
    name : channelData.name,
    logo : channelData.logo,
    game : replayData.game
  };
};
export default connect(mapState)(ReplayStats);