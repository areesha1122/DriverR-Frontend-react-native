import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text as Text2, View} from 'react-native';
import {styles} from './styles';
import {fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getPhoneNumber} from 'src/redux/auth/authSelector';
import {changePassword} from 'src/redux/auth/authApiCalls';
import AwesomeAlert from 'react-native-awesome-alerts';
import Text from 'src/components/text';
import {translation} from 'src/config/translation';

const ChangePasswordScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  var successMsg = 'Password is updated successfully';
  var labelCurrentPassword = 'Current password';
  var labelCurrentPassword = 'Current password';
  var labelNewPassword = 'New password';
  var labelConfirmPassword = 'Confirm password';

  // States
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  // Selectors
  const language = useSelector(getLanguage);
  const phoneNumber = useSelector(getPhoneNumber);

  // Effects
  useEffect(() => {
    console.log(phoneNumber);
  }, []);

  // Functions
  const changeUserPassword = () => {
    dispatch(
      changePassword(
        {
          phoneNumber: phoneNumber,
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmNewPassword: newPassword,
        },
        (success, msg) => {
          if (success) {
            setShowSuccess(true);
            console.log('41: Success');
          } else {
            setError(msg);
            setShowError(true);
          }
          return true;
        },
      ),
    );
  };

  // Validators

  const checkPasswords = () => {
    let reg = /^(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,20}$/;
    currentPassword == ''
      ? setCurrentPasswordError('Enter valid current password')
      : !reg.test(currentPassword)
      ? setCurrentPasswordError(
          'Current Password should be between 8 to 20 characters with atleast one capital letter and a special character',
        )
      : newPassword == ''
      ? setNewPasswordError('Enter valid new password')
      : !reg.test(newPassword)
      ? setNewPasswordError(
          'New Password should be between 8 to 20 characters with atleast one capital letter and a special character',
        )
      : newPassword == currentPassword
      ? setNewPasswordError('New password cannot be same as old password')
      : newPassword != confirmPassword
      ? setConfirmPasswordError(
          'Confirm password does not match with new password',
        )
      : changeUserPassword();
  };

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button
            onPress={() => {
              // navigation.openDrawer();
              navigation.goBack();
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
            {'Change password'}
          </Text>
        </View>

        <View
          style={{
            marginTop: 20 * heightRef,
          }}>
          <Icon
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            type={IconType.Entypo}
            name={!showCurrentPassword ? 'eye' : 'eye-with-line'}
            size={18 * heightRef}
            color={colors.black}
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 25 * widthRef,
              top: 25 * heightRef,
            }}
          />
          <TextInput
            label={
              language == 'English'
                ? labelCurrentPassword
                : translation[labelCurrentPassword]
            }
            value={currentPassword}
            onChangeText={text => {
              setCurrentPassword(text);
              setCurrentPasswordError('');
            }}
            mode="outlined"
            style={[
              styles.input,
              {
                height: 54 * heightRef,
              },
            ]}
            // style={{}}
            activeOutlineColor={
              currentPasswordError ? colors.error : colors.primary
            }
            outlineColor={currentPasswordError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            secureTextEntry={showCurrentPassword}
          />
          <Text
            language={language}
            style={{
              marginVertical: 4 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {currentPasswordError}
          </Text>
        </View>

        <View style={{}}>
          <Icon
            onPress={() => setShowNewPassword(!showNewPassword)}
            type={IconType.Entypo}
            name={!showNewPassword ? 'eye' : 'eye-with-line'}
            size={18 * heightRef}
            color={colors.black}
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 20 * widthRef,
              top: 25 * heightRef,
            }}
          />
          <TextInput
            label={
              language == 'English'
                ? labelNewPassword
                : translation[labelNewPassword]
            }
            value={newPassword}
            onChangeText={text => {
              setNewPassword(text);
              setNewPasswordError('');
            }}
            mode="outlined"
            style={[
              styles.input,
              {
                height: 54 * heightRef,
              },
            ]}
            // style={{}}
            activeOutlineColor={
              newPasswordError ? colors.error : colors.primary
            }
            outlineColor={newPasswordError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            secureTextEntry={showNewPassword}
          />
          <Text
            language={language}
            style={{
              marginVertical: 4 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {newPasswordError}
          </Text>
        </View>

        <View style={{}}>
          <Icon
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            type={IconType.Entypo}
            name={!showConfirmPassword ? 'eye' : 'eye-with-line'}
            size={18 * heightRef}
            color={colors.black}
            style={{
              position: 'absolute',
              zIndex: 100,
              right: 20 * widthRef,
              top: 25 * heightRef,
            }}
          />
          <TextInput
            label={
              language == 'English'
                ? labelConfirmPassword
                : translation[labelConfirmPassword]
            }
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            mode="outlined"
            style={[
              styles.input,
              {
                height: 54 * heightRef,
              },
            ]}
            // style={{}}
            activeOutlineColor={
              confirmPasswordError ? colors.error : colors.primary
            }
            outlineColor={confirmPasswordError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            secureTextEntry={showConfirmPassword}
          />
          <Text
            language={language}
            style={{
              marginVertical: 4 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {confirmPasswordError}
          </Text>
        </View>

        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              checkPasswords();
            }}
            buttonText={'Change password'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            language={language}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{}}
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
        message={language == 'English' ? successMsg : translation[successMsg]}
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

export default ChangePasswordScreen;
