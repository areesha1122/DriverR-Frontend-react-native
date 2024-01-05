import React, {useEffect, useLayoutEffect} from 'react';
import {Image, SafeAreaView, Text as Text1, View} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import {fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setAccountType} from 'src/redux/auth/authAction';
import Text from 'src/components/text';
import {getLanguage} from 'src/redux/auth/authSelector';

const AccountTypeScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // States

  // Selectors
  const language = useSelector(getLanguage);

  // Effects

  // Functions

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
          iconName={'arrow-back-sharp'}
          iconType={'Ionicons'}
        />
        <Text language={language} style={styles.heading}>
          What kind of account would you like to create?
        </Text>

        <View
          onTouchStart={() => {
            dispatch(setAccountType('Driver'));
            navigation.navigate('RegisterScreen');
          }}
          style={styles.mainView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={Images.personIcon}
              />
            </View>
            <View style={{marginLeft: 15 * widthRef}}>
              <Text language={language} style={styles.text1}>
                Driver account
              </Text>
              <Text language={language} style={styles.text2}>
                Search, apply and get hired.
              </Text>
            </View>
          </View>
          <Icon
            name={'navigate-next'}
            type={IconType.MaterialIcons}
            size={28}
            color={'#6A6A6A'}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View
          onTouchStart={() => {
            dispatch(setAccountType('Company'));
            navigation.navigate('RegisterScreen');
          }}
          style={styles.mainView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={Images.buildingIcon}
              />
            </View>
            <View style={{marginLeft: 15 * widthRef}}>
              <Text language={language} style={styles.text1}>
                Company account
              </Text>
              <Text language={language} style={styles.text2}>
                Post, filter and hire a truck driver.
              </Text>
            </View>
          </View>
          <Icon
            name={'navigate-next'}
            type={IconType.MaterialIcons}
            size={28}
            color={colors.grey300}
            style={{alignSelf: 'center'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountTypeScreen;
