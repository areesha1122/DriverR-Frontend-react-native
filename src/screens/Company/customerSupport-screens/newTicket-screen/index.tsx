import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  Text as Text2,
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
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {addSupportTicket} from 'src/redux/support-faqs/supportApiCalls';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import Modal from 'react-native-modal';
import {SetSupportTickets} from 'src/redux/support-faqs/supportAction';
import {getSupportTicket} from 'src/redux/support-faqs/supportSelector';
import Text from 'src/components/text';

const NewTicketScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch: any = useDispatch();

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const supportTickets = useSelector(getSupportTicket);

  // States
  const [companyName, setCompanyName] = useState('');
  const [companyError, setCompanyError] = useState('');

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Effects

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardOpen(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardOpen(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Functions
  const addTicket = async () => {
    console.log('supportTickets ===>', supportTickets);
    setShowSuccess(true), setCompanyName(''), setDescription('');
    dispatch(
      addSupportTicket(
        {
          user: profile._id,
          subject: companyName,
          userType: 'COMPANY',
          description: description,
        },
        (success, msg) => {
          if (success) {
            console.log('41: Success');

            setShowSuccess(true), setCompanyName(''), setDescription('');
          } else {
            console.log('Image', msg);
          }
          return true;
        },
      ),
    );
  };

  // Validators
  const checkFeilds = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    companyName.length < 3
      ? (setCompanyError('Enter valid subject with minimum 3 chracters'),
        Keyboard.dismiss())
      : description.length < 20
      ? (setDescriptionError('Enter valid description of your querry'),
        Keyboard.dismiss())
      : addTicket();

    //   dispatch(
    //   addSupportTicket(
    //     {
    //       user: profile._id,
    //       subject: companyName,
    //       userType: 'COMPANY',
    //       text: description,
    //       isReply: false,
    //     },
    //     (success, msg) => {
    //       if (success) {
    //         setShowSuccess(true);
    //         setCompanyName('');
    //         setDescription('');

    //         console.log('41: Success');
    //       } else {
    //         // setError(msg);
    //         // setShowError(true);
    //         console.log('Image', msg);
    //       }
    //       return true;
    //     },
    //   ),
    // ),
  };

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
            Create ticket
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 30 * heightRef,
            }}>
            <View>
              <TextInput
                label="Subject"
                value={companyName}
                onChangeText={text => {
                  setCompanyName(text);
                  setCompanyError('');
                }}
                mode="outlined"
                style={[styles.input, {height: 54 * heightRef}]}
                activeOutlineColor={
                  companyError ? colors.error : colors.primary
                }
                outlineColor={companyError ? colors.error : colors.darkGray}
                outlineStyle={{borderWidth: 2}}
                maxLength={120}
                keyboardType={keyboardTypes.default}
              />
              <Text
                language={language}
                style={{
                  marginVertical: 2 * heightRef,
                  color: colors.error,
                  marginLeft: '5%',
                }}>
                {companyError}
              </Text>
            </View>
          </View>

          <TextInput
            label="Description"
            value={description}
            onChangeText={text => {
              setDescription(text);
              setDescriptionError('');
            }}
            mode="outlined"
            style={[
              styles.input,
              {
                height: 110 * heightRef,
                textAlignVertical: 'top',
                marginBottom: 50,
              },
            ]}
            activeOutlineColor={
              descriptionError ? colors.error : colors.primary
            }
            outlineColor={descriptionError ? colors.error : colors.darkGray}
            outlineStyle={{borderWidth: 2}}
            keyboardType={keyboardTypes.default}
            multiline
            maxLength={500}
          />
          <Text
            language={language}
            style={{
              marginVertical: 0 * heightRef,
              color: colors.error,
              marginLeft: '5%',
              top: -45 * heightRef,
            }}>
            {descriptionError}
          </Text>
        </ScrollView>
        <View style={!isKeyboardOpen ? styles.bottomView : styles.bottomView2}>
          <Button
            onPress={() => {
              // navigation.navigate('CompanyInfoStep2Screen');
              checkFeilds();
            }}
            buttonText={'Create'}
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
        <Modal
          backdropOpacity={0.3}
          isVisible={showSuccess}
          onBackdropPress={() => {
            setShowSuccess(false);
          }}
          onSwipeComplete={() => {}}
          swipeDirection={['down']}
          style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              backgroundColor: colors.background,
              height: 350 * heightRef,
              width: fullWidth,
              alignSelf: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              top: 20,
            }}>
            <View
              style={{
                width: '97%',
                height: 25 * heightRef,

                marginTop: 10 * heightRef,
                alignItems: 'flex-end',
              }}>
              <Icon
                onPress={() => setShowSuccess(false)}
                name={'close'}
                type={IconType.AntDesign}
                size={22 * heightRef}
                color={colors.grey250}
              />
            </View>
            <View
              style={{
                width: '100%',
                // height: 25 * heightRef,

                marginTop: 10 * heightRef,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={styles.image6}
                resizeMode="contain"
                source={Images.support}
              />
              <Text language={language} style={[styles.text10]}>
                {'Request has been sent'}
              </Text>
              <Text
                language={language}
                numberOfLines={2}
                style={[
                  styles.text5,
                  {maxWidth: fullWidth * 0.75, textAlign: 'center'},
                ]}>
                {
                  'Thankyou for your request we will try to give you response within 24 hours a'
                }
              </Text>

              <Button
                onPress={() => {
                  navigation.goBack();
                }}
                buttonText={'Ok'}
                buttonHeight={40 * heightRef}
                buttonWidth={0.9 * fullWidth}
                buttonColor={colors.primary}
                iconSize={25}
                buttonCorners={20 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{marginTop: 20 * heightRef}}
              />
              {/* <View style={styles.bottomView2}>
                <Button
                  onPress={() => {
                    navigation.goBack();
                  }}
                  buttonText={'Yes'}
                  buttonHeight={40 * heightRef}
                  buttonWidth={0.9 * fullWidth}
                  buttonColor={colors.primary}
                  iconSize={25}
                  buttonCorners={20 * heightRef}
                  buttonPosition={Alignments.center}
                  titleFontStyle={fontWeights.h500}
                  buttonstyle={{marginTop: 10}}
                />
              </View> */}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default NewTicketScreen;
