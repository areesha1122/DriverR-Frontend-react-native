import {StyleSheet} from 'react-native';
import {heightRef, widthRef} from 'src/config/screenSize';
import {colors} from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 70 * heightRef,
    alignSelf: 'center',
    backgroundColor: '#F6FAFB',
  },
});

export default styles;
