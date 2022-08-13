import React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import tw from '../lib/tailwind';
import { Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import icon from '../assets/icon.png';
import DrawerItems from './DrawerItems';
import Sounds from './BottomSheets/Sounds';

import { Feather } from '@expo/vector-icons';
import { Sound } from 'expo-av/build/Audio';

import { BlurView } from 'expo-blur';

const screenWidth = Dimensions.get('window').width;

const Drawer = ({ children, drawerRef, pausePreview, resumePreview }) => {
  const soundsBottomSheetRef = useRef();
  const [anyBottomSheetOpen, setAnyBottomSheetOpen] = useState(false);

  const drawerView = () => {
    return (
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <View style={tw`flex-1 m-4 mt-8 relative`}>
          <View style={tw`flex-row items-center mb-10`}>
            <Image source={icon} style={tw`h-14 w-14`} />
            <Text
              style={tw`ml-2 text-3xl font-600 tracking-wider text-sh-dark-blue`}
            >
              sleepyheads
            </Text>
          </View>
          <DrawerItems
            title="Sounds"
            icon="volume-2"
            onPress={() => soundsBottomSheetRef?.current.expand()}
          />
          <DrawerItems title="About" icon="info" />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={screenWidth * 0.8}
        drawerPosition={DrawerLayout.positions.Left}
        drawerType="front"
        drawerBackgroundColor="#ffffff00"
        overlayColor={'#000000aa'}
        renderNavigationView={drawerView}
        hideStatusBar={true}
        onDrawerOpen={pausePreview}
        onDrawerClose={resumePreview}
      >
        {children}
      </DrawerLayout>
      <Sounds
        soundsBottomSheetRef={soundsBottomSheetRef}
        setAnyBottomSheetOpen={setAnyBottomSheetOpen}
      />
    </>
  );
};

export default Drawer;
