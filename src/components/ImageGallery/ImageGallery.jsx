import PropTypes from 'prop-types';
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
      this.setState({ images: [], page: 1, loadMore: false }, () => {
        this.getImages();
      });
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.getImages();
    }
  }

  getImages = () => {
    this.setState({ loading: true });
    fetchImages(this.props.searchQuery, this.state.page)
      .then(images => {
        const hasMoreImages = images.hits.length > 0;
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          loadMore: hasMoreImages,
        }));
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
    const { error, images, loading, loadMore } = this.state;
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
        {loading && <Loader />}
        {!loading && images.length !== 0 && loadMore && (
          <LoadMoreBtn onClick={this.handleLoadMore} />
        )}
      </>
    );
  }
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
