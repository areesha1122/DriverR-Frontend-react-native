import React, {useEffect, useState} from 'react';
import {
  Clipboard,
  FlatList,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
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
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {
  addToShortlist,
  getInterviewDetails,
  getJobApplicationsByJob,
  getShortlistedJobs,
  makeZoomMeet,
  removeFromShortlist,
  updateJobApplication,
  updateZoomMeet,
  viewProfile,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import Modal from 'react-native-modal';
import {
  getJobApplicationss,
  getShortlistedApplicationss,
} from 'src/redux/jobPosts/jobPostsSelector';
import DateTimePicker from '@react-native-community/datetimepicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import {color} from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info';
import Snackbar from 'react-native-snackbar';

const JobDetailScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const route: any = useRoute();
  let job = route.params.data;

  // States
  const [search, setSearch] = useState('');
  const [showOption, setShowOption] = useState(false);
  const [addShortcut, setAddShortcut] = useState(false);
  const [removeShortcut, setRemoveShortcut] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [selectedJob, setSelectedJob]: any = useState(job);
  const [showSearch, setShowSearch]: any = useState(false);
  const [tab, setTab] = useState('Applications');
  const [a, setA] = useState(0);
  const [driverDetailModal, setDriverDetailModal] = useState(false);
  const [selectedDriver, setSelectedDriver]: any = useState({});
  const [selectedApplication, setSelectedApplication]: any = useState({});
  const [selectedInterview, setSelectedInterview]: any = useState({});
  const [showFull, setShowFull] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('');
  const [timeError, setTimeError] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [scheduleLoader, settScheduleLoader] = useState(false);

  // Selectors
  const profile = useSelector(getProfile);
  const jobPosts = useSelector(getJobApplicationss);
  const shortlistedApplications = useSelector(getShortlistedApplicationss);
  console.log(selectedDriver);

  // Effects
  useEffect(() => {
    dispatch(
      getJobApplicationsByJob(route.params.data._id, (success, msg) => {
        if (success) {
          console.log('41: Success');
        } else {
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, [a]);

  useEffect(() => {
    dispatch(
      getShortlistedJobs(route.params.data._id, (success, msg) => {
        if (success) {
          console.log('41: Success');
        } else {
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, [a]);

  // Functions

  const onChangeDate = (event: any, selectedDate: any) => {
    setDate(selectedDate);
    setTimeError(false);
    setShowDate(false);
  };

  const onChangeTime = (event: any, selectedDate: any) => {
    setTime(selectedDate);
    setTimeError(false);
    setShowTime(false);
  };

  const addToShortlistt = async () => {
    dispatch(
      addToShortlist(selectedJob._id, undefined, (success, msg) => {
        if (success) {
          setA(a + 1);
          setAddShortcut(false);
        } else {
          setAddShortcut(false);
          console.log('Image', msg);
        }
        return true;
      }),
    );
  };

  const removeFromShortlistt = async () => {
    dispatch(
      removeFromShortlist(selectedJob._id, undefined, (success, msg) => {
        if (success) {
          setA(a - 1);
          setRemoveShortcut(false);
        } else {
          setRemoveShortcut(false);

          console.log('Image', msg);
        }
        return true;
      }),
    );
  };

  const renderJobs = () => {
    return (
      <FlatList
        data={tab == 'Applications' ? jobPosts : shortlistedApplications}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 15 * heightRef,
          zIndex: -1,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: fullHeight * 0.7,
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
              style={{
                marginTop: 10,
                fontSize: fontSizes.f17,
                fontWeight: fontWeights.w700,
                color: colors.grey250,
              }}>
              No applications found
            </Text>
          </View>
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedDriver(item.driverId);
              console.log(
                'isInterviewScheduled =======>>>>>',
                item.isInterviewScheduled,
              );
              setSelectedApplication(item);
              if (item.isInterviewScheduled) {
                dispatch(
                  getInterviewDetails(item._id, (success: any, msg: any) => {
                    if (success) {
                      console.log('41: Success');
                      setSelectedInterview(msg);
                      setDriverDetailModal(true);
                    } else {
                      console.log('Image', msg);
                    }
                    return true;
                  }),
                );
              } else {
                setDriverDetailModal(true);
              }
            }}
            key={item}
            disabled={item.isRejected || item.isClosed}
            style={[styles.jobCard, styles.shadow]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <TouchableOpacity
                disabled={item.isRejected || item.isClosed}
                onPress={() => {
                  setSelectedJob(item);
                  setShowOption(true);
                }}
                style={{
                  position: 'absolute',
                  right: 10 * widthRef,
                  top: 0 * heightRef,
                  zIndex: 1,
                }}>
                <Icon
                  name={'dots-three-vertical'}
                  type={IconType.Entypo}
                  size={15 * heightRef}
                  color={colors.grey300}
                  style={{padding: 5, top: -3}}
                />
              </TouchableOpacity>
              <Image
                style={styles.image3}
                resizeMode="cover"
                // source={Images.logo2}
                source={{uri: item.driverId.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text style={styles.text6}>
                  {item.driverId.firstName + ' ' + item.driverId.lastName}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
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
              <Text style={styles.text7}>
                {item.driverId.drivingExperience}+ year
              </Text>
              <Text style={styles.text7}>
                {item.driverId.preferredLocation}
              </Text>

              <Text style={styles.text8}>
                Applied: {moment(item.createdAt).fromNow()}
              </Text>
            </View>
            <Text
              style={[
                styles.text7,
                {
                  backgroundColor: item.isClosed
                    ? '#D3D3d3'
                    : item.isRejected
                    ? '#fad1cf'
                    : '#dcf0d5',
                  // item.isActive ? '#dcf0d5' : '#fad1cf',
                  color: item.isClosed
                    ? 'gray'
                    : item.isRejected
                    ? colors.error
                    : colors.success,
                  position: 'absolute',
                  right: 30 * widthRef,
                  top: 5 * heightRef,
                },
              ]}>
              {item.isClosed
                ? 'Closed'
                : item.isRejected
                ? 'Rejected'
                : item.isInterviewScheduled
                ? 'Interview'
                : item.isShortlisted
                ? 'Shortlisted'
                : 'Applied'}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderJob = () => {
    return (
      <TouchableOpacity
        disabled
        style={[
          styles.jobCard,
          styles.shadow,
          {
            paddingTop: 10 * heightRef,
            height: 150 * heightRef,
            paddingBottom: 40 * heightRef,
          },
        ]}>
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
            source={{uri: job.companyId.profilePicture}}
          />
          <View style={{marginLeft: 10 * widthRef}}>
            <Text style={styles.text6}>{job.title}</Text>
            <Text
              numberOfLines={1}
              style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
              {'#' + job.jobId}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
              {job.jobDescription}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10 * heightRef,
          }}>
          <Text style={styles.text7}>{job.requiredExperience}+ year</Text>
          <Text style={styles.text7}>{job.routeType}</Text>

          <Text style={styles.text8}>
            {'Job posted:  ' + moment(job.createdAt).fromNow()}
          </Text>
        </View>
        <Text
          style={[
            styles.text7,
            {
              backgroundColor: job.isActive ? '#dcf0d5' : '#fad1cf',
              color: job.isActive ? colors.success : colors.error,
              position: 'absolute',
              right: 15 * widthRef,
              top: 25 * heightRef,
            },
          ]}>
          {job.isActive ? 'Active' : 'Inactive'}
        </Text>
        <Button
          onPress={() => {
            setEditPost(true);
          }}
          buttonText={'See details'}
          buttonHeight={30 * heightRef}
          buttonWidth={0.3 * fullWidth}
          buttonColor={'#F2F4FF'}
          titleColor={colors.primary}
          iconSize={25}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.center}
          titleFontStyle={fontWeights.h500}
          buttonstyle={{top: 15 * heightRef}}
        />
      </TouchableOpacity>
    );
  };

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
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

          {!showSearch ? (
            <Text
              style={{
                fontSize: fontSizes.f22,
                fontWeight: fontWeights.h600,
                color: colors.black,
                margin: 10,
              }}>
              Job details
            </Text>
          ) : null}
        </View>

        {/* <View style={{flexDirection: 'row'}}>
          {showSearch ? (
            <View>
              <Icon
                onPress={() => {
                  setShowSearch(false);
                }}
                name={'search'}
                type={IconType.EvilIcons}
                size={28 * heightRef}
                color={colors.grey300}
                style={{
                  position: 'absolute',
                  right: 5 * widthRef,
                  bottom: 8 * heightRef,
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
            </View>
          ) : (
            <Icon
              onPress={() => {
                setShowSearch(true);
              }}
              name={'search'}
              type={IconType.EvilIcons}
              size={28 * heightRef}
              color={'#64748B'}
              style={{
                position: 'absolute',
                right: 5 * widthRef,
                bottom: -10 * heightRef,
                zIndex: 1,
              }}
            />
          )}
        </View> */}
      </View>

      {renderJob()}
      <View
        style={{
          height: 47 * heightRef,
          width: '93%',
          borderRadius: 25,
          borderWidth: 1,
          borderColor: colors.primary,
          flexDirection: 'row',
          marginTop: 30 * heightRef,
        }}>
        <TouchableOpacity
          onPress={() => setTab('Applications')}
          style={{
            height: 45 * heightRef,
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colors.primary,
            borderTopLeftRadius: 25 * heightRef,
            borderBottomLeftRadius: 25 * heightRef,
            backgroundColor:
              tab == 'Applications' ? colors.primary : colors.background,
          }}>
          <Text
            style={{
              fontSize: fontSizes.f12,
              fontWeight: fontWeights.h500,
              color: tab == 'Applications' ? colors.background : colors.grey300,
            }}>
            Applications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('Shortlist')}
          style={{
            height: 45 * heightRef,
            width: '50%',
            borderLeftWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colors.primary,
            borderTopRightRadius: 25 * heightRef,
            borderBottomRightRadius: 25 * heightRef,
            backgroundColor:
              tab == 'Shortlist' ? colors.primary : colors.background,
          }}>
          <Text
            style={{
              fontSize: fontSizes.f12,
              fontWeight: fontWeights.h500,
              color: tab == 'Shortlist' ? colors.background : colors.grey300,
            }}>
            Shortlist
          </Text>
        </TouchableOpacity>
      </View>
      {renderJobs()}

      <Modal
        backdropOpacity={0.3}
        isVisible={showOption}
        onBackdropPress={() => {
          setShowOption(false);
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
          <Text
            style={{
              position: 'absolute',
              top: 15 * heightRef,
              left: 15 * widthRef,
              color: 'black',
              fontSize: fontSizes.f16,
              fontWeight: fontWeights.h500,
            }}>
            More Options
          </Text>
          <View
            style={{
              width: '97%',
              height: 25 * heightRef,
              marginBottom: 10 * heightRef,
              marginTop: 10 * heightRef,
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#F3F4F6',
                height: 25 * heightRef,
                width: 25 * heightRef,
                borderRadius: 12.5 * heightRef,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                onPress={() => setShowOption(false)}
                name={'close'}
                type={IconType.AntDesign}
                size={20 * heightRef}
                color={colors.grey250}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              // height: 25 * heightRef,

              marginTop: 10 * heightRef,
              alignSelf: 'center',
              // alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#F3F4F6',
                padding: 15 * heightRef,
                paddingHorizontal: 0,
                width: 0.93 * fullWidth,
                marginVertical: 5,
                alignSelf: 'center',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setShowOption(false);
                setTimeout(() => {
                  selectedJob.isShortlisted
                    ? setRemoveShortcut(true)
                    : setAddShortcut(true);
                }, 500);

                // ? removeFromShortlistt()
                // : addToShortlistt();
                // navigation.navigate('EditJobPostScreen', {data: selectedJob});
              }}>
              <Icon
                onPress={() => setShowOption(false)}
                name={'playlist-add'}
                type={IconType.MaterialIcons}
                size={18 * heightRef}
                color={colors.grey250}
                style={{marginLeft: 10}}
              />
              <Text
                style={{
                  color: '#4B5563',
                  marginLeft: 5,
                  fontSize: fontSizes.f16,
                }}>
                {selectedJob.isShortlisted
                  ? 'Remove from shortlist'
                  : 'Add to shortlist'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#F3F4F6',
                marginBottom: 40 * heightRef,
                padding: 15 * heightRef,
                paddingHorizontal: 0,
                width: 0.93 * fullWidth,
                marginVertical: 5,
                alignSelf: 'center',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                {
                  console.log('hi');
                  dispatch(
                    updateJobApplication(
                      selectedJob._id,
                      {isRejected: true},
                      (success, msg) => {
                        if (success) {
                          setA(a + 1);
                          setShowOption(false);
                          setAddShortcut(false);
                        } else {
                          setAddShortcut(false);
                          setShowOption(false);
                          console.log('Image', msg);
                        }
                        return true;
                      },
                    ),
                  );
                }
              }}>
              <Icon
                onPress={() => setShowOption(false)}
                name={'closecircleo'}
                type={IconType.AntDesign}
                size={18 * heightRef}
                color={colors.grey250}
                style={{marginLeft: 10}}
              />
              <Text
                style={{
                  color: '#4B5563',
                  marginLeft: 5,
                  fontSize: fontSizes.f16,
                }}>
                {'Reject'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.3}
        isVisible={addShortcut}
        onBackdropPress={() => {
          setAddShortcut(false);
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
              onPress={() => setAddShortcut(false)}
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
              source={Images.addShortcut}
            />
            <Text style={[styles.text10]}>{'Add to shortlist?'}</Text>
            <Text
              style={[
                styles.text1,
                {
                  width: '93%',
                  textAlign: 'center',
                  marginBottom:
                    Platform.OS == 'ios' ? 15 * heightRef : 35 * heightRef,
                },
              ]}></Text>
            <View style={styles.bottomView}>
              <Button
                onPress={() => {
                  setAddShortcut(false);
                }}
                buttonText={'No'}
                buttonHeight={40 * heightRef}
                buttonWidth={0.9 * fullWidth}
                buttonColor={'#D3D3D3'}
                titleColor={'gray'}
                iconSize={25}
                borderColor={'#D3D3D3'}
                buttonCorners={20 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{marginBottom: 10 * heightRef}}
              />
              <Button
                onPress={() => {
                  // navigation.navigate('PersonalInfoStep1Screen');
                  addToShortlistt();
                }}
                buttonText={'Yes'}
                buttonHeight={40 * heightRef}
                buttonWidth={0.9 * fullWidth}
                buttonColor={colors.primary}
                iconSize={25}
                buttonCorners={20 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{}}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.3}
        isVisible={removeShortcut}
        onBackdropPress={() => {
          setRemoveShortcut(false);
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
              onPress={() => setRemoveShortcut(false)}
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
              source={Images.removeShortcut}
            />
            <Text style={[styles.text10]}>{'Remove from shortlist?'}</Text>
            <Text
              style={[
                styles.text1,
                {
                  width: '93%',
                  textAlign: 'center',
                  marginBottom:
                    Platform.OS == 'ios' ? 15 * heightRef : 35 * heightRef,
                },
              ]}></Text>
            <View style={styles.bottomView}>
              <Button
                onPress={() => {
                  setRemoveShortcut(false);
                }}
                buttonText={'No'}
                buttonHeight={40 * heightRef}
                buttonWidth={0.9 * fullWidth}
                buttonColor={'#D3D3D3'}
                titleColor={'gray'}
                iconSize={25}
                borderColor={'#D3D3D3'}
                buttonCorners={20 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{marginBottom: 10 * heightRef}}
              />
              <Button
                onPress={() => {
                  // navigation.navigate('PersonalInfoStep1Screen');
                  removeFromShortlistt();
                }}
                buttonText={'Yes'}
                buttonHeight={40 * heightRef}
                buttonWidth={0.9 * fullWidth}
                buttonColor={colors.primary}
                iconSize={25}
                buttonCorners={20 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{}}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.3}
        isVisible={editPost}
        onBackdropPress={() => {
          setEditPost(false);
        }}
        onSwipeComplete={() => {
          setEditPost(false);
        }}
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
              onPress={() => setEditPost(false)}
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
            <View
              style={{
                width: '90%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                flexDirection: 'row',
                marginBottom: 30,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{marginTop: 7 * heightRef, marginLeft: 10 * widthRef}}>
                  <Text style={[styles.text6, {fontSize: fontSizes.f16}]}>
                    {job.title}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: fontSizes.f10,
                        fontWeight: fontWeights.h400,
                        padding: 2,
                        paddingHorizontal: 5,
                        maxWidth: 55 * widthRef,
                        borderRadius: 2,
                        paddingRight: 5,
                        marginLeft: 0 * heightRef,
                        marginTop: 10,
                        backgroundColor: selectedJob.isActive
                          ? '#dcf0d5'
                          : '#fad1cf',
                        color: selectedJob.isActive
                          ? colors.success
                          : colors.error,
                      },
                    ]}>
                    {job.isActive ? 'Active' : 'Inactive'}
                  </Text>
                </View>
              </View>
              <Button
                onPress={() => {
                  setEditPost(false);
                  navigation.navigate('EditJobPostScreen', {data: selectedJob});
                }}
                buttonText={'Edit'}
                buttonHeight={35 * heightRef}
                borderColor={colors.primary}
                buttonWidth={0.2 * fullWidth}
                buttonColor={colors.primary}
                iconSize={25}
                buttonCorners={10 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{}}
              />
            </View>
            <Text style={styles.texta}>Description</Text>
            <Text style={styles.textb}>{job.jobDescription}</Text>
            <Text style={styles.texta}>Experince Required</Text>
            <Text style={styles.textb}>{job.requiredExperience}+ years</Text>
            <Text style={styles.texta}>Equipment type</Text>
            <Text style={styles.textb}>{job.equipmentType}</Text>
            <Text style={styles.texta}>Route type</Text>
            <Text style={styles.textb}>{job.routeType}</Text>
            <Text style={styles.texta}>License required</Text>
            <Text style={styles.textb}>
              {job.licenseRequired ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.texta}>Medical Insurance</Text>
            <Text style={styles.textb}>
              {job.medicalInsuranceRequired ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.3}
        isVisible={driverDetailModal}
        onBackdropPress={() => {
          setDriverDetailModal(false);
          setSelectedApplication({});
        }}
        onSwipeComplete={() => {}}
        swipeDirection={['down']}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          maxHeight: fullHeight,
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            height: fullHeight,
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

              marginTop: DeviceInfo.hasNotch()
                ? 40 * heightRef
                : 10 * heightRef,
              alignItems: 'flex-end',
              marginBottom:
                Platform.OS == 'ios' && showDate ? 50 * heightRef : 0,
            }}>
            <Icon
              onPress={() => setDriverDetailModal(false)}
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

              // marginTop: 10 * heightRef,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {!showDate ? (
              <View
                style={{
                  width: '90%',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginBottom: 10 * heightRef,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.image4}
                    resizeMode="cover"
                    source={{uri: selectedDriver.profilePicture}}
                  />
                  <View
                    style={{
                      marginTop: 20 * heightRef,
                      marginLeft: 10 * widthRef,
                    }}>
                    <Text style={[styles.text6, {fontSize: fontSizes.f16}]}>
                      {selectedDriver.firstName + ' ' + selectedDriver.lastName}
                    </Text>
                    {/* <Text style={[styles.text5, {marginTop: 10 * heightRef}]}>
                    Truck driver job
                  </Text> */}
                  </View>
                </View>
                <Button
                  // onPress={() => {
                  //   setDriverDetailModal(false);
                  //   navigation.navigate('CompanyMessagesScreen');
                  // }}
                  onPress={() => {
                    dispatch(
                      viewProfile(selectedDriver._id, (success, msg) => {
                        if (success) {
                          console.log(msg);
                          setDriverDetailModal(false);
                          navigation.navigate('CompanyChatIntializerScreen', {
                            data: {driver: selectedDriver},
                          });
                        } else {
                          setDriverDetailModal(false);
                          setTimeout(() => {
                            setError(msg);
                            setShowError(true);
                          }, 500);
                          console.log('Image', msg);
                        }
                        return true;
                      }),
                    );
                  }}
                  buttonText={''}
                  isIcon
                  iconColor={colors.background}
                  iconType={IconType.Ionicons}
                  iconName={'chatbubbles-outline'}
                  buttonHeight={40 * heightRef}
                  borderColor={colors.primary}
                  buttonWidth={0.15 * fullWidth}
                  buttonColor={colors.primary}
                  iconSize={25}
                  buttonCorners={10 * heightRef}
                  buttonPosition={Alignments.center}
                  titleFontStyle={fontWeights.h500}
                  buttonstyle={{}}
                />
              </View>
            ) : null}
            <View
              style={{
                width: fullWidth * 0.9,
                borderRadius: 5 * heightRef,
                backgroundColor: '#EFF0F9',
                marginBottom: 10 * heightRef,
              }}>
              <View
                style={{
                  width: '100%',
                  padding: 9,

                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: colors.primary}}>Contact info</Text>

                <TouchableOpacity>
                  <Button
                    onPress={() => {
                      // console.log(selectedDriver._id);
                      dispatch(
                        viewProfile(selectedDriver._id, (success, msg) => {
                          if (success) {
                            console.log(msg);
                            setShowFull(!showFull);
                            console.log('41: Success');
                          } else {
                            setDriverDetailModal(false);
                            setTimeout(() => {
                              setError(msg);
                              setShowError(true);
                            }, 500);
                            console.log('Image', msg);
                          }
                          return true;
                        }),
                      );
                    }}
                    buttonText={''}
                    isIcon
                    iconColor={colors.primary}
                    iconType={IconType.MaterialIcons}
                    iconName={
                      showFull ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                    }
                    buttonHeight={20 * heightRef}
                    borderColor={colors.background}
                    buttonWidth={20 * heightRef}
                    buttonColor={colors.background}
                    iconSize={23 * heightRef}
                    buttonCorners={10 * heightRef}
                    buttonPosition={Alignments.center}
                    titleFontStyle={fontWeights.h500}
                    buttonstyle={{}}
                  />
                </TouchableOpacity>
              </View>

              {showFull ? (
                <View>
                  <View
                    style={{
                      width: fullWidth * 0.85,
                      height: 2 * heightRef,
                      backgroundColor: colors.background,
                      marginBottom: 10 * heightRef,

                      alignSelf: 'center',
                    }}></View>
                  <View
                    style={{
                      width: '100%',
                      padding: 2,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12 * widthRef,
                    }}>
                    <Text style={{fontSize: fontSizes.f12, color: '#6B7280'}}>
                      Email:{' '}
                      <Text style={{fontSize: fontSizes.f12, color: '#4B5563'}}>
                        {' ' + selectedDriver.email}
                      </Text>
                    </Text>
                    <Icon
                      onPress={() => {
                        Linking.openURL(`mailto:${selectedDriver.email}`);
                      }}
                      name={'email'}
                      type={IconType.Fontisto}
                      size={15 * heightRef}
                      color={'#4B5563'}
                    />
                  </View>
                  <View
                    style={{
                      width: '100%',
                      padding: 9,
                      paddingHorizontal: 12 * widthRef,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: fontSizes.f12, color: '#6B7280'}}>
                      Phone:{' '}
                      <Text style={{fontSize: fontSizes.f12, color: '#4B5563'}}>
                        {' ' + selectedDriver.userId.phoneNumber}
                      </Text>
                    </Text>
                    <Icon
                      onPress={() => {
                        Linking.openURL(`tel:${'+41 737 27736'}`);
                      }}
                      name={'phone'}
                      type={IconType.Feather}
                      size={15 * heightRef}
                      color={'#4B5563'}
                    />
                  </View>
                </View>
              ) : null}
            </View>
            {Math.round(
              (new Date(selectedInterview.scheduledAt) - new Date()) / 60000,
            ) < 0 && selectedApplication.isInterviewScheduled ? (
              <View
                style={{
                  width: fullWidth * 0.9,
                  borderRadius: 5 * heightRef,
                  backgroundColor: '#EFF0F9',
                  marginBottom: 10 * heightRef,
                }}>
                <View
                  style={{
                    width: '100%',
                    padding: 9,

                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: colors.primary}}>Interview</Text>

                  <Button
                    onPress={() => {
                      {
                        console.log(
                          'Close job =====>>>',
                          selectedApplication._id,
                        );
                        setEditPost(false);
                        dispatch(
                          updateJobApplication(
                            selectedApplication._id,
                            {isClosed: true},
                            (success, msg) => {
                              if (success) {
                                setA(a + 1);
                                setDriverDetailModal(false);
                              } else {
                                setDriverDetailModal(false);
                                console.log('Image', msg);
                              }
                              return true;
                            },
                          ),
                        );
                      }
                    }}
                    buttonText={'Close job'}
                    titleFontSize={12}
                    buttonHeight={25 * heightRef}
                    borderColor={'#1153DA'}
                    buttonWidth={70 * heightRef}
                    buttonColor={'#1153DA'}
                    iconSize={23 * heightRef}
                    buttonCorners={5 * heightRef}
                    buttonPosition={Alignments.center}
                    titleFontStyle={fontWeights.h500}
                    buttonstyle={{}}
                  />
                </View>

                <View>
                  <View
                    style={{
                      width: '100%',
                      padding: 2,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12 * widthRef,
                    }}>
                    <Text style={{fontSize: fontSizes.f12, color: '#4B5563'}}>
                      {selectedInterview.feedback || ''}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      padding: 9,
                      paddingHorizontal: 12 * widthRef,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: fontSizes.f12, color: '#6B7280'}}>
                      {moment(selectedInterview.scheduledAt).format(
                        'MMMM Do YYYY, h:mm a',
                      )}
                    </Text>
                    <Text
                      onPress={() => {
                        setDriverDetailModal(false);
                        navigation.navigate('AddFeedbackScreen', {
                          data: selectedApplication,
                        });
                      }}
                      style={{
                        color: colors.error,
                        textDecorationLine: 'underline',
                      }}>
                      {selectedInterview.feedback
                        ? 'Change internal notes'
                        : 'Add internal notes'}
                    </Text>
                  </View>
                </View>
              </View>
            ) : showReschedule == true ? (
              <View
                style={{
                  width: fullWidth * 0.9,
                  borderRadius: 5 * heightRef,
                  backgroundColor: '#EFF0F9',
                  marginBottom: 10 * heightRef,
                }}>
                <View
                  style={{
                    width: '100%',
                    padding: 9,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.primary,
                      paddingBottom: 9 * heightRef,
                    }}>
                    Reschedule interview
                  </Text>
                  <Icon
                    onPress={() => setShowReschedule(false)}
                    name={'close'}
                    type={IconType.AntDesign}
                    size={20 * heightRef}
                    color={colors.grey250}
                    style={{top: -5}}
                  />
                </View>
                <View>
                  <View
                    style={{
                      width: '100%',
                      // padding: 9,
                      paddingHorizontal: 12 * widthRef,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      onTouchEnd={() => {
                        setShowDate(true);
                      }}
                      style={{
                        height: 35,
                        width: '45%',
                        // backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'gray',
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={[styles.textHead, {top: -12 * heightRef}]}>
                        Date
                      </Text>
                      <Text style={{color: colors.black}}>
                        {moment(date).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                    <View
                      onTouchEnd={() => setShowTime(true)}
                      style={{
                        height: 35,
                        width: '45%',
                        // backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor: 'gray',
                        borderRadius: 5,
                      }}>
                      <Text style={[styles.textHead, {top: -12 * heightRef}]}>
                        Time
                      </Text>
                      <Text style={{color: colors.black}}>
                        {moment(time).format('LT')}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      paddingTop: 9 * heightRef,
                      paddingBottom: timeError ? 9 * heightRef : 0,
                      paddingLeft: 10 * widthRef,
                      color: colors.error,
                    }}>
                    {timeError
                      ? 'You cannot select past time for interview.'
                      : ''}
                  </Text>
                </View>

                <Button
                  onPress={() => {
                    console.log(
                      date.toISOString().split('T')[0] +
                        'T' +
                        time.toISOString().split('T')[1],
                    );

                    if (
                      new Date(
                        date.toISOString().split('T')[0] +
                          'T' +
                          time.toISOString().split('T')[1],
                      ) < new Date()
                    ) {
                      setTimeError(true);
                    } else {
                      settScheduleLoader(true);
                      dispatch(
                        updateZoomMeet(
                          {
                            jobApplicationId: selectedApplication._id,
                            scheduledAt:
                              date.toISOString().split('T')[0] +
                              'T' +
                              time.toISOString().split('T')[1],
                          },
                          (success, msg) => {
                            if (success) {
                              console.log('41: Success');
                              setA(a + 1);
                              dispatch(
                                getJobApplicationsByJob(
                                  route.params.data._id,
                                  (success, msg) => {
                                    if (success) {
                                      console.log('41: Success');

                                      setShowReschedule(false);
                                    } else {
                                      console.log('Image', msg);
                                      setShowReschedule(false);
                                    }
                                    return true;
                                  },
                                ),
                              );

                              settScheduleLoader(false);
                              setDriverDetailModal(false);
                            } else {
                              settScheduleLoader(false);
                              console.log('Image', msg);
                              setError(msg);
                              setShowError(true);
                            }
                            return true;
                          },
                        ),
                      );
                    }
                  }}
                  buttonText={'Reschedule interview'}
                  buttonHeight={40 * heightRef}
                  buttonWidth={0.85 * fullWidth}
                  buttonColor={colors.primary}
                  iconSize={25}
                  isLoading={scheduleLoader}
                  buttonCorners={20 * heightRef}
                  buttonPosition={Alignments.center}
                  titleFontStyle={fontWeights.h500}
                  buttonstyle={{marginBottom: 10}}
                />
              </View>
            ) : selectedApplication.isInterviewScheduled ? (
              <View
                style={{
                  width: fullWidth * 0.9,
                  borderRadius: 5 * heightRef,
                  backgroundColor: '#EFF0F9',
                  marginBottom: 10 * heightRef,
                }}>
                <View
                  style={{
                    width: '100%',
                    padding: 9,

                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: colors.primary}}>Interview</Text>
                  {Math.round(
                    (new Date(selectedInterview.scheduledAt) - new Date()) /
                      60000,
                  ) < 15 ? (
                    <TouchableOpacity>
                      <Button
                        onPress={() => {
                          Linking.openURL(
                            selectedInterview.onlineInterviewLink,
                          );
                        }}
                        buttonText={'Join'}
                        titleFontSize={12}
                        buttonHeight={25 * heightRef}
                        borderColor={'#1153DA'}
                        buttonWidth={50 * heightRef}
                        buttonColor={'#1153DA'}
                        iconSize={23 * heightRef}
                        buttonCorners={5 * heightRef}
                        buttonPosition={Alignments.center}
                        titleFontStyle={fontWeights.h500}
                        buttonstyle={{}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Button
                        onPress={() => {
                          console.log('Ho raha hai');
                          setShowReschedule(true);
                        }}
                        buttonText={'Reschedule'}
                        titleFontSize={12}
                        buttonHeight={25 * heightRef}
                        borderColor={'#1153DA'}
                        buttonWidth={80 * heightRef}
                        buttonColor={'#1153DA'}
                        iconSize={23 * heightRef}
                        buttonCorners={5 * heightRef}
                        buttonPosition={Alignments.center}
                        titleFontStyle={fontWeights.h500}
                        buttonstyle={{}}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View>
                  <View
                    style={{
                      width: '100%',
                      padding: 2,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12 * widthRef,
                    }}>
                    <Text style={{fontSize: fontSizes.f12, color: '#4B5563'}}>
                      {selectedInterview.onlineInterviewLink}
                    </Text>

                    <Icon
                      onPress={() => {
                        Clipboard.setString(
                          selectedInterview.onlineInterviewLink,
                        );
                        Snackbar.show({
                          text: 'Link copied',
                          duration: Snackbar.LENGTH_SHORT,
                        });
                      }}
                      name={'content-copy'}
                      type={IconType.MaterialIcons}
                      size={15 * heightRef}
                      color={'#4B5563'}
                    />
                  </View>
                  <View
                    style={{
                      width: '100%',
                      padding: 9,
                      paddingHorizontal: 12 * widthRef,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: fontSizes.f12, color: '#6B7280'}}>
                      {moment(selectedInterview.scheduledAt).format(
                        'MMMM Do YYYY, h:mm a',
                      )}
                    </Text>
                    <Text
                      style={{
                        color: colors.error,
                        textDecorationLine: 'underline',
                      }}>
                      {''}
                    </Text>
                  </View>
                </View>
              </View>
            ) : showSchedule ? (
              <View
                style={{
                  width: fullWidth * 0.9,
                  borderRadius: 5 * heightRef,
                  backgroundColor: '#EFF0F9',
                  marginBottom: 10 * heightRef,
                }}>
                <View
                  style={{
                    width: '100%',
                    padding: 9,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colors.primary,
                      paddingBottom: 9 * heightRef,
                    }}>
                    Schedule interview
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      width: '100%',
                      // padding: 9,
                      paddingHorizontal: 12 * widthRef,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      onTouchEnd={() => {
                        setShowDate(true);
                      }}
                      style={{
                        height: 35,
                        width: '45%',
                        // backgroundColor: 'red',
                        borderWidth: 2,
                        borderColor: 'gray',
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={[styles.textHead, {top: -12 * heightRef}]}>
                        Date
                      </Text>
                      <Text style={{color: colors.black}}>
                        {moment(date).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                    <View
                      onTouchEnd={() => setShowTime(true)}
                      style={{
                        height: 35,
                        width: '45%',
                        // backgroundColor: 'red',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor: 'gray',
                        borderRadius: 5,
                      }}>
                      <Text style={[styles.textHead, {top: -12 * heightRef}]}>
                        Time
                      </Text>
                      <Text style={{color: colors.black}}>
                        {moment(time).format('LT')}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      paddingTop: 9 * heightRef,
                      paddingBottom: timeError ? 9 * heightRef : 0,
                      paddingLeft: 10 * widthRef,
                      color: colors.error,
                    }}>
                    {timeError
                      ? 'You cannot select past time for interview.'
                      : ''}
                  </Text>
                </View>

                <Button
                  onPress={() => {
                    console.log(
                      date.toISOString().split('T')[0] +
                        'T' +
                        time.toISOString().split('T')[1],
                    );

                    if (
                      new Date(
                        date.toISOString().split('T')[0] +
                          'T' +
                          time.toISOString().split('T')[1],
                      ) < new Date()
                    ) {
                      setTimeError(true);
                    } else {
                      settScheduleLoader(true);
                      dispatch(
                        makeZoomMeet(
                          {
                            jobApplicationId: selectedApplication._id,
                            jobId: selectedApplication.jobId._id,
                            companyId: selectedApplication.companyId._id,
                            driverId: selectedApplication.driverId._id,
                            scheduledAt:
                              date.toISOString().split('T')[0] +
                              'T' +
                              time.toISOString().split('T')[1],
                          },
                          (success, msg) => {
                            if (success) {
                              console.log('41: Success');
                              setA(a + 1);
                              dispatch(
                                getJobApplicationsByJob(
                                  route.params.data._id,
                                  (success, msg) => {
                                    if (success) {
                                      console.log('41: Success');
                                    } else {
                                      console.log('Image', msg);
                                    }
                                    return true;
                                  },
                                ),
                              );
                              settScheduleLoader(false);
                              setDriverDetailModal(false);
                            } else {
                              console.log('Image', msg);
                              setError(msg);
                              settScheduleLoader(false);
                              setShowError(true);
                            }
                            return true;
                          },
                        ),
                      );
                    }
                  }}
                  buttonText={'Schedule interview'}
                  buttonHeight={40 * heightRef}
                  buttonWidth={0.85 * fullWidth}
                  buttonColor={colors.primary}
                  iconSize={25}
                  isLoading={scheduleLoader}
                  buttonCorners={20 * heightRef}
                  buttonPosition={Alignments.center}
                  titleFontStyle={fontWeights.h500}
                  buttonstyle={{marginBottom: 10}}
                />
              </View>
            ) : (
              <Button
                onPress={() => {
                  setShowSchedule(true);
                }}
                buttonText={'Schedule interview'}
                buttonHeight={40 * heightRef}
                buttonWidth={0.9 * fullWidth}
                buttonColor={colors.primary}
                iconSize={25}
                // isLoading={loader}
                buttonCorners={20 * heightRef}
                buttonPosition={Alignments.center}
                titleFontStyle={fontWeights.h500}
                buttonstyle={{marginBottom: 10}}
              />
            )}
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display={'inline'}
                minimumDate={new Date()}
                onChange={onChangeDate}
              />
            )}
            {showTime && (
              <DateTimePicker
                testID="dateTimePicke"
                value={time}
                display={'spinner'}
                mode={'time'}
                is24Hour={false}
                style={{alignSelf: 'center', marginBottom: 5 * heightRef}}
                onChange={onChangeTime}
              />
            )}
            {/* Schedule View */}

            <Text style={styles.texta}>Description</Text>
            <Text style={styles.textb}>
              The foundation of classical electromagnetism describe light as a
              wave that moves with a characteristic velocity. The modern view is
              that light needs no medium.
            </Text>
            <Text style={styles.texta}>Gender</Text>
            <Text style={styles.textb}>{selectedDriver.gender}</Text>
            <Text style={styles.texta}>Employment status</Text>
            <Text style={styles.textb}>{selectedDriver.employmentStatus}</Text>
            <Text style={styles.texta}>Driving experience</Text>
            <Text style={styles.textb}>
              {selectedDriver.drivingExperience}+ years
            </Text>
            <Text style={styles.texta}>Preferred location</Text>
            <Text style={[styles.textb, {marginBottom: 5 * heightRef}]}>
              {selectedDriver.preferredLocation}
            </Text>
            <View
              style={{
                height: 0.25 * fullHeight,
                width: '100%',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                  marginLeft: 5,
                }}>
                <Text style={styles.texta}>Driving License</Text>
                <View
                  style={{
                    backgroundColor: colors.background,
                    height: 100 * heightRef,
                    width: 160 * widthRef,
                    marginLeft: 10 * widthRef,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: '#DADADA',
                    borderRadius: 2 * heightRef,
                  }}>
                  <Image
                    style={styles.image3a}
                    resizeMode="cover"
                    // source={Images.default}
                    source={{uri: selectedDriver.drivingLicense}}
                  />
                </View>
                <Text
                  onPress={() => {
                    setDriverDetailModal(false);
                    navigation.navigate('ViewImgScreen', {
                      data: selectedDriver.drivingLicense,
                    });
                  }}
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    color: colors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  {'View'}
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  width: '50%',
                }}>
                <Text style={styles.texta}>Driving certificate</Text>
                <View
                  style={{
                    backgroundColor: colors.background,
                    height: 100 * heightRef,
                    width: 160 * widthRef,
                    marginLeft: 10 * widthRef,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: '#DADADA',
                    borderRadius: 2 * heightRef,
                  }}>
                  <Image
                    style={styles.image3a}
                    resizeMode="cover"
                    source={{uri: selectedDriver.drivingCertificate}}
                  />
                </View>
                <Text
                  onPress={() => {
                    setDriverDetailModal(false);
                    navigation.navigate('ViewImgScreen', {
                      data: selectedDriver.drivingCertificate,
                    });
                  }}
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    color: colors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  {'View'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

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
    </SafeAreaView>
  );
};

export default JobDetailScreen;
