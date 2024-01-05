import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
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
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile, getUserId} from 'src/redux/auth/authSelector';
import {manageCompanyProfile, manageProfile} from 'src/redux/auth/authApiCalls';
import AwesomeAlert from 'react-native-awesome-alerts';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Text from 'src/components/text';
import {translation} from 'src/config/translation';
import {fontSizes} from 'src/config/fontSize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CompanyEditProfileScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const id = useSelector(getUserId);
  const dispatch = useDispatch();
  const CompanyNameLabel = 'Company name';
  const EmailNameLabel = 'Email';
  const RegisterationNumberLabel = 'Registration number';
  const CompanySizeLabel = 'Company size';
  const AddressLabel = 'Address';
  const DescriptionLabel = 'Description';
  const SuccessMsg = 'Profile updated successfully';

  // States
  const [companyName, setCompanyName] = useState(profile?.name || '');
  const [companyError, setCompanyError] = useState('');
  const [email, setEmail] = useState(profile?.email || '');
  const [emailError, setEmailError] = useState('');
  const [registrationNo, setRegistrationNo] = useState(
    profile?.registrationNumber || '',
  );
  const [registrationNoError, setRegistrationNoError] = useState('');
  const [companySize, setcompanySize] = useState(profile?.companySize || '');
  const [companySizeError, setcompanySizeError] = useState('');
  const [founded, setFounded] = useState(profile?.establishDate || '');
  const [foundedError, setFoundedError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [address, setAddress] = useState(profile?.address || '');
  const [addressError, setAddressError] = useState('');
  const [description, setDescription] = useState(profile?.aboutInfo || '');
  const [descriptionError, setDescriptionError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [loader, setLoader] = useState(false);

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
  const updateProfile = async () => {
    setLoader(true);
    dispatch(
      manageCompanyProfile(
        {
          userId: id,
          name: companyName.trim(),
          tagLine: '',
          email: email,
          language: '',
          registrationNumber: registrationNo.trim(),
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
          address: address.trim(),
          aboutInfo: description.trim(),
        },
        (success, msg) => {
          if (success) {
            setShowSuccess(true);
            setLoader(false);
            console.log('41: Success');
          } else {
            setError(msg);
            setLoader(false);
            setShowError(true);
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
    companyName.length < 3
      ? setCompanyError('Enter valid first name with minimum 3 chracters')
      : reg.test(email) == false
      ? setEmailError('Enter email in valid format')
      : founded == ''
      ? setFoundedError('Select the date of company foundation')
      : registrationNo.length < 10
      ? setRegistrationNoError(
          'Enter valid registration with minimum 10 chracters',
        )
      : companySize == ''
      ? setcompanySizeError('Enter number of employees working in company')
      : address.length < 10
      ? setAddressError('Enter valid address of your company')
      : description.length < 20
      ? setDescriptionError('Enter valid description of your company')
      : updateProfile();
  };
  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
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
              Company Information
            </Text>
          </View>
          <View style={styles.pageView}>
            <View
              style={[
                styles.pageInnerView,
                {backgroundColor: colors.background},
              ]}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: 0 * heightRef,
              }}>
              <View>
                <TextInput
                  label={
                    language == 'English'
                      ? CompanyNameLabel
                      : translation[CompanyNameLabel]
                  }
                  value={companyName}
                  onChangeText={text => {
                    setCompanyName(text);
                    setCompanyError('');
                  }}
                  mode="outlined"
                  style={[styles.input, {height: 54 * heightRef, marginTop: 0}]}
                  activeOutlineColor={
                    companyError ? colors.error : colors.primary
                  }
                  outlineColor={companyError ? colors.error : colors.darkGray}
                  outlineStyle={{borderWidth: 2}}
                  maxLength={50}
                  keyboardType={keyboardTypes.default}
                  scrollEnabled={false}
                  selectionColor={colors.secondary1}
                  cursorColor={colors.secondary1}
                />
                <Text
                  language={language}
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
              label={
                language == 'English'
                  ? EmailNameLabel
                  : translation[EmailNameLabel]
              }
              value={email}
              editable={false}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              mode="outlined"
              style={[styles.input, {height: 54 * heightRef}]}
              contentStyle={{color: 'gray'}}
              activeOutlineColor={emailError ? colors.error : colors.primary}
              outlineColor={emailError ? colors.error : colors.darkGray}
              outlineStyle={{borderWidth: 2}}
              maxLength={50}
              keyboardType={keyboardTypes.default}
              scrollEnabled={false}
              selectionColor={colors.secondary1}
              cursorColor={colors.secondary1}
            />
            <Text
              language={language}
              style={{
                marginVertical: 2 * heightRef,
                color: colors.error,
                marginLeft: '5%',
              }}>
              {registrationNoError}
            </Text>
            <View>
              <View
                onTouchStart={() => {
                  setFoundedError('');
                  setShowCalendar(true);
                }}
                style={[
                  styles.containerBox,
                  {
                    marginLeft: 20,
                    justifyContent: 'center',
                    zIndex: -100,
                    marginTop: 10 * heightRef,
                    borderColor: foundedError ? colors.error : colors.darkGray,
                  },
                ]}>
                <Text
                  language={language}
                  style={{
                    position: 'absolute',
                    zIndex: 40000,
                    top: -26 * heightRef,
                    backgroundColor: colors.background,
                    paddingHorizontal: 5 * widthRef,
                    left: 8 * widthRef,
                    fontSize: fontSizes.f12,
                    color: colors.grey350,
                  }}>
                  Company founded
                </Text>
                <Icon
                  name={'calendar'}
                  type={IconType.AntDesign}
                  size={20 * heightRef}
                  color={colors.grey250}
                  style={{position: 'absolute', right: 10 * widthRef}}
                />
                <Text
                  language={language}
                  style={{
                    fontSize: 15 * fontRef,
                    marginLeft: 10 * widthRef,
                    color: founded ? colors.grey250 : colors.grey300,
                  }}>
                  {founded ? moment(founded).format('MM/DD/YYYY') : 'Founded'}
                </Text>
              </View>
            </View>

            <DateTimePickerModal
              isVisible={showCalendar}
              mode="date"
              onConfirm={(date: any) => {
                setFounded(date);
                setShowCalendar(false);
              }}
              onCancel={() => setShowCalendar(false)}
              display={'inline'}
              maximumDate={new Date()}
            />
            <Text
              language={language}
              style={{
                color: colors.error,
                marginLeft: '5%',
                marginBottom: -15 * heightRef,
                marginTop: 2,
              }}>
              {foundedError}
            </Text>

            <TextInput
              label={
                language == 'English'
                  ? RegisterationNumberLabel
                  : translation[RegisterationNumberLabel]
              }
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
              outlineColor={
                registrationNoError ? colors.error : colors.darkGray
              }
              outlineStyle={{borderWidth: 2}}
              maxLength={50}
              scrollEnabled={false}
              selectionColor={colors.secondary1}
              cursorColor={colors.secondary1}
              keyboardType={keyboardTypes.default}
            />
            <Text
              language={language}
              style={{
                marginVertical: 2 * heightRef,
                color: colors.error,
                marginLeft: '5%',
              }}>
              {registrationNoError}
            </Text>

            <TextInput
              label={
                language == 'English'
                  ? CompanySizeLabel
                  : translation[CompanySizeLabel]
              }
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
              keyboardType={keyboardTypes.default}
              scrollEnabled={false}
              selectionColor={colors.secondary1}
              cursorColor={colors.secondary1}
            />
            <Text
              language={language}
              style={{
                marginVertical: 2 * heightRef,
                color: colors.error,
                marginLeft: '5%',
              }}>
              {companySizeError}
            </Text>

            <TextInput
              label={
                language == 'English' ? AddressLabel : translation[AddressLabel]
              }
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
              maxLength={80}
              scrollEnabled={false}
              selectionColor={colors.secondary1}
              cursorColor={colors.secondary1}
            />
            <Text
              language={language}
              style={{
                marginVertical: 2 * heightRef,
                color: colors.error,
                marginLeft: '5%',
              }}>
              {addressError}
            </Text>

            <TextInput
              label={
                language == 'English'
                  ? DescriptionLabel
                  : translation[DescriptionLabel]
              }
              value={description}
              onChangeText={text => {
                setDescription(text);
                setDescriptionError('');
              }}
              mode="outlined"
              style={[
                styles.input,
                {
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
              maxLength={1000}
              contentStyle={{height: 110 * heightRef}}
              scrollEnabled={false}
              selectionColor={colors.secondary1}
              cursorColor={colors.secondary1}
            />
            <Text
              language={language}
              style={{
                marginVertical: 2 * heightRef,
                color: colors.error,
                marginLeft: '5%',
              }}>
              {descriptionError}
            </Text>
          </ScrollView>

          <View
            style={!isKeyboardOpen ? styles.bottomView : styles.bottomView2}>
            <Button
              onPress={() => {
                checkFeilds();
              }}
              buttonText={'Save'}
              language={language}
              buttonHeight={40 * heightRef}
              buttonWidth={0.9 * fullWidth}
              buttonColor={colors.primary}
              iconSize={25}
              buttonCorners={20 * heightRef}
              buttonPosition={Alignments.center}
              titleFontStyle={fontWeights.h500}
              isLoading={loader}
              buttonstyle={{}}
            />
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
          message={language == 'English' ? SuccessMsg : translation[SuccessMsg]}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CompanyEditProfileScreen;
