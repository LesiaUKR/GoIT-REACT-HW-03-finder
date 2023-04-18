// import PropTypes from 'prop-types';
import { fetchImages } from '../serviceAPI/ImagesAPI';
import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';
import { LoadMoreBtn } from 'components/LoadMoreBtn/LoadMoreBtn';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;
    if (prevName !== nextName) {
      // console.log(nextName.trim());
      this.setState({ images: [], page: 1 });
      this.getImages();
    }
    if (prevState.page !== this.state.page) {
      this.getImages();
    }
    };
    
  getImages = () => {
    this.setState({ loading: true });
    fetchImages(this.props.searchQuery, this.state.page)
      .then(images => {
        this.setState({ images: [...this.state.images, ...images.hits] });
        console.log(images);
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
      });
    };
    
  handleLoadMore = () => {
    this.setState(prevPage => ({
      page: prevPage.page + 1,
    }));
    };
    
  render() {
    const { error, images, loading } = this.state;
    return (
      <>
        <ImageList>
          {error && <h2>{error.message}</h2>}
          {images.length > 0 &&
            images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  onClick={this.props.onClick}
                />
              );
            })}
        </ImageList>
        {images.length !== 0 && <LoadMoreBtn onClick={this.handleLoadMore} />}
        {loading && <Loader />}
      </>
    );
  }
}
// ImageGallery.propTypes = {
//   onDeleteContact: PropTypes.func,
//   contacts: PropTypes.array,
// };
