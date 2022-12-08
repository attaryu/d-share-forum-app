/*
 Test Flow :
  * Searchbar Component test
    - when the button icon is clicked it will trigger component input expansion then automatically
      focus on keyword input
    - the input must have the same value as the keyword entered
    - when the focus is shifted the searchbar will still expand if the keyword input value is
      not empty
    - when focus is shifted will shrink input if keyword input value is empty
    - when the keywords have been defined, the input will be expanded automatically
      first render and has the value of the keyword
*/

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import React from 'react';
import Searchbar from './Searchbar';

jest.mock('next/router', () => require('next-router-mock'));

describe('Searchbar Component test', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('when the button icon is clicked it will trigger component input expansion then automatically focus on keyword input', async () => {
    // arrage
    const { container } = render(<Searchbar />);
    const input = await screen.findByPlaceholderText('Search by category...');
    const button = container.querySelector('button[type=button]');

    // action
    await userEvent.click(button);

    // assert
    expect(input).not.toHaveClass('w-0');
    expect(input).toHaveClass('w-full px-3');
  });

  it('the input must have the same value as the keyword entered', async () => {
    // arrage
    render(<Searchbar />);
    const input = await screen.findByPlaceholderText('Search by category...');

    // action
    await userEvent.type(input, 'something');

    // assert
    expect(input).toHaveValue('something');
  });

  it('when the focus is shifted the searchbar will still expand if the keyword input value is not empty', async () => {
    // arrage
    const { container } = render(<Searchbar />);
    const div = container.querySelector('div');
    const input = await screen.findByPlaceholderText('Search by category...');
    const button = container.querySelector('button');

    // action
    await userEvent.click(button);
    await userEvent.type(input, 'something');
    await userEvent.click(div);

    // assert
    expect(input).not.toHaveFocus();
    expect(input).not.toHaveClass('w-0');
    expect(input).toHaveClass('w-full px-3');
    expect(input.value.length).toBeGreaterThan(0);
  });

  it('when focus is shifted will shrink input if keyword input value is empty', async () => {
    // arrage
    const { container } = render(<Searchbar />);
    const div = container.querySelector('div');
    const input = await screen.findByPlaceholderText('Search by category...');
    const button = container.querySelector('button');

    // action
    await userEvent.click(button);
    await userEvent.click(div);

    // assert
    expect(input).not.toHaveFocus();
    expect(input).toHaveClass('w-0');
    expect(input).not.toHaveClass('w-full px-3');
    expect(input.value.length).toEqual(0);
  });

  it('when keywords have been specified, the input will be expanded automatically on first render and has the value of the keyword', async () => {
    // arrage
    mockRouter.setCurrentUrl('/?category=something');
    render(<Searchbar />);
    const input = await screen.findByPlaceholderText('Search by category...');

    // action

    // assert
    expect(input).not.toHaveClass('w-0');
    expect(input).toHaveClass('w-full px-3');
    expect(input).toHaveValue('something');
  });
});
