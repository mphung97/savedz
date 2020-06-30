/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { useFela } from 'react-fela';

const container = () => ({
  margin: '0 auto',
  width: '100%',
  '@media (min-width: 640px)': {
    maxWidth: '640px',
  },

  '@media (min-width: 768px)': {
    maxWidth: '768px',
  },

  '@media (min-width: 1024px)': {
    maxWidth: '1024px',
  },

  '@media (min-width: 1280px)': {
    maxWidth: '1280px',
  },
});

const row = () => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  alignItems: 'stretch',
  position: 'relative',
});

const col = ({ full }) => ({
  width: full ? '100%' : '50%',
  '@media (min-width: 640px)': {
    width: full ? '100%' : '50%',
  },

  '@media (min-width: 768px)': {
    width: full ? '100%' : '50%',
  },

  '@media (min-width: 1024px)': {
    width: full ? '100%' : '33.333333%',
  },

  '@media (min-width: 1280px)': {
    width: full ? '100%' : '20%',
  },
});

const Container = ({ children, ...props }) => {
  const { css } = useFela();
  return <div className={css(container)}>{children}</div>;
};

const Row = ({ children, ...props }) => {
  const { css } = useFela();
  return <div className={css(row)}>{children}</div>;
};

const Col = ({ children, ...props }) => {
  const { css } = useFela(props);
  return <div className={css(col)}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Col.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Container, Row, Col };
