import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BoardingScreen from 'src/screens/boarding-screen';
import LoginScreen from 'src/screens/auth-screens/login-screen';
import RegisterScreen from 'src/screens/auth-screens/register-screen';
import GetStartedScreen from 'src/screens/getStarted-screen';
import AccountTypeScreen from 'src/screens/accType-screen';
import CreatePasswordScreen from 'src/screens/auth-screens/password-screen';
import CompleteProfileScreen from 'src/screens/auth-screens/complete-screen';
import LoginPhoneScreen from 'src/screens/auth-screens/login-screen/loginPhoneNo-screen';
import LoginPasswordScreen from 'src/screens/auth-screens/login-screen/loginPassword-screen';
import ForgetPasswordScreen from 'src/screens/forgetPassword-screens/forgetPassword-screen';
import ForgetPasswordOtpScreen from 'src/screens/forgetPassword-screens/forgetPasswordOtp-screen';
import ChangePasswordScreen from 'src/screens/forgetPassword-screens/changePassword-screen';
import RegisterOtpScreen from 'src/screens/auth-screens/registerOtp-screen';
import PersonalInfoStep1Screen from 'src/screens/Driver/completeProfile-screen/step1-screen';
import PersonalInfoStep2Screen from 'src/screens/Driver/completeProfile-screen/step2-screen';
import PersonalInfoStep3Screen from 'src/screens/Driver/completeProfile-screen/step3-screen';
import CompanyInfoStep1Screen from 'src/screens/Company/completeProfile-screen/step1-screen';
import CompanyInfoStep2Screen from 'src/screens/Company/completeProfile-screen/step2-screen';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BoardingScreen">
        <Stack.Screen
          name="BoardingScreen"
          component={BoardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetStartedScreen"
          component={GetStartedScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AccountTypeScreen"
          component={AccountTypeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePasswordScreen"
          component={CreatePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompleteProfileScreen"
          component={CompleteProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginPhoneScreen"
          component={LoginPhoneScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginPasswordScreen"
          component={LoginPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPasswordScreen"
          component={ForgetPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPasswordOtpScreen"
          component={ForgetPasswordOtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterOtpScreen"
          component={RegisterOtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyInfoStep1Screen"
          component={CompanyInfoStep1Screen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompanyInfoStep2Screen"
          component={CompanyInfoStep2Screen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
