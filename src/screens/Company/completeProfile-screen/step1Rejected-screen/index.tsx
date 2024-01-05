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
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import DatePickerModal from 'src/components/datePicker';
import {keyboardTypes} from 'src/components/inputFeild';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CompanyInfoStep1Screen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const profile = useSelector(getProfile);

  // States
  const [companyName, setCompanyName] = useState(profile.name || '');
  const [companyError, setCompanyError] = useState('');
  const [email, setEmail] = useState(profile.email || '');
  const [emailError, setEmailError] = useState('');
  const [founded, setFounded] = useState(profile.establishDate || '');
  const [foundedError, setFoundedError] = useState('');
  const [registrationNo, setRegistrationNo] = useState(
    profile.registrationNumber || '',
  );
  const [registrationNoError, setRegistrationNoError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [companySize, setcompanySize] = useState(profile.companySize || '');
  const [companySizeError, setcompanySizeError] = useState('');
  const [address, setAddress] = useState(profile.address || '');
  const [addressError, setAddressError] = useState('');
  const [description, setDescription] = useState(profile.aboutInfo || '');
  const [descriptionError, setDescriptionError] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Effects

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Functions
  const handleConfirm = (date: any) => {
    console.warn('A date has been picked: ', date);
    setFounded(date);
    setShowCalendar(false);
  };

  // Selectors
  const language = useSelector(getLanguage);

  // Validators
  const checkFeilds = () => {
    let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    companyName.length < 3
      ? (setCompanyError('Enter valid first name with minimum 3 chracters'),
        Keyboard.dismiss())
      : reg.test(email) == false
      ? (setEmailError('Enter email in valid format'), Keyboard.dismiss())
      : founded == ''
      ? (setFoundedError('Select the date of company foundation'),
        Keyboard.dismiss())
      : registrationNo.length < 10
      ? (setRegistrationNoError(
          'Enter valid registration with minimum 10 chracters',
        ),
        Keyboard.dismiss())
      : companySize == ''
      ? (setcompanySizeError('Enter number of employees working in company'),
        Keyboard.dismiss())
      : address.length < 10
      ? (setAddressError('Enter valid address of your company'),
        Keyboard.dismiss())
      : description.length < 20
      ? (setDescriptionError('Enter valid description of your company'),
        Keyboard.dismiss())
      : navigation.navigate('CompanyInfoStep2Screen', {
          data: {
            name: companyName,
            tagLine: '',
            email: email,
            language: '',
            registrationNumber: registrationNo,
            companySize:
              parseInt(companySize) < 10
                ? '1-10'
                : parseInt(companySize) < 50
                ? '11-50'
                : parseInt(companySize) < 200
                ? '51-200'
                : parseInt(companySize) < 500
                ? '201-500'
                : '1000+',

            establishDate: founded,
            address: address,
            aboutInfo: description,
          },
        });
  };

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
            Company Information
          </Text>
        </View>
        <View style={styles.pageView}>
          <View
            style={[
              styles.pageInnerView,
              {backgroundColor: colors.secondary1, marginLeft: '5%'},
            ]}
          />
          <View style={[styles.pageInnerView, {marginRight: '5%'}]} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 30 * heightRef,
            }}>
            <View>
              <TextInput
                label="Company name"
                value={companyName}
                onChangeText={text => {
                  setCompanyName(text);
                  setCompanyError('');
                }}
                mode="outlined"
                style={[styles.input, {height: 54 * heightRef}]}
                activeOutlineColor={
                  companyError ? colors.error : colors.primary
                }
                outlineColor={companyError ? colors.error : colors.darkGray}
                outlineStyle={{borderWidth: 2}}
                maxLength={120}
                keyboardType={keyboardTypes.default}
              />
              <Text
                style={{
                  marginVertical: 2 * heightRef,
                  color: colors.error,
                  marginLeft: '5%',
                }}>
                {companyError}
              </Text>
            </View>
          </View>

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
            maxLength={320}
            keyboardType={keyboardTypes.default}
          />
          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {emailError}
          </Text>

          <View
            onTouchStart={() => {
              setFoundedError('');
              setShowCalendar(true);
            }}
            style={[
              styles.containerBox,
              {
                marginLeft: 17.5 * widthRef,
                justifyContent: 'center',

                marginTop: 10 * heightRef,
                borderColor: foundedError ? colors.error : colors.darkGray,
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
                fontSize: 16 * fontRef,
                marginLeft: 10 * widthRef,
                color: founded ? colors.grey250 : '#474952',
              }}>
              {founded ? moment(founded).format('MM/DD/YYYY') : 'Founded date'}
            </Text>
          </View>

          <DateTimePickerModal
            isVisible={showCalendar}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setShowCalendar(false)}
            display={'inline'}
            date={new Date('2023-01-01')}
            maximumDate={new Date()}
          />
          <Text
            style={{
              color: colors.error,
              marginLeft: '5%',
              marginBottom: -15 * heightRef,
              marginTop: 2,
            }}>
            {foundedError}
          </Text>

          <TextInput
            label="Registration number"
            value={registrationNo}
            onChangeText={text => {
              setRegistrationNo(text);
              setRegistrationNoError('');
            }}
            mode="outlined"
            style={[
              styles.input,
              {height: 54 * heightRef, marginTop: 20 * heightRef},
            ]}
            activeOutlineColor={
              registrationNoError ? colors.error : colors.primary
            }
            outlineColor={registrationNoError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            maxLength={120}
            keyboardType={keyboardTypes.default}
          />
          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {registrationNoError}
          </Text>

          <TextInput
            label="Company size"
            value={companySize}
            onChangeText={text => {
              setcompanySize(text);
              setcompanySizeError('');
            }}
            mode="outlined"
            style={[styles.input, {height: 54 * heightRef}]}
            activeOutlineColor={
              companySizeError ? colors.error : colors.primary
            }
            outlineColor={companySizeError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            keyboardType={keyboardTypes.number_pad}
          />
          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {companySizeError}
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

          <TextInput
            label="Description"
            value={description}
            onChangeText={text => {
              setDescription(text);
              setDescriptionError('');
            }}
            mode="outlined"
            style={[
              styles.input,
              {
                height: 110 * heightRef,
                textAlignVertical: 'top',
                marginBottom: 50,
              },
            ]}
            activeOutlineColor={
              descriptionError ? colors.error : colors.primary
            }
            outlineColor={descriptionError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            keyboardType={keyboardTypes.default}
            multiline
            maxLength={500}
          />
          <Text
            style={{
              marginVertical: 0 * heightRef,
              color: colors.error,
              marginLeft: '5%',
              top: -45 * heightRef,
            }}>
            {descriptionError}
          </Text>
        </ScrollView>
        <View style={!isKeyboardOpen ? styles.bottomView : styles.bottomView2}>
          <Button
            onPress={() => {
              // navigation.navigate('CompanyInfoStep2Screen');
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
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompanyInfoStep1Screen;
