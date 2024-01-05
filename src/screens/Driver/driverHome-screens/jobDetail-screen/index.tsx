import React, {useEffect, useState} from 'react';
import {
  Clipboard,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  ViewComponent,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import Button, {Alignments} from 'src/components/button';
import {fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import InputFeild from 'src/components/inputFeild';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {fontSizes} from 'src/config/fontSize';
import Modal from 'react-native-modal';
import {fontWeights} from 'src/config/fontWeight';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ApplyForJob} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getLanguage, getProfile, getUserId} from 'src/redux/auth/authSelector';
import AwesomeAlert from 'react-native-awesome-alerts';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Text from 'src/components/text';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';

const JobDetailScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch: any = useDispatch();

  // States
  const [share, setShare] = useState(false);
  const [loader, setLoader] = useState(false);
  const [apply, setApply] = useState(false);
  const [profileComplete, setProfileComplete] = useState(
    useSelector(getProfile),
  );
  const [showFull, setShowFull] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorMsg2, setErrorMsg2] = useState('');
  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);

  // Effects
  useEffect(() => {
    console.log(JSON.stringify(route.params.data, null, 2));
  }, []);

  // Functions
  const renderJobs = () => {
    return (
      <FlatList
        data={[1, 2, 3]}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',

          marginTop: 15 * heightRef,
        }}
        ListEmptyComponent={() => <View></View>}
        renderItem={({item, index}) => (
          <View key={item} style={[styles.jobCard, styles.shadow]}>
            <Image
              style={styles.image4}
              resizeMode="contain"
              source={Images.logo2}
            />
            <View style={{marginLeft: 10 * widthRef}}>
              <Text language={language} style={styles.text6}></Text>
              <Text language={language} style={styles.text7}>
                Full time
              </Text>
            </View>
            <Text language={language} style={styles.text8}>
              8 hours ago
            </Text>
          </View>
        )}
      />
    );
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          isButtonText={false}
          buttonHeight={33 * heightRef}
          buttonWidth={33 * heightRef}
          isIcon
          buttonColor={colors.background}
          iconSize={20 * heightRef}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.flex_start}
          buttonstyle={{marginTop: 10 * heightRef, marginLeft: 15 * widthRef}}
          iconName={'arrow-back-sharp'}
          iconType={'Ionicons'}
        />
        <Button
          onPress={() => {
            setShare(true);
          }}
          isButtonText={false}
          buttonHeight={33 * heightRef}
          buttonWidth={33 * heightRef}
          isIcon
          buttonColor={colors.background}
          iconSize={15 * heightRef}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.flex_start}
          buttonstyle={{marginTop: 10 * heightRef, marginRight: 15 * widthRef}}
          iconName={'share'}
          iconType={'Entypo'}
        />
        <Image
          style={styles.image3}
          resizeMode="cover"
          // source={Images.logo2}
          source={{uri: route?.params?.data?.companyId?.profilePicture}}
        />
      </View>
      <View
        style={{
          width: '93%',
        }}>
        <Text language={language} style={styles.text3}>
          {route?.params?.data?.companyId?.name || ''}
        </Text>
        <View style={{position: 'absolute', right: 0, bottom: 0}}>
          <Button
            onPress={() => {
              console.log(profile.profileStatus);
              if (profile.profileStatus == 'PENDING') {
                setError2(true);
                setErrorMsg2(
                  'You cannot apply to the job as your verification is pending.',
                );
              } else if (profile.profileStatus == 'REJECT') {
                setError2(true);
                setErrorMsg2(
                  'You cannot apply to the job as your profile is rejected by admin.',
                );
              } else {
                setApply(true);
              }
            }}
            buttonHeight={35 * heightRef}
            buttonWidth={75 * widthRef}
            buttonColor={colors.primary}
            buttonText="Apply"
            titleFontSize={fontSizes.f12}
            buttonCorners={9 * heightRef}
          />
        </View>
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 20, width: '90%'}}>
        <Text language={language} style={styles.text4}>
          Registration Number
        </Text>
        <Text language={language} style={styles.text5}>
          {' '}
          {route.params.data.companyId.registrationNumber}
        </Text>
        <Text language={language} style={styles.text4}>
          Company Size
        </Text>
        <Text language={language} style={styles.text5}>
          {' '}
          {route.params.data.companyId.companySize} employees
        </Text>
        <Text language={language} style={styles.text4}>
          Founded
        </Text>
        <Text language={language} style={styles.text5}>
          {' '}
          {moment(route.params.data.companyId.establishDate).format(
            'DD-MM-YYYY',
          )}
        </Text>
        <Text language={language} style={styles.text4}>
          Location
        </Text>
        <Text language={language} style={styles.text5}>
          {route.params.data.companyId.address}
        </Text>
        {/* <Text language={language} style={[styles.text4, {color: colors.info}]}>
          Get directions
          <Icon
            name={'arrow-up-right'}
            type={IconType.Feather}
            size={14 * heightRef}
            color={colors.info}
            style={{
              position: 'absolute',
              right: 0 * widthRef,
              top: 5 * heightRef,
              zIndex: 1,
            }}
          />
        </Text> */}
        {showFull ? (
          <View>
            <Text language={language} style={styles.text4}>
              Description
            </Text>
            <Text language={language} style={styles.text5}>
              {route.params.data.companyId.aboutInfo}
            </Text>
            <Text language={language} style={styles.text3a}>
              {route.params.data.title}
            </Text>
            <Text language={language} style={styles.text4}>
              Experience required{' '}
            </Text>
            <Text language={language} style={[styles.text5, {marginLeft: 15}]}>
              {route.params.data.requiredExperience} + years
            </Text>
            <Text language={language} style={styles.text4}>
              Equipment type{' '}
            </Text>
            <Text language={language} style={[styles.text5, {marginLeft: 15}]}>
              {route.params.data.equipmentType}
            </Text>
            <Text language={language} style={styles.text4}>
              Route type{' '}
            </Text>
            <Text language={language} style={[styles.text5, {marginLeft: 15}]}>
              {route.params.data.routeType}
            </Text>
            <Text language={language} style={styles.text4}>
              License required
            </Text>
            <Text language={language} style={[styles.text5, {marginLeft: 15}]}>
              {route.params.data.licenseRequired ? 'Yes' : 'No'}
            </Text>
            <Text language={language} style={styles.text4}>
              Medical insurance required{' '}
            </Text>
            <Text language={language} style={[styles.text5, {marginLeft: 15}]}>
              {' '}
              {route.params.data.medicalInsuranceRequired ? 'Yes' : 'No'}
            </Text>
            <Text language={language} style={styles.text4}>
              Job description{' '}
            </Text>
            <Text language={language} style={[styles.text5]}>
              {' '}
              {route.params.data.jobDescription}
            </Text>

            {/* <Text language={language} style={[styles.text4, {color: colors.info}]}>
              Get directions
              <Icon
                name={'arrow-up-right'}
                type={IconType.Feather}
                size={14 * heightRef}
                color={colors.info}
                style={{
                  position: 'absolute',
                  right: 0 * widthRef,
                  top: 5 * heightRef,
                  zIndex: 1,
                }}
              />
            </Text> */}
          </View>
        ) : null}
        {/* <Text
          style={{backgroundColor: 'red'}}
          onPress={() => setShowFull(!showFull)}
          style={styles.textShow}>
          {!showFull ? 'See all details' : 'See less details'}
        </Text> */}
        <View
          style={{
            backgroundColor: '#F2F4FF',
            width: 0.3 * fullWidth,
            alignSelf: 'center',
            marginTop: 4 * heightRef,
            paddingBottom: 5,
            borderRadius: 20 * heightRef,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{padding: 0}}
            onPress={() => setShowFull(!showFull)}
            style={[styles.text6, {color: colors.primary}]}>
            {showFull ? 'See less details' : 'See all details'}
          </Text>
          <Icon
            name={showFull ? 'up' : 'down'}
            type={IconType.AntDesign}
            size={13}
            color={colors.primary}
            style={{
              alignSelf: 'center',
              top: 2 * heightRef,
              marginLeft: 2 * widthRef,
            }}
          />
        </View>
      </ScrollView>
      <Modal
        backdropOpacity={0.3}
        isVisible={share}
        onBackdropPress={() => {
          setShare(false);
        }}
        onSwipeComplete={() => {}}
        swipeDirection={['down']}
        style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            backgroundColor: colors.background,
            height: 200,
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
              onPress={() => setShare(false)}
              name={'close'}
              type={IconType.AntDesign}
              size={22 * heightRef}
              color={colors.grey250}
            />
          </View>
          <View
            style={{
              width: '95%',
              // height: 25 * heightRef,

              marginTop: 10 * heightRef,
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: colors.black,
                fontSize: fontSizes.f13,
                width: 0.8 * fullWidth,
              }}>
              {'Check out this job: https://tirminatorgeturl.000webhostapp.com/?url=' +
                route.params.data._id}
            </Text>
            <View style={{alignItems: 'center'}}>
              <Icon
                onPress={() => {
                  Clipboard.setString(
                    'https://tirminatorgeturl.000webhostapp.com/?url=' +
                      route.params.data._id,
                  );
                  Snackbar.show({
                    text: 'Link copied',
                    duration: Snackbar.LENGTH_SHORT,
                  });
                }}
                name={'content-copy'}
                type={IconType.MaterialIcons}
                size={22 * heightRef}
                color={colors.grey250}
              />
              <Text
                language={language}
                style={{color: colors.black, marginTop: 5}}>
                Copy
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              width: '94%',
              backgroundColor: 'gray',
              alignSelf: 'center',
              marginTop: 15 * heightRef,
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 20 * heightRef}}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
                    'https://tirminatorgeturl.000webhostapp.com/?url=' +
                      route.params.data._id,
                  )}`,
                );
              }}>
              <Image
                style={styles.image5}
                resizeMode="contain"
                source={Images.facebook}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `whatsapp://send?text=${encodeURIComponent(
                    'https://tirminatorgeturl.000webhostapp.com/?url=' +
                      route.params.data._id,
                  )}`,
                );
              }}>
              <Image
                style={styles.image5}
                resizeMode="contain"
                source={Images.whatsapp}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  `instagram://library?AssetPath=Instagram%20Caption&InstagramCaption=${encodeURIComponent(
                    'https://tirminatorgeturl.000webhostapp.com/?url=' +
                      route.params.data._id,
                  )}`,
                );
              }}>
              <Image
                style={styles.image5}
                resizeMode="contain"
                source={Images.instagram}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.3}
        isVisible={apply}
        onBackdropPress={() => {
          setApply(false);
        }}
        onSwipeComplete={() => {}}
        swipeDirection={['down']}
        style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            backgroundColor: colors.background,
            // height: 300,
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
              onPress={() => setApply(false)}
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
              source={profileComplete ? Images.applyCard : Images.card}
            />
            <Text language={language} style={[styles.text10]}>
              {profileComplete ? 'Apply for job' : 'Complete your profile'}
            </Text>
            <Text
              style={[
                styles.text1,
                {
                  width: '93%',
                  textAlign: 'center',
                  marginBottom:
                    Platform.OS == 'ios' ? 15 * heightRef : 35 * heightRef,
                },
              ]}>
              {profileComplete
                ? 'Are you sure you want to apply for this job?'
                : 'Your profile is not completed, so kindly complete your profile to apply for a job.'}
            </Text>
            <View style={styles.bottomView}>
              <Button
                onPress={() => {
                  setApply(false);
                }}
                buttonText={profileComplete ? 'No' : 'Back'}
                buttonHeight={40 * heightRef}
                buttonWidth={0.9 * fullWidth}
                buttonColor={colors.background}
                titleColor={colors.primary}
                iconSize={25}
                borderColor={colors.primary}
                buttonCorners={20 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{marginBottom: 10 * heightRef}}
              />
              <Button
                onPress={() => {
                  setLoader(true);
                  profileComplete
                    ? dispatch(
                        ApplyForJob(
                          {
                            jobId: route.params.data._id,
                            companyId: route.params.data.companyId._id,
                            driverId: profile._id,
                          },
                          (success, msg) => {
                            if (success) {
                              console.log('41: Success');
                              setLoader(false);
                              setApply(false);
                              setSuccess(true);
                            } else {
                              console.log('43: Fail', msg);
                              setErrorMsg(msg);
                              setLoader(false);
                              setApply(false);
                              setError(true);
                            }
                            return true;
                          },
                        ),
                      )
                    : (navigation.navigate('PersonalInfoStep1Screen'),
                      setLoader(false));
                }}
                buttonText={profileComplete ? 'Yes' : 'Complete your profile'}
                buttonHeight={40 * heightRef}
                buttonWidth={0.9 * fullWidth}
                buttonColor={colors.primary}
                iconSize={25}
                disable={loader}
                isLoading={loader}
                buttonCorners={20 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{}}
              />
            </View>
          </View>
        </View>
      </Modal>
      <AwesomeAlert
        show={error}
        showProgress={false}
        title=""
        titleStyle={{color: colors.error}}
        message={errorMsg}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.error}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setError(false);
        }}
        onDismiss={() => {
          setError(false);
        }}
      />

      <AwesomeAlert
        show={success}
        showProgress={false}
        title=""
        titleStyle={{color: colors.error}}
        message={'You have successfully applied to job'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.success}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setSuccess(false);
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
        }}
        onDismiss={() => {
          setSuccess(false);
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
        }}
      />
      <AwesomeAlert
        show={error2}
        showProgress={false}
        title=""
        titleStyle={{color: colors.error}}
        message={errorMsg2}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.error}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setError2(false);
        }}
        onDismiss={() => {
          setError2(false);
        }}
      />
    </SafeAreaView>
  );
};

export default JobDetailScreen;
