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
import {
  getJobPosts,
  getJobPostsOfCompanyByID,
} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import Modal from 'react-native-modal';
import {addJobPost} from 'src/redux/jobPosts/jobPostsApiCalls';
import {
  getJobPostss,
  getTopCompaniess,
} from 'src/redux/jobPosts/jobPostsSelector';
import DropDownPicker from 'react-native-dropdown-picker';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import Text from 'src/components/text';

const AllCompaniesScreen = (props: any) => {
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
  const topCompanies = useSelector(getTopCompaniess);

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
    const filteredResults = topCompanies.filter((item: any) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    console.log(filteredResults.length);
    setSearchData(filteredResults.reverse());
  };

  const renderJobs = () => {
    return (
      <FlatList
        data={search != '' ? searchData : topCompanies}
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
                source={{uri: item.profilePicture}}
              />
              <View style={{marginLeft: 10 * widthRef}}>
                <Text2 style={styles.text6}>{item.name}</Text2>
                <Text2
                  numberOfLines={1}
                  style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
                  {item.address}
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
                Founded {moment(item.establishDate).fromNow()}
              </Text2>
              <Text2 style={styles.text7}>{item.companySize} employees</Text2>
            </View>
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
          <View>
            <Button
              onPress={() => {
                navigation.goBack();
              }}
              isButtonText={false}
              buttonHeight={32 * heightRef}
              buttonWidth={32 * heightRef}
              isIcon
              buttonColor={colors.grey100}
              iconSize={18 * heightRef}
              buttonCorners={20 * heightRef}
              buttonPosition={Alignments.flex_start}
              iconName={'arrow-back-sharp'}
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
              Hiring companies
            </Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',

            width: showSearch ? 0.7 * fullWidth : 0.2 * fullWidth,
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
      </View>

      {renderJobs()}
    </SafeAreaView>
  );
};

export default AllCompaniesScreen;
