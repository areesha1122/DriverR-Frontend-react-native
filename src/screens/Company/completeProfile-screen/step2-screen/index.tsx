import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
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
import {
  manageProfile,
  registerCompany,
  uploadPicToServer,
} from 'src/redux/auth/authApiCalls';
import {getLanguage, getUserId} from 'src/redux/auth/authSelector';
import AwesomeAlert from 'react-native-awesome-alerts';

// import {FaceDetector} from 'react-native-camera-face-detector';

const CompanyInfoStep2Screen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch: any = useDispatch();

  // States
  const [image, setImage]: any = useState('');
  const [loader, setLoader]: any = useState('');
  const [uploadImg, setUploadImage]: any = useState('');
  const [licenseImage, setLicenseImage]: any = useState('');
  const [certificateImage, setCertificateImage]: any = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);
  const id = useSelector(getUserId);

  // Effects
  useEffect(() => {
    console.log('------>', JSON.stringify(route.params.data, null, 2));
  }, []);

  // Functions

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
      setImage({
        name: response.assets[0]?.fileName,
        uri: response.assets[0]?.uri,
        type: response.assets[0]?.type,
      });
      // const isLicense = await checkIfLicense(response.assets[0]?.uri);
    } else if (response.errorCode) {
      console.log(response.errorCode);
    }
  };

  const registerCompanyy = async () => {
    console.log('=====', route.params.data);
    uploadImg == ''
      ? setError('Upload your company logo')
      : dispatch(
          registerCompany(
            {
              ...route.params.data,
              profilePicture: uploadImg,
            },
            (success, msg) => {
              if (success) {
                setShowSuccess(true);

                console.log('41: Success');
              } else {
                // setError(msg);
                // setShowError(true);
                console.log('Image', msg);
              }
              return true;
            },
          ),
        );
  };

  // Validators
  const checkFeilds = () => {
    setUploadImage == ''
      ? setError('Upload your automated selfie')
      : licenseImage == ''
      ? setError('Upload your driving license image')
      : certificateImage == ''
      ? setError('Upload your driving certificate image')
      : null;
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
            Upload logo
          </Text>
        </View>
        <View style={styles.pageView}>
          <View
            style={[
              styles.pageInnerView,
              {backgroundColor: colors.secondary1, marginLeft: '5%'},
            ]}
          />
          <View
            style={[
              styles.pageInnerView,
              {backgroundColor: colors.secondary1, marginRight: '5%'},
            ]}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary();
          }}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={image ? {uri: image.uri} : Images.logoPlaceHolder}></Image>
          <TouchableOpacity
            onPress={() => {
              launchImageLibrary();
            }}>
            <Image
              style={{
                height: 25 * heightRef,
                width: 25 * heightRef,
                position: 'absolute',
                bottom: 10,
                right: 5,
              }}
              resizeMode="contain"
              source={Images.camera}></Image>
          </TouchableOpacity>
        </TouchableOpacity>
        <Text
          style={[
            styles.heading,
            {
              fontSize: 20 * fontRef,
              marginTop: 10 * heightRef,
              marginBottom: 1 * heightRef,
            },
          ]}>
          Upload company logo
        </Text>
        <Text language={language} style={[styles.text3]}>
          Please upload the image from gallery
        </Text>

        <Text
          style={{
            marginVertical: 2 * heightRef,
            color: colors.error,
            marginLeft: '5%',
            marginTop: 10,
            textAlign: 'left',
            alignSelf: 'flex-start',
            fontWeight: '500',
          }}>
          {error}
        </Text>
        <View style={styles.bottomView}>
          <Button
            onPress={() => {
              registerCompanyy();
              // navigation.navigate('ProfileVerificationScreen');
            }}
            buttonText={'Submit'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            buttonCorners={20 * heightRef}
            isLoading={loader}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{}}
          />
          <View></View>
        </View>
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
    </SafeAreaView>
  );
};

export default CompanyInfoStep2Screen;
