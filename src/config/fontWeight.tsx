import {Platform} from 'react-native';

export const fontWeights: any = {
  h100: Platform.OS == 'android' ? '200' : '100',
  h200: Platform.OS == 'android' ? '300' : '200',
  h300: Platform.OS == 'android' ? '400' : '300',
  h400: Platform.OS == 'android' ? '500' : '400',
  h500: Platform.OS == 'android' ? '600' : '500',
  h600: Platform.OS == 'android' ? '700' : '600',
  h700: Platform.OS == 'android' ? '800' : '700',
  h800: Platform.OS == 'android' ? '900' : '800',
  h900: Platform.OS == 'android' ? '900' : '900',
};
