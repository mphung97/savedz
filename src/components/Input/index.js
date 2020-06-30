/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { useForm } from 'react-hook-form';
import Alert from '../Alert';

// eslint-disable-next-line react/prop-types
function InputComponent({ onSubmit }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <input
        type="url"
        name="url"
        autoFocus
        ref={register({ required: true })}
        style={{
          width: '100%',
          height: '36px',
          padding: '1rem',
          border: '1px solid #e8e8e8',
          borderRadius: '2px',
        }}
        spellCheck="false"
        placeholder="http://site"
      />
      {errors.url && <Alert>Error</Alert>}
      <input type="submit" hidden />
    </form>
  );
}

export default React.memo(InputComponent);
