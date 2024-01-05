import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import DatePickerModal from 'src/components/datePicker';
import {keyboardTypes} from 'src/components/inputFeild';
import {useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';

const PersonalInfoStep2Screen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const profile = useSelector(getProfile);

  const routes = [
    'Albania',
    'Andorra',
    'Austria',
    'Belarus',
    'Belgium',
    'Bulgaria',
    'Croația',
    'Czech Republic',
    'Denmark',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Italy',
    'Luxemburg',
    'Macedonia',
    'Moldova',
    'Netherlands',
    'Norway',
    'Poland',
    'Portugalia',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'Ucraina',
    'United Kingdom',
  ];

  // States
  const [experience, setExperience] = useState(
    profile?.drivingExperience || '',
  );
  const [experienceError, setExperienceError] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [preferredLocationError, setPreferredLocationError] = useState('');
  const [employemntOpen, setEmploymentOpen] = useState(false);
  const [employmentValue, setEmploymentValue] = useState(
    profile?.employmentStatus || null,
  );
  const [employmentError, setEmploymentError] = useState('');
  const [employmentItems, setEmploymentItems] = useState([
    {label: 'Employed', value: 'Employed'},
    {label: 'Unemployed', value: 'Unemployed'},
  ]);

  const [routeTypeOpen, setRouteTypeOpen] = useState(false);
  const [routeTypeError, setRouteTypeError] = useState('');
  const [routeTypeValue, setRouteTypeValue] = useState(
    profile?.preferredLocation || null,
  );
  const [routeTypeItems, setRouteTypeItems]: any = useState(routes);

  // Selectors
  const language = useSelector(getLanguage);

  // Effects
  useEffect(() => {
    setRouteTypeItems(
      routes.map(item => ({
        label: item,
        value: item,
      })),
    );
  }, []);

  // Functions

  // Validators
  const checkFeilds = () => {
    employmentValue == null
      ? setEmploymentError('Select your employment status')
      : experience == ''
      ? setExperienceError('Enter your number of years as experience')
      : parseInt(experience) > 50
      ? setExperienceError('Your experience must be less than 50 years')
      : routeTypeValue == null
      ? setPreferredLocationError('Select valid preferred location')
      : navigation.navigate('PersonalInfoStep3Screen', {
          data: {
            ...route?.params.data,
            employmentStatus: employmentValue,
            drivingExperience: parseInt(experience),
            preferredLocation: routeTypeValue,
          },
        });
  };

  // Screen Design
  return (
    <SafeAreaView
      style={styles.container}
      onStartShouldSetResponder={() => {
        Keyboard.dismiss();
        return false;
      }}>
      <View style={styles.container}>
        <View onTouchStart={() => setEmploymentOpen(false)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              Other information
            </Text>
          </View>
          <View style={styles.pageView}>
            <View
              style={[
                styles.pageInnerView,
                {backgroundColor: colors.secondary1},
              ]}
            />
            <View
              style={[
                styles.pageInnerView,
                {backgroundColor: colors.secondary1},
              ]}
            />
            <View style={styles.pageInnerView} />
          </View>
        </View>

        <View
          style={{
            height: employemntOpen ? 135 * heightRef : 60,
            marginTop: 20 * heightRef,
          }}>
          {employmentValue != undefined ? (
            <View style={{zIndex: 2000}}>
              <Text language={language} style={styles.textHead}>
                Employment Status
              </Text>
            </View>
          ) : null}
          <DropDownPicker
            open={employemntOpen}
            value={employmentValue}
            items={employmentItems}
            setOpen={() => setEmploymentOpen(!employemntOpen)}
            onOpen={() => {
              setEmploymentError('');
              setEmploymentOpen(true);
            }}
            onClose={() => setEmploymentOpen(false)}
            setValue={setEmploymentValue}
            setItems={setEmploymentItems}
            multiple={false}
            zIndex={-2000}
            placeholder="Employment Status"
            style={[
              styles.containerBox,

              {
                marginTop: 5 * heightRef,
                borderColor: employmentError ? colors.error : colors.darkGray,
              },
            ]}
            dropDownDirection="BOTTOM"
            placeholderStyle={{
              color: '#474952',
              fontSize: 16 * fontRef,
            }}
            labelStyle={{
              fontSize: 15 * fontRef,
              color: 'black',
            }}
            dropDownContainerStyle={{
              borderColor: colors.darkGray,
              width: '88.5%',
              marginLeft: '5.5%',
              borderWidth: 0,
              marginTop: 5 * heightRef,
              zIndex: 1000,
              elevation: 3,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              backgroundColor: colors.background,
              overflow: 'visible',
            }}
          />
          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {employmentError}
          </Text>
        </View>

        <TextInput
          label="Experience"
          value={experience}
          onChangeText={text => {
            setExperience(text);
            setExperienceError('');
          }}
          mode="outlined"
          style={[styles.input, {height: 54 * heightRef, zIndex: -2000}]}
          activeOutlineColor={experienceError ? colors.error : colors.primary}
          outlineColor={experienceError ? colors.error : colors.darkGray}
          outlineStyle={{borderWidth: 2}}
          keyboardType={keyboardTypes.number_pad}
          maxLength={2}
          selectionColor={colors.secondary1}
          cursorColor={colors.secondary1}
        />
        <Text
          style={{
            marginVertical: 2 * heightRef,
            color: colors.error,
            marginLeft: '5%',
          }}>
          {experienceError}
        </Text>
        {/* <View onTouchStart={() => setEmploymentOpen(false)}>
          <View>
            <TextInput
              label="Preferred location"
              value={preferredLocation}
              onChangeText={text => {
                setPreferredLocation(text);
                setPreferredLocationError('');
              }}
              mode="outlined"
              style={[
                styles.input,
                {
                  height: 54 * heightRef,
                  zIndex: -2000,
                  marginTop: 0,
                  paddingLeft: 13,
                },
              ]}
              activeOutlineColor={
                preferredLocationError ? colors.error : colors.primary
              }
              outlineColor={
                preferredLocationError ? colors.error : colors.darkGray
              }
              outlineStyle={{borderWidth: 2}}
              keyboardType={keyboardTypes.default}
              maxLength={80}
            />
            <Icon
              name={'search'}
              type={IconType.EvilIcons}
              size={25 * heightRef}
              color={colors.grey250}
              style={{
                position: 'absolute',
                left: 25 * widthRef,
                bottom: Platform.OS == 'ios' ? 15 * heightRef : 20 * heightRef,
              }}
            />
          </View>

          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {preferredLocationError}
          </Text>
        </View> */}
        <View
          style={{
            height: routeTypeOpen ? 255 * heightRef : 60,
            marginTop: -15 * heightRef,
          }}>
          {routeTypeValue ? (
            <Text
              language={language}
              style={[styles.textHead, {top: 12 * heightRef}]}>
              Preferred location
            </Text>
          ) : null}
          <DropDownPicker
            open={routeTypeOpen}
            value={routeTypeValue}
            items={routeTypeItems}
            setOpen={() => setRouteTypeOpen(!routeTypeOpen)}
            onOpen={() => {
              setRouteTypeOpen(true);
              setRouteTypeError('');
            }}
            onClose={() => setRouteTypeOpen(false)}
            setValue={setRouteTypeValue}
            setItems={setRouteTypeItems}
            multiple={false}
            placeholder="Preferred location"
            listMode="MODAL"
            zIndex={-2000}
            searchContainerStyle={{
              borderBottomColor: 'transparent',
            }}
            searchTextInputStyle={{borderWidth: 0}}
            searchPlaceholder="Select route type"
            closeIconStyle={{height: 15, width: 15}}
            searchable
            style={[
              styles.containerBox,
              {
                zIndex: -1000,
                marginTop: 20,
                borderColor: routeTypeError ? colors.error : colors.darkGray,
              },
            ]}
            dropDownDirection="BOTTOM"
            placeholderStyle={{
              color: '#474952',
              fontSize: 16 * fontRef,
            }}
            labelStyle={{
              fontSize: 15 * fontRef,
              color: 'black',
            }}
            dropDownContainerStyle={{
              borderColor: colors.darkGray,
              width: '90%',
              marginLeft: '5.5%',
              borderWidth: 0,
              marginTop: 21 * heightRef,
              zIndex: 1000,
              elevation: 3,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              backgroundColor: colors.background,
              overflow: 'visible',
            }}
          />
          <Text
            style={{
              marginVertical: 2 * heightRef,
              color: colors.error,
              marginLeft: '5%',
            }}>
            {routeTypeError}
          </Text>
        </View>
        <View
          onTouchStart={() => setEmploymentOpen(false)}
          style={{flex: 1, width: fullWidth}}></View>
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              checkFeilds();
            }}
            buttonText={'Continue'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{}}
          />
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfoStep2Screen;
