import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Image, Platform, SafeAreaView, Text as Text1, View} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import DatePickerModal from 'src/components/datePicker';
import Text from 'src/components/text';
import {useSelector} from 'react-redux';
import {getLanguage} from 'src/redux/auth/authSelector';

const SettingsScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();

  // States

  // Selectors
  const language = useSelector(getLanguage);

  // Effects

  // Functions

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            width: fullWidth,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
            <Button
              onPress={() => {
                navigation.goBack();
                navigation.openDrawer();
              }}
              isButtonText={false}
              buttonHeight={32 * heightRef}
              buttonWidth={32 * heightRef}
              isIcon
              buttonColor={colors.grey100}
              iconSize={18 * heightRef}
              buttonCorners={20 * heightRef}
              buttonPosition={Alignments.flex_start}
              buttonstyle={styles.backButton}
              iconName={'arrow-back-sharp'}
              iconType={'Ionicons'}
            />
            <Text language={language} style={styles.heading}>
              Settings
            </Text>
          </View>
        </View>
        <Text language={language} style={styles.text}>
          General
        </Text>
        <View
          onTouchStart={() => {
            navigation.navigate('SelectLanguageScreen');
          }}
          style={[styles.mainView, {marginTop: 20, alignSelf: 'center'}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Icon
                name={'web'}
                type={IconType.MaterialCommunityIcons}
                size={18}
                color={colors.grey250}
                style={{alignSelf: 'center'}}
              />
            </View>
            <View style={{marginLeft: 10 * widthRef, top: -5}}>
              <Text language={language} style={styles.text1}>
                Languages
              </Text>
              <Text language={language} style={styles.text2}>
                Change the language of the app.
              </Text>
            </View>
          </View>
          <Icon
            name={'navigate-next'}
            type={IconType.MaterialIcons}
            size={22}
            color={colors.grey250}
            style={{alignSelf: 'center'}}
          />
        </View>

        <View
          onTouchStart={() => {
            navigation.navigate('SelectLocationScreen');
          }}
          style={styles.mainView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Icon
                name={'ios-location-outline'}
                type={IconType.Ionicons}
                size={15}
                color={colors.grey250}
                style={{alignSelf: 'center'}}
              />
            </View>
            <View style={{marginLeft: 10 * widthRef, top: -5}}>
              <Text language={language} style={styles.text1}>
                Location
              </Text>
              <Text language={language} style={styles.text2}>
                Set your preferred location.
              </Text>
            </View>
          </View>
          <Icon
            name={'navigate-next'}
            type={IconType.MaterialIcons}
            size={22}
            color={colors.grey250}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View
          onTouchStart={() => {
            navigation.navigate('ChangePasswordScreen');
          }}
          style={styles.mainView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Icon
                name={'lock-closed-outline'}
                type={IconType.Ionicons}
                size={15}
                color={colors.grey250}
                style={{alignSelf: 'center'}}
              />
            </View>
            <View style={{marginLeft: 10 * widthRef, top: -5}}>
              <Text language={language} style={styles.text1}>
                Change password
              </Text>
              <Text language={language} style={styles.text2}>
                Change the password of the app.
              </Text>
            </View>
          </View>
          <Icon
            name={'navigate-next'}
            type={IconType.MaterialIcons}
            size={22}
            color={colors.grey250}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View
          style={{
            height: 0.5,
            width: 0.9 * fullWidth,
            alignSelf: 'center',
            marginVertical: 5,
            alignItems: 'flex-start',
            backgroundColor: colors.grey200,
          }}
        />
        <Text language={language} style={styles.text}>
          Notifications
        </Text>
        <View
          onTouchStart={() => {}}
          style={[styles.mainView, {marginTop: 20}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Icon
                name={'notifications-none'}
                type={IconType.MaterialIcons}
                size={16}
                color={colors.grey250}
                style={{alignSelf: 'center'}}
              />
            </View>
            <View style={{marginLeft: 10 * widthRef, top: -5}}>
              <Text language={language} style={styles.text1}>
                Push notifications
              </Text>
              <Text language={language} style={styles.text2}>
                For daily updates and others
              </Text>
            </View>
          </View>
          <Icon
            name={'navigate-next'}
            type={IconType.MaterialIcons}
            size={22}
            color={colors.grey250}
            style={{alignSelf: 'center'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
