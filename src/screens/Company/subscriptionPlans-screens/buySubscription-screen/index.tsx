import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ViewComponent,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import Button, {Alignments} from 'src/components/button';
import {
  fontRef,
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import InputFeild, {keyboardTypes} from 'src/components/inputFeild';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {getJobPosts} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';
import {addJobPost} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getJobPostss} from 'src/redux/jobPosts/jobPostsSelector';
import {getAllPlans} from 'src/redux/plans/plansApiCalls';

const UpdateSubscriptionScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // States
  const [detailPlan, setDetailPlan] = useState(false);
  const [additionalJobs, setAdditionalJobs]: any = useState(0);
  const [driverProfiles, setDriverProfiles]: any = useState(0);
  const [showSearch, setShowSearch]: any = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const jobPosts = useSelector(getJobPostss);
  console.log(JSON.stringify(jobPosts, null, 2));

  // Effects
  useEffect(() => {
    dispatch(
      getAllPlans(undefined, (success, msg) => {
        if (success) {
          console.log('41: Success');
        } else {
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, []);

  // Functions

  const renderJobs = () => {
    return (
      <TouchableOpacity style={[styles.jobCard, styles.shadow]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15 * heightRef,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginLeft: 10 * widthRef,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#C9E1FB',
                height: 40 * heightRef,
                width: 40 * heightRef,
                borderRadius: 20 * heightRef,
              }}>
              <Image
                source={Images.plans}
                style={{height: 20 * heightRef, width: 20 * heightRef}}
                resizeMode="contain"
              />
            </View>
            <Text
              style={{
                fontSize: fontSizes.f16,
                fontWeight: fontWeights.h500,
                marginLeft: 10 * widthRef,
              }}>
              Basic plan
            </Text>
          </View>
          <Text
            style={{
              backgroundColor: '#dcf0d5',
              padding: 2,
              color: colors.success,
            }}>
            {' Active '}
          </Text>
          <Button
            onPress={() => {}}
            buttonText={'Upgrade'}
            buttonHeight={38 * heightRef}
            buttonWidth={0.24 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            // isLoading={loader}
            buttonCorners={8 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{marginRight: 12 * widthRef}}
          />
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#E4E4E4',
            marginTop: 15 * heightRef,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15 * heightRef,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginLeft: 10 * widthRef,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: fontSizes.f28,
                fontWeight: fontWeights.h600,
                // marginLeft: 10 * widthRef,
                color: '#344054',
              }}>
              $100
            </Text>
            <Text
              style={{
                fontSize: fontSizes.f14,
                fontWeight: fontWeights.h400,
                marginLeft: 3 * widthRef,
                color: '#667085',
                marginBottom: 4 * heightRef,
              }}>
              12 months
            </Text>
          </View>
          <Button
            onPress={() => {
              setDetailPlan(true);
            }}
            buttonText={'See more'}
            buttonHeight={28 * heightRef}
            buttonWidth={0.22 * fullWidth}
            buttonColor={'#F2F4FF'}
            iconSize={25}
            // isLoading={loader}
            buttonCorners={44 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h400}
            titleColor={colors.primary}
            titleFontSize={fontSizes.f12}
            buttonstyle={{marginRight: 12 * widthRef}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
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
              buttonstyle={{}}
              iconName={'arrow-back-sharp'}
              iconType={'Ionicons'}
            />
          </View>

          <Text
            style={{
              fontSize: fontSizes.f22,
              fontWeight: fontWeights.h600,
              color: colors.black,
              margin: 10,
            }}>
            Subscription plan
          </Text>
        </View>
      </View>

      {renderJobs()}
      <View
        style={{
          height: 1.5,
          width: '94%',
          backgroundColor: '#E4E4E4',
          marginTop: 15 * heightRef,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15 * heightRef,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            marginLeft: 10 * widthRef,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '75%',
          }}>
          <Text
            style={{
              fontSize: fontSizes.f16,
              fontWeight: fontWeights.h500,
            }}>
            Ads-on
          </Text>
        </View>
        <Button
          onPress={() => {}}
          buttonText={'Buy'}
          buttonHeight={38 * heightRef}
          buttonWidth={0.18 * fullWidth}
          buttonColor={colors.primary}
          iconSize={25}
          // isLoading={loader}
          buttonCorners={8 * heightRef}
          buttonPosition={Alignments.center}
          titleFontStyle={fontWeights.h500}
          buttonstyle={{marginRight: 12 * widthRef}}
        />
      </View>
      <Text
        style={{
          alignSelf: 'flex-start',
          marginLeft: 10,
          width: '80%',
          color: '#667085',
        }}>
        You can buy extra post and driver personal information
      </Text>
      <Modal
        backdropOpacity={0.3}
        isVisible={detailPlan}
        onBackdropPress={() => {
          setDetailPlan(false);
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
              flexDirection: 'row',
              marginTop: 20 * heightRef,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                marginLeft: 10 * widthRef,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: fontSizes.f16,
                  fontWeight: fontWeights.h500,
                }}>
                Buy ads-on
              </Text>
            </View>
            <View
              style={{
                height: 30 * heightRef,
                width: 30 * heightRef,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15 * heightRef,
                backgroundColor: '#F3F4F6',
              }}>
              <Icon
                onPress={() => setDetailPlan(false)}
                name={'close'}
                type={IconType.AntDesign}
                size={22 * heightRef}
                color={colors.grey250}
              />
            </View>
          </View>
          <View style={{marginVertical: 25 * heightRef, flexDirection: 'row'}}>
            <View>
              <TextInput
                label="Addtional Job"
                value={additionalJobs}
                onChangeText={text => {
                  setAdditionalJobs(text);
                }}
                mode="outlined"
                style={[styles.input, {height: 54 * heightRef}]}
                activeOutlineColor={colors.primary}
                outlineColor={colors.darkGray}
                outlineStyle={{borderWidth: 2}}
                maxLength={120}
                keyboardType={keyboardTypes.numeric}
              />
              <Text
                style={{
                  marginLeft: 12 * heightRef,
                  color: '#6B7280',
                  fontSize: fontSizes.f12,
                  marginTop: 2 * heightRef,
                }}>
                *1 job = $3
              </Text>
            </View>
            <View>
              <TextInput
                label="Driver profile"
                value={driverProfiles}
                onChangeText={text => {
                  setDriverProfiles(text);
                }}
                mode="outlined"
                style={[styles.input, {height: 54 * heightRef}]}
                activeOutlineColor={colors.primary}
                outlineColor={colors.darkGray}
                outlineStyle={{borderWidth: 2}}
                maxLength={120}
                keyboardType={keyboardTypes.numeric}
              />
              <Text
                style={{
                  marginLeft: 12 * heightRef,
                  color: '#6B7280',
                  fontSize: fontSizes.f12,
                  marginTop: 2 * heightRef,
                }}>
                *1 contact info = $3
              </Text>
            </View>
          </View>
          {additionalJobs ? (
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#6B7280',
                  fontSize: fontSizes.f12,
                }}>
                Job
              </Text>
              <Text
                style={{
                  color: '#6B7280',
                  fontSize: fontSizes.f12,
                }}>
                {additionalJobs} * $3
              </Text>
              <Text>${parseInt(additionalJobs) * 3}</Text>
            </View>
          ) : null}
          {driverProfiles ? (
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                marginTop: 5 * heightRef,
              }}>
              <Text
                style={{
                  color: '#6B7280',
                  fontSize: fontSizes.f12,
                }}>
                Driver Profile
              </Text>
              <Text
                style={{
                  color: '#6B7280',
                  fontSize: fontSizes.f12,
                  left: -25 * widthRef,
                }}>
                {driverProfiles} * $3
              </Text>
              <Text>${parseInt(driverProfiles) * 3}</Text>
            </View>
          ) : null}
          {driverProfiles || additionalJobs ? (
            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                marginTop: 10 * heightRef,
                backgroundColor: '#F2F4FF',
                padding: 10,
              }}>
              <Text
                style={{
                  color: '#1F2937',
                  fontSize: fontSizes.f13,
                }}>
                Total payable
              </Text>

              <Text>
                $
                {(parseInt(driverProfiles) || 0) * 3 +
                  (parseInt(additionalJobs) || 0) * 3}
              </Text>
            </View>
          ) : null}
          <Button
            onPress={() => {}}
            buttonText={'Buy'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{marginVertical: 20 * heightRef}}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UpdateSubscriptionScreen;
