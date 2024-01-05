import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  Text as Text1,
  TouchableOpacity,
  View,
  ViewComponent,
} from 'react-native';
import {styles} from './styles';
import {Images} from 'src/assets';
import Button, {Alignments} from 'src/components/button';
import {
  fullHeight,
  fullWidth,
  heightRef,
  widthRef,
} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import InputFeild from 'src/components/inputFeild';
import {TextInput} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLanguage,
  getMsgCouterr,
  getNotificationCouterr,
  getProfile,
} from 'src/redux/auth/authSelector';
import {
  getActiveJobs,
  getJobById,
  getJobPosts,
  getJobPostsOfCompanyByID,
  getTopCompanies,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import {
  getActiveJobPostss,
  getTopCompaniess,
} from 'src/redux/jobPosts/jobPostsSelector';
import moment from 'moment';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import Text from 'src/components/text';
import {getDriverProfile} from 'src/redux/auth/authApiCalls';
import {getDriverNotificationsCounter} from 'src/redux/notification/notificationsApiCalls';
import {getMsgCounter} from 'src/redux/chat/chatApiCalls';

const DriverDashboardScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // States
  const [search, setSearch] = useState('');
  const [activeJob, setActiveJob] = useState(
    useSelector(getActiveJobPostss).filter(
      (i: any) => i.isDeleted == false && i.isActive == true,
    ),
  );

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const topCompanies = useSelector(getTopCompaniess);
  const activeJobs = useSelector(getActiveJobPostss);
  const counter = useSelector(getNotificationCouterr);
  const msg_counter = useSelector(getMsgCouterr);

  // Effects
  useFocusEffect(
    React.useCallback(() => {
      if (profile?._id != undefined) {
        dispatch(
          getDriverNotificationsCounter(profile._id, (success, msg) => {
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
        dispatch(
          getTopCompanies(undefined, (success, msg) => {
            if (success) {
              console.log('41: Success');
            } else {
              console.log('Image', msg);
            }
            return true;
          }),
        );
        dispatch(
          getActiveJobs(undefined, (success, msg) => {
            if (success) {
              console.log('41: Success');
              setActiveJob(
                msg.filter(
                  (i: any) => i.isDeleted == false && i.isActive == true,
                ),
              );
            } else {
              console.log('Image', msg);
            }
            return true;
          }),
        );
      }
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getDriverProfile(profile?.userId, (success, msg) => {
          if (success) {
            console.log('41: Success');
          } else {
            console.log('Image', msg);
          }
          return true;
        }),
      );
    }, []),
  );

  useLayoutEffect(() => {
    const handleOpenURL = (event: any) => {
      console.log('URL:', event.url, event.url.split('tirminator/')[1]);
      dispatch(
        getJobById(event.url.split('tirminator/')[1], (success, msg) => {
          if (success) {
            console.log('41: Success', msg);
            navigation.navigate('JobDetailScreen', {
              data: msg,
            });
          } else {
          }
          return true;
        }),
      );
      // Handle the URL as per your app's requirements
    };

    Linking.addEventListener('url', handleOpenURL);

    // Clean up the event listener when the component unmounts
    // return () => {
    //   Linking.removeEventListener('url', handleOpenURL);
    // };
  }, []);

  // Functions
  const renderJobs = () => {
    return (
      <FlatList
        data={activeJob}
        horizontal={false}
        showsVerticalScrollIndicator={false}
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
            }}>
            <Image
              style={{
                height: 100 * heightRef,
                width: 100 * heightRef,
                marginTop: 0.15 * fullHeight,
              }}
              resizeMode="contain"
              source={Images.noData}
            />
            <Text
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('JobDetailScreen', {
                data: item,
              });
            }}
            key={item}
            style={[styles.jobCard, styles.shadow]}>
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
                source={{uri: item.companyId.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {item.title}
                </Text>
                <Text
                  language={language}
                  numberOfLines={1}
                  style={styles.text5a}>
                  {item.jobDescription}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0 * heightRef,
              }}>
              <Text language={language} style={styles.text7}>
                {item.requiredExperience}+ year
              </Text>
              <Text language={language} style={styles.text7}>
                {item.routeType}
              </Text>
            </View>
            <Text language={language} style={styles.text8}>
              {moment(item.createdAt).fromNow()}
            </Text>
          </TouchableOpacity>
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
          style={{
            fontSize: fontSizes.f25,
            fontWeight: fontWeights.h700,
            color: colors.primary,
            right: 10,
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
                navigation.navigate('DriverMessagesScreen');
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
                navigation.navigate('DriverNotificationScreen');
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
      <View style={styles.nameOuterView}>
        <View>
          <Text language={language} style={styles.text1}>
            Good Morning
          </Text>
          <Text
            language={language}
            style={[styles.text2, {maxWidth: 0.8 * fullWidth}]}>
            {profile
              ? profile.firstName + ' ' + profile.lastName
              : 'Guest Mode'}
          </Text>
        </View>
        <View>
          <Image
            style={styles.image3}
            resizeMode="cover"
            source={profile ? {uri: profile.profilePicture} : Images.personView}
          />
        </View>
      </View>
      {/* <Text language={language} style={styles.text3}>Top companies</Text> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingRight: 20 * widthRef,
          justifyContent: 'space-between',
          alignSelf: 'flex-start',
          marginLeft: 15 * heightRef,
          marginTop: 20 * heightRef,
        }}>
        <Text language={language} style={styles.text3}>
          Hiring companies
        </Text>
        <Text
          language={language}
          onPress={() => {
            navigation.navigate('AllCompaniesScreen');
            // console.log('41: Success', topCompanies);
          }}
          style={{
            color: colors.primary,
            textDecorationLine: 'underline',
            fontSize: fontSizes.f12,
            marginRight: 5 * widthRef,
          }}>
          {'View all'}
        </Text>
      </View>

      <FlatList
        data={topCompanies}
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
            onPress={() => {
              dispatch(
                getJobPostsOfCompanyByID(item._id, (success, msg) => {
                  if (success) {
                    console.log('41: Success');
                    navigation.navigate('CompanyDetailScreen', {data: item});
                  } else {
                    console.log('Image', msg);
                  }
                  return true;
                }),
              );
            }}
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
              source={{uri: item.profilePicture}}
            />
            <Text language={language} style={styles.text4}>
              {item.name}
            </Text>
            <Text language={language} style={styles.text5}>
              View jobs
            </Text>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'flex-start',
          marginLeft: 15 * heightRef,
          marginTop: 20 * heightRef,
          width: '100%',
          paddingRight: 20 * widthRef,
        }}>
        <Text language={language} style={styles.text3}>
          Recommended jobs
        </Text>
        <Text
          language={language}
          onPress={() => {
            navigation.navigate('RecommendedJobListScreen');
          }}
          style={{
            color: colors.primary,
            textDecorationLine: 'underline',
            fontSize: fontSizes.f12,
            marginRight: 5 * widthRef,
          }}>
          {'View all'}
        </Text>
      </View>
      {renderJobs()}
    </SafeAreaView>
  );
};

export default DriverDashboardScreen;
