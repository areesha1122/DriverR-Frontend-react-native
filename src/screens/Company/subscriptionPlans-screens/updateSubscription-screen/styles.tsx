import {Platform, StyleSheet} from 'react-native';
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
    height: 0 * heightRef,
    width: 23 * widthRef,
  },
  image2: {
    marginTop: 25 * heightRef,
    height: 33 * heightRef,
    width: 33 * widthRef,
  },
  image3: {
    height: 40 * heightRef,
    width: 40 * widthRef,
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
    marginTop: 25 * heightRef,
    textAlign: 'left',
    width: '93%',
  },
  text4: {
    color: colors.background,
    fontSize: fontSizes.f12,
    fontWeight: fontWeights.h600,
    marginTop: 15 * heightRef,
  },
  text5: {
    color: '#6B7280',
    fontSize: fontSizes.f12,
    fontWeight: fontWeights.h400,
    marginTop: 10 * heightRef,
    width: '100%',
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
    maxWidth: 78 * widthRef,
    borderRadius: 2,
  },
  text8: {
    color: '#9CA3AF',
    fontSize: fontSizes.f10,
    fontWeight: fontWeights.h400,
    position: 'absolute',
    left: 10 * widthRef,
    bottom: 5 * heightRef,
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
  input: {
    height: 40,
    width: 0.3 * fullWidth,
    borderRadius: 10 * heightRef,
    padding: 10,
    backgroundColor: '#F4F4F4',
    marginLeft: 20 * widthRef,
    // top: 3 * heightRef,
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
    height: 130 * heightRef,
    width: '93%',
    backgroundColor: colors.background,
    alignSelf: 'center',
    borderRadius: 5 * heightRef,
    // alignItems: 'center',
    marginBottom: 8 * heightRef,

    marginTop: 8 * heightRef,
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
  bottomView: {
    bottom: Platform.OS == 'ios' ? 0 : 20 * heightRef,
    marginBottom: Platform.OS == 'ios' ? 30 : 10 * heightRef,
  },
  text10: {
    color: colors.grey250,
    fontSize: fontSizes.f16,
    fontWeight: fontWeights.h600,
    textAlign: 'center',
    width: '93%',
    // marginBottom: 5 * heightRef,
  },
  image6: {
    height: 100 * heightRef,
    width: 100 * heightRef,
    marginBottom: 20 * heightRef,
  },

  texta: {
    fontSize: fontSizes.f11,
    fontWeight: fontWeights.h400,
    color: '#A1A3A6',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 5 * heightRef,
  },
  textb: {
    fontSize: fontSizes.f11,
    fontWeight: fontWeights.h400,
    color: '#4B5563',
    alignSelf: 'flex-start',
    marginHorizontal: '5%',
    marginBottom: 15 * heightRef,
  },
  textc: {
    color: '#6B7280',
    fontSize: fontSizes.f12,
    fontWeight: fontWeights.h400,
    marginTop: 3 * heightRef,
  },
});