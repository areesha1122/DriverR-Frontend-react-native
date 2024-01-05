import React, {FC} from 'react';
import {ActivityIndicator, View, Image, Pressable} from 'react-native';
import Text from './text';
import Icon from 'react-native-dynamic-vector-icons';
import {fullWidth} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import store from 'src/redux/store';

export enum Alignments {
  center = 'center',
  flex_end = 'flex-end',
  flex_start = 'flex-start',
}

interface IButton {
  buttonHeight?: number; ///Defines button height.
  buttonWidth?: number; ///Defines button width.
  buttonColor?: string; ///Color of button which is by default theme color of app.
  buttonText?: string; ///Title text of the button.
  buttonCorners?: number; ///Corners of button.
  titleColor?: string; ///Defines color of button title.
  titleFontStyle?: string; ///Defines text style of button title.
  titleFontSize?: number; ///Font size of button.
  isLoading?: boolean; ///false state show button while true state show activity indicator (loading sign) on button.
  isIcon?: boolean; ///Show icon instead of title.
  iconType?: any; /// Icon type can be accessed from "https://oblador.github.io/react-native-vector-icons/".
  iconName?: string; /// Icon name can be accessed from "https://oblador.github.io/react-native-vector-icons/".
  iconSize?: number; /// Icon size on button.
  iconColor?: string; /// Color of button icon.
  onPress: () => void;
  marginRight?: number;
  loaderColor?: string;
  imgHeight?: number;
  imgWidth?: number;
  language?: any;
  borderWidth?: number;
  borderColor?: string; ///Defines the border color of button.
  isImage?: boolean; ///Defines if button includes the image.
  imgSource?: any; ///Defines the uri of button image.
  buttonstyle?: any; ///Add further more styling of button like paddings and margins.
  isButtonText?: boolean; ///Defines button with icons include text.
  textstyle?: any; /// Add further more styling of button title or button icon like paddings and margins.
  disable?: boolean; ///To disable touchable opacity of button
  alignItems?: Alignments; ///Defines whether content vertically (button title or button icon) should be in on left(flex-start), center(center) or right(flex-end)
  justifyContent?: Alignments; ///Defines whether content vertically (button title or button icon) should be in on top(flex-start), center(center) or bottom(flex-end)
  buttonPosition?: Alignments; ///Defines the position of button whether its center, flex-start(left most), flex-end(right most)
}

const Button: FC<IButton> = ({
  buttonHeight = 60.5, ///Defines button height.
  buttonWidth = fullWidth / 1.5, ///Defines button width.
  buttonColor = colors.black, ///Color of button which is by default theme color of app.
  buttonText = 'Click me', ///Title text of the button.
  buttonCorners = 10, ///Corners of button.
  titleColor = colors.white, ///Defines color of button title.
  titleFontStyle = 'bold', ///Defines text style of button title.
  titleFontSize = 15, ///Font size of button.
  isLoading = false, ///false state show button while true state show activity indicator (loading sign) on button.
  isIcon = false, ///Show icon instead of title.
  iconType = 'AntDesign', /// Icon type can be accessed from "https://oblador.github.io/react-native-vector-icons/".
  iconName = 'github', /// Icon name can be accessed from "https://oblador.github.io/react-native-vector-icons/".
  iconSize = 30, /// Icon size on button.
  iconColor = colors.black, /// Color of button icon.
  onPress,
  marginRight = 0,
  loaderColor = colors.white,
  imgHeight = 28,
  imgWidth = 28,
  borderWidth = 0.5,
  language = store.getState().auth?.language,
  borderColor = colors.white, ///Defines the border color of button.
  isImage = false, ///Defines if button includes the image.
  imgSource, ///Defines the uri of button image.
  buttonstyle, ///Add further more styling of button like paddings and margins.
  isButtonText = true, ///Defines button with icons include text.
  textstyle, /// Add further more styling of button title or button icon like paddings and margins.
  disable = false, ///To disable touchable opacity of button
  alignItems = Alignments.center, ///Defines whether content vertically (button title or button icon) should be in on left(flex-start), center(center) or right(flex-end)
  justifyContent = Alignments.center, ///Defines whether content vertically (button title or button icon) should be in on top(flex-start), center(center) or bottom(flex-end)
  buttonPosition = Alignments.center, ///Defines the position of button whether its center, flex-start(left most), flex-end(right most)
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disable}
      style={{
        height: buttonHeight,
        width: buttonWidth,
        backgroundColor: buttonColor,
        alignSelf: buttonPosition,
        borderRadius: buttonCorners,
        borderColor: borderColor,
        borderWidth: borderWidth,
        justifyContent,
        alignItems,
        ...buttonstyle,
      }}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="small" color={loaderColor} />
      ) : isIcon && !isImage ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={iconName}
            type={iconType}
            size={iconSize}
            color={iconColor}
            style={{alignSelf: 'center'}}
          />
          {isButtonText ? (
            <Text
              language={language}
              style={{
                color: titleColor,
                fontSize: titleFontSize,
                fontWeight: titleFontStyle,
                marginLeft: 4,
              }}
              {...{...textstyle}}>
              {buttonText}
            </Text>
          ) : null}
        </View>
      ) : !isIcon && isImage ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={imgSource}
            style={{height: imgHeight, width: imgWidth}}
          />
          {isButtonText ? (
            <Text
              language={language}
              style={{
                color: titleColor,
                fontSize: titleFontSize,
                fontWeight: titleFontStyle,
                marginLeft: 4,
              }}
              {...{...textstyle}}>
              {buttonText}
            </Text>
          ) : null}
        </View>
      ) : (
        <Text
          language={language}
          style={{
            color: titleColor,
            fontSize: titleFontSize,
            fontWeight: titleFontStyle,
            marginRight: marginRight,
          }}
          {...{...textstyle}}>
          {buttonText}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;

// Customizable Button Component to create all type of buttons
