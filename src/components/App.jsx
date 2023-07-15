import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { Audio } from 'react-loader-spinner';

const API_KEY = '37132472-47d9b0efe4089b759aaed266f';
const BASE_URL = 'https://pixabay.com/api/';

export default class App extends Component {
  state = {
    searchText: '',
    images: [],
    page: 1,
    isLoading: false,
    per_page: 12,
    totalHits: null
  };

  grabImages = (page = 1, prevImages = []) => {
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
      });
  };

  handleChange = event => {
    this.setState({ searchText: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    if (this.state.searchText.length >= 3) {
      this.grabImages();
    } else {
      this.setState({ images: [] });
    }
  };

  handleLoadMore = () => {
    this.setState({ isLoading: true });

    let newPage = this.state.page + 1;

    this.setState({ page: newPage });
    this.grabImages(newPage, this.state.images);
  };

  render() {
    const allImages = this.state.totalHits
    return (
      <div>
        <header>
          <form onSubmit={this.handleSubmit}>
            <button type="submit">
              <span>Search</span>
            </button>

            <input
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleChange}
              value={this.state.searchText}
            />
          </form>
        </header>
        {this.state.isLoading && <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />}
        
        <ImageGallery images={this.state.images} />
        {this.state.images.length !== allImages && <button onClick={this.handleLoadMore}>Load More</button>}
      </div>
    );
  }
}
