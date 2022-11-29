import React from 'react';
import PropTypes from 'prop-types';

function InputWithIcon({
  icon, type, name, placeholder, value, formHandler, minLength, maxLength,
}) {
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
        required
      />

      <div className="h-full px-4 grid place-items-center bg-primary/10">
        <img src={icon} alt="" className="w-7" />
      </div>
    </label>
  );
}

InputWithIcon.propTypes = {
  icon: PropTypes.string.isRequired,
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
