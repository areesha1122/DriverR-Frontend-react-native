import {Dimensions} from 'react-native';

const fullHeight = Dimensions.get('window').height;
const heightRef = fullHeight / 812;
const fontRef = fullHeight / 812;
const fullWidth = Dimensions.get('window').width;
const widthRef = fullWidth / 375;
export {fullWidth, fullHeight, heightRef, widthRef, fontRef};
