import React, { Component } from 'react';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { GlobalStyle } from 'components/Globalstyle.js';
import { Layout } from './Layout.js';

export class App extends Component {
  state = {
    searchText: '',
  };

  createSearchText = searchText => {
    this.setState({ searchText });
    console.log({ searchText });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  getLargeImg = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  render() {
    return (
      <Layout>
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.createSearchText} />
        <ImageGallery searchQuery={this.state.searchText} />
      </Layout>
    );
  }
}
