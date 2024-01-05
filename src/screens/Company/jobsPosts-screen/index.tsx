import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text as Text2,
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
import InputFeild from 'src/components/inputFeild';
import {TextInput} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLanguage,
  getNotificationCouterr,
  getProfile,
} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {getJobPosts} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import Modal from 'react-native-modal';
import {addJobPost} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getJobPostss} from 'src/redux/jobPosts/jobPostsSelector';
import DropDownPicker from 'react-native-dropdown-picker';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import Text from 'src/components/text';

const JobsPostsScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // States
  const [search, setSearch] = useState('');
  const [showOption, setShowOption] = useState(false);
  const [searchData, setSearchData] = useState({});
  const [deletePost, setDeletePost] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [jobStatus, setJobStatus] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedJob, setSelectedJob]: any = useState('');
  const [showSearch, setShowSearch]: any = useState(false);
  const [tab, setTab] = useState('My jobs');
  const [employemntOpen, setEmploymentOpen] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [employmentValue, setEmploymentValue] = useState(null);
  const [employmentError, setEmploymentError] = useState('');
  const [employmentItems, setEmploymentItems] = useState([
    {label: 'All jobs', value: ''},
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]);

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const jobPosts = useSelector(getJobPostss);
  const counter = useSelector(getNotificationCouterr);
  console.log(JSON.stringify(jobPosts, null, 2));

  // Effects
  useEffect(() => {
    dispatch(
      getJobPosts(undefined, (success, msg) => {
        if (success) {
          console.log('41: Success');
          setDeletePost(false);
        } else {
          setDeletePost(false);
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, []);

  // Functions

  const searchFilter = (text: string) => {
    setSearch(text);
    console.log(text);
    const filteredResults = jobPosts
      .filter((i: any) => i.isDeleted == false)
      .filter((item: any) => {
        return item.title.toLowerCase().includes(text.toLowerCase());
      });
    console.log(filteredResults.length);
    setSearchData(filteredResults);
  };

  const deleteJobb = async () => {
    setDeleteLoader(true);
    dispatch(
      addJobPost(
        {
          companyId: profile._id,
          jobId: selectedJob._id,
          title: selectedJob.title,
          requiredExperience: selectedJob.requiredExperience,
          routeType: selectedJob.routeType,
          equipmentType: selectedJob.selectedJob,
          licenseRequired: selectedJob.licenseRequired,
          medicalInsuranceRequired: selectedJob.medicalInsuranceRequired,
          jobDescription: selectedJob.jobDescription,
          isDeleted: true,
        },
        (success, msg) => {
          if (success) {
            dispatch(
              getJobPosts(undefined, (success, msg) => {
                if (success) {
                  console.log('41: Success');
                  setDeleteLoader(true);
                  setDeletePost(false);
                } else {
                  setDeletePost(false);
                  setDeleteLoader(true);
                  console.log('Image', msg);
                }
                return true;
              }),
            );
          } else {
            setDeletePost(false);
            setDeleteLoader(true);
            console.log('Image', msg);
          }
          return true;
        },
      ),
    );
  };

  const enableJob = async () => {
    dispatch(
      addJobPost(
        {
          companyId: profile._id,
          jobId: selectedJob._id,
          title: selectedJob.title,
          requiredExperience: selectedJob.requiredExperience,
          routeType: selectedJob.routeType,
          equipmentType: selectedJob.selectedJob,
          licenseRequired: selectedJob.licenseRequired,
          medicalInsuranceRequired: selectedJob.medicalInsuranceRequired,
          jobDescription: selectedJob.jobDescription,
          isActive: true,
        },
        (success, msg) => {
          if (success) {
            dispatch(
              getJobPosts(undefined, (success, msg) => {
                if (success) {
                  console.log('41: Success');
                  setShowOption(false);
                } else {
                  console.log('Image', msg);
                  setShowOption(false);
                }
                return true;
              }),
            );
          } else {
            console.log('Image', msg);
            setShowOption(false);
          }
          return true;
        },
      ),
    );
  };

  const disableJob = async () => {
    dispatch(
      addJobPost(
        {
          companyId: profile._id,
          jobId: selectedJob._id,
          title: selectedJob.title,
          requiredExperience: selectedJob.requiredExperience,
          routeType: selectedJob.routeType,
          equipmentType: selectedJob.selectedJob,
          licenseRequired: selectedJob.licenseRequired,
          medicalInsuranceRequired: selectedJob.medicalInsuranceRequired,
          jobDescription: selectedJob.jobDescription,
          isActive: false,
        },
        (success, msg) => {
          if (success) {
            dispatch(
              getJobPosts(undefined, (success, msg) => {
                if (success) {
                  console.log('41: Success');
                  setShowOption(false);
                } else {
                  console.log('Image', msg);
                  setShowOption(false);
                }
                return true;
              }),
            );
          } else {
            console.log('Image', msg);
            setShowOption(false);
          }
          return true;
        },
      ),
    );
  };

  const renderJobs = () => {
    return (
      <FlatList
        data={
          employmentValue == 'Active'
            ? jobPosts
                .filter((i: any) => i.isDeleted == false && i.isActive == true)
                .reverse()
            : employmentValue == 'Inactive'
            ? jobPosts
                .filter((i: any) => i.isDeleted == false && i.isActive == false)
                .reverse()
            : search != ''
            ? searchData.reverse()
            : jobPosts.filter((i: any) => i.isDeleted == false).reverse()
        }
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          flex: 1,
          marginTop: 15 * heightRef,
          zIndex: -1000,
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('JobDetailScreen', {data: item});
            }}
            key={item}
            style={[styles.jobCard, styles.shadow]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedJob(item);
                  setSelectedJobId(item._id);
                  setJobStatus(item.isActive);
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
                />
              </TouchableOpacity>
              <Image
                style={styles.image3}
                resizeMode="cover"
                // source={Images.logo2}
                source={{uri: item.companyId.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text2 style={styles.text6}>{item.title}</Text2>
                <Text2
                  numberOfLines={1}
                  style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
                  {item.jobDescription}
                </Text2>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              <Text2 style={styles.text7}>
                {item.requiredExperience}+ year
              </Text2>
              <Text2 style={styles.text7}>{item.routeType}</Text2>

              <Text2 style={styles.text8}>
                {moment(item.createdAt).fromNow()}
              </Text2>
            </View>
            <Text2
              style={[
                styles.text7,
                {
                  backgroundColor: item.isActive ? '#dcf0d5' : '#fad1cf',
                  color: item.isActive ? colors.success : colors.error,
                  position: 'absolute',
                  right: 30 * widthRef,
                  top: 5 * heightRef,
                },
              ]}>
              {item.isActive ? 'Active' : 'Inactive'}
            </Text2>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          {!showSearch ? (
            <Text
              language={language}
              style={{
                fontSize: fontSizes.f22,
                fontWeight: fontWeights.h600,
                color: colors.black,
                margin: 10,
              }}>
              My jobs
            </Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',

            width: showSearch ? 0.7 * fullWidth : 0.4 * fullWidth,
            justifyContent: 'flex-end',
          }}>
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
                  right: 10 * widthRef,
                  bottom: 10 * heightRef,
                  zIndex: 1,
                }}
              />
              <TextInput
                style={styles.input}
                onChangeText={searchFilter}
                value={search}
                placeholder={'Search'}
                placeholderTextColor={'gray'}

                // keyboardType="numeric"
                // onFocus={() => {
                //   navigation.navigate('DriverJobsScreenn');
                // }}
              />
            </View>
          ) : (
            <Icon
              onPress={() => {
                setShowSearch(true);
              }}
              name={'search'}
              type={IconType.EvilIcons}
              size={30 * heightRef}
              color={'#64748B'}
              style={
                {
                  // position: 'absolute',
                  // right: 30 * widthRef,
                  // bottom: 12 * heightRef,
                  // zIndex: 1,
                  // right: 15 * widthRef,
                }
              }
            />
          )}
        </View>
        <View>
          {counter > 0 ? (
            <View
              style={{
                backgroundColor: '#EAB308',
                height: 18 * heightRef,
                width: 18 * heightRef,
                position: 'absolute',
                // top: 7 * heightRef,
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
              // top: 7 * heightRef,

              // zIndex: 1,
            }}
          />
        </View>
      </View>

      <View
        style={{
          width: fullWidth,
          // height: 20,
          // backgroundColor: 'red',
          marginTop: 30,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: 0.65 * fullWidth,
            // backgroundColor: 'pink',
          }}>
          <Text
            language={language}
            style={{
              color: '#111827',
              fontSize: fontSizes.f15,
              fontWeight: fontWeights.h400,
              marginLeft: 15 * widthRef,
            }}>
            {'All jobs'}
          </Text>
          <Text
            language={language}
            style={{
              color: '#111827',
              fontSize: fontSizes.f15,
              fontWeight: fontWeights.h400,
            }}>
            {' (' + jobPosts.filter((i: any) => i.isDeleted == false).length}
            {') '}
          </Text>
        </View>

        <DropDownPicker
          style={{
            width: 0.3 * fullWidth,
            // position: 'absolute',
            minHeight: 35,
            // top: -20,
            borderColor: '#E4E4E4',
          }}
          open={employemntOpen}
          value={employmentValue}
          items={employmentItems}
          setOpen={() => setEmploymentOpen(!employemntOpen)}
          onOpen={() => {
            setEmploymentError('');
            setEmploymentOpen(true);
          }}
          onClose={() => setEmploymentOpen(false)}
          setValue={setEmploymentValue}
          setItems={setEmploymentItems}
          multiple={false}
          placeholder="Status"
          dropDownDirection="BOTTOM"
          placeholderStyle={{
            color: '#7E7D7D',
            fontSize: 16 * fontRef,
          }}
          labelStyle={{
            fontSize: 15 * fontRef,
            color: 'black',
          }}
          dropDownContainerStyle={{
            width: 0.3 * fullWidth,
            top: 33 * heightRef,
            // right: 0.29 * fullWidth,
            borderColor: '#E4E4E4',
          }}
        />
      </View>
      {renderJobs()}
      <View style={styles.shadow3}>
        <Button
          onPress={() => {
            navigation.navigate('AddJobPostScreen');
          }}
          isButtonText={false}
          buttonHeight={60 * heightRef}
          buttonWidth={60 * heightRef}
          isIcon
          buttonColor={colors.primary}
          iconColor={colors.background}
          iconSize={30 * heightRef}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.flex_start}
          iconName={'plus'}
          iconType={'Entypo'}
        />
      </View>
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
            language={language}
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
                  setEditPost(true);
                }, 500);

                // navigation.navigate('EditJobPostScreen', {data: selectedJob});
              }}>
              <Icon
                onPress={() => setShowOption(false)}
                name={'edit'}
                type={IconType.Feather}
                size={18 * heightRef}
                color={colors.grey250}
                style={{marginLeft: 10}}
              />
              <Text
                language={language}
                style={{
                  color: '#4B5563',
                  marginLeft: 5,
                  fontSize: fontSizes.f16,
                }}>
                {'Edit'}
              </Text>
            </TouchableOpacity>
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
                setDeletePost(true);
              }}>
              <Icon
                onPress={() => setShowOption(false)}
                name={'delete'}
                type={IconType.AntDesign}
                size={18 * heightRef}
                color={colors.grey250}
                style={{marginLeft: 10}}
              />
              <Text
                language={language}
                style={{
                  color: '#4B5563',
                  marginLeft: 5,
                  fontSize: fontSizes.f16,
                }}>
                {'Delete'}
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
                  jobStatus ? disableJob() : enableJob();
                }
              }}>
              <Icon
                onPress={() => setShowOption(false)}
                name={jobStatus ? 'exclamationcircleo' : 'checkcircleo'}
                type={IconType.AntDesign}
                size={18 * heightRef}
                color={colors.grey250}
                style={{marginLeft: 10}}
              />
              <Text
                language={language}
                style={{
                  color: '#4B5563',
                  marginLeft: 5,
                  fontSize: fontSizes.f16,
                }}>
                {jobStatus ? 'Inactive' : 'Active'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        backdropOpacity={0.3}
        isVisible={deletePost}
        onBackdropPress={() => {
          setDeletePost(false);
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
              onPress={() => setDeletePost(false)}
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
              source={Images.del}
            />
            <Text language={language} style={[styles.text10]}>
              {'Are you sure you want to delete the post?'}
            </Text>
            <Text
              language={language}
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
                  setDeletePost(false);
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
                  deleteJobb();
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
                isLoading={deleteLoader}
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
              // alignItems: 'center',
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
                  style={{marginTop: 7 * heightRef, marginLeft: 0 * widthRef}}>
                  <Text
                    language={language}
                    language={language}
                    style={[styles.text6, {fontSize: fontSizes.f16}]}>
                    {selectedJob.title}
                  </Text>
                  <Text
                    language={language}
                    style={[
                      {
                        fontSize: fontSizes.f10,
                        fontWeight: fontWeights.h400,
                        padding: 2,
                        // paddingHorizontal: 5,
                        maxWidth: 60 * widthRef,
                        borderRadius: 2,
                        paddingRight: 0,
                        paddingLeft: 13 * widthRef,
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
                    {selectedJob.isActive ? 'Active' : 'Inactive'}
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
            <Text language={language} style={styles.texta}>
              Description
            </Text>
            <Text language={language} style={styles.textb}>
              {selectedJob.jobDescription}
            </Text>
            <Text language={language} style={styles.texta}>
              Experince Required
            </Text>
            <Text language={language} style={styles.textb}>
              {selectedJob.requiredExperience}+ years
            </Text>
            <Text language={language} style={styles.texta}>
              Equipment type
            </Text>
            <Text language={language} style={styles.textb}>
              {selectedJob.equipmentType}
            </Text>
            <Text language={language} style={styles.texta}>
              Route type
            </Text>
            <Text language={language} style={styles.textb}>
              {selectedJob.routeType}
            </Text>
            <Text language={language} style={styles.texta}>
              License required
            </Text>
            <Text language={language} style={styles.textb}>
              {selectedJob.licenseRequired ? 'Yes' : 'No'}
            </Text>
            <Text language={language} style={styles.texta}>
              Medical Insurance
            </Text>
            <Text language={language} style={styles.textb}>
              {selectedJob.medicalInsuranceRequired ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default JobsPostsScreen;
