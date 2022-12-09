import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function InputWithIcon({
  icon, type, name, placeholder, value, formHandler, minLength, maxLength,
}) {
  const refFocus = useRef();

  const inputFocus = () => refFocus.current.focus();

  return (
    <label htmlFor={name} className="flex flex-row-reverse justify-center items-center mt-5 w-full h-10 rounded-md overflow-hidden">
      <input
        className="w-full h-full outline-none pr-4 text-sm bg-primary/10"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={formHandler}
        minLength={minLength}
        maxLength={maxLength}
        ref={refFocus}
        required
      />

      <div className="h-full px-4 grid place-items-center bg-primary/10" onClick={inputFocus} aria-hidden>
        <img src={icon} alt={`${name} icons`} className="w-7" onClick={inputFocus} aria-hidden />
      </div>
    </label>
  );
}

InputWithIcon.propTypes = {
  icon: PropTypes.oneOf(['/asset/email.avif', '/asset/password.avif', '/asset/name.avif']).isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  formHandler: PropTypes.func.isRequired,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
};

InputWithIcon.defaultProps = {
  minLength: '',
  maxLength: '',
};

export default InputWithIcon;
