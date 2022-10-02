import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { View, Text, Image } from 'react-native';
import { AppState, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from '../lib/tailwind';

import * as Notifications from 'expo-notifications';
import { useKeepAwake } from 'expo-keep-awake';

import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import Drawer from '../components/Drawer';
import Help from '../components/BottomSheets/Help';

import Permissions from './Permissions';
import { StatusBar } from 'expo-status-bar';

import AsyncStorage from '@react-native-async-storage/async-storage';

let eyeCloseInARow = 0;
const eyeCloseTime = 0.4; //in seconds

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = ({ navigation }) => {
  useKeepAwake();
  const [cameraPermissions, setCameraPermissions] = useState(true);
  const [type, setType] = useState(CameraType.front);

  const [sound, setSound] = useState();
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [songName, setSongName] = useState('sound1.wav');

  const [faceVisible, setFaceVisible] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusBarHeight = useMemo(() => {
    return getStatusBarHeight();
  }, []);

  let cameraRef = useRef();
  let drawerRef = useRef();
  let helpBottomSheetRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setCameraPermissions(status === 'granted');
      if (status !== 'granted') {
        navigation.replace('Permissions');
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!drawerOpen) {
        try {
          const value = await AsyncStorage.getItem('song_name');
          if (value !== null) {
            setSongName(value);
          }
        } catch (e) {}
      } else {
        if (soundPlaying) {
          setSoundPlaying(false);
          try {
            sound.unloadAsync();
          } catch (e) {}
        }
      }
    })();
  }, [drawerOpen]);

  //-----------Notifications--------------

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status === 'granted') {
        const subscription = AppState.addEventListener(
          'change',
          (nextAppState) => {
            if (
              appState.current.match(/inactive|background/) &&
              nextAppState === 'active'
            ) {
              //App has come to the foreground!
            } else if (
              appState.current.match(/active/) &&
              nextAppState === 'background'
            ) {
              //App has gone to the background!
              schedulePushNotification();
            }
            appState.current = nextAppState;
          }
        );

        return () => {
          subscription.remove();
        };
      }
    })();
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'SleepyHeads Alert',
        body: 'Monitoring is paused, tap here resume.',
      },
      trigger: null,
    });
  }

  //-------------------------
  const handleFacesDetected = ({ faces }) => {
    if (drawerOpen) return;
    try {
      if (eyeCloseInARow > eyeCloseTime * 10) {
        //eyes are closed for longer duration
        setEyeOpen(false);
        if (!soundPlaying) playSound();
      }
      if (
        faces[0].leftEyeOpenProbability < 0.15 ||
        faces[0].rightEyeOpenProbability < 0.15
      ) {
        eyeCloseInARow++;
      } else {
        setSoundPlaying(false);
        try {
          sound.unloadAsync();
        } catch (e) {}
        setEyeOpen(true);
        eyeCloseInARow = 0;
      }
      setFaceVisible(true);
    } catch (e) {
      setFaceVisible(false);
      if (soundPlaying) {
        setSoundPlaying(false);
        try {
          sound.unloadAsync();
        } catch (e) {}
      }
    }
  };

  const playSound = async () => {
    setSoundPlaying(true);
    if (songName === 'sound2.wav') {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/mp3/sound2.wav'),
        { isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
    } else if (songName === 'sound3.mp3') {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/mp3/sound3.mp3'),
        { isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/mp3/sound1.wav'),
        { isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
    }
  };

  const pausePreview = () => {
    cameraRef.current.pausePreview();
    setDrawerOpen(true);
  };

  const resumePreview = () => {
    cameraRef.current.resumePreview();
    setDrawerOpen(false);
  };

  if (cameraPermissions == null || !cameraPermissions) {
    return <Text>Camera permissions are false.</Text>;
  }
  return (
    <Drawer
      drawerRef={drawerRef}
      pausePreview={pausePreview}
      resumePreview={resumePreview}
    >
      <StatusBar style="light" />
      {drawerOpen && (
        <BlurView
          style={tw`absolute top-0 left-0 h-full w-full z-30`}
          intensity={50}
        />
      )}
      <Camera
        ref={cameraRef}
        style={tw`flex-1 flex flex-col`}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <BlurView
          style={tw`h-[${statusBarHeight + 65}px] w-full z-30`}
          tint="dark"
          intensity={20}
        >
          <View style={tw`w-full mb-4 absolute bottom-0`}>
            <View style={tw`flex flex-row items-center mx-5`}>
              <TouchableOpacity
                onPress={() => {
                  drawerRef.current.openDrawer();
                }}
              >
                <Feather name="menu" size={28} color="#fff" />
              </TouchableOpacity>
              <Text
                style={tw`ml-auto text-3xl font-800 text-center text-sh-dark-blue`}
              >
                SleepyHeads
              </Text>
              <TouchableOpacity
                style={tw`ml-auto`}
                onPress={() => {
                  helpBottomSheetRef.current.expand();
                }}
              >
                <Feather name="help-circle" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
        <SafeAreaView style={tw`flex-1`}>
          {
            <View style={tw`mx-16 mt-auto mb-3`}>
              <View
                style={tw`h-12 w-full justify-center items-center border-2 border-slate-800 rounded-lg ${
                  !faceVisible
                    ? 'bg-yellow-500'
                    : eyeOpen
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              >
                <Text style={tw`text-lg font-600 text-sh-dark-blue`}>
                  {!faceVisible
                    ? 'Face Not Detected'
                    : eyeOpen
                    ? 'Eyes Open'
                    : 'Eyes Closed'}
                </Text>
              </View>
            </View>
          }
        </SafeAreaView>
      </Camera>
      <Help style={tw`z-50`} helpBottomSheetRef={helpBottomSheetRef} />
    </Drawer>
  );
};

export default Home;
