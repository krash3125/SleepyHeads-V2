import React, { useState, useMemo, useEffect } from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import tw from '../../lib/tailwind';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sounds = ({ soundsBottomSheetRef }) => {
  const snapPoints = useMemo(() => ['92%'], []);
  const [sound, setSound] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('song_name');
        if (value !== null) {
          if (value === 'sound2.wav') setSound(1);
          else if (value === 'sound3.mp3') setSound(2);
          else setSound(0);
        }
      } catch (e) {}
    })();
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('song_name', value);
      return { success: true };
    } catch (e) {
      alert('Failed to set song');
      return { success: false };
    }
  };

  return (
    <BottomSheet
      ref={soundsBottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.7}
          enableTouchThrough={false}
          disappearsOnIndex={-1}
        />
      )}
    >
      <View style={tw`m-4 mt-2 h-5/6 p-2`}>
        <Text style={tw`text-3.5xl font-800 text-sh-dark-blue text-center`}>
          Sounds
        </Text>
        <BouncyCheckbox
          isChecked={sound === 0}
          disableBuiltInState={true}
          text="Joyful Sound"
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-sh-dark-blue rounded-lg items-center px-4 mt-4`}
          textStyle={tw`text-xl font-600 text-white no-underline tracking-widest`}
          innerIconStyle={tw`border border-[#E98F50]`}
          fillColor="#E98F50"
          onPress={() => {
            storeData('sound1.wav').then((res) => {
              if (res.success) setSound(0);
            });
          }}
        />
        <BouncyCheckbox
          isChecked={sound === 1}
          disableBuiltInState={true}
          text="Fun Sound"
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-sh-dark-blue rounded-lg items-center px-4 mt-4`}
          textStyle={tw`text-xl font-600 text-white no-underline tracking-widest`}
          innerIconStyle={tw`border border-[#E98F50]`}
          fillColor="#E98F50"
          onPress={() => {
            storeData('sound2.wav').then((res) => {
              if (res.success) setSound(1);
            });
          }}
        />
        <BouncyCheckbox
          isChecked={sound === 2}
          disableBuiltInState={true}
          text="Calming Sound"
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-sh-dark-blue rounded-lg items-center px-4 mt-4`}
          textStyle={tw`text-xl font-600 text-white no-underline tracking-widest`}
          innerIconStyle={tw`border border-[#E98F50]`}
          fillColor="#E98F50"
          onPress={() => {
            storeData('sound3.mp3').then((res) => {
              if (res.success) setSound(2);
            });
          }}
        />
      </View>
    </BottomSheet>
  );
};

export default Sounds;
