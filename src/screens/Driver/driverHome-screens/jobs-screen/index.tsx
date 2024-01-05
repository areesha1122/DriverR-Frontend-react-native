import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
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
import {ScrollView} from 'react-native-gesture-handler';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {fontSizes} from 'src/config/fontSize';
import ReactNativeModal from 'react-native-modal';
import {fontWeights} from 'src/config/fontWeight';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getLanguage} from 'src/redux/auth/authSelector';
import {translation} from 'src/config/translation';

const DriverJobsScreen = (props: any) => {
  // Variables
  const listData = [1, 2, 3, 4, 5];
  const navigation = useNavigation();

  // States
  const [search, setSearch] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [location, setLocation] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [routeType, setRouteType] = useState('');
  const [equipment, setEquipment] = useState('');

  // Selectors
  const language = useSelector(getLanguage);

  // Effects

  // Functions
  const renderJobs = () => {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5]}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',

          marginTop: 15 * heightRef,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: fullHeight * 0.7,
            }}>
            <Image
              style={styles.image5}
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
          <View key={item} style={[styles.jobCard, styles.shadow]}>
            <Image
              style={styles.image3}
              resizeMode="contain"
              source={Images.logo2}
            />
            <View style={{marginLeft: 10 * widthRef}}>
              <Text language={language} style={styles.text6}>
                Water Truck Driver
              </Text>
              <Text language={language} style={styles.text7}>
                Full time
              </Text>
            </View>
            <Text language={language} style={styles.text8}>
              8 hours ago
            </Text>
          </View>
        )}
      />
    );
  };

  const renderSearchList = () => {
    return (
      <FlatList
        data={['water', 'water', 'water']}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{
          width: '100%',

          marginTop: 15 * heightRef,
        }}
        ListEmptyComponent={() => <View></View>}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setSearchItem(item);
              setSearch(item);
            }}
            key={item}
            style={[
              styles.searchCard,
              {marginTop: index == 0 ? 5 * heightRef : 25 * heightRef},
            ]}>
            <Icon
              name={'search'}
              type={IconType.EvilIcons}
              size={25 * heightRef}
              color={colors.grey300}
              style={{
                zIndex: 1,
              }}
            />
            <View style={{marginLeft: 10 * widthRef}}>
              <Text
                language={language}
                style={{color: colors.grey300, fontSize: fontSizes.f14}}>
                Water
              </Text>
            </View>
            <Image
              style={styles.image4}
              resizeMode="contain"
              source={Images.logo2}
            />
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
        <View>
          <Icon
            onPress={() => {
              searchItem
                ? (setSearchItem(''), setSearch(''))
                : navigation.goBack();
            }}
            name={'arrow-back-sharp'}
            type={IconType.Ionicons}
            size={22 * heightRef}
            color={colors.grey250}
            style={{
              position: 'absolute',
              left: 10 * widthRef,
              bottom: 7 * heightRef,
              zIndex: 1,
            }}
          />
          {searchItem ? (
            <TouchableOpacity
              style={[
                {
                  position: 'absolute',
                  right: 10 * widthRef,
                  bottom: 10 * heightRef,
                  zIndex: 1,
                },
              ]}
              onPress={() => {
                setShowFilter(true);
              }}>
              <Image
                style={[styles.image]}
                resizeMode="contain"
                source={Images.filterIcon}
              />
            </TouchableOpacity>
          ) : (
            <Icon
              onPress={() => {
                setSearch('');
              }}
              name={'close'}
              type={IconType.AntDesign}
              size={20 * heightRef}
              color={colors.grey250}
              style={{
                position: 'absolute',
                right: 10 * widthRef,
                bottom: 10 * heightRef,
                zIndex: 1,
              }}
            />
          )}

          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder={
              language == 'Romanian'
                ? translation['Search'] || 'Search'
                : 'Search'
            }
            placeholderTextColor={'grey'}
            keyboardType="default"
            editable={searchItem == '' ? true : false}
          />
        </View>
      </View>

      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#BABABA',
          marginVertical: 10,
        }}
      />

      {searchItem ? renderJobs() : search ? renderSearchList() : null}

      <ReactNativeModal
        backdropOpacity={0.3}
        isVisible={showFilter}
        onBackdropPress={() => {
          setShowFilter(false);
        }}
        onSwipeComplete={() => {}}
        swipeDirection={['down']}
        style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            backgroundColor: colors.background,
            height: 0.7 * fullHeight,
            width: fullWidth,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            top: 20,
            paddingHorizontal: 5,
          }}>
          <View
            style={{
              width: '97%',
              height: 25 * heightRef,

              marginTop: 10 * heightRef,
              alignItems: 'flex-end',
            }}>
            <Icon
              onPress={() => setShowFilter(false)}
              name={'close'}
              type={IconType.AntDesign}
              size={22 * heightRef}
              color={colors.grey250}
            />
          </View>
          <Text language={language} style={[styles.text9]}>
            Search Filter
          </Text>
          <Text language={language} style={styles.text10}>
            Location
          </Text>
          <View>
            <TextInput
              style={styles.input2}
              onChangeText={setLocation}
              value={location}
              placeholder={
                language == 'Romanian'
                  ? translation['Search'] || 'Search'
                  : 'Search'
              }
              keyboardType="default"
            />
            <Icon
              name={'search'}
              type={IconType.EvilIcons}
              size={25 * heightRef}
              color={colors.grey300}
              style={{
                position: 'absolute',
                left: 15 * widthRef,
                bottom: 13 * heightRef,
                zIndex: 1,
              }}
            />
          </View>

          <Text language={language} style={styles.text10}>
            Route Type
          </Text>
          <FlatList
            data={[
              'Box trailer',
              'Tanker',
              'Refrigerated',
              'Flatbed',
              'Tautline',
              'Oversized',
            ]}
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
              maxHeight: 100,
              marginTop: 10 * heightRef,
              flexDirection: 'column',
            }}
            ListEmptyComponent={() => <View></View>}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setRouteType(item);
                }}>
                <Text
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    borderWidth: routeType == item ? 1 : 0.5,
                    marginBottom: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    borderColor:
                      routeType == item ? colors.primary : colors.grey300,
                    color: routeType == item ? colors.primary : colors.grey300,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text language={language} style={styles.text10}>
            Equipment
          </Text>
          <FlatList
            data={[
              'Local',
              'Intra community',
              'Round trip',
              'Flatbed',
              'Tautline',
              'Oversized',
            ]}
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{alignSelf: 'flex-start'}}
            showsHorizontalScrollIndicator={false}
            style={{
              width: '100%',
              maxHeight: 100,
              marginTop: 10 * heightRef,
              flexDirection: 'column',
            }}
            ListEmptyComponent={() => <View></View>}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setEquipment(item);
                }}>
                <Text
                  style={{
                    padding: 10,
                    paddingHorizontal: 15,
                    borderWidth: equipment == item ? 1 : 0.5,
                    marginBottom: 10,
                    marginLeft: 10,
                    borderRadius: 10,
                    borderColor:
                      equipment == item ? colors.primary : colors.grey300,
                    color: equipment == item ? colors.primary : colors.grey300,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Button
            onPress={() => {
              setShowFilter(false);
              // navigation.navigate('PersonalInfoStep1Screen');
            }}
            buttonText={'Apply Filter'}
            buttonHeight={40 * heightRef}
            buttonWidth={0.9 * fullWidth}
            buttonColor={colors.primary}
            iconSize={25}
            buttonCorners={20 * heightRef}
            buttonPosition={Alignments.center}
            titleFontStyle={fontWeights.h500}
            buttonstyle={{marginTop: 20 * heightRef}}
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default DriverJobsScreen;
