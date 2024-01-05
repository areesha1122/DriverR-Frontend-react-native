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
  image: {
    height: 140 * heightRef,
    width: 140 * widthRef,
    alignSelf: 'center',
    marginTop: 20 * heightRef,
  },
  heading: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f22,
    // marginHorizontal: '1%',
    // marginRight: '5%',
    color: colors.black,
    marginBottom: 10 * heightRef,
  },
  text: {
    fontWeight: fontWeights.h600,
    fontSize: fontSizes.f20,
    // marginHorizontal: '1%',
    marginHorizontal: '5%',
    color: colors.black,
    marginVertical: 10 * heightRef,
  },
  text2: {
    fontWeight: fontWeights.h400,
    fontSize: fontSizes.f16,
    // marginHorizontal: '1%',
    marginHorizontal: '5%',
    color: '#3A3A3A',
    marginBottom: 10 * heightRef,
    lineHeight: 25 * heightRef,
  },
  backButton: {
    marginBottom: 20 * heightRef,
    marginHorizontal: '4%',
    marginTop: 10 * heightRef,
  },
});
