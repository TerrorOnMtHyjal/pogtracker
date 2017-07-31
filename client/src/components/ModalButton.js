import React, { Component } from 'react';
import Modal from 'react-modal';
import Search from './Search';
import Landing from './Landing';
import styled from 'styled-components';

const modalStyle = {
  overlay : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.97)'
  },
  content : {
    position: "static",
    margin: 'auto',
    padding: 0,
    margin: 0,
    background: 'transparent',
    border: `none`
  }
}

const SearchIcon = styled.i`
  cursor: pointer;
  transition: all 0.2 ease-in-out;
  color: rgba(100, 65, 164, 1);
  font-size: 2em;
  
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

class ModalButton extends Component {
  constructor(props){
    super(props)

    this.state = {
      modalIsOpen : false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <SearchIcon onClick={this.openModal} className="fa fa-search" aria-hidden="true"></SearchIcon>
        <Modal
          style={modalStyle}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Search Modal"
        >
          <Search modal/>
        </Modal>
      </div>
    );
  }
}

export default ModalButton;