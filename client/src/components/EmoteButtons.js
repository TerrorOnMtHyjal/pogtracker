import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateActive } from '../actions/actions';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
`;

const Button = styled.button`
`;

class EmoteButtons extends Component {
  constructor(props){
    super(props);

    this.state = {
      subEmotes : [],
      globalEmotes : []
    }
  }

  componentWillMount(){
    this.divideEmotes();
  }

  divideEmotes(){
    const subEmotes = [];
    const globalEmotes = [];

    this.props.library.forEach(emote => {
      if(emote.moments.length > 5){
        
        emote.channelEmote
        ?
          subEmotes.push(emote)
        :
          globalEmotes.push(emote)
      }
    })

    this.setState({
      subEmotes,
      globalEmotes
    });
  }

  generateRow(emotes){
    return emotes.map(emote => {
      return (
        <Button key={emote.name} onClick={() => this.props.dispatch(updateActive({activeEmote: emote.name}))}>
          <img src={`https://static-cdn.jtvnw.net/emoticons/v1/${emote.imgID}/1.0`} alt={emote}/>
        </Button>
      ) 
    })
  }


  render() {
    return (
      <ButtonWrapper>
        <h3>Subscriber Emotes</h3>
          <div>
            {this.generateRow(this.state.subEmotes)}
          </div>
        <h3>Global Emotes</h3>
          <div>
            {this.generateRow(this.state.globalEmotes)}
          </div>
      </ButtonWrapper>
    );
  }
}

const mapState = ({ loadedData }) => ({
  library : loadedData.library
});

export default connect(mapState)(EmoteButtons);