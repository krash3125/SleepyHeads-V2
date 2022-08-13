import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from '../lib/tailwind';

import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';

import Drawer from '../components/Drawer';

let eyeCloseInARow = 0;
const eyeCloseTime = 0.8; //in seconds

const Home = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.front);

  const [sound, setSound] = useState();
  const [soundPlaying, setSoundPlaying] = useState(false);

  const [faceVisible, setFaceVisible] = useState(false);
  const [eyeOpen, setEyeOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  let cameraRef = useRef();
  let drawerRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const SwitchCameraFacing = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const handleFacesDetected = ({ faces }) => {
    if (eyeCloseInARow > eyeCloseTime * 10) {
      //eyes are closed for longer duration
      if (!soundPlaying) playSound();
      setEyeOpen(false);
    }
    try {
      if (
        faces[0].leftEyeOpenProbability < 0.15 ||
        faces[0].rightEyeOpenProbability < 0.15
      ) {
        eyeCloseInARow++;
      } else {
        if (soundPlaying) sound.unloadAsync();
        setEyeOpen(true);
        eyeCloseInARow = 0;
      }
      setFaceVisible(true);
    } catch (e) {
      setFaceVisible(false);
    }
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/mp3/sound1.wav')
    );
    setSound(sound);
    await sound.playAsync();
  };

  const pausePreview = () => {
    cameraRef.pausePreview();
    setDrawerOpen(true);
  };
  const resumePreview = () => {
    cameraRef.resumePreview();
    setDrawerOpen(false);
  };

  if (hasPermission == null || !hasPermission) {
    return <Text>Camera permissions were denied, Restart App!</Text>;
  }
  return (
    <Drawer
      drawerRef={drawerRef}
      pausePreview={pausePreview}
      resumePreview={resumePreview}
    >
      {drawerOpen && (
        <BlurView
          style={tw`absolute top-0 left-0 h-full w-full z-50`}
          intensity={50}
        />
      )}
      <Camera
        ref={cameraRef}
        style={tw`flex-1`}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
        }}
      >
        <SafeAreaView style={tw`flex-1`}>
          <View style={tw`flex-1 m-6`}>
            <TouchableOpacity
              onPress={() => {
                drawerRef.current.openDrawer();
              }}
            >
              <Feather name="menu" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Camera>
    </Drawer>
  );
};

export default Home;
