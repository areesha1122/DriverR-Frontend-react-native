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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getLanguage, getProfile} from 'src/redux/auth/authSelector';
import {fontSizes} from 'src/config/fontSize';
import {fontWeights} from 'src/config/fontWeight';
import {getJobPosts} from 'src/redux/jobPosts/jobPostsApiCalls';
import moment from 'moment';
import Modal from 'react-native-modal';
import {addJobPost} from 'src/redux/jobPosts/jobPostsApiCalls';
import {getJobPostss} from 'src/redux/jobPosts/jobPostsSelector';
import {getSupportTicket} from 'src/redux/support-faqs/supportSelector';
import {getAllSupportTicketCompany} from 'src/redux/support-faqs/supportApiCalls';
import Text from 'src/components/text';
import {translation} from 'src/config/translation';

const SupportTicketsScreen = (props: any) => {
  // Variables
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  var SearchLabel = 'Search';
  // States
  const [search, setSearch] = useState('');
  const [showOption, setShowOption] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [jobStatus, setJobStatus] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [selectedJob, setSelectedJob]: any = useState('');
  const [showSearch, setShowSearch]: any = useState(false);
  const [tab, setTab] = useState('My jobs');
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [supportTickets, SetSupportTickets]: any = useState([]);
  const [dataSupport, SetDataSupport]: any = useState([]);

  // Selectors
  const language = useSelector(getLanguage);
  const profile = useSelector(getProfile);
  const jobPosts = useSelector(getJobPostss);
  // const supportTickets = useSelector(getSupportTicket);

  // Effects

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getAllSupportTicketCompany(profile._id, (success, msg) => {
          if (success) {
            console.log('41: Success');
            SetSupportTickets(msg.reverse());
            SetDataSupport(msg);
          } else {
            console.log('Image', msg);
          }
          return true;
        }),
      );
    }, []),
  );

  // Functions

  const searchFilter = (text: string) => {
    setSearch(text);
    console.log(text);
    const filteredResults = dataSupport.filter((item: any) => {
      return item.subject.toLowerCase().includes(text.toLowerCase());
    });
    console.log(filteredResults.length);
    SetSupportTickets(filteredResults);
  };

  const renderJobs = () => {
    return (
      <FlatList
        data={supportTickets}
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
              No results found
            </Text>
          </View>
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TicketDetailScreen', {data: item});
            }}
            key={item}
            style={[styles.jobCard, styles.shadow]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10 * heightRef,
              }}>
              {/* <TouchableOpacity
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
              </TouchableOpacity> */}

              <View style={{marginLeft: 10 * widthRef}}>
                <Text language={language} style={styles.text6}>
                  {item.subject}
                </Text>
                <Text
                  numberOfLines={2}
                  style={[styles.text5, {maxWidth: fullWidth * 0.75}]}>
                  {item.description}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}></View>
            <Text2 style={styles.text8}>
              {moment(item.createdAt).fromNow()}
            </Text2>
            <Text2
              style={[
                styles.text7,
                {
                  backgroundColor:
                    item.status == 'PENDING'
                      ? '#E8ECFF'
                      : item.status == 'CLOSED'
                      ? '#D1D5DB'
                      : '#dcf0d5',
                  color:
                    item.status == 'PENDING'
                      ? '#1153DA'
                      : item.status == 'CLOSED'
                      ? '#4B5563'
                      : '#22C55E',
                  position: 'absolute',
                  right: 10 * widthRef,
                  top: 5 * heightRef,
                },
              ]}>
              {item.status}
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
              buttonstyle={styles.backButton}
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
              Support ticket
            </Text>
          ) : null}
        </View>

        <View style={{flexDirection: 'row'}}>
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
                  right: 2 * widthRef,
                  bottom: 12 * heightRef,
                  zIndex: 1,
                }}
              />
              <TextInput
                style={styles.input}
                onChangeText={searchFilter}
                value={search}
                placeholder={
                  language == 'English' ? SearchLabel : translation[SearchLabel]
                }
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
              size={28 * heightRef}
              color={'#64748B'}
              style={{
                position: 'absolute',
                right: 2 * widthRef,
                bottom: -12 * heightRef,
                zIndex: 1,
              }}
            />
          )}
        </View>
      </View>

      {renderJobs()}
      <View style={styles.shadow3}>
        <Button
          onPress={() => {
            navigation.navigate('NewTicketScreen');
          }}
          buttonText={'Create new request'}
          language={language}
          buttonHeight={40 * heightRef}
          buttonWidth={0.9 * fullWidth}
          buttonColor={colors.primary}
          iconSize={25}
          // isLoading={loader}
          buttonCorners={20 * heightRef}
          buttonPosition={Alignments.center}
          titleFontStyle={fontWeights.h500}
          buttonstyle={{}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SupportTicketsScreen;
