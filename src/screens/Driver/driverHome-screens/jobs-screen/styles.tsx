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
    height: 19 * heightRef,
    width: 19 * widthRef,
    marginRight: 5 * widthRef,
  },

  image3: {
    height: 50 * heightRef,
    width: 50 * widthRef,
    marginLeft: 15 * widthRef,
  },

  image4: {
    height: 24 * heightRef,
    width: 24 * widthRef,

    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
  },

  image5: {
    height: 100 * heightRef,
    width: 100 * heightRef,
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
    marginTop: 15 * heightRef,
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
    color: colors.grey150,
    fontSize: fontSizes.f11,
    fontWeight: fontWeights.h400,
    marginTop: 3 * heightRef,
  },
  text6: {
    color: colors.grey250,
    fontSize: fontSizes.f16,
    fontWeight: fontWeights.h600,
  },
  text7: {
    color: colors.grey300,
    fontSize: fontSizes.f10,
    fontWeight: fontWeights.h400,
    backgroundColor: colors.grey200,
    marginTop: 5 * heightRef,
    padding: 2,
    width: 50 * widthRef,
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
  },
  input: {
    height: 40,
    width: 0.93 * fullWidth,
    borderRadius: 10 * heightRef,
    padding: 10,
    backgroundColor: '#F4F4F4',
    paddingLeft: 40,
    color: 'black',
  },

  input2: {
    height: 45 * heightRef,
    width: 0.93 * fullWidth,
    borderRadius: 10 * heightRef,
    padding: 10,
    paddingLeft: 40,
    alignSelf: 'center',
    marginTop: 10 * heightRef,
    borderWidth: 0.5,
    borderColor: colors.grey300,
  },

  jobCard: {
    height: 70 * heightRef,
    width: '93%',
    backgroundColor: colors.background,
    alignSelf: 'center',
    borderRadius: 5 * heightRef,
    alignItems: 'center',
    marginBottom: 5 * heightRef,
    flexDirection: 'row',
    marginTop: 10 * heightRef,
  },
  searchCard: {
    height: 20 * heightRef,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5 * heightRef,
    alignItems: 'center',
    marginBottom: 5 * heightRef,
    flexDirection: 'row',
  },
});
