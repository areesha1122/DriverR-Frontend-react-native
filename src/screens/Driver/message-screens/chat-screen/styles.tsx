import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {colors} from 'src/config/colors';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {fullWidth, heightRef, widthRef} from 'src/config/screenSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    height: 40 * heightRef,
    width: 23 * widthRef,
  },

  image3: {
    height: 42 * heightRef,
    width: 42 * widthRef,
    marginLeft: 15 * widthRef,
    borderRadius: 25 * heightRef,
  },

  text2: {
    color: colors.grey250,
    fontSize: fontSizes.f22,
    fontWeight: fontWeights.h600,

    marginHorizontal: 10 * widthRef,
  },

  text5: {
    color: '#6B7280',
    fontSize: fontSizes.f12,
    fontWeight: fontWeights.h400,
    marginTop: 3 * heightRef,
  },
  text6: {
    color: colors.grey250,
    fontSize: fontSizes.f14,
    fontWeight: fontWeights.h600,
  },

  text8: {
    color: '#9CA3AF',
    fontSize: fontSizes.f10,
    fontWeight: fontWeights.h400,
    position: 'absolute',
    right: 15 * widthRef,
    top: 8 * heightRef,
    marginTop: 5 * heightRef,
    padding: 2,
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
    alignItems: 'center',
    marginTop: 10 * heightRef,
  },

  shadow: {
    shadowColor: colors.grey300,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    backgroundColor: colors.background,
  },

  input: {
    height: 40,
    width: 0.83 * fullWidth,
    borderRadius: 10 * heightRef,
    padding: 10,
    backgroundColor: '#F4F4F4',
    color: 'black',
  },
  input2: {
    height: 40,
    width: 0.53 * fullWidth,
    borderRadius: 10 * heightRef,
    padding: 10,
    backgroundColor: colors.background,
  },

  msgCard: {
    width: '100%',
    backgroundColor: colors.background,
    alignSelf: 'center',
    borderRadius: 5 * heightRef,

    marginBottom: 5 * heightRef,
    marginTop: 8 * heightRef,
  },
});
