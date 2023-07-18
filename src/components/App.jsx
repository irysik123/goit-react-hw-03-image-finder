import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';

const API_KEY = '37132472-47d9b0efe4089b759aaed266f';
const BASE_URL = 'https://pixabay.com/api/';

export default class App extends Component {
  state = {
    searchText: '',
    images: null,
    page: 1,
    per_page: 12,
    totalHits: null,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.grabImages();
    } else if (prevState.page !== this.state.page) {
      this.grabImages(this.state.page, this.state.images);
    }
  }

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
      }
      )
      .catch(error => console.log(error));
  };

  handleLoadMore = () => {
    let newPage = this.state.page + 1;

    this.setState({ page: newPage });
  };

  handleSubmit = searchText => {
    if (searchText.length < 3) {
      alert('Please enter minimum 3 symbols to search for Images');
    } else if (searchText === this.state.searchText) {
      alert(`You're already searching for ${searchText}`);
    } else {
      this.setState({ searchText });
    }
  };

  render() {
    const { images, isLoading, totalHits } = this.state;

    return (
      <>
        <GlobalStyle />
        <SearchBar onSubmit={this.handleSubmit} />
        <Loader isLoading={isLoading} />
        {images && (
          <>
            <ImageGallery images={images} />
            {totalHits !== images.length && (
              <Button onClick={this.handleLoadMore}>Load More</Button>
            )}
            {totalHits === 0 && (<div>"Sorry, no results found =( Please try one more time"</div>)}
          </>
        )}
      </>
    );
  }
}
