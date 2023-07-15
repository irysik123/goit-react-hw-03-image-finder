import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    return <ul className="gallery">
        {this.props.images.map((image) => <ImageGalleryItem key={image.id} image={image}/>)}
    </ul>;
  }
}
