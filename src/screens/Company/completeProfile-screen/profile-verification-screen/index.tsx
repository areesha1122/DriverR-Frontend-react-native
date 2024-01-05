import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Image, SafeAreaView, Text, View} from 'react-native';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile, getUserId} from 'src/redux/auth/authSelector';
import {Images} from 'src/assets';
import {
  reset,
  setIsNewCompanyAction,
  setProfile,
  setUserId,
  setUserToken,
} from 'src/redux/auth/authAction';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {getCompanyProfile} from 'src/redux/auth/authApiCalls';
import {colors} from 'src/config/colors';
import {fullWidth, heightRef} from 'src/config/screenSize';
import Button, {Alignments} from 'src/components/button';
import {fontWeights} from 'src/config/fontWeight';
import {fontSizes} from 'src/config/fontSize';

const ProfileVerificationScreen = (props: any) => {
  // Variables
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  // States
  const [status, setStatus]: any = useState('');
  const [reason, setReason]: any = useState('');

  // Selectors
  const language = useSelector(getLanguage);
  let id = useSelector(getUserId);
  let profile = useSelector(getProfile);

  // Effects

  useLayoutEffect(() => {
    dispatch(
      getCompanyProfile(id, (success, msg) => {
        if (success) {
          console.log('41: Success');
          if (msg == 'APPROVE') {
            setStatus(msg);
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: 'MyDrawer',
                    params: {},
                  },
                ],
              }),
            );
          } else if (msg == 'REJECT' || msg == 'PENDING') {
            setStatus(msg);
            console.log('LOL');
          }
        } else {
          console.log('43: Fail');
        }
        return true;
      }),
    );
  }, []);

  // Functions

  // Validators

  // Screen Design
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            status == 'PENDING'
              ? '#132476CC'
              : status == 'REJECT'
              ? '#EF4444'
              : colors.background,
        },
      ]}>
      {status == 'PENDING' || status == 'REJECT' ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={styles.truckImage}
            resizeMode="contain"
            source={status == 'REJECT' ? Images.reject : Images.complete}
          />
          <Text language={language} style={styles.heading}>
            {status == 'PENDING'
              ? 'Verification pending'
              : status == 'REJECT'
              ? 'Your account is not approved'
              : 'white'}
          </Text>
          <Text language={language} style={styles.heading2}>
            {status == 'PENDING'
              ? 'Your profile is under review you will get access once it will be approved'
              : status == 'REJECT'
              ? profile?.causeOfRejection?.title +
                ' : ' +
                profile?.causeOfRejection?.description
              : 'white'}
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.truckImage2}
            resizeMode="contain"
            source={Images.logoD}
          />
          <Text language={language} style={styles.heading3}>
            TIRminator
          </Text>
        </View>
      )}
      {status == 'PENDING' ? null : status == 'REJECT' ? (
        <View>
          <Button
            onPress={() => {
              navigation.navigate('CompanyInfoStep1Screen');
            }}
            buttonText={'Update request'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            borderColor={colors.primary}
            iconSize={25}
            isLoading={false}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{marginTop: 40 * heightRef}}
          />
          <Text
            onPress={() => {
              dispatch(reset());
            }}
            style={{
              alignSelf: 'center',
              marginTop: 15 * heightRef,
              textDecorationLine: 'underline',
              fontSize: fontSizes.f14,
              fontWeight: fontWeights.h500,
              color: colors.primary,
            }}>
            Logout
          </Text>
        </View>
      ) : (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={{marginBottom: 30 * heightRef}}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileVerificationScreen;
