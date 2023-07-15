import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="gallery-item">
        <img src={this.props.image.previewURL} alt={this.props.image.tags} />
      </li>
    );
  }
}
