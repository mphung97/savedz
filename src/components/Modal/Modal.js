/* eslint-disable react/button-has-type */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line react/prop-types
const Modal = React.memo(({ children, closeModal }) => {
  const domEl = document.body;
  const modalRef = useRef(null);

  if (!domEl) return null;

  const onClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target))
      closeModal();
  };

  // This is where the magic happens -> our modal div will be rendered into our 'modal-root' div, no matter where we
  // use this component inside our React tree
  return ReactDOM.createPortal(
    <div
      role="button"
      tabIndex="-1"
      onClick={onClickOutside}
      onKeyPress={() => {}}
      style={{
        background: 'rgba(0,0,0,0.48)',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
      }}
    >
      <div
        ref={modalRef}
        style={{
          marginTop: '25vh',
          position: 'relative',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          backgroundColor: '#fff',
          borderRadius: '2px',
          width: '540px',
          maxWidth: '100%',
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            borderRadius: '50%',
            backgroundColor: '#FD4300',
            width: '24px',
            height: '24px',
          }}
          onClick={closeModal}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.99997 2L6 6M6 6L9.99997 2M6 6L1.99997 10M6 6L9.99997 10"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    domEl
  );
});

export default Modal;
