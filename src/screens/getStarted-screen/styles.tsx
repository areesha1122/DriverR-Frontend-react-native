import {StyleSheet} from 'react-native';
import {colors} from 'src/config/colors';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {fullWidth, heightRef, widthRef} from 'src/config/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  truckImage: {
    height: 280 * heightRef,
    width: 0.95 * fullWidth,
    marginBottom: 20 * heightRef,
  },
  heading: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f27,
    textAlign: 'center',
    marginHorizontal: '15%',
    color: colors.black,
  },
  heading2: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f28,
    textAlign: 'center',
    marginHorizontal: '10%',
    color: '#9FE870',
  },
});
