import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = () => {
  const inset = useSafeAreaInsets();
  return (
    <View>
      <View
        style={{height: inset.top, width: '100%', backgroundColor: '#F6FAFB'}}
      />
    </View>
  );
};

export default Header;

// This component is being used for the purpose to handle the notches in iphones and android mobiles. 