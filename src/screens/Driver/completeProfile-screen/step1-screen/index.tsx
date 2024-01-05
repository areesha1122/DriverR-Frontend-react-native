import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
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
import {keyboardTypes} from 'src/components/inputFeild';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const PersonalInfoStep1Screen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const profile = useSelector(getProfile);

  // States
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState(profile?.email || '');
  const [emailError, setEmailError] = useState('');
  const [dob, setDob] = useState(profile?.dob || new Date('2000-01-01'));
  const [dobError, setDobError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderError, setGenderError] = useState('');
  const [genderValue, setGenderValue] = useState(profile?.gender || null);
  const [address, setAddress] = useState(profile?.address || '');
  const [addressError, setAddressError] = useState('');
  const [genderItems, setGenderItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  // Selectors
  const language = useSelector(getLanguage);

  // Effects

  // Functions
  const handleConfirm = (date: any) => {
    console.warn('A date has been picked: ', date);
    setDob(date);

    setShowCalendar(false);
  };

  // Validators
  const checkFeilds = () => {
    let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    firstName.length < 3
      ? (setFirstNameError('Enter valid first name with minimum 3 chracters'),
        Keyboard.dismiss())
      : lastName.length < 3
      ? (setLastNameError('Enter valid last name with minimum 3 chracters'),
        Keyboard.dismiss())
      : reg.test(email) == false
      ? (setEmailError('Enter valid email address'), Keyboard.dismiss())
      : address.length < 10
      ? (setAddressError('Enter valid address with minimum 10 chracters'),
        Keyboard.dismiss())
      : dob == ''
      ? (setDobError('Select your date of birth'), Keyboard.dismiss())
      : genderValue == null
      ? setGenderError('Select your gender')
      : navigation.navigate('PersonalInfoStep2Screen', {
          data: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email,
            gender: genderValue,
            dob: dob,
            address: address.trim(),
          },
        });
  };

  // Screen Design
  return (
    <SafeAreaView
      style={styles.container}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
        return false;
      }}>
      <View style={styles.container}>
        <View
          onTouchEnd={() => {
            setGenderOpen(false);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Button
              onPress={() => {
                navigation.goBack();
              }}
              isButtonText={false}
              buttonHeight={40 * heightRef}
              buttonWidth={40 * heightRef}
              isIcon
              buttonColor={colors.grey100}
              iconSize={22 * heightRef}
              buttonCorners={20 * heightRef}
              buttonPosition={Alignments.flex_start}
              buttonstyle={styles.backButton}
              iconName={'cross'}
              iconType={'Entypo'}
            />
            <Text language={language} style={styles.heading}>
              Personal Information
            </Text>
          </View>
          <View style={styles.pageView}>
            <View
              style={[
                styles.pageInnerView,
                {backgroundColor: colors.secondary1, marginLeft: 10},
              ]}
            />
            <View style={styles.pageInnerView} />
            <View style={[styles.pageInnerView, {marginRight: 10}]} />
          </View>
          <View
            style={{
              marginTop: 30 * heightRef,
            }}>
            <View>
              <TextInput
                label="First name"
                value={firstName}
                onChangeText={text => {
                  setFirstName(text);
                  setFirstNameError('');
                }}
                mode="outlined"
                style={[styles.input, {height: 54 * heightRef}]}
                activeOutlineColor={
                  firstNameError ? colors.error : colors.primary
                }
                outlineColor={firstNameError ? colors.error : colors.darkGray}
                outlineStyle={{borderWidth: 2}}
                maxLength={50}
                keyboardType={keyboardTypes.default}
                scrollEnabled={false}
                selectionColor={colors.secondary1}
                cursorColor={colors.secondary1}
              />
              <Text
                style={{
                  marginVertical: 2 * heightRef,
                  color: colors.error,
                  marginLeft: '5%',
                }}>
                {firstNameError}
              </Text>
            </View>
          </View>

          <TextInput
            label="Last name"
            value={lastName}
            onChangeText={text => {
              setLastName(text);
              setLastNameError('');
            }}
            mode="outlined"
            style={[styles.input, {height: 54 * heightRef}]}
            activeOutlineColor={lastNameError ? colors.error : colors.primary}
            outlineColor={lastNameError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            maxLength={50}
            keyboardType={keyboardTypes.default}
            selectionColor={colors.secondary1}
            cursorColor={colors.secondary1}
          />
          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {lastNameError}
          </Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
            }}
            mode="outlined"
            style={[styles.input, {height: 54 * heightRef}]}
            activeOutlineColor={emailError ? colors.error : colors.primary}
            outlineColor={emailError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            maxLength={50}
            keyboardType={keyboardTypes.default}
            selectionColor={colors.secondary1}
            cursorColor={colors.secondary1}
          />
          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {emailError}
          </Text>

          <TextInput
            label="Address"
            value={address}
            onChangeText={text => {
              setAddress(text);
              setAddressError('');
            }}
            mode="outlined"
            style={[styles.input, {height: 54 * heightRef}]}
            activeOutlineColor={addressError ? colors.error : colors.primary}
            outlineColor={addressError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            keyboardType={keyboardTypes.default}
            maxLength={200}
            selectionColor={colors.secondary1}
            cursorColor={colors.secondary1}
          />
          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {addressError}
          </Text>

          <View
            onTouchStart={() => {
              setDobError('');
              setShowCalendar(true);
            }}
            style={[
              styles.containerBox,
              {
                marginLeft: 0,
                justifyContent: 'center',
                marginTop: 0,
                borderColor: dobError ? colors.error : colors.darkGray,
              },
            ]}>
            <Icon
              name={'calendar'}
              type={IconType.AntDesign}
              size={20 * heightRef}
              color={colors.grey250}
              style={{position: 'absolute', right: 10 * widthRef}}
            />
            <Text
              style={{
                fontSize: 15 * fontRef,
                marginLeft: 10 * widthRef,
                color: dob ? colors.grey250 : '#474952',
              }}>
              {dob ? moment(dob).format('MM/DD/YYYY') : 'Date of birth'}
            </Text>
          </View>

          <DateTimePickerModal
            isVisible={showCalendar}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setShowCalendar(false)}
            display={'inline'}
            date={dob}
            maximumDate={
              new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            }
          />

          <Text
            style={{
              color: colors.error,
              marginLeft: '5%',
              marginBottom: -15 * heightRef,
              marginTop: 2,
            }}>
            {dobError}
          </Text>
        </View>
        <DropDownPicker
          open={genderOpen}
          value={genderValue}
          items={genderItems}
          setOpen={() => setGenderOpen(!genderOpen)}
          onOpen={() => {
            setGenderOpen(true);
            setGenderError('');
          }}
          onClose={() => setGenderOpen(false)}
          setValue={setGenderValue}
          setItems={setGenderItems}
          multiple={false}
          placeholder="Gender"
          style={[
            styles.containerBox,
            {borderColor: genderError ? colors.error : colors.darkGray},
          ]}
          dropDownDirection="BOTTOM"
          placeholderStyle={{
            color: '#474952',
            fontSize: 16 * fontRef,
          }}
          labelStyle={{
            fontSize: 15 * fontRef,
            color: 'black',
          }}
          dropDownContainerStyle={{
            borderColor: colors.darkGray,
            width: '88.5%',
            marginLeft: '5.5%',
            borderWidth: 0,
            marginTop: 26 * heightRef,
            zIndex: 1000,
            elevation: 3,
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: colors.background,
            overflow: 'visible',
          }}
        />
        <Text
          style={{
            color: colors.error,
            marginLeft: '5%',
            marginBottom: -15 * heightRef,
            marginTop: 2,
            zIndex: -1000,
          }}>
          {genderError}
        </Text>
        <View
          onTouchStart={() => setGenderOpen(false)}
          style={{
            marginTop: 80 * heightRef,
            flex: 1,
            width: fullWidth,
            // backgroundColor: 'red',
          }}></View>
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              checkFeilds();
            }}
            buttonText={'Continue'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{}}
          />
        </View>
        {Platform.OS == 'android' ? (
          <View style={styles.bottomView2}></View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoStep1Screen;
