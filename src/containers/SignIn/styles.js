export const input = () => ({
  height: '36px',
  borderRadius: '2px',
  border: 'none',
  padding: '8px 16px',
  marginBottom: '10px',
});

export const field = () => ({
  backgroundColor: '#F2F2F2',
  width: '100%',
  ':focus': {
    outline: 'none',
    border: '1px solid #FD4300',
  },
});

export const btn = () => ({
  backgroundColor: '#FD4300',
  color: '#ffffff',
  width: 'auto',
  textAlign: 'left',
  ':disabled': {
    backgroundColor: '#8E8E8E',
  },
});
