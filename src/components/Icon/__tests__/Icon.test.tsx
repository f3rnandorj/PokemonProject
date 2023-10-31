import React from 'react';

import { render, screen, fireEvent } from 'test-utils';

import { Icon, IconName } from '../Icon';

describe('<Icon />', () => {
  test('should call the onPress function when it is pressed', () => {
    const iconName: IconName = 'ArrowDown';

    const mockedOnPress = jest.fn();
    render(<Icon name={iconName} onPress={mockedOnPress} />);

    const iconElement = screen.getByTestId(iconName);
    fireEvent.press(iconElement);

    expect(mockedOnPress).toHaveBeenCalled();
  });
  test('should render icon when is not a button', () => {
    const iconName: IconName = 'ArrowDown';

    render(<Icon name={iconName} />);

    const iconElement = screen.getByTestId(iconName);

    expect(iconElement).toBeTruthy();
  });
});
