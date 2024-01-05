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
  imagea: {
    height: 17 * heightRef,
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
    borderRadius: 10 * heightRef,
  },
  image3a: {
    height: 90 * heightRef,
    width: 150 * widthRef,
    backgroundColor: colors.background,
  },
  image4: {
    height: 58 * heightRef,
    width: 58 * widthRef,
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

    marginHorizontal: 10 * widthRef,
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
    backgroundColor: colors.grey100,
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
  searchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '93%',
    alignItems: 'center',
    marginTop: 10 * heightRef,
  },
  searchView2: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
    width: 0.73 * fullWidth,
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
  companyCard: {
    height: 120 * heightRef,
    width: 125 * heightRef,
    backgroundColor: '#6772CD',
    marginLeft: 15 * widthRef,
    borderRadius: 5 * heightRef,
    alignItems: 'center',
  },
  jobCard: {
    height: 90 * heightRef,
    width: '93%',
    backgroundColor: colors.background,
    alignSelf: 'center',
    borderRadius: 5 * heightRef,
    // alignItems: 'center',
    marginBottom: 5 * heightRef,
    marginTop: 8 * heightRef,
  },
  texta: {
    fontSize: fontSizes.f11,
    fontWeight: fontWeights.h400,
    color: '#9CA3AF',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 5 * heightRef,
    textAlign: 'left',

    width: '90%',
  },
  textb: {
    fontSize: fontSizes.f11,
    fontWeight: fontWeights.h400,
    color: '#4B5563',
    alignSelf: 'flex-start',
    marginHorizontal: '5%',
    marginBottom: 15 * heightRef,

    textAlign: 'left',
  },

  backButton: {
    marginBottom: 20 * heightRef,

    marginTop: 10 * heightRef,
  },
  text9: {
    alignSelf: 'center',
    fontSize: fontSizes.f20,
    fontWeight: fontWeights.h500,

    color: colors.black,
  },
  text10: {
    marginLeft: 10 * widthRef,
    fontSize: fontSizes.f16,
    fontWeight: fontWeights.h500,
    marginTop: 20 * heightRef,
    marginBottom: 0 * heightRef,

    color: colors.black,
  },
});
