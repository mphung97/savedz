import React from 'react';
import produce from 'immer';

export function useImmerReducer(reducer, initialState) {
  return React.useReducer(produce(reducer), initialState);
}
