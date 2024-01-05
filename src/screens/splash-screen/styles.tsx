import {StyleSheet} from 'react-native';
import {colors} from 'src/config/colors';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from 'src/config/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  truckImage: {
    height: 200 * heightRef,
    width: 0.9 * fullWidth,
    marginBottom: 10 * heightRef,
  },
  heading: {
    fontWeight: fontWeights.h700,
    fontSize: fontSizes.f33,
    textAlign: 'center',
    marginHorizontal: '5%',
    color: colors.primary,
    marginBottom: 0.25 * fullHeight,
  },
  // heading2: {
  //   fontWeight: fontWeights.h600,
  //   fontSize: fontSizes.f30,
  //   textAlign: 'center',
  //   marginHorizontal: '10%',
  //   color: '#9FE870',
  // },
});
