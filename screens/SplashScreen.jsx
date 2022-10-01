import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Camera } from 'expo-camera';

import tw from '../lib/tailwind.js';
import fullLogo from '../assets/fullLogo.png';

const SplashScreen = ({ navigation }) => {
  const [permission, _] = Camera.useCameraPermissions();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        <Image source={fullLogo} style={tw`h-1/2 w-full mx-auto`} />
        <Text style={tw`my-4 mx-3 text-4xl font-800 text-center`}>
          The perfect app for long drives!
        </Text>
        <Text style={tw`text-lg text-center`}>Driving safely made easy</Text>
        <TouchableOpacity
          style={[
            tw`w-3/4 mt-16 mx-auto p-3 rounded-md`,
            { backgroundColor: '#3C66FF' },
          ]}
          onPress={() =>
            navigation.replace(permission.granted ? 'Home' : 'Permissions')
          }
        >
          <Text style={tw`text-center font-semibold text-white`}>
            Let's Start
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
