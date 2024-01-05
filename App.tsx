import {LogBox, StatusBar} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from 'src/redux/store';
import {colors} from 'src/config/colors';
import AuthNavigator from 'src/routes/auth-navigator';
import SplashScreen from 'src/screens/splash-screen';
import MainNavigator from 'src/routes/main-navigator';
import CompanyMainNavigator from 'src/routes/company-main-navigator';
import DriverChatScreen from 'src/screens/Driver/message-screens/chat-screen';
import {
  getAccountType,
  getLanguage,
  getToken,
} from 'src/redux/auth/authSelector';

import NetInfo from '@react-native-community/netinfo';
import AwesomeAlert from 'react-native-awesome-alerts';

LogBox.ignoreAllLogs();

function ProviderApp() {
  // States

  const [showSplash, setShowSplash] = useState(true);

  const dispatch = useDispatch();

  // Effects

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  // Selectors
  const language = useSelector(getLanguage);
  const token = useSelector(getToken);
  const account_type = useSelector(getAccountType);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : token == '' ? (
        <AuthNavigator />
      ) : account_type == 'Company' ? (
        <CompanyMainNavigator />
      ) : (
        <MainNavigator />
      )}
    </>
  );
}

export default function App() {
  // Main Code
  const [connect, setConnect] = useState(false);
  const [reachable, setReachable] = useState(false);

  // Effects

  useEffect(() => {
    NetInfo.addEventListener(networkState => {
      if (networkState.isConnected) {
        setConnect(false);
        setTimeout(() => {
          if (networkState.isInternetReachable) {
            setReachable(false);
          } else {
            setReachable(true);
          }
        }, 2000);
      } else {
        setConnect(true);
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.grey100} barStyle="dark-content" />
      <AwesomeAlert
        show={connect}
        showProgress={true}
        title="No Internet"
        message="There is no internet connection. Please connect to a stable internet and try again."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
        confirmButtonStyle={{backgroundColor: colors.primary}}
        confirmText="Exit TIRminator"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {}}
      />
      <AwesomeAlert
        show={false}
        showProgress={true}
        title="Poor Internet"
        message="There is poor internet connection. Please connect to a stable internet and try again."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
        confirmButtonStyle={{backgroundColor: colors.primary}}
        confirmText="Exit TIRminator"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {}}
      />
      <ProviderApp />
    </Provider>
  );
}
