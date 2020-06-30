import { atom } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: 'recoil', // default value (aka initial value)
});

// eslint-disable-next-line import/prefer-default-export
export { textState };
