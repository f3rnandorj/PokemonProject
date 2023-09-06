import { TouchableOpacityBoxProps } from '@components';
import { ThemeColors } from '@theme';

import { ButtonPreset } from './Button';

interface ButtonUI {
  container: TouchableOpacityBoxProps;
  content: ThemeColors;
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI;
    disabled: ButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'secondary',
      },
      content: 'backgroundContrastLight',
    },
    disabled: {
      container: {
        backgroundColor: 'grayLight',
      },
      content: 'gray',
    },
  },
};
