import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@hooks';

export function useAppSafeArea() {
  const { top, bottom } = useSafeAreaInsets();
  const { spacing } = useAppTheme();

  return {
    top: top + spacing.s40,
    bottom: Math.max(bottom, spacing.s40),
  };
}
