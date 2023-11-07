import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { renderHook } from 'test-utils';

import { useAppSafeArea } from '@hooks';
import { theme } from '@theme';

const mockedUseAppSafeArea = jest.mocked(useSafeAreaInsets);

describe('useAppSafeArea', () => {
  test('when the safe area is less than minimum requirement, it returns the minimum requirement', () => {
    const RETURN_TOP = 5;
    mockedUseAppSafeArea.mockImplementationOnce(
      () => ({ top: RETURN_TOP, bottom: 0 } as EdgeInsets),
    );

    const { result } = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(theme.spacing.s40 + RETURN_TOP);
    expect(result.current.bottom).toEqual(0);
  });

  test('when the safe area is greater than minimum requirement, it returns the minimum requirement', () => {
    const RETURN_VALUE = 40;
    mockedUseAppSafeArea.mockImplementationOnce(
      () => ({ top: RETURN_VALUE, bottom: RETURN_VALUE } as EdgeInsets),
    );

    const { result } = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(theme.spacing.s40 + RETURN_VALUE);
    expect(result.current.bottom).toEqual(RETURN_VALUE);
  });
});
