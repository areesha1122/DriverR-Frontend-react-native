import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text as Text2,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import Button, {Alignments} from 'src/components/button';
import {fullHeight, heightRef, widthRef} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLanguage,
  getMsgCouterr,
  getNotificationCouterr,
  getPhoneNumber,
  getProfile,
} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {
  getAllDriverz,
  getCompanyApplicationss,
  getJobApplications,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import {
  getAllDrivers,
  getCompanyApplication,
} from 'src/redux/jobPosts/jobPostsSelector';
import {fontWeights} from 'src/config/fontWeight';
import moment from 'moment';
import {getCompanyPlan} from 'src/redux/plans/plansApiCalls';
import Text from 'src/components/text';
import {getCompanyNotificationsCounter} from 'src/redux/notification/notificationsApiCalls';
import {getMsgCounter} from 'src/redux/chat/chatApiCalls';

const CompanyHomeScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // States
  const [search, setSearch] = useState('');

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const drivers = useSelector(getAllDrivers);
  const counter = useSelector(getNotificationCouterr);
  const msg_counter = useSelector(getMsgCouterr);
  const phoneNo = useSelector(getPhoneNumber);
  const job_applications = useSelector(getCompanyApplication);

  // Effects
  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getCompanyNotificationsCounter(profile._id, (success, msg) => {
          if (success) {
            console.log('----->>>>> lll', msg, counter);
          } else {
          }
          return true;
        }),
      );
      dispatch(
        getMsgCounter(profile._id, (success, msg) => {
          if (success) {
            console.log('----->>>>> lllllllllll', msg, counter);
          } else {
          }
          return true;
        }),
      );
    }, []),
  );
  useEffect(() => {
    dispatch(
      getAllDriverz(undefined, (success, msg) => {
        if (success) {
          console.log('41: Success');
          console.log('---->>>', phoneNo);
        } else {
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      getCompanyPlan(profile._id, (success, msg) => {
        if (success) {
          console.log('41: Success');
          console.log('---->>>', phoneNo);
        } else {
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, []);
  useEffect(() => {
    dispatch(
      getCompanyApplicationss(profile._id, (success, msg) => {
        if (success) {
          console.log('41: Success');
          console.log('---->>>', phoneNo);
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
      <FlatList
        data={job_applications.reverse()}
        // inverted
        horizontal={false}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',
          flex: 1,

          marginTop: 15 * heightRef,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // height: fullHeight * 0.7,
              marginTop: 0.2 * fullHeight,
            }}>
            <Image
              style={{
                height: 100 * heightRef,
                width: 100 * heightRef,
              }}
              resizeMode="contain"
              source={Images.noData}
            />
            <Text
              language={language}
              style={{
                marginTop: 10,
                fontSize: fontSizes.f17,
                fontWeight: fontWeights.w700,
                color: colors.grey250,
              }}>
              No results found
            </Text>
          </View>
        )}
        renderItem={({item, index}) => (
          <View key={item} style={[styles.jobCard, styles.shadow]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Image
                style={styles.image3}
                resizeMode="cover"
                // source={Images.logo2}
                source={{uri: item.driverId.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {item.driverId.firstName + ' ' + item.driverId.lastName}
                </Text>
                <Text language={language} style={styles.text5}>
                  {item?.jobId?.title}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Text language={language} style={styles.text7}>
                {' '}
                {item.driverId.drivingExperience}+ year
              </Text>
              <Text language={language} style={styles.text7}>
                {' '}
                {item.driverId.preferredLocation}
              </Text>
              <Text2 style={styles.text8}>
                Applied: {moment(item.createdAt).fromNow()}
              </Text2>
            </View>
            <Text2
              style={[
                styles.text7,
                {
                  backgroundColor: item.isClosed
                    ? '#D3D3d3'
                    : item.isFeedbackAdded
                    ? '#f2ede9'
                    : item.isInterviewScheduled
                    ? '#F2F4FF'
                    : item.isShortlisted
                    ? '#dcf0d5'
                    : '#fad1cf',

                  color: item.isClosed
                    ? 'gray'
                    : item.isFeedbackAdded
                    ? 'orange'
                    : item.isInterviewScheduled
                    ? colors.primary
                    : item.isShortlisted
                    ? colors.success
                    : colors.error,
                  position: 'absolute',
                  right: 10 * widthRef,
                  top: 5 * heightRef,
                },
              ]}>
              {item.isClosed
                ? 'Closed'
                : item.isFeedbackAdded
                ? 'Feedback'
                : item.isInterviewScheduled
                ? 'Interview'
                : item.isShortlisted
                ? 'Shortlisted'
                : item.isRejected
                ? 'Rejected'
                : 'Applied'}
            </Text2>
          </View>
        )}
      />
    );
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
        <View style={styles.shadow2}>
          <Button
            onPress={() => {
              navigation.openDrawer();
            }}
            isButtonText={false}
            buttonHeight={40 * heightRef}
            buttonWidth={40 * heightRef}
            isIcon
            buttonColor={colors.background}
            iconSize={30 * heightRef}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.flex_start}
            iconName={'ios-reorder-three-outline'}
            iconType={'Ionicons'}
          />
        </View>
        <Text
          language={language}
          style={{
            fontSize: fontSizes.f25,
            fontWeight: fontWeights.h700,
            color: colors.primary,
          }}>
          TIRminatior
        </Text>
        {/* <View>
          <Icon
            name={'search'}
            type={IconType.EvilIcons}
            size={25 * heightRef}
            color={colors.grey300}
            style={{
              position: 'absolute',
              right: 10 * widthRef,
              bottom: 10 * heightRef,
              zIndex: 1,
            }}
          />

          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
             placeholder={
                language == 'Romanian'
                  ? translation['Search'] || 'Search'
                  : 'Search'
              }
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            onFocus={() => {
              navigation.navigate('DriverJobsScreenn');
            }}
          />
        </View> */}

        <View style={{flexDirection: 'row'}}>
          <View>
            {msg_counter > 0 ? (
              <View
                style={{
                  backgroundColor: '#EAB308',
                  height: 18 * heightRef,
                  width: 18 * heightRef,
                  position: 'absolute',
                  top: 7 * heightRef,
                  borderRadius: 18 * heightRef,
                  zIndex: 1000,
                  right: 13 * widthRef,
                  borderWidth: 2 * heightRef,
                  borderColor: colors.background,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  language={language}
                  style={{fontSize: fontSizes.f9, color: colors.background}}>
                  {msg_counter}
                </Text>
              </View>
            ) : null}

            <Icon
              onPress={() => {
                navigation.navigate('CompanyMessagesScreen');
              }}
              name={'chat-outline'}
              type={IconType.MaterialCommunityIcons}
              size={27 * heightRef}
              color={'#64748B'}
              style={{
                // position: 'absolute',
                right: 20 * widthRef,
                top: 7 * heightRef,

                // zIndex: 1,
              }}
            />
          </View>
          <View>
            {counter > 0 ? (
              <View
                style={{
                  backgroundColor: '#EAB308',
                  height: 18 * heightRef,
                  width: 18 * heightRef,
                  position: 'absolute',
                  top: 7 * heightRef,
                  borderRadius: 18 * heightRef,
                  zIndex: 1000,
                  borderWidth: 2 * heightRef,
                  borderColor: colors.background,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  language={language}
                  style={{fontSize: fontSizes.f9, color: colors.background}}>
                  {counter}
                </Text>
              </View>
            ) : null}

            <Icon
              onPress={() => {
                navigation.navigate('CompanyNotificationScreen');
              }}
              name={'bell'}
              type={IconType.Fontisto}
              size={25 * heightRef}
              color={'#64748B'}
              style={{
                // position: 'absolute',
                right: 10 * widthRef,
                top: 7 * heightRef,

                // zIndex: 1,
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          justifyContent: 'space-between',
          marginTop: 25 * heightRef,
        }}>
        <Text language={language} style={styles.text3}>
          Truck drivers
        </Text>
        <Text
          language={language}
          onPress={() => {
            navigation.navigate('DriverListScreen');
          }}
          style={{
            color: colors.primary,
            textDecorationLine: 'underline',
            fontSize: fontSizes.f12,
          }}>
          {'View all'}
        </Text>
      </View>
      <FlatList
        data={drivers}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',
          maxHeight: 130 * heightRef,
          marginTop: 15 * heightRef,
        }}
        ListEmptyComponent={() => <View></View>}
        renderItem={({item, index}) => (
          <TouchableOpacity
            // onPress={() => {
            //   navigation.navigate('CompanyDetailScreen');
            // }}
            key={item}
            style={[
              styles.companyCard,
              {
                marginRight: index == 2 ? 15 * heightRef : 0,
              },
            ]}>
            <Image
              style={styles.image2}
              resizeMode="cover"
              // source={Images.person}
              source={{uri: item.profilePicture}}
            />
            <Text language={language} style={styles.text4}>
              {item.firstName + ' ' + item.lastName}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          justifyContent: 'space-between',
          marginTop: -5 * heightRef,
        }}>
        <Text language={language} style={styles.text3}>
          Job applications
        </Text>
        {/* <TouchableOpacity onPress={() => {}}>
          <Text
            style={{
              color: colors.primary,
              textDecorationLine: 'underline',
              fontSize: fontSizes.f12,
            }}>
            {'View all '}
          </Text>
        </TouchableOpacity> */}
      </View>
      {renderJobs()}
    </SafeAreaView>
  );
};

export default CompanyHomeScreen;
