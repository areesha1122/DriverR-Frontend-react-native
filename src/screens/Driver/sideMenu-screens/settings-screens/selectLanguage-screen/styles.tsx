import {Platform, StyleSheet} from 'react-native';
import {colors} from 'src/config/colors';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
  },
  text: {
    fontWeight: fontWeights.h400,
    fontSize: fontSizes.f16,
    color: colors.black,
    marginLeft: '5%',
  },

  text2: {
    fontWeight: fontWeights.h400,
    fontSize: fontSizes.f16,
    color: colors.background,
    marginLeft: '5%',
  },

  heading: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f22,
    color: colors.black,
    marginBottom: 10 * heightRef,
  },

  backButton: {
    marginBottom: 20 * heightRef,
    marginHorizontal: '4%',
    marginTop: 10 * heightRef,
  },

  mainView: {
    height: 50 * heightRef,
    width: 0.9 * fullWidth,
    alignSelf: 'center',
    backgroundColor: colors.grey100,
    marginTop: 10,
    marginLeft: '5%',
    justifyContent: 'center',
    borderRadius: 10,
  },

  selectedView: {
    height: 48 * heightRef,
    width: 0.9 * fullWidth - 2 * heightRef,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderWidth: 2 * heightRef,
    marginLeft: '5%',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: colors.secondary1,
  },
});
