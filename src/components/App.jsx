import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import SearchBar from './Searchbar/SearchBar';

export default class App extends Component {
  state = {
    searchText: '',
    isLoading: false,
  };

  handleChange = searchText => {
    this.setState({ searchText });
  };


  render() {
    return (
      <>
        <GlobalStyle />
        <SearchBar onSubmit={this.handleChange} />
      </>
    );
  }
}
