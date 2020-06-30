import React from 'react';
import { useFela } from 'react-fela';
import { useRecoilState } from 'recoil';
import { appState } from '../../containers/App/atom';
import { input } from '../../containers/SignIn/styles';

const style = () => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  textTransform: 'uppercase',
  ':focus': {
    outline: 'none',
    border: '1px solid #FD4300',
  },
});

const ButtonLang = React.memo(() => {
  const { css } = useFela();
  const [{ locale }, setState] = useRecoilState(appState);

  return (
    <button
      className={css(style, input)}
      type="button"
      onClick={() =>
        setState(currVal => ({
          ...currVal,
          locale: currVal.locale === 'en' ? 'vi' : 'en',
        }))
      }
    >
      {locale === 'en' ? 'vi' : 'en'}
    </button>
  );
});

export default ButtonLang;
