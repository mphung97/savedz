import PropTypes from 'prop-types';
import React from 'react';
import { createComponentWithProxy } from 'react-fela';
import { useCopyToClipboard } from '../../utils';
import { Col } from '../Grid';
import { Copy, Delete, Mark } from '../Icons';
import LazyImage from '../LazyImage';

const IconButton = createComponentWithProxy(
  {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    backgroundColor: '#fff',
    margin: '2px',
    boxShadow:
      '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    ':focus': {
      outline: 'none',
      backgroundColor: '#e8e8e8',
    },
    ':hover': {
      backgroundColor: '#f2f2f2',
    },
  },
  'button'
);
const Wrapper = createComponentWithProxy(
  {
    margin: '5px',
    padding: '15px 10px',
    position: 'relative',
  },
  'div'
);
const Title = createComponentWithProxy(
  {
    display: 'block',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  'a'
);
const Desc = createComponentWithProxy(
  {
    color: '#8E8E8E',
    fontSize: '14px',
    overflow: 'hidden',
  },
  'p'
);

function linkPropsAreEqual(prevLink, nextLink) {
  return prevLink.id === nextLink.id;
}

const LinkItem = React.memo(
  ({ id, image, domain, url, title, description, height }) => {
    const [copied, copy] = useCopyToClipboard(url);
    return (
      <Col key={id}>
        <Wrapper>
          <div
            style={{
              position: 'absolute',
              zIndex: 1030,
            }}
          >
            <IconButton type="button" onClick={copy}>
              {copied ? <Mark /> : <Copy />}
            </IconButton>
            <IconButton type="button">
              <Delete />
            </IconButton>
          </div>
          <LazyImage image={image} domain={domain} height={height} />
          <Title href={url} rel="noreferrer" target="_blank">
            {title}
          </Title>
          <Desc>{description}</Desc>
        </Wrapper>
      </Col>
    );
  },
  linkPropsAreEqual
);

LinkItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default LinkItem;
