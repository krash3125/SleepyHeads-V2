import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Switch, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';
import tw from '../lib/tailwind.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Permissions = ({ navigation }) => {
  const [cameraPermissions, setCameraPermissions] = useState(false);
  const [cameraCanAskAgain, setCameraCanAskAgain] = useState(true);
  const [notifPermissions, setNotifPermissions] = useState(false);
  const [notifCanAskAgain, setNotifCanAskAgain] = useState(true);

  useEffect(() => {
    (async () => {
      await reqCameraPerms();
      await reqNotifPerms();
    })();
  }, []);

  const reqCameraPerms = async () => {
    const { canAskAgain, status } =
      await Camera.requestCameraPermissionsAsync();
    setCameraPermissions(status === 'granted');
    setCameraCanAskAgain(canAskAgain);
  };

  const reqNotifPerms = async () => {
    const { canAskAgain, status } =
      await Notifications.requestPermissionsAsync();
    setNotifPermissions(status === 'granted');
    setNotifCanAskAgain(canAskAgain);
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1 mx-8 mt-6`}>
        <Text
          style={tw`mt-4 mb-2 text-center text-3.5xl font-800 text-sh-dark-blue`}
        >
          Permissions
        </Text>
        <View style={tw`w-3/5 mx-auto border-b border-sh-dark-blue`} />
        <View style={tw`flex flex-row mt-8 items-center`}>
          <Text style={tw`text-3xl font-800 text-center text-sh-dark-blue`}>
            Camera
          </Text>
          <Switch
            style={tw`ml-auto`}
            trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
            value={cameraPermissions}
            onValueChange={reqCameraPerms}
            disabled={!cameraCanAskAgain}
          />
        </View>
        <Text style={tw`mt-4 text-lg text-center text-sh-grey`}>
          {cameraCanAskAgain
            ? 'We need camera permissions for this app to work properly.'
            : 'We aren\'t allowed to ask for camera permissions multiple times, to allow permissions please go to settings search for "SleepyHeads" and manually do so.'}
        </Text>
        <View style={tw`flex flex-row mt-8 items-center`}>
          <Text style={tw`text-3xl font-800 text-center text-sh-dark-blue`}>
            Notifications
          </Text>
          <Switch
            style={tw`ml-auto`}
            trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
            value={notifPermissions}
            onValueChange={reqNotifPerms}
            disabled={!notifCanAskAgain}
          />
        </View>
        <Text style={tw`mt-4 text-lg text-center text-sh-grey`}>
          {notifCanAskAgain
            ? 'We ask for notification permissions to boost functionality of this app.'
            : 'We aren\'t allowed to ask for notification permissions multiple times, to allow permissions please go to settings search for "SleepyHeads" and manually do so.'}
        </Text>
      </View>
      <TouchableOpacity
        disabled={!cameraPermissions}
        style={[
          tw` w-3/4 mb-10 mx-auto p-3 rounded-md`,
          tw`${cameraPermissions ? 'bg-[#3C66FF]' : 'bg-[#D8D8D8]'}`,
        ]}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={tw`text-center font-semibold text-white`}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Permissions;
