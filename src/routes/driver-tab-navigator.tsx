import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions, Image, View, NativeModules, Platform} from 'react-native';
import Text from 'src/components/text';
import {ScaledSheet} from 'react-native-size-matters';
import {fontRef, heightRef} from 'src/config/screenSize';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import {colors} from 'src/config/colors';
import DriverDashboardScreen from 'src/screens/Driver/driverHome-screens/dashboard-screen';
import JobsPostsScreen from 'src/screens/Driver/jobs-screen';
import JobsInterviewsScreen from 'src/screens/Driver/interviews-screen';
import {useSelector} from 'react-redux';
import {getLanguage} from 'src/redux/auth/authSelector';

const {PlatformConstants} = NativeModules;
const deviceType = PlatformConstants.interfaceIdiom;
const Tab = createBottomTabNavigator();

function TabNavigator(props: any) {
  const language = useSelector(getLanguage);
  return (
    <Tab.Navigator initialRouteName="DriverDashboardScreen">
      <Tab.Screen
        name="DriverDashboardScreen"
        component={DriverDashboardScreen}
        options={{
          tabBarStyle: styles.lowerBar,
          tabBarLabel: '',
          headerTitle: '',
          tabBarHideOnKeyboard: true,
          headerShown: false,

          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Icon
                name={'home-variant'}
                type={IconType.MaterialCommunityIcons}
                size={22 * heightRef}
                color={focused ? colors.primary : colors.grey300}
                style={{}}
              />
              <Text
                language={language}
                style={focused ? styles.labelTextActive : styles.labelText}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="DriverJobsScreen"
        component={JobsPostsScreen}
        options={{
          tabBarStyle: styles.lowerBar,
          tabBarHideOnKeyboard: true,
          tabBarLabel: '',
          headerTitle: '',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Icon
                name={'briefcase'}
                type={IconType.MaterialCommunityIcons}
                size={20 * heightRef}
                color={focused ? colors.primary : colors.grey300}
                style={{}}
              />
              <Text
                language={language}
                style={focused ? styles.labelTextActive : styles.labelText}>
                Jobs
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="InterViewsScreen"
        component={JobsInterviewsScreen}
        options={{
          tabBarStyle: styles.lowerBar,
          tabBarLabel: '',
          headerTitle: '',
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={styles.iconContainer}>
              <Icon
                name={'briefcase-clock'}
                type={IconType.MaterialCommunityIcons}
                size={20 * heightRef}
                color={focused ? colors.primary : colors.grey300}
                style={{}}
              />
              <Text
                language={language}
                style={focused ? styles.labelTextActive : styles.labelText}>
                Interview
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = ScaledSheet.create({
  lightText: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '500',
    color: '#8E8E8E',
  },
  boldText: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '500',
  },
  normalText: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '100',
  },
  lowerBar: {
    height: '9%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Platform.OS == 'android' ? 0 : 10,

    borderTopWidth: 0.5,
  },
  icons: {
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    top: 10,
    width: 50,
  },
  labelText: {
    fontWeight: '400',
    fontSize: 11 * fontRef,
    textAlign: 'center',
    color: colors.grey300,
  },
  labelTextActive: {
    fontWeight: '400',
    fontSize: 10 * fontRef,
    textAlign: 'center',
    color: colors.primary,
  },
});

export default TabNavigator;
