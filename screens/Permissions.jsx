import React from 'react';
import { View, SafeAreaView, Text, Switch } from 'react-native';
import tw from '../lib/tailwind.js';

const Permissions = ({ Camera, setHasPermission }) => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1 mx-8 mt-6`}>
        <Text
          style={tw`mt-4 mb-3 text-center text-3.5xl font-800 text-sh-dark-blue`}
        >
          Permissions
        </Text>
        <View style={tw`w-3/4 mx-auto border-b border-sh-dark-blue`} />
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
          We need camera permissions for this app to work properly. If switch
          doesn't work go to settings scroll down to "SleepyHeads - Stay
          Focused" and enable camera permissions manually.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Permissions;
