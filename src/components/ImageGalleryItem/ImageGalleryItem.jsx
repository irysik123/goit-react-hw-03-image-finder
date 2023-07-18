import { Component } from 'react';
import Modal from 'components/Modal/Modal';
import { Item, ItemImage } from './ImageGalleryItme';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    modalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen,
    }));
  };

  render() {
    const { image } = this.props;
    const { modalOpen } = this.state;
    return (
      <>
        <Item>
          <ItemImage
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.toggleModal}
          />
        </Item>
        {modalOpen && (
          <Modal
            image={image}
            onClick={this.toggleModal}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL:PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
}
