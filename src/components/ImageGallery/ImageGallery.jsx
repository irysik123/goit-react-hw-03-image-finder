import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";
import PropTypes from 'prop-types';


export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.length > 0 ? images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      )) : <div>Sorry, no results found</div> }
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
}
