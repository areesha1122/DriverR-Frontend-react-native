import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Image, Platform, SafeAreaView, Text, View} from 'react-native';
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
import {fontSizes} from 'src/config/fontSize';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFeedbackk,
  addJobPost,
  getJobApplicationsByJob,
  getJobPosts,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getLanguage, getProfile, getUserId} from 'src/redux/auth/authSelector';
import AwesomeAlert from 'react-native-awesome-alerts';
import {ScrollView} from 'react-native-gesture-handler';

const AddFeedbackScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const route: any = useRoute();

  // States

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [loader, setLoader] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);
  const id = useSelector(getUserId);
  const profile = useSelector(getProfile);

  // Effects

  // Functions
  const addFeedBack = async () => {
    setLoader(true);
    dispatch(
      addFeedbackk(
        {
          jobApplicationId: route.params.data._id,
          feedback: description,
        },
        (success, msg) => {
          if (success) {
            dispatch(
              getJobApplicationsByJob(
                route.params.data.jobId._id,
                (success, msg) => {
                  if (success) {
                    console.log('41: Success');
                    navigation.goBack();
                  } else {
                    // setDeletePost(false);
                    console.log('Image', msg);
                  }
                  return true;
                },
              ),
            );
          } else {
            setError(msg);
            // setShowError(true);
            setLoader(false);
            console.log('Image', msg);
          }
          return true;
        },
      ),
    );
  };

  // Validators;
  const checkFeilds = () => {
    description.length < 5
      ? setDescriptionError('Enter internal notes of your job post')
      : addFeedBack();
  };

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
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
              Internal notes
            </Text>
          </View>
          <ScrollView>
            <TextInput
              label="Internal notes"
              value={description}
              autoFocus
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
                  marginTop: 30 * heightRef,
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
              maxLength={1000}
            />
            <Text
              style={{
                marginVertical: 0 * heightRef,
                color: colors.error,
                marginLeft: '5%',
              }}>
              {descriptionError}
            </Text>
          </ScrollView>
        </View>

        <View style={{flex: 1, width: fullWidth}}></View>
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              checkFeilds();
            }}
            buttonText={'Send'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            isLoading={loader}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{}}
          />
        </View>
        {Platform.OS == 'android' ? (
          <View style={styles.bottomView2}></View>
        ) : null}
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
        message={'Job post added successfully'}
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

export default AddFeedbackScreen;
