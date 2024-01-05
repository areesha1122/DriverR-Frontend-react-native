import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  Text as Text1,
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
import moment, {lang} from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile, getUserId} from 'src/redux/auth/authSelector';
import {manageProfile} from 'src/redux/auth/authApiCalls';
import AwesomeAlert from 'react-native-awesome-alerts';
import Text from 'src/components/text';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const EditProfileScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const id = useSelector(getUserId);
  const dispatch = useDispatch();

  // States
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState(profile.lastName);
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState(profile.email);
  const [emailError, setEmailError] = useState('');
  const [dob, setDob] = useState(profile.dob);
  const [dobError, setDobError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderError, setGenderError] = useState('');
  const [genderValue, setGenderValue] = useState(profile.gender);
  const [address, setAddress] = useState(profile.address);
  const [addressError, setAddressError] = useState('');
  const [genderItems, setGenderItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  // Effects
  console.log('langg', language);

  // Functions
  const handleConfirm = (date: any) => {
    console.warn('A date has been picked: ', date);
    setDob(date);
    setShowCalendar(false);
  };

  const updateProfile = async () => {
    setLoader(true);
    dispatch(
      manageProfile(
        {
          userId: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: genderValue,
          dob: dob,
          address: address,
        },
        (success, msg) => {
          if (success) {
            setShowSuccess(true);
            setLoader(false);
            console.log('41: Success');
          } else {
            setError(msg);
            setShowError(true);
            setLoader(false);
            console.log('Image', msg);
          }
          return true;
        },
      ),
    );
  };

  // Validators
  const checkFeilds = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    firstName.length < 3
      ? setFirstNameError('Enter valid first name with minimum 3 chracters')
      : lastName.length < 3
      ? setLastNameError('Enter valid last name with minimum 3 chracters')
      : reg.test(email) == false
      ? setEmailError('Enter valid email address')
      : address.length < 10
      ? setAddressError('Enter valid address with minimum 10 chracters')
      : dob == ''
      ? setDobError('Select your date of birth')
      : genderValue == null
      ? setGenderError('Select your gender')
      : updateProfile();
  };

  // Screen Design
  return (
    <SafeAreaView
      style={styles.container}
      onTouchStart={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button
            onPress={() => {
              navigation.goBack();
              // navigation.openDrawer();
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
            Personal Information
          </Text>
        </View>
        <View style={styles.pageView}>
          <View
            style={[styles.pageInnerView, {backgroundColor: colors.background}]}
          />
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
          keyboardType={keyboardTypes.default}
          maxLength={50}
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
              color: dob ? colors.grey250 : colors.grey300,
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
          date={new Date('2000-01-01')}
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
            color: colors.grey300,
            fontSize: 16 * fontRef,
          }}
          labelStyle={{
            fontSize: 15 * fontRef,
            color: 'black',
          }}
          dropDownContainerStyle={{
            borderColor: colors.darkGray,
            width: '89.5%',
            marginLeft: '5%',
            marginTop: 25 * heightRef,
            zIndex: 1000,
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

        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              checkFeilds();
            }}
            buttonText={'Save'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{}}
            isLoading={loader}
          />
          <View></View>
        </View>
      </View>
      <AwesomeAlert
        show={showError}
        showProgress={false}
        title=""
        titleStyle={{color: colors.error}}
        message={error}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.error}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setShowError(false);
        }}
        onDismiss={() => {
          setShowError(false);
        }}
      />
      <AwesomeAlert
        show={showSuccess}
        showProgress={false}
        title=""
        titleStyle={{
          color: colors.success,
        }}
        message={'Profile updated successfully'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.success}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          navigation.goBack();
        }}
        onDismiss={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
