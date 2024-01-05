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
  mainView: {
    height: 160 * heightRef,
    width: '100%',
    backgroundColor: '#9CA3AF',
    alignItems: 'center',
  },
  tabsView: {
    flexDirection: 'row',
    width: '93%',
    marginTop: 20 * heightRef,
  },
  image: {
    height: 33 * heightRef,
    width: 19 * widthRef,
  },
  image2: {
    marginTop: 25 * heightRef,
    height: 33 * heightRef,
    width: 33 * widthRef,
  },
  image3: {
    height: 95 * heightRef,
    width: 95 * widthRef,
    position: 'absolute',
    left: 5 * widthRef,
    bottom: -47.5 * widthRef,
    marginLeft: 15 * widthRef,
    borderRadius: 20 * heightRef,
  },
  image4: {
    height: 50 * heightRef,
    width: 50 * widthRef,
    marginLeft: 15 * widthRef,
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
  textActive: {
    color: colors.primary,
    fontSize: fontSizes.f16,
    fontWeight: fontWeights.h400,
    marginTop: 3 * heightRef,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  textInactive: {
    color: colors.grey250,
    fontSize: fontSizes.f16,
    fontWeight: fontWeights.h400,
    textAlign: 'left',

    alignSelf: 'flex-start',
    marginLeft: 12 * widthRef,
    marginTop: 20 * heightRef,
  },
  activeView: {
    width: '100%',
    height: 2 * heightRef,
    backgroundColor: colors.primary,
  },
  text3: {
    color: colors.grey250,
    fontSize: fontSizes.f18,
    fontWeight: fontWeights.h600,
    marginTop: 62.5 * heightRef,
    textAlign: 'left',
    width: '93%',
  },

  text9: {
    color: colors.grey250,
    fontSize: fontSizes.f18,
    fontWeight: fontWeights.h600,
    marginTop: 15 * heightRef,
    textAlign: 'left',
    width: '93%',
  },

  text4: {
    color: colors.grey350,
    fontSize: fontSizes.f11,
    fontWeight: fontWeights.h400,
    marginTop: 15 * heightRef,
    width: '93%',
  },
  text6: {
    color: colors.grey350,
    fontSize: fontSizes.f11,
    fontWeight: fontWeights.h400,
    marginTop: 5 * heightRef,
    textAlign: 'center',
  },
  text5: {
    color: colors.grey300,
    fontSize: fontSizes.f11,
    fontWeight: fontWeights.h400,
    marginTop: 5 * heightRef,
    width: '93%',
  },
  // text6: {
  //   color: colors.grey250,
  //   fontSize: fontSizes.f16,
  //   fontWeight: fontWeights.h600,
  // },
  text7: {
    color: colors.grey300,
    fontSize: fontSizes.f10,
    fontWeight: fontWeights.h400,
    backgroundColor: colors.grey150,
    marginTop: 5 * heightRef,
    padding: 2,
    paddingHorizontal: 5,
    marginLeft: 15 * widthRef,
    maxWidth: 128 * widthRef,
    borderRadius: 2,
    marginBottom: 10,
  },
  text8: {
    color: colors.grey300,
    fontSize: fontSizes.f10,
    fontWeight: fontWeights.h400,
    position: 'absolute',
    right: 15 * widthRef,
    bottom: 10 * heightRef,
    marginTop: 5 * heightRef,
    padding: 2,
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
  },
  input: {
    height: 40,
    width: 0.77 * fullWidth,
    borderRadius: 10 * heightRef,
    padding: 10,
    backgroundColor: '#F4F4F4',
  },
  companyCard: {
    height: 120 * heightRef,
    width: 125 * heightRef,
    backgroundColor: '#6772CD',
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
  image3a: {
    height: 40 * heightRef,
    width: 40 * widthRef,
    marginLeft: 15 * widthRef,
    borderRadius: 10 * heightRef,
  },
  text5a: {
    color: '#6B7280',
    fontSize: fontSizes.f12,
    fontWeight: fontWeights.h400,
    marginTop: 3 * heightRef,
    maxWidth: 0.7 * fullWidth,
  },

  text6a: {
    color: colors.grey250,
    fontSize: fontSizes.f16,
    fontWeight: fontWeights.h600,
  },
});
