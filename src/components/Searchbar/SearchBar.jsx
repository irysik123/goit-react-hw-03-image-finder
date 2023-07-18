import { Component } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchFormBtn,
  /* SearchLabel, */
  Input,
} from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';


export default class SearchBar extends Component {
  state = {
    searchText: '',
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchText);

  };

  handleImageChange = (event) => {
    this.setState({searchText: event.target.value})
  }

  render() {
    const { searchText } = this.state;

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
        
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
