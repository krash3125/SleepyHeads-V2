import React from 'react';

import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  Switch,
} from 'react-native';
import tw from '../lib/tailwind.js';

const Permissions = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1 mx-8`}>
        {/* <Text style={tw`mt-4 text-3xl font-800 text-center text-sh-dark-blue`}>
          Sleepy Heads needs your Permissions
        </Text> */}
        <View style={tw`flex flex-row mt-8 items-center`}>
          <Text style={tw`text-3xl font-800 text-center text-sh-dark-blue`}>
            Camera
          </Text>
          <Switch
            style={tw`ml-auto`}
            trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
            value={false}
            onValueChange={async () => {
              const { status } = await Camera.requestCameraPermissionsAsync();
              setHasPermission(status === 'granted');
            }}
          />
        </View>
        <Text style={tw`mt-4 text-lg text-center text-sh-grey`}>
          We need camera permissions for this app to work properly.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Permissions;
