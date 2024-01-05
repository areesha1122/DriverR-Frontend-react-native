import {Platform, StyleSheet} from 'react-native';
import {colors} from 'src/config/colors';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  skipView: {
    width: '100%',
    marginRight: 20 * widthRef,
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: fontSizes.f15,
    fontWeight: fontWeights.h500,
    color: colors.background,
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    height: 50 * heightRef,
  },
  headerText: {
    fontSize: 17 * heightRef,
    fontWeight: '600',
    textAlign: 'right',
    color: colors.primary,
  },
  headerText2: {
    fontSize: 17 * heightRef,
    fontWeight: '600',
    textAlign: 'right',
    color: colors.primary,
    marginTop: 0 * heightRef,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  title: {
    color: colors.background,
    fontWeight: Platform.OS == 'android' ? '700' : '600',
    fontSize: 20 * fontRef,
    textAlign: 'center',
    marginVertical: 20 * heightRef,
  },
  paragraphText: {
    color: '#EBF4FE',
    fontSize: 15 * fontRef,
    fontWeight: '400',
    textAlign: 'center',

    width: fullWidth * 0.85,
  },
  swiperView: {
    // flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50 * heightRef,
  },
  swiperIcon: {
    height: 9 * heightRef,
    width: 9 * heightRef,
    marginHorizontal: 9 * widthRef,
    borderRadius: 8 * heightRef,
    tintColor: colors.grey150,
  },
  onBoardingImage: {
    height: 230 * heightRef,
    width: 230 * heightRef,
  },
});
