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
  },
  truckImage: {
    height: 230 * heightRef,
    width: 0.9 * fullWidth,
    marginBottom: 10 * heightRef,
  },
  heading: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f28,
    textAlign: 'center',
    marginHorizontal: '15%',
    color: colors.white,
    marginBottom: 10,
  },
  heading2: {
    fontWeight: fontWeights.h500,
    fontSize: fontSizes.f16,
    textAlign: 'center',
    marginHorizontal: '15%',
    color: colors.white,
    marginBottom: 0.3 * fullWidth,
  },

  truckImage2: {
    height: 200 * heightRef,
    width: 0.9 * fullWidth,
    marginBottom: 10 * heightRef,
  },
  heading3: {
    fontWeight: fontWeights.h700,
    fontSize: fontSizes.f33,
    textAlign: 'center',
    marginHorizontal: '5%',
    color: colors.primary,
    marginBottom: 0.25 * fullHeight,
  },
});
