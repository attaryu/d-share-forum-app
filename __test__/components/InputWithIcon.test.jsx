/*
 Test Flow :
  * InputWithIcon Component test
    - input component value must be the same as typed
    - the number of input component characters must be less and more than the specified
      minimum/maximum limit
    - when pressing icon should trigger to focus to component input
*/

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropTypes from 'prop-types';
import React from 'react';
import useSimpleState from '../../hooks/useSimpleState';
import InputWithIcon from '../../components/InputWithIcon';

const icon = '/asset/email.avif';
const type = 'text';
const name = 'inputForSomething';
const placeHolder = 'Input for something...';

function TestComponent({ maxCharacter, minCharacter }) {
  const [state, handler] = useSimpleState('');

  return (
    <InputWithIcon
      icon={icon}
      type={type}
      name={name}
      placeholder={placeHolder}
      value={state}
      formHandler={handler}
      maxLength={maxCharacter}
      minLength={minCharacter}
    />
  );
}

TestComponent.propTypes = {
  maxCharacter: PropTypes.string,
  minCharacter: PropTypes.string,
};

TestComponent.defaultProps = {
  maxCharacter: undefined,
  minCharacter: undefined,
};

describe('InputWithIcon Component test', () => {
  it('input component value must be the same as typed', async () => {
    // arrage
    render(<TestComponent />);
    const inputElement = await screen.findByPlaceholderText(placeHolder);

    // action
    await userEvent.type(inputElement, 'i typed something');

    // assert
    expect(inputElement).toHaveValue('i typed something');
  });

  it('the number of input component characters must be less and more than the specified minimum/maximum limit', async () => {
    // arrage
    render(<TestComponent maxCharacter="20" minCharacter="10" />);
    const inputElement = await screen.findByPlaceholderText(placeHolder);

    // action
    await userEvent.type(inputElement, 'i typed something');

    // assert
    expect(inputElement.value.length).toBeLessThanOrEqual(20);
    expect(inputElement.value.length).toBeGreaterThanOrEqual(10);
  });

  it('when pressing icon should trigger to focus to component input', async () => {
    // arrage
    render(<TestComponent />);
    const inputElement = await screen.findByPlaceholderText(placeHolder);
    const imgElement = await screen.findByAltText(`${name} icons`);

    // action
    await userEvent.click(imgElement);

    // assert
    expect(inputElement).toHaveFocus();
  });
});
