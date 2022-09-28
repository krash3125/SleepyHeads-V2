import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from '../lib/tailwind';

import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import Drawer from '../components/Drawer';
import Help from '../components/BottomSheets/Help';

import Permissions from './Permissions';
import { StatusBar } from 'expo-status-bar';

let eyeCloseInARow = 0;
const eyeCloseTime = 0.4; //in seconds

const Home = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [type, setType] = useState(CameraType.front);

  const [sound, setSound] = useState();
  const [soundPlaying, setSoundPlaying] = useState(false);

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
      const { status } = await Camera.requestCameraPermissionsAsync();
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
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
    }
  };

  const playSound = async () => {
    setSoundPlaying(true);
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/mp3/sound1.wav'),
      { isLooping: true }
    );
    setSound(sound);
    await sound.playAsync();
  };

  const pausePreview = () => {
    cameraRef.current.pausePreview();
    setDrawerOpen(true);
  };

  const resumePreview = () => {
    cameraRef.current.resumePreview();
    setDrawerOpen(false);
  };

  if (hasPermission == null || !hasPermission) {
    return <Permissions Camera={Camera} setHasPermission={setHasPermission} />;
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
