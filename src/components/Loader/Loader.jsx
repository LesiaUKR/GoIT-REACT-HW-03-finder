import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export const Loader = () => {
        return (
          <BeatLoader
            color="red"
            aria-label="Loading Spinner"
            data-testid="loader"
            visible={'true'}
            height="80"
            width="80"
          />
        );
    }
