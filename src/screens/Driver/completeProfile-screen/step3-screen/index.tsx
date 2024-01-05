import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text as Text1,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import {fontRef, fullWidth, heightRef, widthRef} from 'src/config/screenSize';
import {fontWeights} from 'src/config/fontWeight';
import Button, {Alignments} from 'src/components/button';
import {colors} from 'src/config/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import * as ImagePicker from 'react-native-image-picker';
import ReactNativeModal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {useDispatch, useSelector} from 'react-redux';
import {manageProfile, uploadPicToServer} from 'src/redux/auth/authApiCalls';
import {getLanguage, getUserId} from 'src/redux/auth/authSelector';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNTextDetector from 'rn-text-detector';
import Text from 'src/components/text';

// import {FaceDetector} from 'react-native-camera-face-detector';

const PersonalInfoStep3Screen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch: any = useDispatch();

  // States
  const [image, setImage]: any = useState('');
  const [uploadImage, setUploadImage]: any = useState('');
  const [licenseImage, setLicenseImage]: any = useState('');
  const [uploadLicenseImage, setUploadLicenseImage]: any = useState('');
  const [certificateImage, setCertificateImage]: any = useState('');
  const [uploadCertificateImage, setUploadCertificateImage]: any = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showLicenseError, setShowLicenseError] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const cameraRef: any = useRef(null);
  const [camera, setCamera]: any = useState(false);
  const [loader, setLoader] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);
  const id = useSelector(getUserId);

  // Effects
  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(JSON.stringify(route.params.data, null, 2));
  //   }, 1000);
  // }, []);

  // Functions
  const onFacesDetected = ({faces}: any) => {
    if (faces.length > 0 && !isFaceDetected) {
      setIsFaceDetected(true);
      takePicture();
    }
  };

  const takePicture = async () => {
    setLoader(true);
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: false};
      const data = await cameraRef.current.takePictureAsync(options);
      console.log('Data', data, {
        name: 'Img' + new Date(),
        uri: data?.uri,
        type: 'image/jpeg',
      });
      setImage({
        name: 'Img' + new Date(),
        uri: data?.uri,
        type: 'image/jpeg',
      });
      dispatch(
        uploadPicToServer(
          {
            image: {
              name: 'Img' + new Date(),
              uri: data?.uri,
              type: 'image/jpeg',
            },
            path: 'profile',
          },
          (success, d) => {
            if (success) {
              console.log('Success', d);
              setUploadImage(d);
              setLoader(false);
            } else {
              console.log('Fail');
              // setImageLoading(false);
              // setDisable(false);
              setLoader(false);
            }
            return true;
          },
        ),
      );
      setIsFaceDetected(false);
      setCamera(false);
      // Do something with the captured image data
    }
  };

  const launchImageLibrary = async () => {
    setError('');
    setLoader(true);
    let response = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000,
    });
    if (response.didCancel) {
      console.log('User cancelled image picker');
      setLoader(false);
    } else if (response.errorMessage) {
      setLoader(false);
      console.log(response.errorMessage);
    } else if (response.assets) {
      console.log(response.assets);

      // const isLicense = await checkIfLicense(response.assets[0]?.uri);
      const file = response.assets[0].uri;
      const textRecognition = await RNTextDetector.detectFromUri(file);
      const INFLIGHT_IT = 'ROMÂNIA';
      //if match toast will appear
      const matchText = textRecognition.findIndex((item: {text: string}) =>
        item.text.match('ROMÂNIA'),
      );
      console.log('.......', matchText);
      console.log('.......2', textRecognition);
      if (matchText >= 1) {
        dispatch(
          uploadPicToServer(
            {
              image: {
                name: response.assets[0]?.fileName,
                uri: response.assets[0]?.uri,
                type: response.assets[0]?.type,
              },
              path: 'profile',
            },
            (success, d) => {
              if (success) {
                console.log('Success', d);
                setUploadLicenseImage(d);
                setLoader(false);
              } else {
                console.log('Fail');
                // setImageLoading(false);
                // setDisable(false);
                setLoader(false);
              }
              return true;
            },
          ),
        );
        setLicenseImage({
          name: response.assets[0]?.fileName,
          uri: response.assets[0]?.uri,
          type: response.assets[0]?.type,
        });
      } else {
        setShowLicenseError(true);
      }
    } else if (response.errorCode) {
      console.log(response.errorCode);
    }
  };

  const launchImageLibrary2 = async () => {
    setError('');
    setLoader(true);
    let response = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000,
    });
    if (response.didCancel) {
      console.log('User cancelled image picker');
      setLoader(false);
    } else if (response.errorMessage) {
      console.log(response.errorMessage);
      setLoader(false);
    } else if (response.assets) {
      dispatch(
        uploadPicToServer(
          {
            image: {
              name: response.assets[0]?.fileName,
              uri: response.assets[0]?.uri,
              type: response.assets[0]?.type,
            },
            path: 'profile',
          },
          (success, d) => {
            if (success) {
              console.log('Success', d);
              setUploadCertificateImage(d);
              setLoader(false);
            } else {
              console.log('Fail');
              // setImageLoading(false);
              // setDisable(false);
              setLoader(false);
            }
            return true;
          },
        ),
      );
      setCertificateImage({
        name: response.assets[0]?.fileName,
        uri: response.assets[0]?.uri,
        type: response.assets[0]?.type,
      });
      // const isLicense = await checkIfLicense(response.assets[0]?.uri);
    } else if (response.errorCode) {
      console.log(response.errorCode);
    }
  };

  const addProfile = async () => {
    setLoader(true);
    dispatch(
      manageProfile(
        {
          ...route.params.data,
          drivingLicense: uploadLicenseImage,
          drivingCertificate: uploadCertificateImage,
          profilePicture: uploadImage,
          userId: id,
        },
        (success, msg) => {
          if (success) {
            setShowSuccess(true);
            setLoader(false);
            console.log('41: Success');
          } else {
            // setError(msg);
            // setShowError(true);
            setLoader(false);
            console.log('Image', msg);
          }
          return true;
        },
      ),
    );
  };

  // Validators
  const checkFeilds = () => {
    image == ''
      ? setError('Upload your selfie')
      : licenseImage == ''
      ? setError('Upload your driving license image')
      : certificateImage == ''
      ? setError('Upload your driving certificate image')
      : addProfile();
  };

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}>
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
            Verify your identity
          </Text>
        </View>
        <View style={styles.pageView}>
          <View
            style={[styles.pageInnerView, {backgroundColor: colors.secondary1}]}
          />
          <View
            style={[styles.pageInnerView, {backgroundColor: colors.secondary1}]}
          />
          <View
            style={[styles.pageInnerView, {backgroundColor: colors.secondary1}]}
          />
        </View>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={Images.profile}
        />
        <Text
          style={[
            styles.heading,
            {
              fontSize: 20 * fontRef,
              marginTop: 10 * heightRef,
              marginBottom: 0,
            },
          ]}>
          We need to verify your ID
        </Text>
        <Text language={language} style={[styles.text3]}>
          Please submit the documents below
        </Text>
        <TouchableOpacity
          onPress={() => {
            setError('');
            setIsFaceDetected(false);
            setCamera(true);
          }}
          style={styles.mainView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Image
                style={styles.image2}
                resizeMode="contain"
                source={Images.personIcon}
              />
            </View>
            <View style={{marginLeft: 15 * widthRef, top: 5}}>
              <Text language={language} style={styles.text1}>
                Take a selfie
              </Text>
              <Text language={language} style={styles.text2}>
                Capture a live image{' '}
              </Text>
            </View>
          </View>
          <Icon
            name={image ? 'checkcircle' : 'navigate-next'}
            type={image ? IconType.AntDesign : IconType.MaterialIcons}
            size={image ? 20 : 28}
            color={image ? colors.success : '#6A6A6A'}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary();
          }}
          style={styles.mainView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Image
                style={styles.image3}
                resizeMode="contain"
                source={Images.license}
              />
            </View>
            <View style={{marginLeft: 15 * widthRef, top: 5}}>
              <Text language={language} style={styles.text1}>
                Driving license
              </Text>
              <Text language={language} style={styles.text2}>
                Upload your driving license
              </Text>
            </View>
          </View>
          <Icon
            name={licenseImage ? 'checkcircle' : 'navigate-next'}
            type={licenseImage ? IconType.AntDesign : IconType.MaterialIcons}
            size={licenseImage ? 20 : 28}
            color={licenseImage ? colors.success : '#6A6A6A'}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary2();
          }}
          style={styles.mainView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.iconView}>
              <Image
                style={styles.image3}
                resizeMode="contain"
                source={Images.license}
              />
            </View>
            <View style={{marginLeft: 15 * widthRef, top: 5}}>
              <Text language={language} style={styles.text1}>
                Driving certificate
              </Text>
              <Text language={language} style={styles.text2}>
                Upload your driving certificate{' '}
              </Text>
            </View>
          </View>
          <Icon
            name={certificateImage ? 'checkcircle' : 'navigate-next'}
            type={
              certificateImage ? IconType.AntDesign : IconType.MaterialIcons
            }
            size={certificateImage ? 20 : 28}
            color={certificateImage ? colors.success : '#6A6A6A'}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginVertical: 2 * heightRef,
            color: colors.error,
            marginLeft: '5%',
            marginTop: 10,
            textAlign: 'left',
            alignSelf: 'flex-start',
            fontWeight: '500',
            width: fullWidth,
          }}>
          {error}
        </Text>
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              setError('');
              checkFeilds();
            }}
            buttonText={'Submit'}
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
          <View></View>
        </View>
      </View>
      <ReactNativeModal
        backdropOpacity={0.3}
        isVisible={camera}
        onBackdropPress={() => {
          setCamera(false);
        }}
        onSwipeComplete={() => {
          setCamera(false);
        }}
        swipeDirection={['down']}
        style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                height: 240 * heightRef,
                width: 240 * heightRef,
                // backgroundColor: 'grey',
                // // borderRadius: 120 * heightRef,
                // padding: 10,
                alignSelf: 'center',
                borderRadius: 1000,
                overflow: 'hidden',
                borderWidth: 1,

                marginVertical: 25 * heightRef,
              }}>
              <RNCamera
                style={{
                  flex: 1,
                }}
                ref={cameraRef}
                onFacesDetected={onFacesDetected}
                type={RNCamera.Constants.Type.front}
                captureAudio={false}
                faceDetectionMode={
                  RNCamera.Constants?.FaceDetection?.Mode?.accurate
                }
                faceDetectionLandmarks={
                  RNCamera.Constants?.FaceDetection?.Landmarks?.all
                }
                faceDetectionClassifications={
                  RNCamera.Constants?.FaceDetection?.Classifications?.all
                }>
                {/* Add any other components or elements you want to display here */}
              </RNCamera>
            </View>
            <Text
              style={[
                styles.text1,
                {
                  textAlign: 'center',
                  fontWeight: fontWeights.w400,
                  marginVertical: 20 * heightRef,
                },
              ]}>
              Keep your face straight in camera and capture a selfie
            </Text>
          </View>
        </View>
      </ReactNativeModal>
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
          color: colors.black,
        }}
        message={'Profile created successfully'}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.success}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          navigation.replace('MyDrawer');
        }}
        onDismiss={() => {
          navigation.replace('MyDrawer');
        }}
      />
      <AwesomeAlert
        show={showLicenseError}
        showProgress={false}
        title=""
        titleStyle={{color: colors.error}}
        message={
          'Kindly upload a clear and valid picture of your driving license'
        }
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={false}
        cancelText="Ok"
        cancelButtonColor={colors.error}
        cancelButtonStyle={{width: 60, alignItems: 'center'}}
        onCancelPressed={() => {
          setShowLicenseError(false);
        }}
        onDismiss={() => {
          setShowLicenseError(false);
        }}
      />
    </SafeAreaView>
  );
};

export default PersonalInfoStep3Screen;
