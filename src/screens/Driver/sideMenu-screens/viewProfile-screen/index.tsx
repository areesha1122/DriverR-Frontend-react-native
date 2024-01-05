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
import DeviceInfo from 'react-native-device-info';
import {useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import moment from 'moment';
import Text from 'src/components/text';

const ViewProfileScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();

  // States

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  console.log(JSON.stringify(profile, null, 2));

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
            backgroundColor: '#78B3F5',
            width: fullWidth,
            top: DeviceInfo.hasNotch() ? -55 : 0,
            paddingTop: DeviceInfo.hasNotch() ? 55 : 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
              width: '90%',
              marginVertical: 10,
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
              My profile
            </Text>

            <Icon
              onPress={() => {
                navigation.navigate('EditProfileScreen');
              }}
              name={'edit'}
              type={IconType.Feather}
              size={25}
              color={colors.white}
              style={{alignSelf: 'center', marginBottom: 15 * heightRef}}
            />
          </View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: profile.profilePicture,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 0 * heightRef,
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text
              language={language}
              style={[styles.text2, {color: '#1153DA'}]}>
              Verified
            </Text>

            <Image
              source={Images.verified}
              style={{
                width: 17 * widthRef,
                height: 17 * widthRef,
                // borderRadius: 50 * widthRef,
                alignSelf: 'center',
                marginLeft: 4,
              }}
            />
          </View>
          <Text
            language={language}
            style={[styles.heading, {marginBottom: 30 * heightRef}]}>
            {' '}
            {profile.firstName + ' ' + profile.lastName}
          </Text>
        </View>
        <View
          // onTouchStart={() => {
          //   navigation.navigate('CompanyEditProfileScreen');
          // }}
          style={styles.mainView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10 * heightRef,
            }}>
            <View style={styles.imageView}>
              <Image
                style={styles.image2}
                resizeMode="contain"
                source={Images.mail}
              />
            </View>
            <View style={{marginLeft: 15 * widthRef}}>
              <Text language={language} style={styles.text2a}>
                Email
              </Text>
              <Text language={language} style={styles.text2}>
                {profile.email}{' '}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10 * heightRef,
            }}>
            <View style={styles.imageView}>
              <Image
                style={styles.image2}
                resizeMode="contain"
                source={Images.genderIcon}
              />
            </View>

            <View style={{marginLeft: 15 * widthRef}}>
              <Text language={language} style={styles.text2a}>
                Gender
              </Text>
              <Text language={language} style={styles.text2}>
                {profile.gender}{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10 * heightRef,
            }}>
            <View style={styles.imageView}>
              <Image
                style={styles.image2}
                resizeMode="contain"
                source={Images.dobIcon}
              />
            </View>

            <View style={{marginLeft: 15 * widthRef}}>
              <Text language={language} style={styles.text2a}>
                Date of birth
              </Text>
              <Text language={language} style={styles.text2}>
                {moment(profile.dob).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewProfileScreen;
