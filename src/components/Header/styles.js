import { createComponentWithProxy } from 'react-fela';

export const HeaderComponent = createComponentWithProxy(
  {
    display: 'flex',
    height: '61px',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #F3F3F3',
  },
  'div'
);

export const LogoWrapper = createComponentWithProxy(
  { width: '100px' },
  'div'
);

export const ButtonGroup = createComponentWithProxy(
  { display: 'flex' },
  'div'
);

export const Button = createComponentWithProxy(
  {
    marginBottom: 0,
    marginLeft: '5px',
    textTransform: 'uppercase',
    padding: '5px',
    width: '30px',
    height: '30px',
  },
  'button'
);
