import React, {useEffect} from 'react';
import {SafeAreaView, Image, View, StyleSheet} from 'react-native';
import {colors} from 'src/config/colors';
import WebView from 'react-native-webview';
import {fullHeight, heightRef} from 'src/config/screenSize';

import {Images} from 'src/assets';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from 'src/redux/auth/authSelector';
import {addCompanyPlan} from 'src/redux/messages/plansApiCalls';
import {getCompanyPlan} from 'src/redux/plans/plansApiCalls';

const StripeScreen = (props: any) => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [state, setState] = React.useState({
    loading: true,
    url: '',
  });
  const profile = useSelector(getProfile);

  useEffect(() => {
    console.log(JSON.stringify(profile, null, 2));
    setTimeout(async () => {
      setState({
        ...state,
        loading: false,
        url: route.params.url,
      });
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF'}}>
      {state.loading ? (
        <View
          style={{justifyContent: 'flex-start', height: '100%', width: '100%'}}>
          {/* <View style={{height: 60 * heightRef, alignItems: 'center'}}></View> */}
          <View style={{alignSelf: 'center', marginTop: fullHeight * 0.35}}>
            {/* <Image
              source={Icons.loading}
              style={{
                width: 100 * heightRef,
                height: 100 * heightRef,
                borderRadius: 21.5,
              }}
            /> */}
          </View>
        </View>
      ) : (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          {/* <View style={{height: 60 * heightRef, alignItems: 'center'}}></View> */}
          <WebView
            style={{width: '100%'}}
            source={{
              uri: `${state.url}`,
            }}
            injectedJavaScript={`
            var elements = document.getElementsByClassName("App-Footer Footer");
            for (var i = 0; i < elements.length; i++) {
               elements[i].style.display = "none";
            }
            `}
            onNavigationStateChange={(state: any) => {
              if (
                state.url ==
                'https://dev.tirminator.com/payment/payment-success'
              ) {
                navigation.goBack();
                dispatch(
                  getCompanyPlan(profile._id, (success, msg) => {
                    if (success) {
                      console.log('41: Success');
                    } else {
                      console.log('Image', msg);
                    }
                    return true;
                  }),
                );
              }
              if (
                state.url == 'https://dev.tirminator.com/payment/payment-failed'
              ) {
                navigation.goBack();
              }
            }}
            onError={(err: any) => console.log('Add Bank 74: err', err)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  mainContainer: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: colors.background,
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default StripeScreen;
