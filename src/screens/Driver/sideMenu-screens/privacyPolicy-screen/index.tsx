import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text as Text1, View} from 'react-native';
import {styles} from './styles';
import {heightRef} from 'src/config/screenSize';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getPrivacyPolicy} from 'src/redux/auth/authApiCalls';
import {getLanguage, getUserId} from 'src/redux/auth/authSelector';
import Text from 'src/components/text';

const PrivacyPolicyScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // States
  const [policy, setPolicy] = useState('');

  // Selectors
  const language = useSelector(getLanguage);
  const id = useSelector(getUserId);

  // Effects
  useEffect(() => {
    getPrivacyPolicyy();
  }, []);

  // Functions
  const getPrivacyPolicyy = async () => {
    dispatch(
      getPrivacyPolicy(id, (success, msg) => {
        if (success) {
          console.log('41: Success');
          setPolicy(msg);
        } else {
          console.log(msg);
        }
        return true;
      }),
    );
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Button
            onPress={() => {
              navigation.goBack();
              navigation.openDrawer();
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
            Privacy Policy
          </Text>
        </View>
        <Text language={language} style={styles.text}>
          1. Introduction
        </Text>
        <Text language={language} style={styles.text2}>
          {policy + '. '}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. When an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. When an unknown printer took a
          galley of type and scrambled it to make a type specimen book. It has
          survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
