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
import {addJobPost, getJobPosts} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getLanguage, getProfile, getUserId} from 'src/redux/auth/authSelector';
import AwesomeAlert from 'react-native-awesome-alerts';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EditJobPostScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch: any = useDispatch();
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
  const equipment = [
    'Tautliner & Box (3.5 Ton)',
    'Tautliner & Box (7.5 Ton)',
    'Tautliner & Box (12 Ton)',
    'Tautliner',
    'Box',
    'Frigo',
    'Bulk',
    'Oversized',
    'Car transporter',
    'Chassie for the container',
    'Jumbo (40 Ton)',
  ];

  // States
  const [jobTitle, setJobTitle] = useState(route.params.data.title || '');
  const [jobTitleError, setJobTitleError] = useState('');
  const [reqExperince, setReqExperince] = useState(
    route.params.data.requiredExperience || '',
  );
  const [reqExperinceError, setReqExperinceError] = useState('');
  const [medicalInsuranceOpen, setMedicalInsuranceOpen] = useState(false);
  const [medicalInsuranceError, setMedicalInsuranceError] = useState('');
  const [medicalInsuranceValue, setMedicalInsuranceValue] = useState(
    route.params.data.medicalInsuranceRequired == false ? false : true || null,
  );
  const [medicalInsuranceItems, setMedicalInsuranceItems] = useState([
    {label: 'Yes', value: true},
    {label: 'No', value: false},
  ]);
  const [licenseReqOpen, setLicenseReqOpen] = useState(false);
  const [licenseReqError, setLicenseReqError] = useState('');
  const [licenseReqValue, setLicenseReqValue] = useState(
    route.params.data.licenseRequired == false ? false : true || null,
  );
  const [licenseReqItems, setLicenseReqItems] = useState([
    {label: 'Yes', value: true},
    {label: 'No', value: false},
  ]);

  const [routeTypeOpen, setRouteTypeOpen] = useState(false);
  const [routeTypeError, setRouteTypeError] = useState('');
  const [routeTypeValue, setRouteTypeValue] = useState(
    route.params.data.routeType || null,
  );
  const [routeTypeItems, setRouteTypeItems]: any = useState([]);

  const [equipmentTypeOpen, setEquipmentTypeOpen] = useState(false);
  const [equipmentTypeError, setEquipmentTypeError] = useState('');
  const [equipmentTypeValue, setEquipmentTypeValue] = useState(
    route.params.data.equipmentType || null,
  );
  const [equipmentTypeItems, setEquipmentTypeItems]: any = useState([]);

  const [description, setDescription] = useState(
    route.params.data.jobDescription || '',
  );
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
  console.log('---->>>', JSON.stringify(route.params.data, null, 2));
  useEffect(() => {
    setRouteTypeItems(
      routes.map(item => ({
        label: item,
        value: item,
      })),
    );
    setEquipmentTypeItems(
      equipment.map(item => ({
        label: item,
        value: item,
      })),
    );
  }, []);

  // Functions
  const addJobPosts = async () => {
    setLoader(true);
    dispatch(
      addJobPost(
        {
          companyId: profile._id,
          jobId: route.params.data._id,
          title: jobTitle,
          requiredExperience: reqExperince,
          routeType: routeTypeValue,
          equipmentType: equipmentTypeValue,
          licenseRequired: licenseReqValue,
          medicalInsuranceRequired: medicalInsuranceValue,
          jobDescription: description,
        },
        (success, msg) => {
          if (success) {
            dispatch(
              getJobPosts(undefined, (success, msg) => {
                if (success) {
                  setShowSuccess(true);
                  setLoader(false);
                  console.log('41: Success');
                } else {
                  setError(msg);
                  // setShowError(true);
                  setLoader(false);
                  console.log('Image', msg);
                }
                return true;
              }),
            );
            // setShowSuccess(true);
            // setLoader(false);
            // console.log('41: Success');
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
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    jobTitle.length < 3
      ? setJobTitleError('Enter valid job title with minimum 3 chracters')
      : reqExperince == ''
      ? setReqExperinceError('Enter valid required experince')
      : parseInt(reqExperince) > 50
      ? setReqExperinceError(
          'Enter valid required experince less than 50 years',
        )
      : licenseReqValue == null
      ? setLicenseReqError('Select valid option for license requirment')
      : routeTypeValue == null
      ? setRouteTypeError('Select valid option for route type')
      : equipmentTypeValue == null
      ? setEquipmentTypeError('Select valid option for equipment type')
      : medicalInsuranceValue == null
      ? setMedicalInsuranceError('Select valid option for equipment type')
      : description.length < 20
      ? setDescriptionError('Enter valid description of your job post')
      : addJobPosts();
  };

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
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
                iconName={'cross'}
                iconType={'Entypo'}
              />
              <Text language={language} style={styles.heading}>
                Edit job post
              </Text>
            </View>

            <ScrollView>
              <View
                style={{
                  marginTop: 0 * heightRef,
                }}>
                <View>
                  <TextInput
                    label="Job title"
                    value={jobTitle}
                    onChangeText={text => {
                      setJobTitle(text);
                      setJobTitleError('');
                    }}
                    mode="outlined"
                    style={[styles.input, {height: 54 * heightRef}]}
                    activeOutlineColor={
                      jobTitleError ? colors.error : colors.primary
                    }
                    onFocus={() => {
                      setLicenseReqOpen(false),
                        setRouteTypeOpen(false),
                        setEquipmentTypeOpen(false),
                        setMedicalInsuranceOpen(false);
                    }}
                    outlineColor={
                      jobTitleError ? colors.error : colors.darkGray
                    }
                    outlineStyle={{borderWidth: 2}}
                    maxLength={100}
                    keyboardType={keyboardTypes.default}
                  />
                  <Text
                    style={{
                      marginVertical: 2 * heightRef,
                      color: colors.error,
                      marginLeft: '5%',
                    }}>
                    {jobTitleError}
                  </Text>
                </View>
                <View>
                  <TextInput
                    label="Required experience"
                    value={reqExperince}
                    onChangeText={text => {
                      setReqExperince(text);
                      setReqExperinceError('');
                    }}
                    mode="outlined"
                    style={[styles.input, {height: 54 * heightRef}]}
                    activeOutlineColor={
                      reqExperinceError ? colors.error : colors.primary
                    }
                    outlineColor={
                      reqExperinceError ? colors.error : colors.darkGray
                    }
                    onFocus={() => {
                      setLicenseReqOpen(false),
                        setRouteTypeOpen(false),
                        setEquipmentTypeOpen(false),
                        setMedicalInsuranceOpen(false);
                    }}
                    outlineStyle={{borderWidth: 2}}
                    maxLength={2}
                    keyboardType={keyboardTypes.numeric}
                  />
                  <Text
                    style={{
                      marginVertical: 2 * heightRef,
                      color: colors.error,
                      marginLeft: '5%',
                    }}>
                    {reqExperinceError}
                  </Text>
                </View>
              </View>

              <View style={{height: licenseReqOpen ? 135 * heightRef : 60}}>
                {licenseReqValue != undefined ? (
                  <View style={{zIndex: 2000}}>
                    <Text language={language} style={styles.textHead}>
                      License required
                    </Text>
                  </View>
                ) : null}
                <DropDownPicker
                  open={licenseReqOpen}
                  value={licenseReqValue}
                  items={licenseReqItems}
                  setOpen={() => setLicenseReqOpen(!licenseReqOpen)}
                  onOpen={() => {
                    setLicenseReqOpen(true);
                    setLicenseReqError('');

                    setRouteTypeOpen(false),
                      setEquipmentTypeOpen(false),
                      setMedicalInsuranceOpen(false);
                  }}
                  onClose={() => setLicenseReqOpen(false)}
                  setValue={setLicenseReqValue}
                  setItems={setLicenseReqItems}
                  multiple={false}
                  zIndex={-2000}
                  placeholder="License Required"
                  style={[
                    styles.containerBox,

                    {
                      marginTop: 5 * heightRef,
                      borderColor: licenseReqError
                        ? colors.error
                        : colors.darkGray,
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
                    width: '94%',
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
                  {licenseReqError}
                </Text>
              </View>

              <View
                style={{
                  height: routeTypeOpen ? 255 * heightRef : 60,
                  marginTop: 5 * heightRef,
                }}>
                {routeTypeValue ? (
                  <Text
                    language={language}
                    style={[styles.textHead, {top: 12 * heightRef}]}>
                    Route type
                  </Text>
                ) : null}
                <DropDownPicker
                  open={routeTypeOpen}
                  value={routeTypeValue}
                  items={routeTypeItems}
                  setOpen={() => setRouteTypeOpen(!routeTypeOpen)}
                  zIndex={-2000}
                  onOpen={() => {
                    setRouteTypeOpen(true);
                    setRouteTypeError('');
                    setLicenseReqOpen(false),
                      setEquipmentTypeOpen(false),
                      setMedicalInsuranceOpen(false);
                  }}
                  onClose={() => setRouteTypeOpen(false)}
                  setValue={setRouteTypeValue}
                  setItems={setRouteTypeItems}
                  multiple={false}
                  placeholder="Route type"
                  listMode="MODAL"
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
                      borderColor: routeTypeError
                        ? colors.error
                        : colors.darkGray,
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
                    width: '93.5%',
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

              <Text
                style={{
                  color: colors.error,
                  marginLeft: '5%',
                  marginBottom: -15 * heightRef,
                  marginTop: 2,
                  zIndex: -1000,
                }}>
                {licenseReqError}
              </Text>

              <View
                style={{
                  height: equipmentTypeOpen ? 265 * heightRef : 60,
                  marginTop: 20 * heightRef,
                }}>
                {equipmentTypeValue ? (
                  <Text
                    language={language}
                    style={[styles.textHead, {top: 12 * heightRef}]}>
                    Equipment type
                  </Text>
                ) : null}
                <DropDownPicker
                  open={equipmentTypeOpen}
                  value={equipmentTypeValue}
                  items={equipmentTypeItems}
                  zIndex={-2000}
                  setOpen={() => setEquipmentTypeOpen(!equipmentTypeOpen)}
                  onOpen={() => {
                    setEquipmentTypeOpen(true);
                    setEquipmentTypeError('');
                    setLicenseReqOpen(false),
                      setRouteTypeOpen(false),
                      setMedicalInsuranceOpen(false);
                  }}
                  onClose={() => setEquipmentTypeOpen(false)}
                  setValue={setEquipmentTypeValue}
                  setItems={setEquipmentTypeItems}
                  multiple={false}
                  listMode="MODAL"
                  searchContainerStyle={{
                    borderBottomColor: 'transparent',
                  }}
                  searchTextInputStyle={{borderWidth: 0}}
                  searchPlaceholder="Select equipment type"
                  closeIconStyle={{height: 15, width: 15}}
                  searchable
                  placeholder="Equipment type"
                  style={[
                    styles.containerBox,
                    {
                      zIndex: -1000,
                      marginTop: 20,
                      borderColor: equipmentTypeError
                        ? colors.error
                        : colors.darkGray,
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
                    width: '93.5%',
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
                  {equipmentTypeError}
                </Text>
              </View>

              <View
                style={{
                  height: medicalInsuranceOpen ? 135 * heightRef : 60,
                  marginTop: 20 * heightRef,
                }}>
                {medicalInsuranceValue != undefined ? (
                  <View style={{zIndex: 2000}}>
                    <Text
                      language={language}
                      style={[styles.textHead, {top: 12 * heightRef}]}>
                      Medical insurance required
                    </Text>
                  </View>
                ) : null}
                <DropDownPicker
                  open={medicalInsuranceOpen}
                  value={medicalInsuranceValue}
                  items={medicalInsuranceItems}
                  zIndex={-2000}
                  setOpen={() => setMedicalInsuranceOpen(!medicalInsuranceOpen)}
                  onOpen={() => {
                    setMedicalInsuranceOpen(true);
                    setMedicalInsuranceError('');
                    setLicenseReqOpen(false),
                      setRouteTypeOpen(false),
                      setEquipmentTypeOpen(false);
                  }}
                  onClose={() => setMedicalInsuranceOpen(false)}
                  setValue={setMedicalInsuranceValue}
                  setItems={setMedicalInsuranceItems}
                  multiple={false}
                  placeholder="Medical Insurance"
                  style={[
                    styles.containerBox,
                    {
                      zIndex: -1000,
                      marginTop: 20,
                      borderColor: medicalInsuranceError
                        ? colors.error
                        : colors.darkGray,
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
                    width: '93.5%',
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
                  {medicalInsuranceError}
                </Text>
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
                    marginTop: 30 * heightRef,
                    marginBottom: 60 * heightRef,
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
                  marginVertical: 2 * heightRef,
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
              buttonText={'Continue'}
              buttonHeight={40 * heightRef}
              buttonWidth={0.9 * fullWidth}
              buttonColor={colors.primary}
              iconSize={25}
              isLoading={loader}
              disable={loader}
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
          message={'Job post updated successfully'}
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditJobPostScreen;
