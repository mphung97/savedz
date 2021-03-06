import { selector } from 'recoil';
import { textState } from '../atom';

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

// eslint-disable-next-line import/prefer-default-export
export { charCountState };
