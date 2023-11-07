export {};

//@ts-ignore
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

//base of logic founded in node_modules/react-native-safe-area-context/jest/mock.js
jest.mock('react-native-safe-area-context', () => ({
  ...mockSafeAreaContext,
  useSafeAreaInsets: jest.fn(mockSafeAreaContext.useSafeAreaInsets),
}));

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});
