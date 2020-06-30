import React, { useState } from 'react';
import Modal from './Modal';

// Renders a modal to the modal root and handles the visibility state
// of this modal.
//
// NOTE: Each modal you want to render should use a separate hook!!!
// Otherwise your modals will share their visibility state which might lead
// to overlapping and unclosable elements.
const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  // eslint-disable-next-line react/prop-types
  const RenderModal = ({ children }) => (
    <>{isVisible && <Modal closeModal={hide}>{children}</Modal>}</>
  );

  return {
    show,
    hide,
    RenderModal,
  };
};

export default useModal;
