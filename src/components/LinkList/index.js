/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-return */
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'urql';
import { useImmerReducer } from '../../utils';
import Alert from '../Alert';
import { Row } from '../Grid';
import LinkItem from '../Link';

const allLinks = gql`
  query($page: Float!) {
    allLinks(limit: 15, page: $page) {
      totalCount
      hasNextPage
      links {
        description
        id
        domain
        title
        image
        url
      }
    }
  }
`;
const initialState = { fetching: true, error: '', items: [] };
const constant = {
  fetching: 'FETCHING',
  success: 'SUCCESS',
  error: 'ERROR',
};

function reducer(state, action) {
  switch (action.type) {
    case constant.fetching:
      state.fetching = true;
      return;
    case constant.success:
      state.fetching = false;
      state.error = '';
      action.items.forEach(item => {
        const isExist = state.items.some(i => i.id === item.id);
        if (!isExist) {
          state.items.push(item);
        }
      });
      return;
    case constant.error:
      state.fetching = false;
      state.error = action.error;
      return;
    default:
      return;
  }
}

function LinkList() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [result] = useQuery({
    query: allLinks,
    variables: { page },
    fetchPolicy: 'cache-and-network',
  });

  const { fetching, data, error } = result;
  const [height] = useState(110);

  useEffect(() => {
    if (fetching) {
      dispatch({ type: constant.fetching });
    }
    if (data) {
      setHasNextPage(data.allLinks.hasNextPage);
      dispatch({
        type: constant.success,
        items: data.allLinks.links,
      });
    }
    if (error) {
      dispatch({ type: constant.error, error: error.message });
    }
  }, [fetching, data, error, dispatch]);

  return (
    <>
      <Alert>{state.error}</Alert>
      <InfiniteScroll
        dataLength={state.items.length}
        next={() => setPage(p => p + 1)}
        hasMore={hasNextPage}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={(
          <Alert textCenter textColor="#1d1d1d">
            Yay! You have seen it all
          </Alert>
        )}
      >
        <Row>
          {state.items.map(item => (
            <LinkItem key={item.id} height={height} {...item} />
          ))}
        </Row>
      </InfiniteScroll>
    </>
  );
}

export default LinkList;
