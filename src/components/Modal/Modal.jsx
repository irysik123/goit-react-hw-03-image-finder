import { Component } from 'react';
import { ModalWindow, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <ModalWindow onClick={this.handleBackdropClick}>
        <ModalContainer onClick={this.props.toggleModal}>
          <img
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </ModalContainer>
      </ModalWindow>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
};
