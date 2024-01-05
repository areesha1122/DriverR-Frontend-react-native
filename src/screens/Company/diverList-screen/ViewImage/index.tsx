import React, {useEffect, useLayoutEffect} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {getLanguage, getUserId} from 'src/redux/auth/authSelector';
import {Images} from 'src/assets';
import io from 'socket.io-client';
import {Button} from 'react-native-paper';
import {fullWidth, heightRef} from 'src/config/screenSize';
import {colors} from 'src/config/colors';
import {Alignments} from 'src/components/button';
import {fontWeights} from 'src/config/fontWeight';
import Text from 'src/components/text';
import {ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

const ViewImgScreen = (props: any) => {
  // Variables
  // var sockett = io('https://8ac4-103-116-251-41.ngrok-free.app');

  // States

  // Selectors
  const route = useRoute<any>();
  const navigation = useNavigation();

  let id = useSelector(getUserId);

  // Effects

  // Functions

  // Validators

  // Screen Design
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Icon
          onPress={() => navigation.goBack()}
          name={'arrow-back'}
          type={IconType.Ionicons}
          size={25}
          color={colors.primary}
          style={{alignSelf: 'flex-start', marginTop: 20 * heightRef}}
        />
        <Image
          style={styles.truckImage}
          resizeMode="contain"
          source={{uri: route.params.data}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewImgScreen;
