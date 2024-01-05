import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    height: 40 * heightRef,
    width: 23 * widthRef,
  },
  image2: {
    // marginTop: 25 * heightRef,
    height: 60 * heightRef,
    width: 60 * widthRef,
    borderRadius: 30 * heightRef,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  image3: {
    height: 50 * heightRef,
    width: 50 * widthRef,
    marginLeft: 15 * widthRef,
    borderRadius: 10 * heightRef,
  },
  nameOuterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
    alignItems: 'center',
    marginTop: 15 * heightRef,
  },
  text1: {
    color: colors.grey300,
    fontSize: fontSizes.f12,
    fontWeight: fontWeights.h400,
  },
  text2: {
    color: colors.grey250,
    fontSize: fontSizes.f22,
    fontWeight: fontWeights.h600,
    marginTop: 3 * heightRef,
  },
  text3: {
    color: colors.grey250,
    fontSize: fontSizes.f18,
    fontWeight: fontWeights.h600,

    textAlign: 'left',
  },
  text4: {
    color: colors.black,
    fontSize: fontSizes.f12,
    fontWeight: fontWeights.h400,
    marginTop: 5 * heightRef,
  },

  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
    alignItems: 'center',
    marginTop: 10 * heightRef,
  },

  shadow2: {
    shadowColor: colors.grey300,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 100,
    backgroundColor: colors.background,
  },
  shadow3: {
    shadowColor: colors.grey300,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 100,
    backgroundColor: colors.background,
    position: 'absolute',
    right: 20,
    bottom: 30 * heightRef,
  },
  input: {
    height: 40,
    width: 0.7 * fullWidth,
    borderRadius: 10 * heightRef,
    padding: 10,
    backgroundColor: '#F4F4F4',
  },
  companyCard: {
    height: 90 * heightRef,
    width: 70 * heightRef,
    // backgroundColor: '#6772CD',
    marginLeft: 15 * widthRef,
    borderRadius: 5 * heightRef,
    alignItems: 'center',
  },
  jobCard: {
    height: 100 * heightRef,
    width: '93%',
    backgroundColor: colors.background,
    alignSelf: 'center',
    borderRadius: 5 * heightRef,
    // alignItems: 'center',
    marginBottom: 5 * heightRef,

    marginTop: 8 * heightRef,
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
  text7: {
    color: colors.grey300,
    fontSize: fontSizes.f10,
    fontWeight: fontWeights.h400,
    backgroundColor: colors.grey150,
    marginTop: 5 * heightRef,
    padding: 2,
    paddingHorizontal: 5,
    marginLeft: 15 * widthRef,
    maxWidth: 130 * widthRef,
    borderRadius: 2,
  },
  text8: {
    color: colors.grey300,
    fontSize: fontSizes.f10,
    fontWeight: fontWeights.h400,
    position: 'absolute',
    right: 15 * widthRef,
    bottom: 0 * heightRef,
    marginTop: 5 * heightRef,
    padding: 2,
  },
});
