import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateActive } from '../actions/actions';
import styled from 'styled-components';

const ButtonListW = styled.div`
  display: flex;
  flex-flow: column;
`;

const ButtonRowW = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #F2F2F2;
  padding: 1em;
  border-top: 2px solid rgba(100, 65, 164, 1);
`;

const Button = styled.button`
  height: 2em;
  width: 2em;
  margin: 0.5em;
  background: none;
  border: none;
  cursor: pointer;
  background-image: url('${props => props.img}');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transition: all 0.1s ease-in-out;

  &:hover{
    transform: scale(1.3);
  }
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
        <Button 
          key={emote.name} 
          onClick={() => this.props.dispatch(updateActive({ activeEmote: emote.name }))}
          img={`https://static-cdn.jtvnw.net/emoticons/v1/${emote.imgID}/1.0`}
        />
      ) 
    })
  }


  render() {

    return (
    this.state.subEmotes.length > 1 
    ?
      <ButtonListW>
        <h3>Subscriber Emotes</h3>
          <ButtonRowW>
            {this.generateRow(this.state.subEmotes)}
          </ButtonRowW>
        <h3>Global Emotes</h3>
          <ButtonRowW>
            {this.generateRow(this.state.globalEmotes)}
          </ButtonRowW>
      </ButtonListW>
    :
      <ButtonListW>
          <ButtonRowW>
            {this.generateRow(this.state.globalEmotes)}
          </ButtonRowW>
      </ButtonListW>
    );
  }
}

const mapState = ({ loadedData }) => ({
  library : loadedData.library
});

export default connect(mapState)(EmoteButtons);