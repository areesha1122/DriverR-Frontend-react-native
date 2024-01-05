import {StyleSheet} from 'react-native';
import {colors} from 'src/config/colors';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {fullWidth, heightRef, widthRef} from 'src/config/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
  },
  image: {
    height: 18 * heightRef,
    width: 18 * widthRef,
    tintColor: colors.primary,
  },
  heading: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f28,
    marginHorizontal: '5%',
    marginRight: '15%',
    color: colors.black,
    marginBottom: 20 * heightRef,
  },
  text1: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f16,
    color: colors.black,
  },
  text2: {
    fontWeight: fontWeights.h400,
    fontSize: fontSizes.f12,
    color: colors.grey300,
    marginTop: 3 * heightRef,
    width: 0.6 * fullWidth,
  },
  backButton: {
    marginBottom: 20 * heightRef,
    marginHorizontal: '4%',
    marginTop: 10 * heightRef,
  },
  iconView: {
    height: 40 * heightRef,
    width: 40 * heightRef,
    backgroundColor: colors.grey100,
    borderRadius: 25 * heightRef,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    height: 60 * heightRef,
    width: 0.9 * fullWidth,
    marginLeft: '5%',
    // backgroundColor: colors.red,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '2.5%',
    borderColor: colors.grey200,
    borderRadius: 5 * heightRef,
    borderWidth: 0.5,
    marginTop: 20 * heightRef,
  },
});
