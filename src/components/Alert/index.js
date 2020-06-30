import { createComponentWithProxy } from 'react-fela';

const Alert = createComponentWithProxy(
  ({ textColor, textCenter }) => ({
    fontSize: '11px',
    color: textColor || '#FD4300',
    textAlign: textCenter ? 'center' : 'left',
  }),
  'p'
);

export default Alert;
