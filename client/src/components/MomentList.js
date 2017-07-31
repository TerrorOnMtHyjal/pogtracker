import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateActive } from '../actions/actions';
import { convertToTime }  from '../lib/tools';

const MomentListW = styled.div`
  display: flex;
	flex-flow: column;
	height: 432px;
  background: rgba(100, 65, 164, 1);
  max-width: 125px;
  z-index: 10;
`;

const MomentButton = styled.button`
  display: flex;
  justify-content: center;
  position: relative;
	flex: 1;
  width: 100%;
	padding: 0.8em 1.5em;
	border: none;
	color: white;
	font-weight: bold;
	border-right: 2px solid silver;
  background: rgba(100, 65, 164, 1);
  transition: all 0.25s ease-in;

	&:hover {
    width: 125%;
	}

  &:focus {
    outline: none;
  }

  ${props => props.active && `
    width: 125%;
    background: white;
    color: rgba(100, 65, 164, 1);
    border-right: 2px solid rgba(100, 65, 164, 1);
  `}
`;

class MomentList extends Component {

  generateButtons(moments){
    return moments.map((moment, index) => {

      return (
      <MomentButton 
        active={index === this.props.activeMoment}
        key={moment} 
        onClick={() => this.props.dispatch(updateActive({activeMoment: index}))}
      >
        {convertToTime(moment)} 
      </MomentButton> 
      )
    })
  }

  render() {
    return (
      <MomentListW>
        {this.generateButtons(this.props.moments)}
      </MomentListW>
    );
  }
}

export default connect()(MomentList);