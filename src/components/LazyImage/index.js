import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { createComponentWithProxy } from 'react-fela';
import placeholder from './placeholder.png';

const Wrapper = createComponentWithProxy(
  {
    overflow: 'hidden',
    display: 'block',
  },
  'div'
);
const ImageCover = createComponentWithProxy(
  ({ height }) => ({
    height: `${height}px`,
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  }),
  'div'
);
// eslint-disable-next-line react/prop-types
const ImageItem = React.memo(({ src, domain }) => (
  <img
    src={src}
    alt={domain}
    style={{ height: '100%', minWidth: '100%' }}
  />
));

function LazyImage({ image, domain, height }) {
  const [loadImg, setLoadImg] = useState({
    src: placeholder,
    loaded: false,
  });

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setLoadImg({ src: img.src, loaded: true });
  }, [image]);

  return (
    <Wrapper>
      <ImageCover height={height}>
        <ImageItem src={loadImg.src} alt={domain} />
      </ImageCover>
    </Wrapper>
  );
}

LazyImage.propTypes = {
  image: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default React.memo(LazyImage, () => false);
