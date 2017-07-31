import React, { Component } from 'react';
import { sendVideoRequest } from '../actions/actions';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';

import styled from 'styled-components';

const SearchW = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  font-size: 5rem;
  font-family: 'Lato', serif;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 0.5rem;
`;

const SearchBoxW = styled.form`
  position: relative;
  display: flex;

  & > span {
    opacity: 1;
  }

  & > i {
    color: rgba(100, 65, 164, 1);
    position: absolute;
    font-size: 0.8em;
    right: 0.5em;
    bottom: 0.4em;
  }
`;

const SearchBox = styled(NumericInput)`
  background: transparent;
  color: transparent;
  border: none;
  border-bottom: 2px solid rgba(100, 65, 164, 0.2); 
  transition: all 0.25s ease-in-out;
  font-family: 'Lato', serif;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 0.5rem;

  &:focus {
    outline: none;
  }

  &:hover, &:focus {
    border-bottom: 2px solid rgba(100, 65, 164, 0.8);
  }

  &:focus {
    background: linear-gradient(rgba(100, 65, 164, 0) 80%, rgba(100, 65, 164, 0.1));
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
    letter-spacing: 0;
    font-weight: 400; 
    padding-bottom: 2rem;
    font-size: 0.7em;
  }
`;


const SearchIcon = styled.i`
  cursor: pointer;
  transition: all 0.2 ease-in-out;
  
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const CursorW = styled.div`
  position: absolute;
  color: ${props => props.modal ? "white" : "black"};
  top: 0;
  left: 0;
  display: flex;

  & > p {
    margin: 0;
    padding: 0;
    user-select: none;
  }
`;

const CursorElement = styled.div`
  position: relative;
  bottom: -5px;
  width: 4px;
  height: 1em;
  background-color: rgba(100, 65, 164, 1);
  opacity: 1;

  animation-name: blink;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;

  @keyframes blink {
    0% { opacity: 1; }
    25% { opacity: 0; }
    50% { opacity: 0; }
    75% { opacity: 1}
    100% { top: 1;}
  }
`;

class Search extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      input : "151862084"
    };
  }

  handleInputChange(e){

    if (`${parseInt(e.target.value)}` === e.target.value || e.target.value === "") {
      this.setState({input : e.target.value});
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.history.push('/replay/' + this.state.input);
  }

  render() {
    return (
      <SearchW>
        <SearchBoxW onSubmit={(e) => this.handleSubmit(e)} onChange={this.handleInputChange}>
            <SearchBox 
              style={false} 
              value={this.state.input} 
              placeholder="What replay, yo?"
              maxLength={10}
              autoFocus
            />
          <SearchIcon onClick={(e) => this.handleSubmit(e)} className="fa fa-search fa-lg" aria-hidden="true"></SearchIcon>
        </SearchBoxW>
        <CursorW modal={!!this.props.modal}>
          <p>{this.state.input}</p>
          <CursorElement/>
        </CursorW>
      </SearchW>
    );
  }
}

export default withRouter(connect()(Search));
