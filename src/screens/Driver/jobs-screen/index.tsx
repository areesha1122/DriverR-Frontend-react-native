import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text as Text2,
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLanguage,
  getNotificationCouterr,
  getProfile,
} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {
  getJobApplications,
  getJobPosts,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import Modal from 'react-native-modal';
import {addJobPost} from 'src/redux/jobPosts/jobPostsApiCalls';
import {
  getJobApplicationss,
  getJobPostss,
} from 'src/redux/jobPosts/jobPostsSelector';
import DropDownPicker from 'react-native-dropdown-picker';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import Text from 'src/components/text';

const JobsPostsScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // States
  const [search, setSearch] = useState('');
  const [searchData, setSearchData]: any = useState({});
  const [showOption, setShowOption] = useState(false);
  const [refreash, setRefreash] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [jobStatus, setJobStatus] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedJob, setSelectedJob]: any = useState('');

  const [jobPosts, setjobPosts]: any = useState(
    useSelector(getJobApplicationss),
  );
  const [showSearch, setShowSearch]: any = useState(false);
  const [tab, setTab] = useState('My jobs');
  const [employemntOpen, setEmploymentOpen] = useState(false);
  const [employmentValue, setEmploymentValue] = useState(null);
  const [employmentError, setEmploymentError] = useState('');
  const [employmentItems, setEmploymentItems] = useState([
    {label: 'Applied', value: 'Applied'},
    {label: 'Shortlisted', value: 'Shortlisted'},
    {label: 'Interview', value: 'Interview'},
    {label: 'Closed', value: 'Closed'},
  ]);

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  // const jobPosts = ;
  const counter = useSelector(getNotificationCouterr);

  console.log(JSON.stringify(jobPosts, null, 2));

  // Effects

  const onRefreash = React.useCallback(() => {
    dispatch(
      getJobApplications(undefined, (success, msg) => {
        if (success) {
          console.log('41: Success');
          setRefreash(false);
          setjobPosts(msg.reverse());
        } else {
          setRefreash(false);
          console.log('Image', msg);
        }
        return true;
      }),
    );
  }, []);
  useFocusEffect(onRefreash);

  // Functions

  const searchFilter = (text: string) => {
    setSearch(text);
    console.log(text);
    const filteredResults = jobPosts.filter((item: any) => {
      return item.jobId.title.toLowerCase().includes(text.toLowerCase());
    });
    console.log(filteredResults.length);
    setSearchData(filteredResults);
  };

  const renderJobs = () => {
    return (
      <FlatList
        // jobPosts.filter((i: any) => i.isDeleted == false)

        onRefresh={onRefreash}
        refreshing={refreash}
        data={
          search != ''
            ? searchData
            : employmentValue == 'Closed'
            ? jobPosts.filter((i: any) => i.isClosed == true)
            : employmentValue == 'Interview'
            ? jobPosts.filter(
                (i: any) =>
                  i.isInterviewScheduled == true && i.isClosed == false,
              )
            : employmentValue == 'Shortlisted'
            ? jobPosts.filter(
                (i: any) =>
                  i.isShortlisted == true &&
                  i.isInterviewScheduled == false &&
                  i.isClosed == false,
              )
            : employmentValue == 'Applied'
            ? jobPosts.filter(
                (i: any) =>
                  i.isShortlisted == false &&
                  i.isInterviewScheduled == false &&
                  i.isClosed == false,
              )
            : jobPosts
        }
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={{
          width: fullWidth,
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
              zIndex: -1000,
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
            disabled
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
                {/* <Icon
                  name={'dots-three-vertical'}
                  type={IconType.Entypo}
                  size={15 * heightRef}
                  color={colors.grey300}
                /> */}
              </TouchableOpacity>
              <Image
                style={styles.image3}
                resizeMode="cover"
                // source={Images.logo2}
                source={{uri: item.companyId.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {item?.jobId?.title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
                  {item.companyId.name}
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
                {item?.jobId?.requiredExperience}+ year
              </Text>
              <Text language={language} style={styles.text7}>
                {item?.jobId?.routeType}
              </Text>

              <Text2 style={styles.text8}>
                {moment(item.createdAt).fromNow()}
              </Text2>
            </View>
            <Text2
              style={[
                styles.text7,
                {
                  backgroundColor: item.isRejected
                    ? '#fad1cf'
                    : item.isFeedbackAdded
                    ? '#c9f0ed'
                    : item.isInterviewScheduled
                    ? '#c9f0ed'
                    : item.isShortlisted
                    ? '#c9f0ed'
                    : '#c9f0ed',

                  color: item.isRejected
                    ? colors.error
                    : item.isFeedbackAdded
                    ? colors.success
                    : item.isInterviewScheduled
                    ? colors.success
                    : item.isShortlisted
                    ? colors.success
                    : colors.success,
                  position: 'absolute',
                  right: 10 * widthRef,
                  top: 5 * heightRef,
                },
              ]}>
              {item.isRejected
                ? 'Rejected'
                : item.isClosed
                ? 'Closed'
                : item.isInterviewScheduled
                ? 'Interview'
                : item.isShortlisted
                ? 'Shortlisted'
                : 'Applied'}
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
              navigation.navigate('DriverNotificationScreen');
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
        <View style={{flexDirection: 'row'}}>
          <Text
            language={language}
            style={{
              color: '#111827',
              fontSize: fontSizes.f15,
              fontWeight: fontWeights.h400,
              marginLeft: 15 * widthRef,
            }}>
            {'All applications'}
          </Text>

          <Text
            style={{
              color: '#111827',
              fontSize: fontSizes.f15,
              fontWeight: fontWeights.h400,
            }}>
            {'(' + jobPosts.length}
            {') '}
          </Text>
        </View>

        <DropDownPicker
          style={{
            width: 0.35 * fullWidth,
            position: 'absolute',
            minHeight: 35,
            top: -20,
            borderColor: '#E4E4E4',
            right: 0.44 * fullWidth,
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
            width: 0.35 * fullWidth,
            top: 13 * heightRef,
            right: 0.44 * fullWidth,
            borderColor: '#E4E4E4',
            zIndex: 1000,
          }}
        />
      </View>

      <View
        style={{
          zIndex: -1000,
        }}>
        {renderJobs()}
      </View>
    </SafeAreaView>
  );
};

export default JobsPostsScreen;
