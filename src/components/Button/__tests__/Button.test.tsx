import React from 'react';

import { fireEvent, render, screen } from 'test-utils';

import { Button, ButtonProps } from '../Button';

function renderComponent(props?: Partial<ButtonProps>) {
  render(<Button title="Test" {...props} />);

  const titleElement = screen.queryByText(/test/i);
  const buttonElement = screen.getByTestId('button');
  const loadingElement = screen.queryByTestId('activity-indicator');

  return {
    titleElement,
    buttonElement,
    loadingElement,
  };
}

describe('<Button />', () => {
  test('call the onPress function when it is pressed', () => {
    const mockedOnPress = jest.fn();
    const { titleElement, loadingElement } = renderComponent({
      onPress: mockedOnPress,
    });

    fireEvent.press(titleElement!);

    expect(mockedOnPress).toHaveBeenCalled();
    expect(loadingElement).toBeFalsy();
  });
  test('does not call the onPress function when it is disabled', () => {
    const mockedOnPress = jest.fn();
    const { titleElement } = renderComponent({
      onPress: mockedOnPress,
      disabled: true,
    });

    fireEvent.press(titleElement!);

    expect(mockedOnPress).not.toHaveBeenCalled();
  });
  describe('when button is loading', () => {
    test('shows activity indicator', () => {
      const { loadingElement } = renderComponent({ loading: true });

      expect(loadingElement).toBeTruthy();
    });
    test('hides button title', () => {
      const { titleElement } = renderComponent({ loading: true });

      expect(titleElement).toBeFalsy();
    });
    test('should disabled onPress function', () => {
      const mockedOnPress = jest.fn();
      const { buttonElement } = renderComponent({ loading: true });

      fireEvent.press(buttonElement);

      expect(mockedOnPress).not.toHaveBeenCalled();
    });
  });
});
