import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import {
  SearchHeader,
  SearchForm,
  SearchFormBtn,
  SearchLabel,
  Input,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

const API_KEY = '37132472-47d9b0efe4089b759aaed266f';
const BASE_URL = 'https://pixabay.com/api/';

export default class SearchBar extends Component {
  state = {
    searchText: '',
    images: null,
    page: 1,
    per_page: 12,
    totalHits: null,
    isLoading: false,
  };

  grabImages = (page = 1, prevImages = []) => {
    this.setState({ isLoading: true });
    fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.state.searchText}&image_type=photo&page=${page}&per_page=${this.state.per_page}`
    )
      .then(res => res.json())
      .then(images => {
        console.log(images);
        this.setState({
          images: [...prevImages, ...images.hits],
          isLoading: false,
          totalHits: images.totalHits,
        });
      })
      .catch(error => console.log(error));
  };

  handleLoadMore = images => {
    let newPage = this.state.page + 1;

    this.setState({ page: newPage });
    this.grabImages(newPage, images);
  };

  handleImageChange = event => {
    this.setState({ searchText: event.target.value, images: null });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchText);

    if (this.state.searchText.length >= 3) {
      this.grabImages();
    } else {
      this.setState({ images: [] });
      alert('Enter Image to search');
    }
  };

  render() {
    const { searchText, images, isLoading } = this.state;

    return (
      <div>
        <SearchHeader>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormBtn type="submit">
              <AiOutlineSearch style={{ stroke: 'grey' }} />
              {/* <SearchLabel>
                
              </SearchLabel> */}
            </SearchFormBtn>
            <Input
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleImageChange}
              value={searchText}
            />
          </SearchForm>
        </SearchHeader>
        <Loader isLoading={isLoading} />
        {images && (
          <>
            <ImageGallery images={images} />
            <Button
              images={images}
              onClick={() => this.handleLoadMore(images)}
            />
          </>
        )}
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
