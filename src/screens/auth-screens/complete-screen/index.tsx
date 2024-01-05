import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Linking,
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
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import PhoneInput from 'react-native-phone-number-input';
import DatePickerModal from 'src/components/datePicker';
import {useNavigation} from '@react-navigation/native';
import Text from 'src/components/text';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage} from 'src/redux/auth/authSelector';
import {getJobById} from 'src/redux/jobPosts/jobPostsApiCalls';

const CompleteProfileScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  // States

  // Selectors
  const language = useSelector(getLanguage);

  // Effects
  useLayoutEffect(() => {
    const handleOpenURL = (event: any) => {
      console.log('URL:', event.url, event.url.split('tirminator/')[1]);
      dispatch(
        getJobById(event.url.split('tirminator/')[1], (success, msg) => {
          if (success) {
            console.log('41: Success', msg);
            navigation.navigate('JobDetailScreen', {
              data: msg,
            });
          } else {
          }
          return true;
        }),
      );
      // Handle the URL as per your app's requirements
    };

    Linking.addEventListener('url', handleOpenURL);
  }, []);

  // Functions

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text language={language} style={styles.heading}>
          Complete your profile
        </Text>
        <Text language={language} style={styles.text2}>
          Thank you for creating an account with us! To unlock the full
          potential of our platform and apply for jobs, we need you to complete
          your profile.
        </Text>
        <Image style={styles.image} resizeMode="contain" source={Images.card} />
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              navigation.replace('MyDrawer');
            }}
            buttonText={'Skip for now'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={'#d3d3d3'}
            titleColor={'grey'}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{marginBottom: 10 * heightRef}}
          />
          <Button
            onPress={() => {
              navigation.navigate('PersonalInfoStep1Screen');
            }}
            buttonText={'Complete your profile'}
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
      </View>
    </SafeAreaView>
  );
};

export default CompleteProfileScreen;
