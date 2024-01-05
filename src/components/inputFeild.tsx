import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, StyleSheet, TextInput} from 'react-native';
import Text from './text';
import Icon from 'react-native-dynamic-vector-icons';
import {colors} from 'src/config/colors';
import {fontWeights} from 'src/config/fontWeight';
import {heightRef, widthRef} from 'src/config/screenSize';
import {IconType} from 'react-native-dynamic-vector-icons';

interface IInputFeild {
  title?: string;
  value: string;
  onChangeText: (text: any) => void;
  style?: any;
  message?: string;
  placeholder?: string;
  inner?: any;
  textFieldStyle?: any;
  borderRadius?: number;
  titleColor?: string;
  titleSize?: number;
  fontWeight?: any;
  borderColor?: string;
  multiline?: boolean;
  backgroundColor?: string;
  marginBottom?: number;
  password?: boolean;
  emailValidation?: boolean;
  returnKeyType?: any;
  keyboardType?: keyboardTypes;
  autoFocus?: boolean;
}

export enum keyboardTypes {
  ascii_capable = 'ascii-capable',
  decimal_pad = 'decimal-pad',
  default = 'default',
  email_address = 'email-address',
  name_phone_pad = 'name-phone-pad',
  number_pad = 'number-pad',
  numbers_and_punctuation = 'numbers-and-punctuation',
  numeric = 'numeric',
  phone_pad = 'phone-pad',
  twitter = 'twitter',
  url = 'url',
  visible_password = 'visible-password',
  web_search = 'web-search',
}

const InputFeild: FC<IInputFeild> = ({
  title = '',
  value = '',
  onChangeText,
  style,
  message = '',
  placeholder = 'Enter Text',
  inner,
  textFieldStyle,
  borderRadius,
  borderColor,
  multiline,
  backgroundColor,
  password,
  emailValidation,
  returnKeyType,
  keyboardType,
  autoFocus = false,
}) => {
  const inputRef: any = React.useRef();
  const [showPassword, setShowPassword] = React.useState(true);
  var reg;
  const [showTick, setShowTick] = React.useState(false);

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.textView,
          {minHeight: multiline ? 150 * heightRef : 57 * heightRef},
        ]}>
        <TextInput
          ref={inputRef}
          autoFocus={autoFocus}
          style={[
            styles.textField,
            {
              height: multiline ? 100 * heightRef : 50 * heightRef,
              textAlignVertical: multiline ? 'top' : 'center',
              paddingVertical: multiline ? 20 * heightRef : 0,
            },
            {
              borderColor: message ? colors.error : borderColor || 'black',
              borderRadius: borderRadius || 18 * heightRef,
              borderWidth: 2,
              backgroundColor: backgroundColor || colors.white,
              color: '#848D9F',
              height: 20,
            },
            textFieldStyle,
          ]}
          {...{
            value,
            onChangeText: Text => {
              onChangeText(Text);
              if (emailValidation == true) {
                if (Text === '') {
                  setShowTick(false);
                } else {
                  (reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
                    reg.test(Text) == true
                      ? setShowTick(true)
                      : setShowTick(false);
                }
              }
            },
            placeholder,
          }}
          enablesReturnKeyAutomatically
          returnKeyType={returnKeyType}
          secureTextEntry={password == true ? showPassword : false}
          numberOfLines={multiline !== undefined ? 5 : 1}
          multiline={multiline || false}
          placeholderTextColor="#848D9F"
          keyboardType={keyboardType}
        />

        {password === true ? (
          <TouchableOpacity
            onPress={() => setShowPassword(state => !state)}
            style={{
              position: 'absolute',
              right: 20 * widthRef,
            }}>
            <Icon
              type={IconType.Entypo}
              name={!showPassword ? 'eye' : 'eye-with-line'}
              size={18 * heightRef}
              color={colors.black}
            />
          </TouchableOpacity>
        ) : null}
        {emailValidation === true ? (
          <TouchableOpacity
            disabled={true}
            style={{
              position: 'absolute',
              right: 20 * widthRef,
            }}>
            <Icon
              type={IconType.Entypo}
              name={showTick ? 'check' : ''}
              size={18 * heightRef}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text
        style={{
          fontSize: 12 * heightRef,

          paddingVertical: 5,
          paddingHorizontal: 10,
          color: colors.error,
          fontWeight: fontWeights.h300,
        }}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
    width: '100%',
    backgroundColor: 'white',
    zIndex: -1,
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textField: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 20 * widthRef,
    color: 'black',
    flex: 1,
    fontSize: 18 * heightRef,
  },
});

export default InputFeild;
