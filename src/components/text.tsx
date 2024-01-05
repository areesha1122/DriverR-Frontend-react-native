/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text as RNText, TextProps, TouchableOpacity} from 'react-native';
import {translation} from 'src/config/translation';
import store from 'src/redux/store';

interface IText {
  onPress?: () => void;
  children: string | any;
  language: any;
  style?: any;
  rest?: TextProps;
}

const Text = ({
  onPress,
  children = '',
  language = store.getState().auth?.language,
  ...rest
}: IText) => {
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <RNText {...rest}>
        {language == 'Romanian' ? translation[children] || children : children}
      </RNText>
    </TouchableOpacity>
  );
};

export default Text;
