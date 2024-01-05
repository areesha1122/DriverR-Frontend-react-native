import React, {useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {manageProfile, selectLanguage} from 'src/redux/auth/authApiCalls';
import {getLanguage, getProfile, getUserId} from 'src/redux/auth/authSelector';
import AwesomeAlert from 'react-native-awesome-alerts';
import Text from 'src/components/text';
import {setLanguage} from 'src/redux/auth/authAction';

const SelectLanguageScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const languages = ['English', 'Romanian'];
  var successMsg = 'Language selected successfully';

  // Selectors
  const language = useSelector(getLanguage);
  const id = useSelector(getUserId);
  const profile = useSelector(getProfile);

  // States
  const [selectedLanguage, setSelectedLanguage] = useState(
    profile?.language || '',
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  // Effects

  // Functions
  const setLanguagee = async (language: string) => {
    dispatch(
      selectLanguage(
        {
          language: language,
          email: profile.email,
          userId: id,
        },
        (success, msg) => {
          if (success) {
            setShowSuccess(true);
            dispatch(setLanguage(language));
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
            Select language
          </Text>
        </View>
        <FlatList
          data={languages}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <View></View>}
          renderItem={({item, index}) => (
            <View
              onTouchEnd={() => {
                setSelectedLanguage(item);
                setLanguagee(item);
              }}
              style={
                selectedLanguage == item ? styles.selectedView : styles.mainView
              }>
              <Text
                language={language}
                style={selectedLanguage == item ? styles.text2 : styles.text}>
                {item}
              </Text>
            </View>
          )}
        />
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
        message={'Language selected successfully'}
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

export default SelectLanguageScreen;
