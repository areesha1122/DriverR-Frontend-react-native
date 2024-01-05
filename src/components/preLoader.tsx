import React from 'react';
import ContentLoader, {
  Facebook,
  Instagram,
  Rect,
} from 'react-content-loader/native';
import {View} from 'react-native';
import {fullHeight, fullWidth, heightRef} from 'src/config/screenSize';
import Header from './head';

const FullScreenLoader = () => {
  return (
    <View
      style={{
        height: fullHeight,
        width: fullWidth,
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Header />
      <Facebook
        animate
        width={'95%'}
        style={{marginLeft: 30, marginTop: 30 * heightRef}}
      />
      <Facebook animate width={'95%'} style={{marginLeft: 30}} />
      <Instagram animate width={'95%'} style={{marginLeft: 0}} />
    </View>
  );
};

export default FullScreenLoader;
