import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  FormField,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSearchQuery = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.error('Введіть назву картинки');
    }
    this.props.onSubmit(this.state.query);
    // this.setState({ query: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <BiSearchAlt size="24" />
          </SearchButton>
          <FormField>
            <SearchInput
              autoComplete="off"
              name="query"
              type="text"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleSearchQuery}
              value={this.state.query}
            />
          </FormField>
        </Form>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
