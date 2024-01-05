import {Platform, StyleSheet} from 'react-native';
import {colors} from 'src/config/colors';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    height: 120 * heightRef,
    width: 120 * heightRef,
    alignSelf: 'center',
    marginTop: 120 * heightRef,
    borderRadius: 60 * heightRef,
  },
  image2: {
    height: 18 * heightRef,
    width: 18 * widthRef,
    tintColor: colors.primary,
  },
  image3: {
    height: 22 * heightRef,
    width: 22 * widthRef,
    tintColor: colors.primary,
  },
  heading: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f22,

    color: colors.black,
    marginBottom: 10 * heightRef,
  },
  text3: {
    fontWeight: fontWeights.h400,
    fontSize: fontSizes.f14,
    color: colors.grey300,
    marginTop: 3,
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
  },
  mainView: {
    height: 65 * heightRef,
    width: 0.95 * fullWidth,

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

  backButton: {
    marginBottom: 20 * heightRef,
    marginHorizontal: '4%',
    marginTop: 10 * heightRef,
  },
  iconView: {
    height: 50 * heightRef,
    width: 50 * heightRef,
    backgroundColor: colors.grey100,
    borderRadius: 25 * heightRef,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputContainer: {
    justifyContent: 'center',
    marginLeft: '5%',
    borderRadius: 5 * heightRef,
    // marginTop: 50 * heightRef,
    marginBottom: 20 * heightRef,
    width: '90%',
    height: 55 * heightRef,
    borderWidth: 0.75 * heightRef,
    borderColor: colors.secondary,
    padding: 1,
  },
  textInputText: {fontSize: 17 * fontRef, color: 'black'},
  textInputContainerAndroid: {
    justifyContent: 'center',
    borderRadius: 5 * heightRef,
    // marginTop: 50 * heightRef,
    marginBottom: 20 * heightRef,
    width: '95%',
    height: 55 * heightRef,
    borderWidth: 1 * heightRef,
    borderColor: '#BDBDBD',
    padding: 1,
  },
  textInputTextAndroid: {
    fontSize: 17 * fontRef,
    color: 'black',
    // backgroundColor: '#B3261E',
    position: 'absolute',
    top: 2,
    left: 65 * widthRef,
    width: 150 * widthRef,
  },
  flagButton: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'center',
    paddingTop: 5,
  },
  termText: {
    fontWeight: fontWeights.h500,
    fontSize: fontSizes.f12,
    color: colors.black,
    textAlign: 'center',
    alignSelf: 'center',
    width: 0.8 * fullWidth,
    marginBottom: 10,
  },
  termText2: {
    fontWeight: fontWeights.h500,
    fontSize: fontSizes.f12,
    color: '#1153DA',
    textDecorationLine: 'underline',
  },
  bottomView: {
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 0 : 20 * heightRef,
    left: '5%',
  },

  pageView: {
    height: 5,
    width: fullWidth,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  pageInnerView: {
    height: 5,
    width: fullWidth * 0.43,
    backgroundColor: colors.grey100,
    borderRadius: 5 * heightRef,
  },
  input: {
    width: 0.9 * fullWidth,
    marginLeft: '5%',
    backgroundColor: colors.background,
    marginTop: 20 * heightRef,
  },
  containerBox: {
    borderColor: colors.grey300,
    borderRadius: 3 * heightRef,
    borderWidth: 1,
    height: 50 * heightRef,
    width: 0.9 * fullWidth,
    alignSelf: 'center',
    marginLeft: '5%',
    marginTop: 25 * heightRef,
  },
});
